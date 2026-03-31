import React, { useState, useMemo } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Download, LayoutTemplate, Languages, Check, X, Sparkles } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import { AdModal } from './AdModal'
import { OriginalTemplate } from './templates/OriginalTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { ClassicTemplate } from './templates/ClassicTemplate'
import type { CVTemplate } from '../context/PortfolioContext'
import subscriptionService from '../services/subscriptionService'
import { AIService } from '../services/AIService'

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
  const lang = (portfolioData.language as string) || 'es'
  const t = previewTranslations[lang] || previewTranslations.es
  const [showAdModal, setShowAdModal] = useState(false)
  const [modalAction, setModalAction] = useState<'download' | 'translate'>('download')
  const [showLimitReached, setShowLimitReached] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [targetTranslationLang, setTargetTranslationLang] = useState<'es' | 'en'>('en')
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const currentTemplate: CVTemplate = portfolioData.template || 'original'

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

  const handleSubscribe = () => {
    setShowAdModal(false);
    const ok = subscriptionService.redirectToCheckout();
    if (!ok) {
      alert(lang === 'es'
        ? 'Stripe no configurado. Agrega VITE_STRIPE_PAYMENT_LINK al .env'
        : 'Stripe not configured. Add VITE_STRIPE_PAYMENT_LINK to .env');
    }
  };

  const handleExportPDFClick = () => {
    const downloadStatus = subscriptionService.canDownload();
    
    if (!downloadStatus.allowed) {
      setShowLimitReached(true);
      setModalAction('download');
      setShowAdModal(true);
      return;
    }
    
    const isPremium = subscriptionService.isPremium();
    
    if (isPremium) {
      generatePDF();
    } else {
      setShowLimitReached(false);
      setModalAction('download');
      setShowAdModal(true);
    }
  };

  const handleTranslateClick = async () => {
    const translateStatus = subscriptionService.canTranslate();
    
    if (!translateStatus.allowed) {
      setShowLimitReached(true);
      setModalAction('translate');
      setShowAdModal(true);
      return;
    }
    
    // Mostrar selector de idioma primero
    setShowLanguageSelector(true);
  };

  const handleLanguageSelected = (selectedLang: 'es' | 'en') => {
    setTargetTranslationLang(selectedLang);
    setShowLanguageSelector(false);
    
    const isPremium = subscriptionService.isPremium();
    
    if (isPremium) {
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
      console.log('Translating to:', translationLang);
      console.log('Current data:', portfolioData);
      
      const translated = await AIService.translateCV(portfolioData, translationLang);
      console.log('Translation result:', translated);
      
      if (translated) {
        // Forzar actualización completa
        updatePortfolioData({
          about: translated.about,
          title: translated.title,
          experience: translated.experience,
          projects: translated.projects,
          education: translated.education
        });
        subscriptionService.recordTranslation();
        
        // Mostrar confirmación
        setTimeout(() => {
          alert(lang === 'es' 
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

  const generatePDF = () => {
    setIsGeneratingPDF(true)
    const element = document.querySelector('.preview-content')
    if (!element) { setIsGeneratingPDF(false); return }

    // Wait one frame so isGeneratingPDF=true removes highlight outlines before capture
    requestAnimationFrame(() => {
      // Measure the actual rendered width of the element in px
      const elWidth = (element as HTMLElement).getBoundingClientRect().width

      const opt = {
        margin: 0,
        filename: `cv-${portfolioData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          backgroundColor: '#ffffff',
          // Match windowWidth to actual element width so responsive classes
          // behave identically between preview and PDF capture
          windowWidth: elWidth,
          onclone: (clonedDoc: Document) => {
            const el = clonedDoc.querySelector('.preview-content') as HTMLElement
            if (el) {
              el.style.backgroundColor = '#ffffff'
              // Remove any height constraints so content isn't clipped
              el.style.maxHeight = 'none'
              el.style.overflow = 'visible'
            }
          },
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
          compress: true,
        },
        // No pagebreak config — let html2pdf decide naturally based on content height
      }

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => { subscriptionService.recordDownload() })
        .catch((error: Error) => {
          console.error('Error generating PDF:', error)
          alert(lang === 'es' ? 'Error al generar el PDF' : 'Error generating PDF')
        })
        .finally(() => { setIsGeneratingPDF(false) })
    })
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
        <div className="flex justify-between items-center gap-3 mb-6 flex-wrap animate-slide-down">
          {/* Template Selector */}
          <div className="flex items-center gap-2" data-tour="template-selector">
            <LayoutTemplate size={14} className="text-white/30" />
            <select
              value={currentTemplate}
              onChange={(e) => setTemplate?.(e.target.value as CVTemplate)}
              className="bg-[#2C2C2E] border border-[#3A3A3C] text-white text-xs px-3 py-2 rounded-xl
                focus:border-violet-500 focus:outline-none cursor-pointer transition-all
                hover:bg-[#3A3A3C] hover:border-white/20"
            >
              <option value="original" className="bg-[#1C1C1E]">{lang === 'es' ? 'Original' : 'Original'}</option>
              <option value="modern"   className="bg-[#1C1C1E]">{lang === 'es' ? 'Moderna'  : 'Modern'}</option>
              <option value="classic"  className="bg-[#1C1C1E]">{lang === 'es' ? 'Clásica'  : 'Classic'}</option>
            </select>
          </div>

          {/* Action Buttons */}
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

        {/* CV Preview — renders previewData (includes pending AI changes) */}
        <div className={`preview-content shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/5 ${
          pendingOptimization ? 'ring-emerald-500/30 ring-2' : ''
        }`}>
          {currentTemplate === 'original' ? (
            <OriginalTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
          ) : currentTemplate === 'modern' ? (
            <ModernTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
          ) : (
            <ClassicTemplate data={previewData} t={t} highlightSections={isGeneratingPDF ? [] : (pendingOptimization?.pendingSections ?? [])} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview
