import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { FileText } from 'lucide-react'
import { Phone, MapPin, Mail, Globe } from 'lucide-react'
import html2pdf from 'html2pdf.js'

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

  const exportPDF = () => {
    const element = document.querySelector('.preview-content')
    if (element) {
      const clone = element.cloneNode(true) as HTMLElement

      clone.querySelectorAll('svg').forEach(s => s.remove())

      ;(clone.querySelectorAll('*') as NodeListOf<HTMLElement>).forEach((el) => {
        const bg = el.style && (el.style.background || el.style.backgroundColor)
        if (bg) {
          el.style.background = 'transparent'
          el.style.backgroundColor = 'transparent'
        }
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
    <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FileText size={20} />
            Exportar PDF
          </button>
        </div>

        <div className="preview-content bg-white p-8 rounded-xl shadow-lg" style={{ color: portfolioData.theme.primaryColor }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <section className="mb-8">
                <h3 className="text-sm sm:text-xl font-semibold mb-4">{t.aboutTitle}</h3>
                <p className="text-xs sm:text-base text-gray-700 leading-relaxed">{portfolioData.about}</p>
              </section>

              <section className="mb-8">
                <h3 className="text-sm sm:text-xl font-semibold mb-4">{t.experienceTitle}</h3>
                <div className="space-y-4">
                  {portfolioData.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: portfolioData.theme.primaryColor }}>
                      <h4 className="font-semibold text-xs sm:text-base">{exp.position}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">{exp.company}</p>
                      <p className="text-xs text-gray-500">{[exp.startMonth, exp.startYear].filter(Boolean).join(' ')} {exp.startMonth || exp.startYear ? '-' : ''} {[exp.endMonth, exp.endYear].filter(Boolean).join(' ') } {exp.duration ? exp.duration : ''}</p>
                      {exp.description && <p className="text-xs sm:text-sm text-gray-700 mt-2">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div>
              
              {portfolioData.projects && portfolioData.projects.some(p => (p.name && p.name.trim()) || (p.description && p.description.trim()) || (p.skills && p.skills.length > 0)) && (
                <section className="mb-8">
                  <h3 className="text-sm sm:text-xl font-semibold mb-4">{t.projectsTitle}</h3>
                  <div className="space-y-4">
                    {portfolioData.projects.map((project) => (
                      (project.name || project.description || (project.skills && project.skills.length)) ? (
                        <div key={project.id} className="bg-gray-50 p-4 rounded-lg">
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

              <section className="mb-8">
                <h3 className="text-sm sm:text-xl font-semibold mb-4">{t.educationTitle}</h3>
                <div className="space-y-4">
                  {portfolioData.education && portfolioData.education.length > 0 ? (
                    portfolioData.education.map((ed) => (
                      <div key={ed.id} className="bg-gray-50 p-3 rounded-lg">
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

              {portfolioData.skills && portfolioData.skills.length > 0 && (
                <section>
                  <h3 className="text-sm sm:text-xl font-semibold mb-4">{t.skillsTitle}</h3>
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
                <section className="mt-4">
                  <h3 className="text-sm sm:text-xl font-semibold mb-4">Idiomas</h3>
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
        </div>
      </div>
    </div>
  )
}

export default Preview