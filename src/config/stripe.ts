// ─── Stripe Configuration ────────────────────────────────────────────────────
// Pasos para configurar:
// 1. Crear cuenta en https://dashboard.stripe.com
// 2. Ir a Payment Links → Crear link ($5/mes, recurrente)
// 3. En la configuración del Payment Link, poner como URL de éxito:
//    https://tudominio.com?stripe_paid=1
// 4. Copiar la URL del Payment Link a VITE_STRIPE_PAYMENT_LINK en tu .env
// 5. Copiar tu clave pública (pk_live_xxx) a VITE_STRIPE_PUBLIC_KEY en tu .env
// ─────────────────────────────────────────────────────────────────────────────

export const STRIPE_PUBLIC_KEY   = import.meta.env.VITE_STRIPE_PUBLIC_KEY   ?? ''
export const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK ?? ''
export const STRIPE_SUCCESS_PARAM = 'stripe_paid'

// Duración de la suscripción activada desde el client (sin webhook)
export const STRIPE_SUBSCRIPTION_MONTHS = 1

/**
 * Redirige al usuario al Stripe Payment Link.
 * El link debe tener configurado como success_url:
 *   https://tudominio.com?stripe_paid=1
 *
 * IMPORTANTE: Para producción se recomienda verificar el pago via webhook
 * en un backend (Netlify/Vercel Function) en lugar de confiar solo en el
 * query param. Esto es un MVP funcional.
 */
export function redirectToStripe(): boolean {
  if (!STRIPE_PAYMENT_LINK) {
    if (import.meta.env.DEV) {
      console.warn(
        '%c[Stripe] Payment Link no configurado\n%c' +
        'Pasos para activar suscripciones:\n' +
        '1. Copia .env.example a .env\n' +
        '2. Ve a https://dashboard.stripe.com/payment-links\n' +
        '3. Crea un link de $4.99/mes con success_url: ?stripe_paid=1\n' +
        '4. Pega la URL en VITE_STRIPE_PAYMENT_LINK\n' +
        '5. Reinicia el servidor de desarrollo (npm run dev)',
        'color: #f59e0b; font-weight: bold',
        'color: #a1a1aa'
      )
    }
    return false
  }
  window.location.href = STRIPE_PAYMENT_LINK
  return true
}
