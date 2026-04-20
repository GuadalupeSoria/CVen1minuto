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
  highlightSections?: string[]
}

const contactIconStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '12px',
  height: '12px',
  flexShrink: 0,
  verticalAlign: 'middle',
}

const contactItemStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  marginRight: '12px',
  marginBottom: '4px',
  verticalAlign: 'middle',
}

const contactTextStyle: React.CSSProperties = {
  fontSize: '10px',
  lineHeight: '12px',
  color: '#374151',
  verticalAlign: 'middle',
}

const skillBadgeStyle = (color: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3px 10px',
  borderRadius: '9999px',
  fontSize: '11px',
  fontWeight: 500,
  backgroundColor: `${color}20`,
  color: color,
  marginRight: '6px',
  marginBottom: '6px',
})

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
  if (start || end) return start && end ? `${start} - ${end}` : start || end
  return item.duration || ''
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, t, highlightSections = [] }) => {
  const color = data.theme.primaryColor
  return (
    <div className="bg-white" style={{ width: '210mm', padding: '15mm', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', marginBottom: '20px' }}>
        {data.showPhoto && data.photo && (
          <div style={{ flexShrink: 0 }}>
            <img
              src={data.photo}
              alt={data.name}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${color}` }}
            />
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.2 }}>{data.name}</h1>
          <h2 style={{ fontSize: '16px', color: '#6B7280', margin: '4px 0 12px', fontWeight: 500 }}>{data.title}</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            {data.contact?.email && (
              <span style={contactItemStyle}>
                <Mail size={12} style={contactIconStyle} color="#6B7280" />
                <span style={contactTextStyle}>{data.contact.email}</span>
              </span>
            )}
            {data.contact?.phone && (
              <span style={contactItemStyle}>
                <Phone size={12} style={contactIconStyle} color="#6B7280" />
                <span style={contactTextStyle}>{data.contact.phone}</span>
              </span>
            )}
            {data.contact?.address && (
              <span style={contactItemStyle}>
                <MapPin size={12} style={contactIconStyle} color="#6B7280" />
                <span style={contactTextStyle}>{data.contact.address}</span>
              </span>
            )}
            {data.contact?.website && (
              <span style={contactItemStyle}>
                <Globe size={12} style={contactIconStyle} color="#6B7280" />
                <span style={contactTextStyle}>{data.contact.website}</span>
              </span>
            )}
            {data.contact?.linkedin && (
              <span style={contactItemStyle}>
                <Globe size={12} style={contactIconStyle} color="#6B7280" />
                <span style={contactTextStyle}>{data.contact.linkedin}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* About */}
      {data.about && (
        <div style={{ marginBottom: '18px', pageBreakInside: 'avoid', ...(highlightSections.includes('about') ? highlightStyle : {}) }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', paddingBottom: '4px', borderBottom: `2px solid ${color}`, color: '#111827' }}>
            {t.aboutTitle}
          </h3>
          <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>{data.about}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', paddingBottom: '4px', borderBottom: `2px solid ${color}`, color: '#111827' }}>
            {t.experienceTitle}
          </h3>
          {data.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '12px', color: '#111827', margin: 0 }}>{exp.position}</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '1px 0 0' }}>{exp.company}</p>
                </div>
                <span style={{ fontSize: '11px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{formatDuration(exp)}</span>
              </div>
              {exp.description && (
                <p style={{ fontSize: '11px', color: '#374151', marginTop: '4px', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
              )}
              {exp.skills && exp.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '6px' }}>
                  {exp.skills.map((skill: string, idx: number) => (
                    <span key={idx} style={skillBadgeStyle(color)}>{skill}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', paddingBottom: '4px', borderBottom: `2px solid ${color}`, color: '#111827' }}>
            {t.projectsTitle}
          </h3>
          {data.projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '10px', pageBreakInside: 'avoid' }}>
              <p style={{ fontWeight: 600, fontSize: '12px', color: '#111827', margin: '0 0 3px' }}>{project.name}</p>
              <p style={{ fontSize: '11px', color: '#374151', whiteSpace: 'pre-wrap', margin: 0 }}>{project.description}</p>
              {project.skills && project.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '6px' }}>
                  {project.skills.map((skill: string, idx: number) => (
                    <span key={idx} style={skillBadgeStyle(color)}>{skill}</span>
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
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px', paddingBottom: '4px', borderBottom: `2px solid ${color}`, color: '#111827' }}>
            {t.educationTitle}
          </h3>
          {data.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', pageBreakInside: 'avoid' }}>
              <p style={{ fontWeight: 600, fontSize: '12px', color: '#111827', margin: 0 }}>{edu.degree}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '1px 0 0' }}>{edu.institution}</p>
              {edu.description && <p style={{ fontSize: '11px', color: '#374151', marginTop: '3px' }}>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div style={{ marginBottom: '18px', pageBreakInside: 'avoid', ...(highlightSections.includes('skills') ? highlightStyle : {}) }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${color}`, color: '#111827' }}>
            {t.skillsTitle}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data.skills.map((skill, index) => (
              <span key={index} style={skillBadgeStyle(color)}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <div style={{ marginBottom: '18px', pageBreakInside: 'avoid' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${color}`, color: '#111827' }}>
            {t.languagesTitle || 'Idiomas'}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {data.languages.map((lang) => (
              <div key={lang.id} style={{ fontSize: '12px', color: '#374151' }}>
                <span style={{ fontWeight: 600 }}>{lang.name}</span>
                {lang.level && <span style={{ color: '#6B7280' }}> - {lang.level}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
