/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Phone, MapPin, Mail, Globe } from 'lucide-react'

interface PortfolioData {
  name: string
  title: string
  about: string
  photo: string
  showPhoto?: boolean
  skills: string[]
  experience: any[]
  education: any[]
  projects: any[]
  contact: any
  languages?: any[]
  theme: { primaryColor: string }
}

interface OriginalTemplateProps {
  data: PortfolioData
  t: any
}

export const OriginalTemplate: React.FC<OriginalTemplateProps> = ({ data, t }) => {
  const projectsCount = data.projects?.filter(p => 
    (p.name && p.name.trim()) || (p.description && p.description.trim()) || (p.skills && p.skills.length > 0)
  ).length || 0;
  const experiencesCount = data.experience?.length || 0;
  
  // Logic:
  // - >=2 projects and <3 experiences: move Education and Skills to left
  // - >=4 experiences: move only Skills to left
  const shouldMoveEducationAndSkills = projectsCount >= 2 && experiencesCount < 3;
  const shouldMoveSkillsOnly = experiencesCount >= 4;

  return (
    <div className="a4-page bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', boxSizing: 'border-box', color: data.theme.primaryColor }}>
      <div className="flex items-center gap-6 mb-12">
        <div className="flex items-center gap-4">
          {data.showPhoto ? (
            data.photo ? (
              <img
                src={data.photo}
                alt={data.name}
                className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center">{t.noPhoto}</div>
            )
          ) : null}

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">{data.name}</h1>
            <h2 className="text-base sm:text-xl lg:text-2xl text-gray-600 mb-2">{data.title}</h2>

            <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs lg:text-sm text-gray-700">
              {data.contact?.email && (
                <div className="flex items-center gap-1.5 min-w-0">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">{data.contact.email}</span>
                </div>
              )}

              {data.contact?.phone && (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{data.contact.phone}</span>
                </div>
              )}

              {data.contact?.address && (
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-words">{data.contact.address}</span>
                </div>
              )}

              {data.contact?.website && (
                <div className="flex items-center gap-1.5 min-w-0">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">{data.contact.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <div>
          <section className="mb-6 lg:mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.aboutTitle}</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{data.about}</p>
          </section>

          <section className="mb-6 lg:mb-8">
            <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.experienceTitle}</h3>
            <div className="space-y-3 lg:space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-3 lg:pl-4" style={{ borderColor: data.theme.primaryColor, pageBreakInside: 'avoid' }}>
                  <h4 className="font-semibold text-xs sm:text-sm lg:text-base">{exp.position}</h4>
                  <p className="text-gray-600 text-xs lg:text-sm">{exp.company}</p>
                  <p className="text-xs text-gray-500">{[exp.startMonth, exp.startYear].filter(Boolean).join(' ')} {exp.startMonth || exp.startYear ? '-' : ''} {[exp.endMonth, exp.endYear].filter(Boolean).join(' ') } {exp.duration ? exp.duration : ''}</p>
                  {exp.description && <p className="text-xs lg:text-sm text-gray-700 mt-2 whitespace-pre-wrap">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* Education in left column when shouldMoveEducationAndSkills */}
          {shouldMoveEducationAndSkills && (
            <section className="mb-6 lg:mb-8" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.educationTitle}</h3>
              <div className="space-y-3 lg:space-y-4">
                {data.education && data.education.length > 0 ? (
                  data.education.map((ed) => (
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
          {(shouldMoveEducationAndSkills || shouldMoveSkillsOnly) && data.skills && data.skills.length > 0 && (
            <section className="mb-6 lg:mb-8" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.skillsTitle}</h3>
              <div className="w-full flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill-badge inline-flex items-center px-2 py-0.5 lg:py-1 rounded-full text-xs max-w-full break-words"
                    style={{
                      backgroundColor: `${data.theme.primaryColor}15`,
                      color: data.theme.primaryColor,
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
          {data.projects && data.projects.some(p => (p.name && p.name.trim()) || (p.description && p.description.trim()) || (p.skills && p.skills.length > 0)) && (
            <section className="mb-6 lg:mb-8" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.projectsTitle}</h3>
              <div className="space-y-3 lg:space-y-4">
                {data.projects.map((project) => (
                  (project.name || project.description || (project.skills && project.skills.length)) ? (
                    <div key={project.id} className="bg-gray-50 p-3 lg:p-4 rounded-lg" style={{ pageBreakInside: 'avoid' }}>
                      <h4 className="font-semibold mb-2 text-xs sm:text-sm lg:text-base">{project.name}</h4>
                      <p className="text-xs lg:text-sm text-gray-500 mb-2">{[project.startMonth, project.startYear].filter(Boolean).join(' ')} {project.startMonth || project.startYear ? '-' : ''} {[project.endMonth, project.endYear].filter(Boolean).join(' ')}</p>
                      <p className="text-gray-600 text-xs lg:text-sm whitespace-pre-wrap">{project.description}</p>
                      {project.skills && project.skills.length > 0 && (
                        <div className="w-full flex flex-wrap gap-2 mt-3 justify-start">
                          {project.skills.map((s: string, i: number) => (
                            <span key={i} className="skill-badge inline-flex items-center px-2 py-0.5 lg:py-1 rounded-full text-xs bg-gray-100 max-w-full break-words" style={{ color: data.theme.primaryColor }}>
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
            <section className="mb-6 lg:mb-8" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.educationTitle}</h3>
              <div className="space-y-3 lg:space-y-4">
                {data.education && data.education.length > 0 ? (
                  data.education.map((ed) => (
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
          {!shouldMoveEducationAndSkills && !shouldMoveSkillsOnly && data.skills && data.skills.length > 0 && (
            <section style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>{t.skillsTitle}</h3>
              <div className="w-full flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill-badge inline-flex items-center px-2 py-0.5 lg:py-1 rounded-full text-xs max-w-full break-words"
                    style={{
                      backgroundColor: `${data.theme.primaryColor}15`,
                      color: data.theme.primaryColor,
                      lineHeight: 1
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages && data.languages.length > 0 && (
            <section className="mt-4" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-3 lg:mb-4" style={{ pageBreakAfter: 'avoid' }}>Idiomas</h3>
              <div className="flex flex-col gap-2">
                {data.languages.map((l) => (
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
  )
}
