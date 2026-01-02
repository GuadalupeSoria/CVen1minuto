import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Download } from 'lucide-react'
import { Phone, MapPin, Mail, Globe } from 'lucide-react'
import html2pdf from 'html2pdf.js'
import { AdModal } from './AdModal'

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
  const { portfolioData } = usePortfolio()
  const lang = (portfolioData.language as string) || 'es'
  const t = previewTranslations[lang] || previewTranslations.es
  const [showAdModal, setShowAdModal] = useState(false)

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
      clone.querySelectorAll('svg').forEach(s => s.remove())

      // Remove page styling (borders, shadows, etc)
      clone.classList.remove('a4-page')
      clone.style.boxShadow = 'none'
      clone.style.margin = '0'
      clone.style.minHeight = 'auto'

      ;(clone.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach((el) => {
        // Remove backgrounds
        const bg = el.style && (el.style.background || el.style.backgroundColor)
        if (bg) {
          el.style.background = 'transparent'
          el.style.backgroundColor = 'transparent'
        }
        
        // Remove ::after pseudo-element effects by removing classes
        el.classList.remove('a4-page')
      })

      const container = document.createElement('div')
      container.appendChild(clone)

      const opt = {
        margin: [10, 10],
        filename: 'mi-portafolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
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
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={handleExportPDFClick}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50 font-medium"
          >
            <Download size={20} />
            Exportar PDF
          </button>
        </div>

        {/* Página 1 */}
        <div className="a4-page preview-content" style={{ color: portfolioData.theme.primaryColor }}>
          <div className="flex items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              {portfolioData.showPhoto ? (
                portfolioData.photo ? (
                  <img
                    src={portfolioData.photo}
                    alt={portfolioData.name}
                    className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center">{t.noPhoto}</div>
                )
              ) : null}

              <div>
                <h1 className="text-2xl sm:text-4xl font-bold mb-1">{portfolioData.name}</h1>
                <h2 className="text-base sm:text-2xl text-gray-600 mb-2">{portfolioData.title}</h2>

                <div className="flex flex-col md:flex-row gap-3 text-sm text-gray-700">
                  {portfolioData.contact?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      <a className="underline" href={`mailto:${portfolioData.contact.email}`}>{portfolioData.contact.email}</a>
                    </div>
                  )}

                  {portfolioData.contact?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{portfolioData.contact.phone}</span>
                    </div>
                  )}

                  {portfolioData.contact?.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{portfolioData.contact.address}</span>
                    </div>
                  )}

                  {portfolioData.contact?.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                      <a className="underline" href={(portfolioData.contact.website.startsWith('http') ? portfolioData.contact.website : `https://${portfolioData.contact.website}`)} target="_blank" rel="noreferrer">{portfolioData.contact.website}</a>
                    </div>
                  )}

                  {portfolioData.contact?.linkedin && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                      <a className="underline" href={(portfolioData.contact.linkedin.startsWith('http') ? portfolioData.contact.linkedin : `https://${portfolioData.contact.linkedin}`)} target="_blank" rel="noreferrer">{portfolioData.contact.linkedin}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {(() => {
            const projectsCount = portfolioData.projects?.filter(p => 
              (p.name && p.name.trim()) || (p.description && p.description.trim()) || (p.skills && p.skills.length > 0)
            ).length || 0;
            const experiencesCount = portfolioData.experience?.length || 0;
            
            // Logic:
            // - >=2 projects and <3 experiences: move Education and Skills to left
            // - >=4 experiences: move only Skills to left
            const shouldMoveEducationAndSkills = projectsCount >= 2 && experiencesCount < 3;
            const shouldMoveSkillsOnly = experiencesCount >= 4;

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div>
                  <section className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                    <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.aboutTitle}</h3>
                    <p className="text-xs sm:text-base text-gray-700 leading-relaxed">{portfolioData.about}</p>
                  </section>

                  <section className="mb-8">
                    <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.experienceTitle}</h3>
                    <div className="space-y-4">
                      {portfolioData.experience.map((exp) => (
                        <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: portfolioData.theme.primaryColor, pageBreakInside: 'avoid' }}>
                          <h4 className="font-semibold text-xs sm:text-base">{exp.position}</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">{exp.company}</p>
                          <p className="text-xs text-gray-500">{[exp.startMonth, exp.startYear].filter(Boolean).join(' ')} {exp.startMonth || exp.startYear ? '-' : ''} {[exp.endMonth, exp.endYear].filter(Boolean).join(' ') } {exp.duration ? exp.duration : ''}</p>
                          {exp.description && <p className="text-xs sm:text-sm text-gray-700 mt-2">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Education in left column when shouldMoveEducationAndSkills or shouldMoveSkillsOnly */}
                  {(shouldMoveEducationAndSkills) && (
                    <section className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                      <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.educationTitle}</h3>
                      <div className="space-y-4">
                        {portfolioData.education && portfolioData.education.length > 0 ? (
                          portfolioData.education.map((ed) => (
                            <div key={ed.id} className="bg-gray-50 p-3 rounded-lg" style={{ pageBreakInside: 'avoid' }}>
                              <h4 className="font-semibold text-xs sm:text-base">{ed.institution}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">{ed.degree}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{[ed.startMonth, ed.startYear].filter(Boolean).join(' ')} {ed.startMonth || ed.startYear ? '-' : ''} {[ed.endMonth, ed.endYear].filter(Boolean).join(' ')}</p>
                              {ed.description && <p className="text-xs sm:text-sm text-gray-700 mt-2">{ed.description}</p>}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">{t.noEducation}</p>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Skills in left column when shouldMoveEducationAndSkills or shouldMoveSkillsOnly */}
                  {(shouldMoveEducationAndSkills || shouldMoveSkillsOnly) && portfolioData.skills && portfolioData.skills.length > 0 && (
                    <section className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                      <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.skillsTitle}</h3>
                      <div className="w-full flex flex-wrap gap-2">
                        {portfolioData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="skill-badge inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm max-w-full break-words"
                            style={{
                              backgroundColor: `${portfolioData.theme.primaryColor}15`,
                              color: portfolioData.theme.primaryColor,
                              lineHeight: 1
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                <div>
                  {/* Projects ALWAYS in right column */}
                  {portfolioData.projects && portfolioData.projects.some(p => (p.name && p.name.trim()) || (p.description && p.description.trim()) || (p.skills && p.skills.length > 0)) && (
                    <section className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                      <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.projectsTitle}</h3>
                      <div className="space-y-4">
                        {portfolioData.projects.map((project) => (
                          (project.name || project.description || (project.skills && project.skills.length)) ? (
                            <div key={project.id} className="bg-gray-50 p-4 rounded-lg" style={{ pageBreakInside: 'avoid' }}>
                              <h4 className="font-semibold mb-2 text-xs sm:text-base">{project.name}</h4>
                              <p className="text-xs sm:text-sm text-gray-500 mb-2">{[project.startMonth, project.startYear].filter(Boolean).join(' ')} {project.startMonth || project.startYear ? '-' : ''} {[project.endMonth, project.endYear].filter(Boolean).join(' ')}</p>
                              <p className="text-gray-600 text-xs sm:text-sm">{project.description}</p>
                              {project.skills && project.skills.length > 0 && (
                                <div className="w-full flex flex-wrap gap-2 mt-3 justify-start">
                                  {project.skills.map((s, i) => (
                                    <span key={i} className="skill-badge inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm bg-gray-100 max-w-full break-words" style={{ color: portfolioData.theme.primaryColor }}>
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : null
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education in right column when NOT moved to left */}
                  {!shouldMoveEducationAndSkills && (
                    <section className="mb-8" style={{ pageBreakInside: 'avoid' }}>
                      <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.educationTitle}</h3>
                      <div className="space-y-4">
                        {portfolioData.education && portfolioData.education.length > 0 ? (
                          portfolioData.education.map((ed) => (
                            <div key={ed.id} className="bg-gray-50 p-3 rounded-lg" style={{ pageBreakInside: 'avoid' }}>
                              <h4 className="font-semibold text-xs sm:text-base">{ed.institution}</h4>
                              <p className="text-xs sm:text-sm text-gray-500">{ed.degree}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{[ed.startMonth, ed.startYear].filter(Boolean).join(' ')} {ed.startMonth || ed.startYear ? '-' : ''} {[ed.endMonth, ed.endYear].filter(Boolean).join(' ')}</p>
                              {ed.description && <p className="text-xs sm:text-sm text-gray-700 mt-2">{ed.description}</p>}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">{t.noEducation}</p>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Skills in right column when NOT moved to left */}
                  {!shouldMoveEducationAndSkills && !shouldMoveSkillsOnly && portfolioData.skills && portfolioData.skills.length > 0 && (
                    <section style={{ pageBreakInside: 'avoid' }}>
                      <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.skillsTitle}</h3>
                        <div className="w-full flex flex-wrap gap-2">
                        {portfolioData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="skill-badge inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm max-w-full break-words"
                            style={{
                              backgroundColor: `${portfolioData.theme.primaryColor}15`,
                              color: portfolioData.theme.primaryColor,
                              lineHeight: 1
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {portfolioData.languages && portfolioData.languages.length > 0 && (
                    <section className="mt-4" style={{ pageBreakInside: 'avoid' }}>
                      <h3 className="text-sm sm:text-xl font-semibold mb-4" style={{ pageBreakAfter: 'avoid' }}>Idiomas</h3>
                      <div className="flex flex-col gap-2">
                        {portfolioData.languages.map((l) => (
                          <div key={l.id} className="flex items-center justify-between">
                            <div className="text-sm">
                              <strong>{l.name}</strong>
                              {l.level && <span className="ml-2 text-gray-600">{l.level}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
              );
            })()}
        </div>
      </div>
    </div>
  )
}

export default Preview