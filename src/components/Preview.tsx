import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Download, LayoutTemplate } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import { AdModal } from './AdModal'
import { OriginalTemplate } from './templates/OriginalTemplate'
import { ModernTemplate } from './templates/ModernTemplate'
import { ClassicTemplate } from './templates/ClassicTemplate'
import type { CVTemplate } from '../context/PortfolioContext'

type PreviewTranslations = {
  exportPdf: string
  aboutTitle: string
  experienceTitle: string
  projectsTitle: string
  educationTitle: string
  skillsTitle: string
  noPhoto: string
  noEducation: string
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
    noEducation: 'No hay educación agregada.'
  },
  en: {
    exportPdf: 'Export PDF',
    aboutTitle: 'About me',
    experienceTitle: 'Experience',
    projectsTitle: 'Projects',
    educationTitle: 'Education',
    skillsTitle: 'Skills',
    noPhoto: 'No photo',
    noEducation: 'No education added.'
  }
}

const Preview: React.FC = () => {
  const { portfolioData, setTemplate } = usePortfolio()
  const lang = (portfolioData.language as string) || 'es'
  const t = previewTranslations[lang] || previewTranslations.es
  const [showAdModal, setShowAdModal] = useState(false)
  const currentTemplate: CVTemplate = portfolioData.template || 'original'

  const handleExportPDFClick = () => {
    // Verificar si es usuario premium (implementar lógica después)
    const isPremium = false; // TODO: Implementar verificación de usuario premium
    
    if (isPremium) {
      generatePDF();
    } else {
      setShowAdModal(true);
    }
  };

  const generatePDF = () => {
    const element = document.querySelector('.preview-content')
    if (element) {
      const clone = element.cloneNode(true) as HTMLElement

      // Remove UI elements that shouldn't be in PDF
      clone.querySelectorAll('.page-indicator').forEach(el => el.remove())

      // Style adjustments for PDF
      clone.style.boxShadow = 'none'
      clone.style.margin = '0'
      clone.style.padding = '0'
      clone.style.minHeight = 'auto'
      clone.style.width = '100%'

      const container = document.createElement('div')
      container.style.width = '210mm'
      container.appendChild(clone)

      const opt = {
        margin: [8, 8, 8, 8],
        filename: `cv-${portfolioData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      html2pdf().set(opt).from(container).save()
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8 overflow-y-auto">
      <AdModal
        visible={showAdModal}
        onClose={() => setShowAdModal(false)}
        onWatchAd={() => {
          generatePDF();
          setShowAdModal(false);
        }}
        action="download"
        language={lang}
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

          <button
            onClick={handleExportPDFClick}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50 font-medium"
          >
            <Download size={20} />
            {t.exportPdf}
          </button>
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
