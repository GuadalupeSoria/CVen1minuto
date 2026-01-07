import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Download, LayoutTemplate, Languages } from 'lucide-react'
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
  const { portfolioData, setTemplate, updatePortfolioData } = usePortfolio()
  const lang = (portfolioData.language as string) || 'es'
  const t = previewTranslations[lang] || previewTranslations.es
  const [showAdModal, setShowAdModal] = useState(false)
  const [modalAction, setModalAction] = useState<'download' | 'translate'>('download')
  const [showLimitReached, setShowLimitReached] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [targetTranslationLang, setTargetTranslationLang] = useState<'es' | 'en'>('en')
  const currentTemplate: CVTemplate = portfolioData.template || 'original'

  const handleSubscribe = () => {
    setShowAdModal(false);
    // TODO: Implementar integración con Stripe/PayPal
    // Por ahora, simulamos activación (para testing)
    if (window.confirm(lang === 'es' 
      ? '¿Activar suscripción Premium? (Simulado - $5/mes)' 
      : 'Activate Premium subscription? (Simulated - $5/month)')) {
      subscriptionService.activatePremium(1); // 1 mes
      alert(lang === 'es' 
        ? '¡Premium activado! Ahora tienes acceso ilimitado.' 
        : 'Premium activated! You now have unlimited access.');
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
    const element = document.querySelector('.preview-content')
    if (element) {
      const opt = {
        margin: [0, 0, 0, 0],
        filename: `cv-${portfolioData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 1.0
        },
        html2canvas: {
          scale: 3,
          useCORS: true,
          letterRendering: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          backgroundColor: '#ffffff',
          windowWidth: 210 * 3.78, // 210mm a px con mejor resolución
          windowHeight: 297 * 3.78, // 297mm a px
          onclone: (clonedDoc: Document) => {
            const clonedElement = clonedDoc.querySelector('.preview-content') as HTMLElement;
            if (clonedElement) {
              // Asegurar que el texto sea seleccionable
              clonedElement.style.width = '210mm';
              clonedElement.style.minHeight = '297mm';
              clonedElement.style.backgroundColor = '#ffffff';
            }
          }
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait',
          compress: false
        },
        pagebreak: {
          mode: ['css', 'legacy'],
          avoid: ['img', '.avoid-break']
        }
      }

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          subscriptionService.recordDownload();
        })
        .catch((error: Error) => {
          console.error('Error generating PDF:', error);
          alert(lang === 'es' ? 'Error al generar el PDF' : 'Error generating PDF');
        });
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8 overflow-y-auto">
      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {lang === 'es' ? '¿A qué idioma traducir?' : 'Which language to translate to?'}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {lang === 'es' 
                ? 'Selecciona el idioma destino para tu CV' 
                : 'Select the target language for your CV'}
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleLanguageSelected('es')}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🇪🇸</span>
                <span>Español</span>
              </button>
              
              <button
                onClick={() => handleLanguageSelected('en')}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🇬🇧</span>
                <span>English</span>
              </button>
            </div>

            <button
              onClick={() => setShowLanguageSelector(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
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
        <div className="flex justify-between items-center gap-4 mb-6">
          {/* Template Selector */}
          <div className="flex items-center gap-2">
            <LayoutTemplate className="text-gray-600" size={20} />
            <select
              value={currentTemplate}
              onChange={(e) => setTemplate?.(e.target.value as CVTemplate)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
            >
              <option value="original">{lang === 'es' ? 'Plantilla Original' : 'Original Template'}</option>
              <option value="modern">{lang === 'es' ? 'Plantilla Moderna' : 'Modern Template'}</option>
              <option value="classic">{lang === 'es' ? 'Plantilla Clásica' : 'Classic Template'}</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleTranslateClick}
              disabled={isTranslating}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Languages size={20} />
              {isTranslating ? (t.translating || 'Traduciendo...') : (t.translateCV || 'Traducir CV')}
            </button>

            <button
              onClick={handleExportPDFClick}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50 font-medium"
            >
              <Download size={20} />
              {t.exportPdf}
            </button>
          </div>
        </div>

        {/* CV Preview */}
        <div className="preview-content shadow-2xl rounded-lg overflow-hidden">
          {currentTemplate === 'original' ? (
            <OriginalTemplate data={portfolioData} t={t} />
          ) : currentTemplate === 'modern' ? (
            <ModernTemplate data={portfolioData} t={t} />
          ) : (
            <ClassicTemplate data={portfolioData} t={t} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview
