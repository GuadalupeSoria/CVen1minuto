import React, { useState } from 'react'
import { X, Mail, Lock, LogIn, UserPlus, Loader2, Crown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  language?: string
  subtitleOverride?: string
}

const t = {
  es: {
    title: 'Acceder a tu cuenta',
    subtitle: 'Guardá tu CV en la nube y accedé desde cualquier dispositivo',
    emailLabel: 'Correo electrónico',
    passwordLabel: 'Contraseña',
    signIn: 'Iniciar sesión',
    signUp: 'Crear cuenta',
    switchToSignUp: '¿No tenés cuenta? Registrate',
    switchToSignIn: '¿Ya tenés cuenta? Iniciá sesión',
    orContinue: 'o continuá sin cuenta',
    premiumBadge: 'Premium sin publicidad',
    errorGeneric: 'Ocurrió un error. Intentá nuevamente.',
    successSignUp: 'Revisá tu email para confirmar tu cuenta.',
    emailPlaceholder: 'tu@email.com',
    passwordPlaceholder: 'Contraseña',
    close: 'Cerrar',
  },
  en: {
    title: 'Sign in to your account',
    subtitle: 'Save your CV in the cloud and access it from any device',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    signIn: 'Sign in',
    signUp: 'Create account',
    switchToSignUp: "Don't have an account? Sign up",
    switchToSignIn: 'Already have an account? Sign in',
    orContinue: 'or continue without account',
    premiumBadge: 'Premium — no ads',
    errorGeneric: 'Something went wrong. Please try again.',
    successSignUp: 'Check your email to confirm your account.',
    emailPlaceholder: 'you@email.com',
    passwordPlaceholder: 'Password',
    close: 'Close',
  },
}

const inp = 'w-full px-4 py-3 bg-[#1C1C1E] border border-[#3A3A3C] rounded-xl text-white text-sm placeholder:text-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all'

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess, language = 'es', subtitleOverride }) => {
  const tr = t[language as 'es' | 'en'] ?? t.es
  const { signIn, signUp } = useAuth()

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) { setError(error) }
        else { onSuccess ? onSuccess() : onClose() }
      } else {
        const { error } = await signUp(email, password)
        if (error) setError(error)
        else setSuccess(tr.successSignUp)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl w-full max-w-sm shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
              <Crown size={16} className="text-violet-400" />
            </div>
            <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">{tr.premiumBadge}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white hover:bg-[#2C2C2E] rounded-lg transition-all" aria-label={tr.close}>
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          <h2 className="text-lg font-bold text-white mb-1">{tr.title}</h2>
          <p className="text-sm text-white/50 mb-5">{subtitleOverride ?? tr.subtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                {tr.emailLabel}
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={tr.emailPlaceholder}
                  required
                  className={`${inp} pl-10`}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                {tr.passwordLabel}
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tr.passwordPlaceholder}
                  required
                  minLength={6}
                  className={`${inp} pl-10`}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>
            )}
            {success && (
              <p className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : mode === 'signin' ? (
                <><LogIn size={15} />{tr.signIn}</>
              ) : (
                <><UserPlus size={15} />{tr.signUp}</>
              )}
            </button>
          </form>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setSuccess(null) }}
              className="w-full text-xs text-white/40 hover:text-white/70 transition-colors text-center"
            >
              {mode === 'signin' ? tr.switchToSignUp : tr.switchToSignIn}
            </button>
            <button
              onClick={onClose}
              className="w-full text-xs text-white/25 hover:text-white/50 transition-colors text-center"
            >
              {tr.orContinue}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
