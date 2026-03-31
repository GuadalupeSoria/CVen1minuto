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
  highlightSections?: string[]
}

const highlightStyle: React.CSSProperties = {
  outline: '2px solid rgba(16, 185, 129, 0.45)',
  outlineOffset: '2px',
  borderRadius: '4px',
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, t, highlightSections = [] }) => {
  const color = data.theme.primaryColor

  const sidebarIconStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    verticalAlign: 'middle',
    flexShrink: 0,
  }

  const sidebarItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
  }

  return (
    <div style={{ backgroundColor: '#fff', display: 'flex', width: '210mm', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Sidebar */}
      <div
        style={{
          width: '33%',
          backgroundColor: color,
          padding: '20mm 8mm',
          boxSizing: 'border-box',
          color: '#fff',
          flexShrink: 0,
        }}
      >
        {/* Photo */}
        {data.showPhoto && data.photo && (
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <img
              src={data.photo}
              alt={data.name}
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.6)' }}
            />
          </div>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fff' }}>
            Contacto
          </h3>
          <div>
            {data.contact?.email && (
              <div style={sidebarItemStyle}>
                <Mail size={12} style={{ ...sidebarIconStyle, color: 'rgba(255,255,255,0.85)' }} />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', wordBreak: 'break-all', lineHeight: '14px' }}>{data.contact.email}</span>
              </div>
            )}
            {data.contact?.phone && (
              <div style={sidebarItemStyle}>
                <Phone size={12} style={{ ...sidebarIconStyle, color: 'rgba(255,255,255,0.85)' }} />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', lineHeight: '14px' }}>{data.contact.phone}</span>
              </div>
            )}
            {data.contact?.address && (
              <div style={sidebarItemStyle}>
                <MapPin size={12} style={{ ...sidebarIconStyle, color: 'rgba(255,255,255,0.85)' }} />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', lineHeight: '14px', wordBreak: 'break-word' }}>{data.contact.address}</span>
              </div>
            )}
            {data.contact?.website && (
              <div style={sidebarItemStyle}>
                <Globe size={12} style={{ ...sidebarIconStyle, color: 'rgba(255,255,255,0.85)' }} />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', wordBreak: 'break-all', lineHeight: '14px' }}>{data.contact.website}</span>
              </div>
            )}
            {data.contact?.linkedin && (
              <div style={sidebarItemStyle}>
                <Globe size={12} style={{ ...sidebarIconStyle, color: 'rgba(255,255,255,0.85)' }} />
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)', wordBreak: 'break-all', lineHeight: '14px' }}>{data.contact.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div style={{ marginBottom: '20px', ...(highlightSections.includes('skills') ? { outline: '2px solid rgba(255,255,255,0.6)', outlineOffset: '2px', borderRadius: '4px' } : {}) }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fff' }}>
              {t.skillsTitle}
            </h3>
            <div>
              {data.skills.map((skill, index) => (
                <div key={index} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.6)', flexShrink: 0, display: 'inline-block' }} />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#fff' }}>
              {t.languagesTitle || 'Idiomas'}
            </h3>
            <div>
              {data.languages.map((lang) => (
                <div key={lang.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#fff' }}>{lang.name}</div>
                  {lang.level && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>{lang.level}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ flex: 1, padding: '20mm 12mm', boxSizing: 'border-box' }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 4px', lineHeight: 1.2 }}>{data.name}</h1>
          <h2 style={{ fontSize: '17px', fontWeight: 600, color: color, margin: '0 0 0' }}>{data.title}</h2>
        </div>

        {/* About */}
        {data.about && (
          <div style={{ marginBottom: '18px', ...(highlightSections.includes('about') ? highlightStyle : {}) }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              {t.aboutTitle}
            </h3>
            <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>{data.about}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {t.experienceTitle}
            </h3>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                  <p style={{ fontWeight: 600, fontSize: '12px', color: '#111827', margin: 0 }}>{exp.position}</p>
                  <span style={{ fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.duration}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px' }}>{exp.company}</p>
                {exp.description && (
                  <p style={{ fontSize: '11px', color: '#374151', whiteSpace: 'pre-wrap', margin: 0 }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {t.projectsTitle}
            </h3>
            {data.projects.map((project) => (
              <div key={project.id} style={{ marginBottom: '12px' }}>
                <p style={{ fontWeight: 600, fontSize: '12px', color: '#111827', margin: '0 0 3px' }}>{project.name}</p>
                <p style={{ fontSize: '11px', color: '#374151', whiteSpace: 'pre-wrap', margin: '0 0 5px' }}>{project.description}</p>
                {project.skills && project.skills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {project.skills.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          backgroundColor: `${color}15`,
                          color: color,
                        }}
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
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 700, color: color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {t.educationTitle}
            </h3>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <p style={{ fontWeight: 600, fontSize: '12px', color: '#111827', margin: 0 }}>{edu.degree}</p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>{edu.institution}</p>
                {edu.description && <p style={{ fontSize: '11px', color: '#374151', marginTop: '3px' }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
