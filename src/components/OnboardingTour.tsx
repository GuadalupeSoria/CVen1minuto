import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X, ArrowRight, ArrowLeft } from 'lucide-react'

type MobileTab = 'editor' | 'preview'

interface TourStep {
  target: string
  titleES: string
  titleEN: string
  descES: string
  descEN: string
  requiresTab?: MobileTab // which mobile tab must be active for target to be visible
}

const STEPS: TourStep[] = [
  {
    target: '[data-tour="import-btn"]',
    titleES: 'Importa tu CV existente',
    titleEN: 'Import your existing CV',
    descES: 'Sube tu CV en PDF o imagen y la IA completará toda tu información automáticamente.',
    descEN: 'Upload your CV as PDF or image and AI will fill in all your information automatically.',
    requiresTab: 'editor',
  },
  {
    target: '[data-tour="template-selector"]',
    titleES: 'Elige tu plantilla y color',
    titleEN: 'Choose your template & color',
    descES: 'Tres diseños profesionales: Original, Moderna y Clásica. Personaliza el color en la pestaña Personal.',
    descEN: 'Three professional designs: Original, Modern and Classic. Customize color in the Personal tab.',
    requiresTab: 'preview',
  },
  {
    target: '[data-tour="translate-btn"]',
    titleES: 'Traduce tu CV con IA',
    titleEN: 'Translate your CV with AI',
    descES: 'Convierte tu CV entre Español e Inglés en segundos. La IA traduce todo el contenido.',
    descEN: 'Convert your CV between Spanish and English in seconds.',
    requiresTab: 'preview',
  },
  {
    target: '[data-tour="ai-optimizer"]',
    titleES: 'Optimiza con IA para empleos',
    titleEN: 'Optimize with AI for jobs',
    descES: 'Pega una oferta de trabajo y la IA ajustará tu CV para pasar filtros ATS y destacar.',
    descEN: 'Paste a job offer and AI will tailor your CV to pass ATS filters and stand out.',
    requiresTab: 'editor',
  },
  {
    target: '[data-tour="export-btn"]',
    titleES: 'Descarga tu CV en PDF',
    titleEN: 'Download your CV as PDF',
    descES: '¡Listo! El PDF será fiel al preview que ves aquí. Calidad profesional.',
    descEN: 'Done! The PDF will match the preview you see here. Professional quality.',
    requiresTab: 'preview',
  },
]

interface SpotlightRect { top: number; left: number; width: number; height: number }
const PAD = 8

function getRect(selector: string): SpotlightRect | null {
  const el = document.querySelector(selector)
  if (!el) return null
  const r = el.getBoundingClientRect()
  if (r.width === 0 && r.height === 0) return null
  return { top: r.top - PAD, left: r.left - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 }
}

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({
  step, rect, current, total, lang, onNext, onPrev, onSkip,
}: {
  step: TourStep; rect: SpotlightRect; current: number; total: number
  lang: string; onNext: () => void; onPrev: () => void; onSkip: () => void
}) {
  const isES = lang === 'es'
  const BOX_W = Math.min(272, window.innerWidth - 24)
  const vw = window.innerWidth
  const vh = window.innerHeight

  // Position below target by default, flip above if too close to bottom
  let top = rect.top + rect.height + 10
  let left = rect.left + rect.width / 2 - BOX_W / 2
  left = Math.max(10, Math.min(left, vw - BOX_W - 10))
  if (top + 180 > vh - 10) top = Math.max(10, rect.top - 180 - 10)

  const arrowLeft = Math.max(12, Math.min(rect.left + rect.width / 2 - left - 7, BOX_W - 24))
  const arrowDown = top < rect.top // tooltip is above → show arrow pointing down

  return (
    <div style={{ position: 'fixed', top, left, width: BOX_W, zIndex: 10002, pointerEvents: 'all' }}
      className="animate-spring-in">
      {/* Arrow */}
      {!arrowDown && (
        <div style={{ position: 'absolute', top: -7, left: arrowLeft, width: 0, height: 0,
          borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderBottom: '7px solid #3A3A3C' }} />
      )}
      <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl p-4 shadow-2xl">
        {/* Progress dots + close */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all ${i === current ? 'w-5 bg-violet-500' : 'w-1.5 bg-white/20'}`} />
            ))}
          </div>
          <button onClick={onSkip} className="p-1 text-white/30 hover:text-white/60 transition-colors"><X size={13} /></button>
        </div>
        <h3 className="text-sm font-bold text-white mb-1">{isES ? step.titleES : step.titleEN}</h3>
        <p className="text-xs text-white/55 leading-relaxed mb-4">{isES ? step.descES : step.descEN}</p>
        <div className="flex items-center justify-between">
          <button onClick={onPrev} disabled={current === 0}
            className="flex items-center gap-1 text-xs text-white/35 hover:text-white/65 disabled:opacity-0 transition-colors">
            <ArrowLeft size={12} />{isES ? 'Anterior' : 'Prev'}
          </button>
          <button onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all press-scale">
            {current === total - 1 ? (isES ? '¡Entendido!' : 'Got it!') : (isES ? 'Siguiente' : 'Next')}
            {current < total - 1 && <ArrowRight size={12} />}
          </button>
        </div>
      </div>
      {/* Arrow below */}
      {arrowDown && (
        <div style={{ position: 'absolute', bottom: -7, left: arrowLeft, width: 0, height: 0,
          borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '7px solid #3A3A3C' }} />
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
interface OnboardingTourProps {
  language: string
  onDone: () => void
  mobileTab?: MobileTab
  onTabSwitch?: (tab: MobileTab) => void
}

const isMobileWidth = () => window.innerWidth < 768

const OnboardingTour: React.FC<OnboardingTourProps> = ({ language, onDone, mobileTab, onTabSwitch }) => {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<SpotlightRect | null>(null)
  const [ready, setReady] = useState(false) // true after tab switch + settle delay
  const rafRef = useRef<number | null>(null)
  const currentStep = STEPS[step]

  // Switch tab if needed, then wait for DOM to settle
  useEffect(() => {
    setReady(false)
    setRect(null)

    if (isMobileWidth() && currentStep.requiresTab && onTabSwitch && mobileTab !== currentStep.requiresTab) {
      onTabSwitch(currentStep.requiresTab)
      // Wait for React to re-render the new panel
      const t = setTimeout(() => setReady(true), 320)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Continuously track element position (handles scroll / resize)
  const track = useCallback(() => {
    if (!ready) return
    const r = getRect(currentStep.target)
    if (r) setRect(r)
    rafRef.current = requestAnimationFrame(track)
  }, [ready, currentStep.target])

  useEffect(() => {
    if (!ready) return
    rafRef.current = requestAnimationFrame(track)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [ready, track])

  // Scroll target into view
  useEffect(() => {
    if (!ready) return
    const el = document.querySelector(currentStep.target)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }, [ready, currentStep.target])

  const next = () => { if (step < STEPS.length - 1) setStep(s => s + 1); else onDone() }
  const prev = () => { if (step > 0) setStep(s => s - 1) }

  const vw = window.innerWidth
  const vh = window.innerHeight

  if (!rect) {
    // Element not found yet — show centered fallback card
    if (!ready) return null
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 10001, pointerEvents: 'none' }}>
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', pointerEvents: 'all' }} onClick={next} />
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: Math.min(300, vw - 32), zIndex: 10002, pointerEvents: 'all' }} className="animate-spring-in">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                {Array.from({ length: STEPS.length }).map((_, i) => (
                  <div key={i} className={`h-1 rounded-full ${i === step ? 'w-5 bg-violet-500' : 'w-1.5 bg-white/20'}`} />
                ))}
              </div>
              <button onClick={onDone} className="p-1 text-white/30 hover:text-white/60"><X size={13} /></button>
            </div>
            <h3 className="text-sm font-bold text-white mb-1">
              {language === 'es' ? currentStep.titleES : currentStep.titleEN}
            </h3>
            <p className="text-xs text-white/55 leading-relaxed mb-4">
              {language === 'es' ? currentStep.descES : currentStep.descEN}
            </p>
            <div className="flex justify-between">
              <button onClick={prev} disabled={step === 0} className="text-xs text-white/35 disabled:opacity-0">
                <ArrowLeft size={12} className="inline mr-1" />{language === 'es' ? 'Anterior' : 'Prev'}
              </button>
              <button onClick={next} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold">
                {step === STEPS.length - 1 ? (language === 'es' ? '¡Entendido!' : 'Got it!') : (language === 'es' ? 'Siguiente' : 'Next')}
                {step < STEPS.length - 1 && <ArrowRight size={12} className="inline ml-1" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const rx = 10
  const fullPath = `M0,0 H${vw} V${vh} H0 Z`
  const holePath = `M${rect.left+rx},${rect.top} H${rect.left+rect.width-rx} Q${rect.left+rect.width},${rect.top} ${rect.left+rect.width},${rect.top+rx} V${rect.top+rect.height-rx} Q${rect.left+rect.width},${rect.top+rect.height} ${rect.left+rect.width-rx},${rect.top+rect.height} H${rect.left+rx} Q${rect.left},${rect.top+rect.height} ${rect.left},${rect.top+rect.height-rx} V${rect.top+rx} Q${rect.left},${rect.top} ${rect.left+rx},${rect.top} Z`

  return (
    <>
      {/* SVG overlay with spotlight hole */}
      <svg style={{ position: 'fixed', inset: 0, zIndex: 10001, pointerEvents: 'none', width: '100vw', height: '100vh' }}>
        <defs>
          <clipPath id="tour-clip">
            <path fillRule="evenodd" d={`${fullPath} ${holePath}`} />
          </clipPath>
        </defs>
        <rect x="0" y="0" width={vw} height={vh} fill="rgba(0,0,0,0.75)" clipPath="url(#tour-clip)" />
        <rect x={rect.left} y={rect.top} width={rect.width} height={rect.height} rx={rx}
          fill="none" stroke="rgba(139,92,246,0.75)" strokeWidth="2" />
      </svg>

      {/* Backdrop click advances tour */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 10001, cursor: 'pointer' }} onClick={next} />

      <Tooltip step={currentStep} rect={rect} current={step} total={STEPS.length}
        lang={language} onNext={next} onPrev={prev} onSkip={onDone} />
    </>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'cv1min_tour_done'

export function useOnboarding() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setShow(true), 900)
      return () => clearTimeout(t)
    }
  }, [])
  const complete = () => { localStorage.setItem(STORAGE_KEY, '1'); setShow(false) }
  const reset = () => { localStorage.removeItem(STORAGE_KEY); setShow(true) }
  return { show, complete, reset }
}

export default OnboardingTour
