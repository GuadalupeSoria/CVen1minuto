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

interface ClassicTemplateProps {
  data: PortfolioData
  t: any
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, t }) => {
  return (
    <div className="bg-white min-h-[297mm] flex">
      {/* Left Sidebar */}
      <div
        className="w-1/3 p-6 text-white min-h-[297mm]"
        style={{ backgroundColor: data.theme.primaryColor }}
      >
          {/* Photo */}
          {data.showPhoto && data.photo && (
            <div className="mb-6 flex justify-center">
              <img
                src={data.photo}
                alt={data.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Contacto</h3>
            <div className="space-y-3 text-xs">
              {data.contact?.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-all">{data.contact.email}</span>
                </div>
              )}
              {data.contact?.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{data.contact.phone}</span>
                </div>
              )}
              {data.contact?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{data.contact.address}</span>
                </div>
              )}
              {data.contact?.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-all">{data.contact.website}</span>
                </div>
              )}
              {data.contact?.linkedin && (
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="break-all">{data.contact.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">{t.skillsTitle}</h3>
              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-xs">
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Idiomas</h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <div className="font-semibold">{lang.name}</div>
                    {lang.level && <div className="opacity-90">{lang.level}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 min-h-[297mm]">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">{data.name}</h1>
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: data.theme.primaryColor }}
            >
              {data.title}
            </h2>
          </div>

          {/* About */}
          {data.about && (
            <div className="mb-6">
              <h3
                className="text-base font-bold mb-2 uppercase tracking-wide"
                style={{ color: data.theme.primaryColor }}
              >
                {t.aboutTitle}
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.about}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-base font-bold mb-3 uppercase tracking-wide"
                style={{ color: data.theme.primaryColor }}
              >
                {t.experienceTitle}
              </h3>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm">{exp.position}</h4>
                    <span className="text-xs text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                  {exp.description && (
                    <p className="text-xs text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-base font-bold mb-3 uppercase tracking-wide"
                style={{ color: data.theme.primaryColor }}
              >
                {t.projectsTitle}
              </h3>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h4 className="font-semibold text-sm mb-1">{project.name}</h4>
                  <p className="text-xs text-gray-700 mb-2 whitespace-pre-wrap">{project.description}</p>
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 rounded border"
                          style={{ borderColor: data.theme.primaryColor, color: data.theme.primaryColor }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-base font-bold mb-3 uppercase tracking-wide"
                style={{ color: data.theme.primaryColor }}
              >
                {t.educationTitle}
              </h3>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <h4 className="font-semibold text-sm">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-xs text-gray-700 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  )
}
