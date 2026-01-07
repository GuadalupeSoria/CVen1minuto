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

interface ModernTemplateProps {
  data: PortfolioData
  t: any
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, t }) => {
  return (
    <div className="bg-white" style={{ width: '210mm', minHeight: '297mm', padding: '15mm', boxSizing: 'border-box' }}>
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        {data.showPhoto && data.photo && (
          <div className="flex-shrink-0">
            <img
              src={data.photo}
              alt={data.name}
              className="w-24 h-24 rounded-full object-cover border-4"
              style={{ borderColor: data.theme.primaryColor }}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1 className="text-3xl font-bold break-words leading-tight" style={{ margin: 0 }}>{data.name}</h1>
            <h2 className="text-xl text-gray-600 break-words leading-tight" style={{ margin: 0, marginTop: '4px', marginBottom: '16px' }}>{data.title}</h2>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-700">
            {data.contact?.email && (
              <div className="flex items-center gap-1.5 min-w-0" style={{ alignItems: 'center' }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ display: 'block' }} />
                <span className="break-all" style={{ lineHeight: '16px' }}>{data.contact.email}</span>
              </div>
            )}
            {data.contact?.phone && (
              <div className="flex items-center gap-1.5 flex-shrink-0" style={{ alignItems: 'center' }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ display: 'block' }} />
                <span className="whitespace-nowrap" style={{ lineHeight: '16px' }}>{data.contact.phone}</span>
              </div>
            )}
            {data.contact?.address && (
              <div className="flex items-center gap-1.5 min-w-0" style={{ alignItems: 'center' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ display: 'block' }} />
                <span className="break-words" style={{ lineHeight: '16px' }}>{data.contact.address}</span>
              </div>
            )}
            {data.contact?.website && (
              <div className="flex items-center gap-1.5 min-w-0" style={{ alignItems: 'center' }}>
                <Globe className="w-4 h-4 flex-shrink-0" style={{ display: 'block' }} />
                <span className="break-all" style={{ lineHeight: '16px' }}>{data.contact.website}</span>
              </div>
            )}
            {data.contact?.linkedin && (
              <div className="flex items-center gap-1.5 min-w-0" style={{ alignItems: 'center' }}>
                <Globe className="w-4 h-4 flex-shrink-0" style={{ display: 'block' }} />
                <span className="break-all" style={{ lineHeight: '16px' }}>{data.contact.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      {data.about && (
        <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
          <h3
            className="text-lg font-bold mb-2 pb-1 border-b-2"
            style={{ borderColor: data.theme.primaryColor }}
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
            className="text-lg font-bold mb-2 pb-1 border-b-2"
            style={{ borderColor: data.theme.primaryColor }}
          >
            {t.experienceTitle}
          </h3>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm">{exp.position}</h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <span className="text-xs text-gray-500">{exp.duration}</span>
              </div>
              {exp.description && (
                <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h3
            className="text-lg font-bold mb-2 pb-1 border-b-2"
            style={{ borderColor: data.theme.primaryColor }}
          >
            {t.projectsTitle}
          </h3>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3" style={{ pageBreakInside: 'avoid' }}>
              <h4 className="font-semibold text-sm">{project.name}</h4>
              <p className="text-xs text-gray-700 whitespace-pre-wrap">{project.description}</p>
              {project.skills && project.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${data.theme.primaryColor}20`, color: data.theme.primaryColor }}
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
            className="text-lg font-bold mb-2 pb-1 border-b-2"
            style={{ borderColor: data.theme.primaryColor }}
          >
            {t.educationTitle}
          </h3>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2" style={{ pageBreakInside: 'avoid' }}>
              <h4 className="font-semibold text-sm">{edu.degree}</h4>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              {edu.description && (
                <p className="text-xs text-gray-700 mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
          <h3
            className="text-lg font-bold mb-2 pb-1 border-b-2"
            style={{ borderColor: data.theme.primaryColor }}
          >
            {t.skillsTitle}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 rounded-full"
                style={{ backgroundColor: `${data.theme.primaryColor}20`, color: data.theme.primaryColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mb-6" style={{ pageBreakInside: 'avoid' }}>
          <h3
            className="text-lg font-bold mb-2 pb-1 border-b-2"
            style={{ borderColor: data.theme.primaryColor }}
          >
            Idiomas
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.languages.map((lang) => (
              <div key={lang.id} className="text-sm">
                <span className="font-semibold">{lang.name}</span>
                {lang.level && <span className="text-gray-600"> - {lang.level}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
