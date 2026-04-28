import React, { useState, useEffect } from 'react'
import { X, Crown, Mail, Lock, ExternalLink, AlertTriangle, CheckCircle2, Loader2, LogOut, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import subscriptionService from '../services/subscriptionService'
import { STRIPE_PORTAL_LINK } from '../config/stripe'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  language?: string
  onSubscribe?: () => void
}

const inp = 'w-full px-3 py-2.5 bg-[#111] border border-[#2a2a2a] rounded-xl text-white text-sm placeholder:text-white/20 focus:border-violet-500 focus:outline-none transition-all'

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose, language = 'es', onSubscribe }) => {
  const { user, session, isPremium, profile, signOut, refreshProfile } = useAuth()
  const lang = language

  const [cancelStep, setCancelStep] = useState<0 | 1 | 2>(0)
  const [billingDate, setBillingDate] = useState<string | null>(null)
  const [pwOpen, setPwOpen] = useState(false)
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwOk, setPwOk] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen || !user || !isPremium) return
    supabase
      .from('subscriptions')
      .select('current_period_end')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.current_period_end) {
          setBillingDate(new Date(data.current_period_end).toLocaleDateString(
            lang === 'es' ? 'es-ES' : 'en-US',
            { day: 'numeric', month: 'long', year: 'numeric' }
          ))
        }
      })
  }, [isOpen, user, isPremium, lang])

  if (!isOpen || !user) return null

  const handleCancelSubscription = async () => {
    setLoading(true)
    try {
      await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session?.access_token}` },
      })
      subscriptionService.cancelPremium()
      await refreshProfile()
      setCancelStep(0)
    } catch {
      // fallback: cancel locally
      subscriptionService.cancelPremium()
      await supabase.from('profiles').update({ is_premium: false, premium_expires_at: null }).eq('id', user.id)
      await refreshProfile()
      setCancelStep(0)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setPwError('')
    if (newPw !== confirmPw) { setPwError(lang === 'es' ? 'Las contraseñas no coinciden' : "Passwords don't match"); return }
    if (newPw.length < 6) { setPwError(lang === 'es' ? 'Mínimo 6 caracteres' : 'Min 6 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    setLoading(false)
    if (error) { setPwError(error.message); return }
    setPwOk(true)
    setNewPw(''); setConfirmPw('')
    setTimeout(() => { setPwOk(false); setPwOpen(false) }, 2000)
  }

  const expiresAt = profile?.premium_expires_at
    ? new Date(profile.premium_expires_at).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-[260] w-full max-w-xs bg-[#141414] border-l border-[#2a2a2a] flex flex-col shadow-2xl overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a2a]">
          <p className="text-sm font-semibold text-white">{lang === 'es' ? 'Configuración' : 'Settings'}</p>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-3">

          {/* ── Perfil ── */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a2a]">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                {lang === 'es' ? 'Perfil' : 'Profile'}
              </p>
            </div>
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-violet-400">
                  {user.email?.[0]?.toUpperCase() ?? '?'}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate flex items-center gap-1.5">
                  <Mail size={11} className="text-white/30 shrink-0" />
                  {user.email}
                </p>
              </div>
            </div>
          </section>

          {/* ── Suscripción ── */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a2a]">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                {lang === 'es' ? 'Suscripción' : 'Subscription'}
              </p>
            </div>

            {isPremium ? (
              <div className="p-4 space-y-3">
                {/* Plan badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-yellow-500/15 flex items-center justify-center">
                      <Crown size={13} className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Premium</p>
                      {expiresAt && (
                        <p className="text-[10px] text-white/40">
                          {lang === 'es' ? `Vence ${expiresAt}` : `Expires ${expiresAt}`}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    {lang === 'es' ? 'Activo' : 'Active'}
                  </span>
                </div>

                {/* Gestionar en Stripe */}
                {STRIPE_PORTAL_LINK ? (
                  <a
                    href={`${STRIPE_PORTAL_LINK}?prefilled_email=${encodeURIComponent(user.email ?? '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2.5 bg-[#111] border border-[#2a2a2a] hover:border-violet-500/40 rounded-xl text-xs text-white/60 hover:text-white transition-all"
                  >
                    <span>{lang === 'es' ? 'Gestionar en Stripe' : 'Manage on Stripe'}</span>
                    <ExternalLink size={11} className="shrink-0" />
                  </a>
                ) : null}

                {/* Cancelar */}
                {cancelStep === 0 && (
                  <button
                    onClick={() => setCancelStep(1)}
                    className="w-full text-center text-[11px] text-white/25 hover:text-red-400 transition-colors py-1"
                  >
                    {lang === 'es' ? 'Cancelar suscripción' : 'Cancel subscription'}
                  </button>
                )}

                {/* Paso 1: beneficios perdidos */}
                {cancelStep === 1 && (
                  <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-3 space-y-3">
                    <p className="text-xs font-semibold text-white">
                      {lang === 'es' ? '¿Cancelar? Perderás:' : 'Cancel? You\'ll lose:'}
                    </p>
                    <ul className="space-y-1.5">
                      {(lang === 'es'
                        ? ['Descargas ilimitadas de PDF', 'Traducciones y optimizaciones con IA', 'CVs guardados en la nube', 'Experiencia sin publicidad']
                        : ['Unlimited PDF downloads', 'AI translations & optimizations', 'Cloud-saved CVs', 'Ad-free experience']
                      ).map((b, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] text-white/60">
                          <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    {billingDate && (
                      <p className="text-[11px] text-white/50 bg-white/5 rounded-lg px-2.5 py-2 leading-relaxed">
                        {lang === 'es'
                          ? `Tu acceso seguirá activo hasta el ${billingDate} — no se realizará ningún cobro más.`
                          : `Your access stays active until ${billingDate} — no further charges.`}
                      </p>
                    )}
                    <div className="flex gap-2 pt-1">
                      <button onClick={() => setCancelStep(0)} className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all">
                        {lang === 'es' ? 'Mantener' : 'Keep it'}
                      </button>
                      <button onClick={() => setCancelStep(2)} className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-[#3a3a3a] text-white/40 text-xs hover:text-white/60 transition-all">
                        {lang === 'es' ? 'Continuar' : 'Continue'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Paso 2: confirmación final */}
                {cancelStep === 2 && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={13} className="text-red-400 shrink-0" />
                      <p className="text-xs font-semibold text-white">
                        {lang === 'es' ? '¿Completamente seguro?' : 'Absolutely sure?'}
                      </p>
                    </div>
                    <p className="text-[11px] text-white/40 leading-relaxed">
                      {lang === 'es'
                        ? 'Se cancela inmediatamente. El cargo en Stripe se detiene en el próximo ciclo.'
                        : 'Cancels immediately. Stripe billing stops at next cycle.'}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => setCancelStep(1)} className="flex-1 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all">
                        {lang === 'es' ? 'No, quedarme' : 'No, stay'}
                      </button>
                      <button
                        onClick={handleCancelSubscription}
                        disabled={loading}
                        className="px-3 py-2 rounded-xl bg-[#1a1a1a] border border-red-500/30 hover:bg-red-500/10 text-red-400 text-xs transition-all flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {loading ? <Loader2 size={11} className="animate-spin" /> : null}
                        {lang === 'es' ? 'Cancelar' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/60">{lang === 'es' ? 'Plan gratuito' : 'Free plan'}</p>
                  <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">Free</span>
                </div>
                <button
                  onClick={() => { onClose(); onSubscribe?.() }}
                  className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Crown size={12} />
                  {lang === 'es' ? 'Activar Premium — $3.99/mes' : 'Activate Premium — $3.99/mo'}
                </button>
              </div>
            )}
          </section>

          {/* ── Seguridad ── */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a2a]">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                {lang === 'es' ? 'Seguridad' : 'Security'}
              </p>
            </div>
            <div className="p-4">
              <button
                onClick={() => { setPwOpen(v => !v); setPwError(''); setPwOk(false) }}
                className="flex items-center justify-between w-full text-xs text-white/60 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2"><Lock size={13} />{lang === 'es' ? 'Cambiar contraseña' : 'Change password'}</span>
                <ChevronRight size={13} className={`transition-transform ${pwOpen ? 'rotate-90' : ''}`} />
              </button>

              {pwOpen && (
                <div className="mt-3 space-y-2">
                  <input
                    type="password"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    placeholder={lang === 'es' ? 'Nueva contraseña' : 'New password'}
                    className={inp}
                    minLength={6}
                  />
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    placeholder={lang === 'es' ? 'Confirmar contraseña' : 'Confirm password'}
                    className={inp}
                    minLength={6}
                  />
                  {pwError && <p className="text-[11px] text-red-400">{pwError}</p>}
                  {pwOk && <p className="text-[11px] text-emerald-400">{lang === 'es' ? '¡Contraseña actualizada!' : 'Password updated!'}</p>}
                  <button
                    onClick={handleChangePassword}
                    disabled={loading || !newPw || !confirmPw}
                    className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    {loading ? <Loader2 size={12} className="animate-spin" /> : null}
                    {lang === 'es' ? 'Guardar contraseña' : 'Save password'}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Cerrar sesión */}
        <div className="p-4 border-t border-[#2a2a2a]">
          <button
            onClick={() => { signOut(); onClose() }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-red-500/30 hover:text-red-400 text-white/40 text-xs font-medium transition-all"
          >
            <LogOut size={13} />
            {lang === 'es' ? 'Cerrar sesión' : 'Sign out'}
          </button>
        </div>
      </div>
    </>
  )
}

export default SettingsPanel
