import React, { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { Download, LayoutTemplate, Languages, Check, X, Sparkles, Save, BookMarked, Loader2, Palette } from 'lucide-react'
import { toCanvas } from 'html-to-image'
import jsPDF from 'jspdf'
import { AdModal } from './AdModal'
import { LoginModal } from './LoginModal'
import { OriginalTemplate } from './templates/OriginalTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { ClassicTemplate } from './templates/ClassicTemplate'
import { ExecutiveTemplate } from './templates/ExecutiveTemplate'
import type { CVTemplate } from '../context/PortfolioContext'
import subscriptionService from '../services/subscriptionService'
import { AIService } from '../services/AIService'
import { useAuth } from '../context/AuthContext'
import { useDrafts } from '../hooks/useDrafts'
import DraftsPanel from './DraftsPanel'

type PreviewTranslations = {
  exportPdf: string
  aboutTitle: string
  experienceTitle: string
  projectsTitle: string
  educationTitle: string
  skillsTitle: string
  noPhoto: string
  noEducation: string
  translateCV?: string
  limitReached?: string
  limitMessage?: string
  translating?: string
}

const previewTranslations: Record<string, PreviewTranslations> = {
  es: {
    exportPdf: 'Exportar PDF',
    aboutTitle: 'Sobre mí',
    experienceTitle: 'Experiencia',
    projectsTitle: 'Proyectos',
    educationTitle: 'Educación',
    skillsTitle: 'Habilidades',
    noPhoto: 'Sin foto',
    noEducation: 'No hay educación agregada.',
    translateCV: 'Traducir CV',
    limitReached: 'Límite alcanzado',
    limitMessage: 'Ya descargaste tu CV hoy',
    translating: 'Traduciendo...'
  },
  en: {
    exportPdf: 'Export PDF',
    aboutTitle: 'About me',
    experienceTitle: 'Experience',
    projectsTitle: 'Projects',
    educationTitle: 'Education',
    skillsTitle: 'Skills',
    noPhoto: 'No photo',
    noEducation: 'No education added.',
    translateCV: 'Translate CV',
    limitReached: 'Limit reached',
    limitMessage: 'You already downloaded your CV today',
    translating: 'Translating...'
  }
}

const Preview: React.FC = () => {
  const {
    portfolioData,
    setTemplate,
    updatePortfolioData,
    pendingOptimization,
    acceptSection,
    rejectSection,
    acceptAllPending,
    rejectAllPending,
  } = usePortfolio()
  const { user, isPremium: supabasePremium } = useAuth()
  const lang = (portfolioData.language as string) || 'es'
  const t = previewTranslations[lang] || previewTranslations.es

  // Premium si está logueado con premium en Supabase, o tiene la suscripción local activa
  const isPremiumUser = supabasePremium || subscriptionService.isPremium()

  // Drafts
  const { saveDraft, loading: savingDraft } = useDrafts(user?.id)
  const [showDrafts, setShowDrafts] = useState(false)
  const [showSaveInput, setShowSaveInput] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [saveOk, setSaveOk] = useState(false)

  const handleSaveDraft = async () => {
    if (!saveName.trim() || !user) return
    await saveDraft(saveName.trim(), portfolioData, lang)
    setSaveOk(true)
    setSaveName('')
    setShowSaveInput(false)
    setTimeout(() => setSaveOk(false), 2500)
  }

  const [colorPickerOpen, setColorPickerOpen] = useState(false)
  const [colorPickerPos, setColorPickerPos] = useState({ top: 0, left: 0 })
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const colorButtonRef = useRef<HTMLButtonElement>(null)

  const openColorPicker = () => {
    if (!colorPickerOpen && colorButtonRef.current) {
      const rect = colorButtonRef.current.getBoundingClientRect()
      setColorPickerPos({ top: rect.bottom + 8, left: rect.left })
    }
    setColorPickerOpen(v => !v)
  }

  useEffect(() => {
    if (!colorPickerOpen) return
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (
        colorPickerRef.current && !colorPickerRef.current.contains(target) &&
        colorButtonRef.current && !colorButtonRef.current.contains(target)
      ) {
        setColorPickerOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler as EventListener)
    return () => document.removeEventListener('pointerdown', handler as EventListener)
  }, [colorPickerOpen])

  const COLOR_PRESETS = ['#3B82F6','#7C3AED','#10B981','#F59E0B','#EF4444','#EC4899','#6366F1','#14B8A6','#111827','#F97316','#84CC16']

  const [showAdModal, setShowAdModal] = useState(false)
  const [modalAction, setModalAction] = useState<'download' | 'translate'>('download')
  const [showLimitReached, setShowLimitReached] = useState(false)
  const [showLoginForSubscribe, setShowLoginForSubscribe] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [targetTranslationLang, setTargetTranslationLang] = useState<'es' | 'en'>('en')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const currentTemplate: CVTemplate = portfolioData.template || 'original'

  // Mobile scaling: shrink the 210mm template to fit narrow screens
  const outerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const TEMPLATE_W = 794 // 210mm at 96dpi
    const update = () => {
      if (!outerRef.current) return
      const avail = outerRef.current.clientWidth
      setScale(avail > 0 ? Math.min(1, avail / TEMPLATE_W) : 1)
    }
    update()
    const ro = new ResizeObserver(update)
    if (outerRef.current) ro.observe(outerRef.current)
    return () => ro.disconnect()
  }, [])

  // Merge portfolioData with pending AI changes for live preview
  const previewData = useMemo(() => {
    if (!pendingOptimization) return portfolioData
    const sections = pendingOptimization.pendingSections
    return {
      ...portfolioData,
      about: sections.includes('about') ? pendingOptimization.optimizedAbout : portfolioData.about,
      title: sections.includes('title') ? pendingOptimization.suggestedTitle : portfolioData.title,
      skills: sections.includes('skills')
        ? [
            ...portfolioData.skills,
            ...(pendingOptimization.suggestedSkills ?? []).filter(
              s => !portfolioData.skills.includes(s),
            ),
          ]
        : portfolioData.skills,
    }
  }, [portfolioData, pendingOptimization])

  const goToStripe = () => {
    const ok = subscriptionService.redirectToCheckout(user?.email ?? undefined)
    if (!ok) {
      alert(lang === 'es'
        ? 'Stripe no configurado. Agrega VITE_STRIPE_PAYMENT_LINK al .env'
        : 'Stripe not configured. Add VITE_STRIPE_PAYMENT_LINK to .env')
    }
  }

  const handleSubscribe = () => {
    setShowAdModal(false)
    if (!user) {
      // Pedir cuenta antes de suscribirse
      setShowLoginForSubscribe(true)
      return
    }
    goToStripe()
  };

  const handleExportPDFClick = () => {
    if (isPremiumUser) { generatePDF(); return; }
    const downloadStatus = subscriptionService.canDownload();
    if (!downloadStatus.allowed) {
      setShowLimitReached(true);
      setModalAction('download');
      setShowAdModal(true);
      return;
    }
    setShowLimitReached(false);
    setModalAction('download');
    setShowAdModal(true);
  };

  const handleTranslateClick = async () => {
    if (isPremiumUser) { setShowLanguageSelector(true); return; }
    const translateStatus = subscriptionService.canTranslate();
    if (!translateStatus.allowed) {
      setShowLimitReached(true);
      setModalAction('translate');
      setShowAdModal(true);
      return;
    }
    setShowLanguageSelector(true);
  };

  const handleLanguageSelected = (selectedLang: 'es' | 'en') => {
    setTargetTranslationLang(selectedLang);
    setShowLanguageSelector(false);
    
    if (isPremiumUser) {
      handleTranslateCV(selectedLang);
    } else {
      setShowLimitReached(false);
      setModalAction('translate');
      setShowAdModal(true);
    }
  };

  const handleTranslateCV = async (targetLang?: 'es' | 'en') => {
    setIsTranslating(true);
    try {
      const translationLang = targetLang || targetTranslationLang;
      // 1) Cambiar primero el idioma de interfaz para títulos/labels del CV
      if ((portfolioData.language || 'es') !== translationLang) {
        updatePortfolioData({ language: translationLang });
      }

      const translated = await AIService.translateCV(portfolioData, translationLang);
      
      if (translated) {
        // Forzar actualización completa
        updatePortfolioData({
          language: translationLang,
          about: translated.about,
          title: translated.title,
          experience: translated.experience,
          projects: translated.projects,
          education: translated.education
        });
        subscriptionService.recordTranslation();
        
        // Mostrar confirmación
        setTimeout(() => {
          alert(translationLang === 'es' 
            ? 'CV traducido correctamente' 
            : 'CV translated successfully');
        }, 100);
      }
    } catch (error) {
      console.error('Error translating CV:', error);
      alert(lang === 'es' ? 'Error al traducir el CV' : 'Error translating CV');
    } finally {
      setIsTranslating(false);
    }
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true)
    const element = document.querySelector('.preview-content') as HTMLElement
    if (!element) { setIsGeneratingPDF(false); return }

    // One frame so highlight outlines are removed before capture
    await new Promise(r => requestAnimationFrame(r))

    try {
      const PIXEL_RATIO = 2
      const canvas = await toCanvas(element, {
        pixelRatio: PIXEL_RATIO,
        backgroundColor: '#ffffff',
        style: { maxHeight: 'none', overflow: 'visible', transform: 'none' },
      })

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true })
      const pdfW = pdf.internal.pageSize.getWidth()   // 210 mm
      const pdfH = pdf.internal.pageSize.getHeight()  // 297 mm

      // Convert canvas pixels → mm  (96 dpi baseline)
      const PX_PER_MM = 96 / 25.4
      const img1xW = canvas.width / PIXEL_RATIO
      const img1xH = canvas.height / PIXEL_RATIO
      const pageHeightPx = pdfH * PX_PER_MM

      let srcY = 0
      while (srcY < img1xH) {
        if (srcY > 0) pdf.addPage()

        const slicePx = Math.min(pageHeightPx, img1xH - srcY)
        const slice = document.createElement('canvas')
        slice.width = canvas.width
        slice.height = Math.ceil(slicePx * PIXEL_RATIO)
        slice.getContext('2d')!.drawImage(
          canvas,
          0, Math.round(srcY * PIXEL_RATIO), canvas.width, slice.height,
          0, 0, slice.width, slice.height,
        )
        pdf.addImage(slice.toDataURL('image/jpeg', 0.98), 'JPEG', 0, 0, pdfW, slicePx / PX_PER_MM)
        srcY += pageHeightPx
      }

      pdf.save(`cv-${portfolioData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`)
      subscriptionService.recordDownload()
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert(lang === 'es' ? 'Error al generar el PDF' : 'Error generating PDF')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="flex-1 bg-[#0F0F0F] p-4 sm:p-8 overflow-y-auto">
      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-scale-in">
            <h2 className="text-base font-semibold text-white mb-1 text-center">
              {lang === 'es' ? 'Traducir CV' : 'Translate CV'}
            </h2>
            <p className="text-white/40 text-xs text-center mb-5">
              {lang === 'es' ? 'Selecciona el idioma destino' : 'Select the target language'}
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleLanguageSelected('es')}
                className="w-full py-3 px-5 bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-[#3A3A3C] text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-3"
              >
                <span className="text-base">ES</span>
                <span>Español</span>
              </button>
              <button
                onClick={() => handleLanguageSelected('en')}
                className="w-full py-3 px-5 bg-[#2C2C2E] hover:bg-[#3A3A3C] border border-[#3A3A3C] text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-3"
              >
                <span className="text-base">EN</span>
                <span>English</span>
              </button>
            </div>
            <button
              onClick={() => setShowLanguageSelector(false)}
              className="w-full mt-3 py-2 text-white/30 hover:text-white/60 text-sm transition-colors"
            >
              {lang === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      <AdModal
        visible={showAdModal}
        onClose={() => {
          setShowAdModal(false);
          setShowLimitReached(false);
        }}
        onWatchAd={() => {
          if (modalAction === 'download') {
            generatePDF();
          } else {
            handleTranslateCV();
          }
          setShowAdModal(false);
          setShowLimitReached(false);
        }}
        onSubscribe={handleSubscribe}
        action={modalAction}
        language={lang}
        showLimitReached={showLimitReached}
      />
      
      <div className="max-w-[210mm] mx-auto">
        <div className="flex justify-between items-center gap-2 mb-6 flex-wrap animate-slide-down">
          {/* Left: Template + Save + Mis CVs */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2" data-tour="template-selector">
              <LayoutTemplate size={14} className="text-white/30 shrink-0" />
              <select
                value={currentTemplate}
                onChange={(e) => setTemplate?.(e.target.value as CVTemplate)}
                className="bg-[#2C2C2E] border border-[#3A3A3C] text-white text-xs px-3 py-2 rounded-xl
                  focus:border-violet-500 focus:outline-none cursor-pointer transition-all
                  hover:bg-[#3A3A3C] hover:border-white/20"
              >
                <option value="original"  className="bg-[#1C1C1E]">{lang === 'es' ? 'Original'   : 'Original'}</option>
                <option value="modern"    className="bg-[#1C1C1E]">{lang === 'es' ? 'Moderna'    : 'Modern'}</option>
                <option value="classic"   className="bg-[#1C1C1E]">{lang === 'es' ? 'Clásica'    : 'Classic'}</option>
                <option value="executive" className="bg-[#1C1C1E]">{lang === 'es' ? 'Ejecutiva'  : 'Executive'}</option>
              </select>

              {/* Color picker */}
              <div className="relative">
                <button
                  ref={colorButtonRef}
                  onClick={openColorPicker}
                  title={lang === 'es' ? 'Color del CV' : 'CV color'}
                  className="flex items-center gap-1.5 px-2 py-2 bg-[#2C2C2E] border border-[#3A3A3C] hover:bg-[#3A3A3C] hover:border-white/20 rounded-xl transition-all"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                    style={{ backgroundColor: portfolioData.theme.primaryColor }}
                  />
                  <Palette size={12} className="text-white/40" />
                </button>

                {colorPickerOpen && createPortal(
                  <div
                    ref={colorPickerRef}
                    className="bg-[#1C1C1E] border border-[#3A3A3C] rounded-2xl p-3 shadow-2xl w-[168px]"
                    style={{
                      position: 'fixed',
                      top: colorPickerPos.top,
                      left: colorPickerPos.left,
                      zIndex: 99999,
                    }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {COLOR_PRESETS.map(c => (
                        <button
                          key={c}
                          onClick={() => { updatePortfolioData({ theme: { ...portfolioData.theme, primaryColor: c } }); setColorPickerOpen(false) }}
                          style={{ backgroundColor: c }}
                          className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${
                            portfolioData.theme.primaryColor === c ? 'border-white scale-110' : 'border-transparent'
                          }`}
                        />
                      ))}
                      <label
                        className="w-7 h-7 rounded-full border-2 border-dashed border-white/30 hover:border-white/60 flex items-center justify-center cursor-pointer transition-all hover:scale-110 relative overflow-hidden"
                        title={lang === 'es' ? 'Color personalizado' : 'Custom color'}
                      >
                        <Palette size={11} className="text-white/50 pointer-events-none" />
                        <input
                          type="color"
                          value={portfolioData.theme.primaryColor}
                          onChange={(e) => updatePortfolioData({ theme: { ...portfolioData.theme, primaryColor: e.target.value } })}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                      </label>
                    </div>
                  </div>
                , document.body)}
              </div>
            </div>

            {/* Save + Mis CVs — solo visibles con sesión */}
            {user && (
              <>
                {/* Save inline */}
                <div className="flex items-center gap-1.5">
                  {showSaveInput ? (
                    <>
                      <input
                        autoFocus
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSaveDraft(); if (e.key === 'Escape') { setShowSaveInput(false); setSaveName('') } }}
                        placeholder={lang === 'es' ? 'Nombre del CV...' : 'CV name...'}
                        className="px-2.5 py-1.5 bg-[#1C1C1E] border border-violet-500/60 rounded-lg text-white text-xs placeholder:text-white/25 focus:outline-none w-36"
                      />
                      <button
                        onClick={handleSaveDraft}
                        disabled={savingDraft || !saveName.trim()}
                        className="p-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white rounded-lg transition-all"
                      >
                        {savingDraft ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                      </button>
                      <button onClick={() => { setShowSaveInput(false); setSaveName('') }} className="p-1.5 bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white/40 rounded-lg transition-all">
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowSaveInput(true)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                        saveOk
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                          : 'bg-[#2C2C2E] border-[#3A3A3C] hover:bg-[#3A3A3C] text-white/60'
                      }`}
                    >
                      {saveOk ? <><Check size={12} />{lang === 'es' ? 'Guardado' : 'Saved'}</> : <><Save size={12} />{lang === 'es' ? 'Guardar' : 'Save'}</>}
                    </button>
                  )}
                </div>

                {/* Mis CVs */}
                <button
                  onClick={() => setShowDrafts(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2C2C2E] border border-[#3A3A3C] hover:bg-[#3A3A3C] text-white/60 rounded-xl text-xs font-medium transition-all"
                >
                  <BookMarked size={12} />
                  {lang === 'es' ? 'Mis CVs' : 'My CVs'}
                </button>
              </>
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex gap-2">
            <button
              data-tour="translate-btn"
              onClick={handleTranslateClick}
              disabled={isTranslating}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2C2C2E] hover:bg-[#3A3A3C]
                border border-[#3A3A3C] text-white/70 rounded-xl text-xs font-medium
                transition-all duration-200 press-scale disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isTranslating
                ? <><div className="w-3 h-3 border border-white/20 border-t-violet-400 rounded-full animate-spin" />{t.translating || 'Traduciendo...'}</>
                : <><Languages size={13} />{t.translateCV || 'Traducir CV'}</>
              }
            </button>

            <button
              data-tour="export-btn"
              onClick={handleExportPDFClick}
              className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-500
                text-white rounded-xl text-xs font-semibold transition-all duration-200
                press-scale shadow-glow-sm"
            >
              <Download size={13} />
              {t.exportPdf}
            </button>
          </div>
        </div>

        {/* Diff banner – visible when AI changes are pending */}
        {pendingOptimization && pendingOptimization.pendingSections.length > 0 && (
          <div className="mb-4 bg-[#2C2C2E] border border-[#3A3A3C] rounded-2xl overflow-hidden">
            {/* Banner header */}
            <div className="flex items-center justify-between px-4 py-3 bg-emerald-500/10 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  {lang === 'es'
                    ? `${pendingOptimization.pendingSections.length} cambios de IA pendientes en el preview`
                    : `${pendingOptimization.pendingSections.length} AI changes pending in preview`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={acceptAllPending}
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <Check size={10} /> {lang === 'es' ? 'Aceptar todos' : 'Accept all'}
                </button>
                <button
                  onClick={rejectAllPending}
                  className="flex items-center gap-1 px-3 py-1 bg-[#3A3A3C] hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg text-[11px] font-semibold transition-colors"
                >
                  <X size={10} /> {lang === 'es' ? 'Rechazar todos' : 'Reject all'}
                </button>
              </div>
            </div>

            {/* Per-section diff rows */}
            <div className="divide-y divide-[#3A3A3C]/60">
              {pendingOptimization.pendingSections.includes('about') && (
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1">
                      {lang === 'es' ? 'Sobre mí' : 'About me'}
                    </p>
                    <p className="text-[11px] text-white/30 line-through leading-relaxed">
                      {pendingOptimization.originalAbout.slice(0, 80)}{pendingOptimization.originalAbout.length > 80 ? '…' : ''}
                    </p>
                    <p className="text-[11px] text-emerald-400 leading-relaxed mt-0.5 bg-emerald-500/10 px-1.5 py-1 rounded">
                      {pendingOptimization.optimizedAbout.slice(0, 80)}{pendingOptimization.optimizedAbout.length > 80 ? '…' : ''}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0 mt-1">
                    <button onClick={() => acceptSection('about')} className="p-1.5 bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors" title={lang === 'es' ? 'Aceptar' : 'Accept'}><Check size={11} /></button>
                    <button onClick={() => rejectSection('about')} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title={lang === 'es' ? 'Rechazar' : 'Reject'}><X size={11} /></button>
                  </div>
                </div>
              )}

              {pendingOptimization.pendingSections.includes('title') && (
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1">
                      {lang === 'es' ? 'Título profesional' : 'Professional title'}
                    </p>
                    <p className="text-[11px] text-white/30 line-through">{pendingOptimization.originalTitle}</p>
                    <p className="text-[11px] font-semibold text-emerald-400 mt-0.5">{pendingOptimization.suggestedTitle}</p>
                  </div>
                  <div className="flex gap-1 shrink-0 mt-1">
                    <button onClick={() => acceptSection('title')} className="p-1.5 bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors" title={lang === 'es' ? 'Aceptar' : 'Accept'}><Check size={11} /></button>
                    <button onClick={() => rejectSection('title')} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title={lang === 'es' ? 'Rechazar' : 'Reject'}><X size={11} /></button>
                  </div>
                </div>
              )}

              {pendingOptimization.pendingSections.includes('skills') && (
                <div className="flex items-start gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                      {lang === 'es' ? 'Habilidades a agregar' : 'Skills to add'}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(pendingOptimization.suggestedSkills ?? []).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-500/12 border border-emerald-500/25 text-emerald-400 rounded-full text-[10px] font-medium">+ {skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0 mt-1">
                    <button onClick={() => acceptSection('skills')} className="p-1.5 bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors" title={lang === 'es' ? 'Aceptar' : 'Accept'}><Check size={11} /></button>
                    <button onClick={() => rejectSection('skills')} className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title={lang === 'es' ? 'Rechazar' : 'Reject'}><X size={11} /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CV Preview — scales to fit on narrow/mobile screens */}
        <div ref={outerRef} style={{ width: '100%', overflow: 'hidden' }}>
          <div
            className={`preview-content shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/5 ${
              pendingOptimization ? 'ring-emerald-500/30 ring-2' : ''
            }`}
            style={scale < 1 ? {
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              // compensate layout: scaled div still occupies full width in flow,
              // so shrink the perceived width and let the outer clip it
              width: `${(1 / scale) * 100}%`,
              marginBottom: `calc((${scale} - 1) * 100%)`, // pull up bottom gap
            } : undefined}
          >
            {currentTemplate === 'original' ? (
              <OriginalTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
            ) : currentTemplate === 'modern' ? (
              <ModernTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
            ) : currentTemplate === 'executive' ? (
              <ExecutiveTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
            ) : (
              <ClassicTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
            )}
          </div>
        </div>
      </div>
      {user && (
        <DraftsPanel
          isOpen={showDrafts}
          onClose={() => setShowDrafts(false)}
          userId={user.id}
          currentCVData={portfolioData}
          currentLanguage={lang}
          onLoad={(cvData) => updatePortfolioData(cvData as Parameters<typeof updatePortfolioData>[0])}
          language={lang}
        />
      )}

      {/* Login requerido para suscribirse */}
      <LoginModal
        isOpen={showLoginForSubscribe}
        onClose={() => setShowLoginForSubscribe(false)}
        onSuccess={() => {
          setShowLoginForSubscribe(false)
          goToStripe()
        }}
        language={lang}
        subtitleOverride={
          lang === 'es'
            ? 'Creá una cuenta gratuita para activar Premium sin publicidad.'
            : 'Create a free account to activate ad-free Premium.'
        }
      />
    </div>
  )
}

export default Preview
