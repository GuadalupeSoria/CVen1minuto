import React, { useState, useEffect, useRef } from 'react'
import { X, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

interface TourStep {
  target: string // CSS selector or data-tour attr value
  titleES: string
  titleEN: string
  descES: string
  descEN: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const STEPS: TourStep[] = [
  {
    target: '[data-tour="import-btn"]',
    titleES: 'Importa tu CV existente',
    titleEN: 'Import your existing CV',
    descES: 'Sube tu CV en PDF o imagen y la IA completará toda tu información automáticamente.',
    descEN: 'Upload your CV as PDF or image and AI will fill in all your information automatically.',
    position: 'bottom',
  },
  {
    target: '[data-tour="template-selector"]',
    titleES: 'Elige tu plantilla',
    titleEN: 'Choose your template',
    descES: 'Tienes 3 diseños profesionales: Original, Moderna y Clásica. Cámbiala cuando quieras.',
    descEN: 'You have 3 professional designs: Original, Modern and Classic. Switch anytime.',
    position: 'bottom',
  },
  {
    target: '[data-tour="translate-btn"]',
    titleES: 'Traduce tu CV con IA',
    titleEN: 'Translate your CV with AI',
    descES: 'Convierte tu CV entre Español e Inglés en segundos. La IA traduce todo el contenido.',
    descEN: 'Convert your CV between Spanish and English in seconds. AI translates all content.',
    position: 'bottom',
  },
  {
    target: '[data-tour="ai-optimizer"]',
    titleES: 'Optimiza con IA para empleos',
    titleEN: 'Optimize with AI for jobs',
    descES: 'Pega una oferta de trabajo y la IA ajustará tu CV para pasar filtros ATS y destacar.',
    descEN: 'Paste a job offer and AI will tailor your CV to pass ATS filters and stand out.',
    position: 'right',
  },
  {
    target: '[data-tour="export-btn"]',
    titleES: 'Exporta tu CV en PDF',
    titleEN: 'Export your CV as PDF',
    descES: '¡Listo! Descarga tu CV profesional en PDF. Fiel al preview que ves aquí.',
    descEN: 'Done! Download your professional CV as PDF. Faithful to the preview you see here.',
    position: 'bottom',
  },
]

interface SpotlightRect {
  top: number
  left: number
  width: number
  height: number
}

const PADDING = 8

function getRect(selector: string): SpotlightRect | null {
  const el = document.querySelector(selector)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return {
    top: r.top - PADDING,
    left: r.left - PADDING,
    width: r.width + PADDING * 2,
    height: r.height + PADDING * 2,
  }
}

function TooltipBox({
  step,
  rect,
  current,
  total,
  lang,
  onNext,
  onPrev,
  onSkip,
}: {
  step: TourStep
  rect: SpotlightRect
  current: number
  total: number
  lang: string
  onNext: () => void
  onPrev: () => void
  onSkip: () => void
}) {
  const isES = lang === 'es'
  const boxW = 280
  const boxH = 190 // approx
  const vw = window.innerWidth
  const vh = window.innerHeight

  let top = rect.top + rect.height + 12
  let left = rect.left + rect.width / 2 - boxW / 2

  // Clamp horizontally
  left = Math.max(12, Math.min(left, vw - boxW - 12))

  // If tooltip goes below viewport, flip above
  if (top + boxH > vh - 16) {
    top = rect.top - boxH - 12
  }
  // If still off-screen above, force inside
  if (top < 12) top = 12

  const arrowLeft = rect.left + rect.width / 2 - left - 6

  return (
    <div
      style={{
        position: 'fixed',
        top,
        left,
        width: boxW,
        zIndex: 10001,
        pointerEvents: 'all',
      }}
      className="animate-spring-in"
    >
      {/* Arrow up */}
      {top > rect.top + rect.height && (
        <div
          style={{
            position: 'absolute',
            top: -7,
            left: Math.max(12, Math.min(arrowLeft, boxW - 24)),
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderBottom: '7px solid #3A3A3C',
          }}
        />
      )}
      <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl p-4 shadow-2xl">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${i === current ? 'w-5 bg-violet-500' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>
          <button onClick={onSkip} className="p-1 text-white/30 hover:text-white/70 transition-colors">
            <X size={13} />
          </button>
        </div>

        <h3 className="text-sm font-bold text-white mb-1.5">
          {isES ? step.titleES : step.titleEN}
        </h3>
        <p className="text-xs text-white/60 leading-relaxed mb-4">
          {isES ? step.descES : step.descEN}
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={current === 0}
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 disabled:opacity-0 transition-colors"
          >
            <ArrowLeft size={12} />
            {isES ? 'Anterior' : 'Prev'}
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all"
          >
            {current === total - 1
              ? (isES ? '¡Entendido!' : 'Got it!')
              : (isES ? 'Siguiente' : 'Next')}
            {current < total - 1 && <ArrowRight size={12} />}
          </button>
        </div>
      </div>
    </div>
  )
}

interface OnboardingTourProps {
  language: string
  onDone: () => void
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ language, onDone }) => {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<SpotlightRect | null>(null)
  const rafRef = useRef<number | null>(null)

  const currentStep = STEPS[step]

  // Continuously update rect (handles layout shifts)
  useEffect(() => {
    const update = () => {
      const r = getRect(currentStep.target)
      if (r) setRect(r)
      rafRef.current = requestAnimationFrame(update)
    }
    rafRef.current = requestAnimationFrame(update)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [currentStep.target])

  // Scroll target into view on step change
  useEffect(() => {
    const el = document.querySelector(currentStep.target)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step, currentStep.target])

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else onDone()
  }
  const prev = () => { if (step > 0) setStep(s => s - 1) }

  if (!rect) return null

  const vw = window.innerWidth
  const vh = window.innerHeight

  // SVG clip path: full screen with a rounded rect hole cut out
  const rx = 10
  const fullPath = `M0,0 H${vw} V${vh} H0 Z`
  const holePath = `M${rect.left + rx},${rect.top}
    H${rect.left + rect.width - rx}
    Q${rect.left + rect.width},${rect.top} ${rect.left + rect.width},${rect.top + rx}
    V${rect.top + rect.height - rx}
    Q${rect.left + rect.width},${rect.top + rect.height} ${rect.left + rect.width - rx},${rect.top + rect.height}
    H${rect.left + rx}
    Q${rect.left},${rect.top + rect.height} ${rect.left},${rect.top + rect.height - rx}
    V${rect.top + rx}
    Q${rect.left},${rect.top} ${rect.left + rx},${rect.top} Z`

  return (
    <>
      {/* Overlay with hole */}
      <svg
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          pointerEvents: 'none',
          width: '100vw',
          height: '100vh',
        }}
      >
        <defs>
          <clipPath id="tour-clip">
            <path fillRule="evenodd" d={`${fullPath} ${holePath}`} />
          </clipPath>
        </defs>
        <rect
          x="0" y="0"
          width={vw}
          height={vh}
          fill="rgba(0,0,0,0.78)"
          clipPath="url(#tour-clip)"
        />
        {/* Highlight ring around target */}
        <rect
          x={rect.left}
          y={rect.top}
          width={rect.width}
          height={rect.height}
          rx={rx}
          fill="none"
          stroke="rgba(139,92,246,0.7)"
          strokeWidth="2"
        />
      </svg>

      {/* Click blocker (prevent interacting with obscured UI) */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 10000 }}
        onClick={next}
      />

      {/* Tooltip */}
      <TooltipBox
        step={currentStep}
        rect={rect}
        current={step}
        total={STEPS.length}
        lang={language}
        onNext={next}
        onPrev={prev}
        onSkip={onDone}
      />
    </>
  )
}

const STORAGE_KEY = 'cv1min_tour_done'

export function useOnboarding() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY)
    if (!done) {
      // Small delay to let the UI settle
      const t = setTimeout(() => setShow(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const complete = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setShow(false)
  }

  return { show, complete, reset: () => { localStorage.removeItem(STORAGE_KEY); setShow(true) } }
}

export default OnboardingTour
