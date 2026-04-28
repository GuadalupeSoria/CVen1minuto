/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

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

interface ExecutiveTemplateProps {
  data: PortfolioData
  t: any
  highlightSections?: string[]
}

const highlightStyle: React.CSSProperties = {
  outline: '2px solid rgba(16, 185, 129, 0.45)',
  outlineOffset: '2px',
  borderRadius: '4px',
}

const formatDuration = (item: any): string => {
  const start = [item.startMonth, item.startYear].filter(Boolean).join(' ')
  const end = item.endMonth
    ? [item.endMonth, item.endYear].filter(Boolean).join(' ')
    : ''
  if (start || end) return start && end ? `${start} – ${end}` : start || end
  return item.duration || ''
}

export const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, t, highlightSections = [] }) => {
  const color = data.theme.primaryColor

  const sectionTitle = (text: string): React.CSSProperties => ({
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: color,
    marginBottom: '10px',
    marginTop: '0',
  })

  const divider: React.CSSProperties = {
    borderTop: `1.5px solid ${color}`,
    marginBottom: '10px',
  }

  return (
    <div style={{ backgroundColor: '#fff', width: '210mm', fontFamily: "'Georgia', serif", boxSizing: 'border-box' }}>

      {/* Top header bar */}
      <div style={{ backgroundColor: color, padding: '14mm 14mm 10mm', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        {data.showPhoto && data.photo && (
          <img
            src={data.photo}
            alt={data.name}
            style={{ width: '72px', height: '72px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(255,255,255,0.4)' }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', margin: '0 0 3px', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            {data.name}
          </h1>
          <h2 style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.02em' }}>
            {data.title}
          </h2>
        </div>
      </div>

      {/* Contact strip */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '5px 14mm', display: 'flex', flexWrap: 'wrap', gap: '0 20px' }}>
        {[
          data.contact?.email,
          data.contact?.phone,
          data.contact?.address,
          data.contact?.linkedin,
          data.contact?.website,
        ].filter(Boolean).map((val, i) => (
          <span key={i} style={{ fontSize: '9.5px', color: '#4B5563', lineHeight: '24px', whiteSpace: 'nowrap' }}>
            {val}
          </span>
        ))}
      </div>

      {/* Body: main left + sidebar right */}
      <div style={{ display: 'flex', padding: '10mm 0' }}>

        {/* Main content */}
        <div style={{ flex: 1, padding: '0 8mm 0 14mm' }}>

          {/* About */}
          {data.about && (
            <div style={{ marginBottom: '14px', ...(highlightSections.includes('about') ? highlightStyle : {}) }}>
              <h3 style={sectionTitle('')}>{t.aboutTitle}</h3>
              <div style={divider} />
              <p style={{ fontSize: '11px', color: '#374151', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}>
                {data.about}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h3 style={sectionTitle('')}>{t.experienceTitle}</h3>
              <div style={divider} />
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px', pageBreakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1px' }}>
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#111827', fontFamily: 'Arial, sans-serif' }}>{exp.position}</span>
                    <span style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap', fontFamily: 'Arial, sans-serif' }}>{formatDuration(exp)}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: color, margin: '0 0 4px', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>{exp.company}</p>
                  {exp.description && (
                    <p style={{ fontSize: '11px', color: '#374151', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}>
                      {exp.description}
                    </p>
                  )}
                  {exp.skills && exp.skills.length > 0 && (
                    <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {exp.skills.map((skill: string, idx: number) => (
                        <span key={idx} style={{ fontSize: '9.5px', color: color, border: `1px solid ${color}`, borderRadius: '2px', padding: '1px 6px', fontFamily: 'Arial, sans-serif' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div style={{ marginBottom: '14px' }}>
              <h3 style={sectionTitle('')}>{t.projectsTitle}</h3>
              <div style={divider} />
              {data.projects.map((project) => (
                <div key={project.id} style={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
                  <p style={{ fontWeight: 700, fontSize: '12px', color: '#111827', margin: '0 0 2px', fontFamily: 'Arial, sans-serif' }}>{project.name}</p>
                  <p style={{ fontSize: '11px', color: '#374151', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}>{project.description}</p>
                  {project.skills && project.skills.length > 0 && (
                    <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {project.skills.map((skill: string, idx: number) => (
                        <span key={idx} style={{ fontSize: '9.5px', color: color, border: `1px solid ${color}`, borderRadius: '2px', padding: '1px 6px', fontFamily: 'Arial, sans-serif' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: '62mm', padding: '0 14mm 0 0', flexShrink: 0 }}>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div style={{ marginBottom: '16px', ...(highlightSections.includes('education') ? highlightStyle : {}) }}>
              <h3 style={sectionTitle('')}>{t.educationTitle}</h3>
              <div style={divider} />
              {data.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: 700, fontSize: '11px', color: '#111827', margin: 0, fontFamily: 'Arial, sans-serif' }}>{edu.degree}</p>
                  <p style={{ fontSize: '10.5px', color: color, margin: '1px 0 0', fontStyle: 'italic', fontFamily: 'Arial, sans-serif' }}>{edu.institution}</p>
                  {edu.year && <p style={{ fontSize: '10px', color: '#9CA3AF', margin: '1px 0 0', fontFamily: 'Arial, sans-serif' }}>{edu.year}</p>}
                  {edu.description && <p style={{ fontSize: '10px', color: '#6B7280', margin: '3px 0 0', lineHeight: 1.5, fontFamily: 'Arial, sans-serif' }}>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div style={{ marginBottom: '16px', ...(highlightSections.includes('skills') ? highlightStyle : {}) }}>
              <h3 style={sectionTitle('')}>{t.skillsTitle}</h3>
              <div style={divider} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {data.skills.map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: '#374151', fontFamily: 'Arial, sans-serif' }}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <h3 style={sectionTitle('')}>{t.languagesTitle || 'Idiomas'}</h3>
              <div style={divider} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: 'Arial, sans-serif' }}>{lang.name}</p>
                    {lang.level && <p style={{ fontSize: '10px', color: '#6B7280', margin: '1px 0 0', fontFamily: 'Arial, sans-serif' }}>{lang.level}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
