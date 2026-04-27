import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-03-31.basil' })

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const config = { api: { bodyParser: false } }

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature'] as string
  if (!sig) return res.status(400).json({ error: 'Missing stripe-signature header' })

  let event: Stripe.Event
  try {
    const rawBody = await getRawBody(req)
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return res.status(400).json({ error: `Webhook signature verification failed: ${msg}` })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const customerEmail = session.customer_details?.email
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (!customerEmail) break

        // Find the Supabase user by email
        const { data: users } = await supabase.auth.admin.listUsers()
        const user = users?.users?.find(u => u.email === customerEmail)
        if (!user) break

        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        await supabase.from('profiles').update({
          is_premium: true,
          premium_expires_at: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('id', user.id)

        // Upsert subscription record
        await supabase.from('subscriptions').upsert({
          user_id: user.id,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: 'active',
          current_period_end: expiresAt.toISOString(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })

        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = (invoice as { subscription?: string }).subscription as string | undefined
        const customerId = invoice.customer as string

        if (!subscriptionId) break

        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const periodEnd = new Date((subscription as { current_period_end: number }).current_period_end * 1000)

        // Update subscription record by customer ID
        await supabase.from('subscriptions')
          .update({
            status: 'active',
            current_period_end: periodEnd.toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        // Update profile premium_expires_at
        const { data: sub } = await supabase.from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (sub?.user_id) {
          await supabase.from('profiles').update({
            is_premium: true,
            premium_expires_at: periodEnd.toISOString(),
            updated_at: new Date().toISOString(),
          }).eq('id', sub.user_id)
        }

        break
      }

      case 'customer.subscription.deleted':
      case 'invoice.payment_failed': {
        const obj = event.data.object as { customer?: string }
        const customerId = obj.customer as string
        if (!customerId) break

        await supabase.from('subscriptions')
          .update({
            status: event.type === 'customer.subscription.deleted' ? 'canceled' : 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        const { data: sub } = await supabase.from('subscriptions')
          .select('user_id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (sub?.user_id) {
          await supabase.from('profiles').update({
            is_premium: false,
            updated_at: new Date().toISOString(),
          }).eq('id', sub.user_id)
        }

        break
      }
    }

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('Webhook processing error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
