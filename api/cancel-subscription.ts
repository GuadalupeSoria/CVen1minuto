import type { VercelRequest, VercelResponse } from '@vercel/node'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return res.status(401).json({ error: 'Invalid token' })

  // Buscar el stripe_subscription_id del usuario
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('stripe_subscription_id')
    .eq('user_id', user.id)
    .single()

  if (sub?.stripe_subscription_id) {
    // Cancelar en Stripe — el webhook disparará customer.subscription.deleted
    // que a su vez actualizará el perfil en Supabase automáticamente
    await stripe.subscriptions.cancel(sub.stripe_subscription_id)
  }

  // Actualizar inmediatamente en Supabase para UX instantánea
  await supabase.from('profiles').update({
    is_premium: false,
    premium_expires_at: null,
    updated_at: new Date().toISOString(),
  }).eq('id', user.id)

  return res.status(200).json({ cancelled: true })
}
