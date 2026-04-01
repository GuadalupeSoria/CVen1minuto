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
  highlightSections?: string[]
}

// All measurements in px assuming 794px wide (210mm at 96dpi)
const S = {
  page: {
    width: '210mm',
    padding: '15mm',
    boxSizing: 'border-box' as const,
    fontFamily: 'Arial, Helvetica, sans-serif',
    backgroundColor: '#ffffff',
  } as React.CSSProperties,

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #E5E7EB',
  } as React.CSSProperties,

  name: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 3px',
    lineHeight: 1.2,
  } as React.CSSProperties,

  titleText: {
    fontSize: '14px',
    color: '#6B7280',
    margin: '0 0 10px',
    fontWeight: 500,
  } as React.CSSProperties,

  contactRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0',
  } as React.CSSProperties,

  contactItem: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: '4px',
    marginRight: '12px',
    marginBottom: '4px',
    minHeight: '12px',
  } as React.CSSProperties,

  contactIconBox: {
    width: '11px',
    height: '11px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as React.CSSProperties,

  contactText: {
    display: 'block',
    fontSize: '10px',
    color: '#6B7280',
    lineHeight: 1.1,
  } as React.CSSProperties,

  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  } as React.CSSProperties,

  sectionTitle: (color: string): React.CSSProperties => ({
    fontSize: '13px',
    fontWeight: 700,
    color: color,
    margin: '0 0 8px',
    paddingBottom: '4px',
    borderBottom: `2px solid ${color}`,
  }),

  sectionWrap: (extra?: React.CSSProperties): React.CSSProperties => ({
    marginBottom: '14px',
    pageBreakInside: 'avoid' as const,
    ...extra,
  }),

  expItem: (color: string): React.CSSProperties => ({
    borderLeft: `2px solid ${color}`,
    paddingLeft: '10px',
    marginBottom: '10px',
    pageBreakInside: 'avoid' as const,
  }),

  expPosition: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 2px',
  } as React.CSSProperties,

  expCompany: {
    fontSize: '11px',
    color: '#6B7280',
    margin: '0 0 2px',
  } as React.CSSProperties,

  expDate: {
    fontSize: '10px',
    color: '#9CA3AF',
    margin: '0 0 4px',
  } as React.CSSProperties,

  expDesc: {
    fontSize: '11px',
    color: '#374151',
    margin: '0',
    lineHeight: 1.5,
    whiteSpace: 'pre-wrap' as const,
  } as React.CSSProperties,

  bodyText: {
    fontSize: '11px',
    color: '#374151',
    lineHeight: 1.6,
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
  } as React.CSSProperties,

  card: {
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '6px',
    padding: '10px',
    marginBottom: '8px',
    pageBreakInside: 'avoid' as const,
  } as React.CSSProperties,

  plainItem: {
    marginBottom: '10px',
    pageBreakInside: 'avoid' as const,
  } as React.CSSProperties,

  cardTitle: {
    fontSize: '12px',
    fontWeight: 700,
    color: '#111827',
    margin: '0 0 3px',
  } as React.CSSProperties,

  cardSub: {
    fontSize: '11px',
    color: '#6B7280',
    margin: '0 0 2px',
  } as React.CSSProperties,

  cardDate: {
    fontSize: '10px',
    color: '#9CA3AF',
    margin: '0 0 5px',
  } as React.CSSProperties,

  skillsWrap: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '5px',
    marginTop: '6px',
  } as React.CSSProperties,

  skillBadge: (color: string): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '18px',
    padding: '0 8px',
    borderRadius: '9999px',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: 1,
    backgroundColor: `${color}18`,
    color: color,
  }),

  hlStyle: {
    outline: '2px solid rgba(16,185,129,0.45)',
    outlineOffset: '2px',
    borderRadius: '4px',
  } as React.CSSProperties,
}

const iconSvgStyle: React.CSSProperties = {
  display: 'block',
  width: '11px',
  height: '11px',
  flexShrink: 0,
  verticalAlign: 'middle',
}

function formatDateRange(item: any): string {
  const start = [item.startMonth, item.startYear].filter(Boolean).join(' ')
  const end = [item.endMonth, item.endYear].filter(Boolean).join(' ')
  if (start || end) return `${start}${start && end ? ' - ' : ''}${end}`
  if (item.duration) return item.duration
  return ''
}

export const OriginalTemplate: React.FC<OriginalTemplateProps> = ({ data, t, highlightSections = [] }) => {
  const color = data.theme.primaryColor

  const validProjects = data.projects?.filter(
    p => (p.name && p.name.trim()) || (p.description && p.description.trim()) || (p.skills && p.skills.length > 0)
  ) || []

  const projectsCount = validProjects.length
  const experiencesCount = data.experience?.length || 0

  const shouldMoveEdAndSkills = projectsCount >= 2 && experiencesCount < 3
  const shouldMoveSkillsOnly = experiencesCount >= 4

  return (
    <div style={S.page}>
      {/* ── Header ── */}
      <div style={S.header}>
        {data.showPhoto && data.photo && (
          <img
            src={data.photo}
            alt={data.name}
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={S.name}>{data.name}</h1>
          <h2 style={{ ...S.titleText, color }}>{data.title}</h2>
          <div style={S.contactRow}>
            {data.contact?.email && (
              <span style={S.contactItem}>
                <span style={S.contactIconBox}>
                  <Mail size={11} style={{ ...iconSvgStyle, color: '#9CA3AF' }} />
                </span>
                <span style={S.contactText}>{data.contact.email}</span>
              </span>
            )}
            {data.contact?.phone && (
              <span style={S.contactItem}>
                <span style={S.contactIconBox}>
                  <Phone size={11} style={{ ...iconSvgStyle, color: '#9CA3AF' }} />
                </span>
                <span style={S.contactText}>{data.contact.phone}</span>
              </span>
            )}
            {data.contact?.address && (
              <span style={S.contactItem}>
                <span style={S.contactIconBox}>
                  <MapPin size={11} style={{ ...iconSvgStyle, color: '#9CA3AF' }} />
                </span>
                <span style={S.contactText}>{data.contact.address}</span>
              </span>
            )}
            {data.contact?.website && (
              <span style={S.contactItem}>
                <span style={S.contactIconBox}>
                  <Globe size={11} style={{ ...iconSvgStyle, color: '#9CA3AF' }} />
                </span>
                <span style={S.contactText}>{data.contact.website}</span>
              </span>
            )}
            {data.contact?.linkedin && (
              <span style={S.contactItem}>
                <span style={S.contactIconBox}>
                  <Globe size={11} style={{ ...iconSvgStyle, color: '#9CA3AF' }} />
                </span>
                <span style={S.contactText}>{data.contact.linkedin}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Two columns ── */}
      <div style={S.columns}>
        {/* LEFT */}
        <div>
          {/* About */}
          {data.about && (
            <div style={S.sectionWrap(highlightSections.includes('about') ? S.hlStyle : {})}>
              <h3 style={S.sectionTitle(color)}>{t.aboutTitle}</h3>
              <p style={S.bodyText}>{data.about}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div style={S.sectionWrap()}>
              <h3 style={S.sectionTitle(color)}>{t.experienceTitle}</h3>
              {data.experience.map((exp) => (
                <div key={exp.id} style={S.expItem(color)}>
                  <p style={S.expPosition}>{exp.position}</p>
                  <p style={S.expCompany}>{exp.company}</p>
                  {formatDateRange(exp) && <p style={S.expDate}>{formatDateRange(exp)}</p>}
                  {exp.description && <p style={S.expDesc}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education (left when shouldMoveEdAndSkills) */}
          {shouldMoveEdAndSkills && data.education && data.education.length > 0 && (
            <div style={S.sectionWrap()}>
              <h3 style={S.sectionTitle(color)}>{t.educationTitle}</h3>
              {data.education.map((ed) => (
                <div key={ed.id} style={S.plainItem}>
                  <p style={S.cardTitle}>{ed.institution}</p>
                  <p style={S.cardSub}>{ed.degree}</p>
                  {formatDateRange(ed) && <p style={S.cardDate}>{formatDateRange(ed)}</p>}
                  {ed.description && <p style={{ ...S.bodyText, fontSize: '10px' }}>{ed.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills (left when shouldMoveEdAndSkills or shouldMoveSkillsOnly) */}
          {(shouldMoveEdAndSkills || shouldMoveSkillsOnly) && data.skills && data.skills.length > 0 && (
            <div style={S.sectionWrap(highlightSections.includes('skills') ? S.hlStyle : {})}>
              <h3 style={S.sectionTitle(color)}>{t.skillsTitle}</h3>
              <div style={S.skillsWrap}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={S.skillBadge(color)}>{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div>
          {/* Projects */}
          {validProjects.length > 0 && (
            <div style={S.sectionWrap()}>
              <h3 style={S.sectionTitle(color)}>{t.projectsTitle}</h3>
              {validProjects.map((project) => (
                <div key={project.id} style={S.plainItem}>
                  <p style={S.cardTitle}>{project.name}</p>
                  {formatDateRange(project) && <p style={S.cardDate}>{formatDateRange(project)}</p>}
                  {project.description && <p style={S.bodyText}>{project.description}</p>}
                  {project.skills && project.skills.length > 0 && (
                    <div style={S.skillsWrap}>
                      {project.skills.map((s: string, i: number) => (
                        <span key={i} style={{ ...S.skillBadge(color), backgroundColor: '#F3F4F6', color }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education (right when NOT moved to left) */}
          {!shouldMoveEdAndSkills && data.education && data.education.length > 0 && (
            <div style={S.sectionWrap()}>
              <h3 style={S.sectionTitle(color)}>{t.educationTitle}</h3>
              {data.education.map((ed) => (
                <div key={ed.id} style={S.plainItem}>
                  <p style={S.cardTitle}>{ed.institution}</p>
                  <p style={S.cardSub}>{ed.degree}</p>
                  {formatDateRange(ed) && <p style={S.cardDate}>{formatDateRange(ed)}</p>}
                  {ed.description && <p style={{ ...S.bodyText, fontSize: '10px' }}>{ed.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills (right when NOT moved to left) */}
          {!shouldMoveEdAndSkills && !shouldMoveSkillsOnly && data.skills && data.skills.length > 0 && (
            <div style={S.sectionWrap(highlightSections.includes('skills') ? S.hlStyle : {})}>
              <h3 style={S.sectionTitle(color)}>{t.skillsTitle}</h3>
              <div style={S.skillsWrap}>
                {data.skills.map((skill, i) => (
                  <span key={i} style={S.skillBadge(color)}>{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div style={S.sectionWrap()}>
              <h3 style={S.sectionTitle(color)}>{t.languagesTitle || 'Idiomas'}</h3>
              {data.languages.map((l) => (
                <div key={l.id} style={{ marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>{l.name}</span>
                  {l.level && <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '6px' }}>{l.level}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
