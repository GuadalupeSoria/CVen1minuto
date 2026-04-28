import React, { createContext, useState, useContext, useEffect } from 'react'
import { AIService } from '../services/AIService'

interface Project {
  id: string
  name: string
  description: string
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  skills?: string[]
}

interface Experience {
  id: string
  company: string
  position: string
  duration: string
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  description?: string
  skills?: string[]
}

interface Education {
  id: string
  institution: string
  degree: string
  startMonth?: string
  startYear?: string
  endMonth?: string
  endYear?: string
  description?: string
}

interface Contact {
  email: string
  phone: string
  linkedin: string
  address?: string
  website?: string
}

interface Theme {
  primaryColor: string
}

type CVTemplate = 'original' | 'modern' | 'classic' | 'executive'

export type DiffSection = 'about' | 'title' | 'skills'

export interface PendingOptimization {
  // Valores nuevos sugeridos
  optimizedAbout: string
  suggestedTitle: string
  suggestedSkills: string[]
  skillsToReplace?: string[]
  experienceHighlights: string[]
  projectRecommendations: string[]
  atsKeywords: string[]
  // Valores originales (para revertir)
  originalAbout: string
  originalTitle: string
  originalSkills: string[]
  // Qué secciones siguen pendientes de aceptar/rechazar
  pendingSections: DiffSection[]
}

interface PortfolioData {
  name: string
  title: string
  about: string
  photo: string
  showPhoto?: boolean
  language?: string
  template?: CVTemplate
  languages?: { id: string; name: string; level?: string }[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  skills: string[]
  contact: Contact
  theme: Theme
}

interface PortfolioContextType {
  portfolioData: PortfolioData
  updatePortfolioData: (data: Partial<PortfolioData>) => void
  setLanguage: (lang: string) => void
  setTemplate: (template: CVTemplate) => void
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (education: Omit<Education, 'id'>) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addLanguage: (language: { name: string; level?: string }) => void
  updateLanguage: (id: string, language: Partial<{ name: string; level?: string }>) => void
  removeLanguage: (id: string) => void
  reorderProjects: (fromIndex: number, toIndex: number) => void
  reorderExperiences: (fromIndex: number, toIndex: number) => void
  reorderLanguages: (fromIndex: number, toIndex: number) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
  importFromPDF: (file: File) => Promise<void>
  importFromImage: (file: File) => Promise<void>
  // Sistema de diff / optimizaciones pendientes
  pendingOptimization: PendingOptimization | null
  setPendingOptimization: (opt: PendingOptimization | null) => void
  acceptSection: (section: DiffSection) => void
  rejectSection: (section: DiffSection) => void
  acceptAllPending: () => void
  rejectAllPending: () => void
}

export type { CVTemplate }

const defaultPortfolioData: PortfolioData = {
  name: 'Tu Nombre Apellido',
  title: 'Desarrollador Full Stack',
  about: 'Profesional orientado a resultados con experiencia en desarrollo web, colaboración con equipos multidisciplinarios y mejora continua de productos digitales. Me enfoco en construir interfaces claras, accesibles y de alto rendimiento, cuidando la calidad del código y la experiencia de usuario de punta a punta. Disfruto traducir objetivos de negocio en soluciones técnicas escalables, documentadas y mantenibles, aportando proactividad, comunicación efectiva y capacidad de adaptación en entornos dinámicos.',
  photo: '',
  showPhoto: true,
  template: 'original',
  projects: [
    {
      id: '1',
      name: 'Plataforma de Gestión Comercial',
      description: 'Desarrollo de una aplicación web para seguimiento de clientes, pipeline de ventas y generación de reportes. Se optimizó la carga inicial y se mejoró la trazabilidad de operaciones para el equipo comercial.',
      startMonth: 'Mar',
      startYear: '2024',
      endMonth: 'Dic',
      endYear: '2024',
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
    }
  ],
  experience: [
    {
      id: '1',
      company: 'TechNova Solutions',
      position: 'Desarrollador Frontend',
      startMonth: 'Ene',
      startYear: '2023',
      endMonth: 'Actualidad',
      endYear: '',
      duration: 'Ene 2023 - Actualidad',
      description: 'Implementación de nuevas funcionalidades en productos SaaS, refactorización de componentes críticos y mejora de métricas Core Web Vitals. Coordinación con diseño y backend para entregar releases quincenales con foco en estabilidad.'
    },
    {
      id: '2',
      company: 'Digital Factory Lab',
      position: 'Desarrollador Web Jr',
      startMonth: 'Jun',
      startYear: '2021',
      endMonth: 'Dic',
      endYear: '2022',
      duration: 'Jun 2021 - Dic 2022',
      description: 'Mantenimiento evolutivo de sitios corporativos y e-commerce, integración de APIs de terceros y resolución de incidencias productivas. Participación en pruebas funcionales y automatización de tareas de despliegue.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Universidad Tecnológica Nacional',
      degree: 'Tecnicatura Universitaria en Programación',
      startMonth: 'Mar',
      startYear: '2019',
      endMonth: 'Dic',
      endYear: '2021',
      description: 'Formación en estructuras de datos, bases de datos, desarrollo de software y buenas prácticas de ingeniería.'
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'HTML', 'CSS', 'Git'],
  contact: {
    email: 'tu@email.com',
    phone: '+1234567890',
    linkedin: ''
  },
  languages: [],
  theme: {
    primaryColor: '#3B82F6',
  },
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    try {
      const savedData = localStorage.getItem('portfolioData')
      const base = savedData ? { ...defaultPortfolioData, ...JSON.parse(savedData) } : defaultPortfolioData
      // Si la foto fue guardada en clave separada (fallback por quota), restituirla
      if (!base.photo) {
        const savedPhoto = localStorage.getItem('portfolioPhoto')
        if (savedPhoto) base.photo = savedPhoto
      }
      return base
    } catch {
      return defaultPortfolioData
    }
  })
  const [pendingOptimization, setPendingOptimization] = useState<PendingOptimization | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
      // Si antes había foto separada y ahora entra en el main, borrarla
      if (portfolioData.photo) localStorage.removeItem('portfolioPhoto')
    } catch (e) {
      if ((e as DOMException).name === 'QuotaExceededError') {
        // Guardar sin foto en el main key, foto en clave separada
        try {
          const { photo, ...rest } = portfolioData
          localStorage.setItem('portfolioData', JSON.stringify({ ...rest, photo: '' }))
          if (photo) {
            try {
              localStorage.setItem('portfolioPhoto', photo)
            } catch {
              // Si hasta la clave de foto falla, avisamos pero no crasheamos
              console.warn('localStorage lleno: foto no guardada')
            }
          }
        } catch {
          console.warn('localStorage quota exceeded, datos no guardados')
        }
      }
    }
  }, [portfolioData])

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      ...data,
      contact: { ...prevData.contact, ...(data.contact || {}) },
      theme: { ...prevData.theme, ...(data.theme || {}) }
    }))
  }

  const setLanguage = async (lang: string) => {
    const currentLang = portfolioData.language;
    
    // If changing language, translate content
    if (currentLang !== lang && (currentLang === 'es' || currentLang === 'en') && (lang === 'es' || lang === 'en')) {
      try {
        const translatedData = await AIService.translateCV(portfolioData, lang as 'es' | 'en');
        setPortfolioData(prev => ({ ...prev, ...translatedData, language: lang }));
      } catch (error) {
        console.error('Translation error:', error);
        // If translation fails, just change language without translating
        setPortfolioData(prev => ({ ...prev, language: lang }));
      }
    } else {
      setPortfolioData(prev => ({ ...prev, language: lang }));
    }
  }

  const setTemplate = (template: CVTemplate) => {
    setPortfolioData(prev => ({ ...prev, template }))
  }

  const addProject = (project: Omit<Project, 'id'>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      projects: [...prevData.projects, { ...project, id: Date.now().toString() }]
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      projects: prevData.projects.map(p => p.id === id ? { ...p, ...project } : p)
    }))
  }

  const removeProject = (id: string) => {
    setPortfolioData(prevData => ({
      ...prevData,
      projects: prevData.projects.filter(p => p.id !== id)
    }))
  }

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      experience: [...prevData.experience, { ...experience, id: Date.now().toString() }]
    }))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      experience: prevData.experience.map(e => e.id === id ? { ...e, ...experience } : e)
    }))
  }

  const removeExperience = (id: string) => {
    setPortfolioData(prevData => ({
      ...prevData,
      experience: prevData.experience.filter(e => e.id !== id)
    }))
  }

  const addEducation = (education: Omit<Education, 'id'>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      education: [...(prevData.education || []), { ...education, id: Date.now().toString() }]
    }))
  }

  const addLanguage = (language: { name: string; level?: string }) => {
    setPortfolioData(prevData => ({
      ...prevData,
      languages: [...(prevData.languages || []), { ...language, id: Date.now().toString() }]
    }))
  }

  const updateLanguage = (id: string, language: Partial<{ name: string; level?: string }>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      languages: (prevData.languages || []).map(l => l.id === id ? { ...l, ...language } : l)
    }))
  }

  const removeLanguage = (id: string) => {
    setPortfolioData(prevData => ({
      ...prevData,
      languages: (prevData.languages || []).filter(l => l.id !== id)
    }))
  }

  const reorderProjects = (fromIndex: number, toIndex: number) => {
    setPortfolioData(prev => {
      const arr = [...prev.projects]
      const [item] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, item)
      return { ...prev, projects: arr }
    })
  }

  const reorderExperiences = (fromIndex: number, toIndex: number) => {
    setPortfolioData(prev => {
      const arr = [...prev.experience]
      const [item] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, item)
      return { ...prev, experience: arr }
    })
  }

  const reorderLanguages = (fromIndex: number, toIndex: number) => {
    setPortfolioData(prev => {
      const arr = [...(prev.languages || [])]
      const [item] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, item)
      return { ...prev, languages: arr }
    })
  }

  const updateEducation = (id: string, education: Partial<Education>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      education: (prevData.education || []).map(ed => ed.id === id ? { ...ed, ...education } : ed)
    }))
  }

  const removeEducation = (id: string) => {
    setPortfolioData(prevData => ({
      ...prevData,
      education: (prevData.education || []).filter(ed => ed.id !== id)
    }))
  }

  const addSkill = (skill: string) => {
    setPortfolioData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, skill]
    }))
  }

  const removeSkill = (skill: string) => {
    setPortfolioData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(s => s !== skill)
    }))
  }

  // ── Diff / Optimizaciones pendientes ──────────────────────────────────────
  const acceptSection = (section: DiffSection) => {
    if (!pendingOptimization) return
    setPortfolioData(prev => {
      if (section === 'about') return { ...prev, about: pendingOptimization.optimizedAbout }
      if (section === 'title') return { ...prev, title: pendingOptimization.suggestedTitle }
      if (section === 'skills') {
        const merged = [...prev.skills, ...pendingOptimization.suggestedSkills.filter(s => !prev.skills.includes(s))]
        return { ...prev, skills: merged }
      }
      return prev
    })
    setPendingOptimization(prev => {
      if (!prev) return null
      const remaining = prev.pendingSections.filter(s => s !== section)
      return remaining.length === 0 ? null : { ...prev, pendingSections: remaining }
    })
  }

  const rejectSection = (section: DiffSection) => {
    if (!pendingOptimization) return
    setPendingOptimization(prev => {
      if (!prev) return null
      const remaining = prev.pendingSections.filter(s => s !== section)
      return remaining.length === 0 ? null : { ...prev, pendingSections: remaining }
    })
  }

  const acceptAllPending = () => {
    if (!pendingOptimization) return
    setPortfolioData(prev => {
      const updated = { ...prev }
      if (pendingOptimization.pendingSections.includes('about'))
        updated.about = pendingOptimization.optimizedAbout
      if (pendingOptimization.pendingSections.includes('title'))
        updated.title = pendingOptimization.suggestedTitle
      if (pendingOptimization.pendingSections.includes('skills')) {
        updated.skills = [...prev.skills, ...pendingOptimization.suggestedSkills.filter(s => !prev.skills.includes(s))]
      }
      return updated
    })
    setPendingOptimization(null)
  }

  const rejectAllPending = () => setPendingOptimization(null)

  const applyParsedCV = (parsedData: ParsedCVData) => {
    const updatedData: Partial<PortfolioData> = {}
    if (parsedData.name) updatedData.name = parsedData.name
    if (parsedData.title) updatedData.title = parsedData.title
    if (parsedData.about) updatedData.about = parsedData.about
    if (parsedData.skills && parsedData.skills.length > 0) updatedData.skills = parsedData.skills
    if (parsedData.email || parsedData.phone || parsedData.linkedin || parsedData.address || parsedData.website) {
      updatedData.contact = {
        ...portfolioData.contact,
        ...(parsedData.email && { email: parsedData.email }),
        ...(parsedData.phone && { phone: parsedData.phone }),
        ...(parsedData.linkedin && { linkedin: parsedData.linkedin }),
        ...(parsedData.address && { address: parsedData.address }),
        ...(parsedData.website && { website: parsedData.website }),
      }
    }
    if (parsedData.experience && parsedData.experience.length > 0) {
      updatedData.experience = parsedData.experience.map(exp => ({ ...exp, id: Date.now().toString() + Math.random() }))
    }
    if (parsedData.education && parsedData.education.length > 0) {
      updatedData.education = parsedData.education.map(edu => ({ ...edu, id: Date.now().toString() + Math.random(), duration: edu.duration || '' }))
    }
    if (parsedData.projects && parsedData.projects.length > 0) {
      updatedData.projects = parsedData.projects.map(proj => ({ ...proj, id: Date.now().toString() + Math.random() }))
    }
    if (parsedData.languages && parsedData.languages.length > 0) {
      updatedData.languages = parsedData.languages.map(lang => ({ ...lang, id: Date.now().toString() + Math.random() }))
    }
    updatePortfolioData(updatedData)
  }

  const importFromImage = async (file: File) => {
    try {
      const language = portfolioData.language === 'en' ? 'en' : 'es'
      const parsedData = await AIService.importCVFromImage(file, language)
      applyParsedCV(parsedData)
    } catch (error) {
      console.error('Error importing from image:', error)
      throw error
    }
  }

  const importFromPDF = async (file: File) => {
    try {
      const language = portfolioData.language === 'en' ? 'en' : 'es'
      const parsedData = await AIService.importCVFromPDF(file, language)
      applyParsedCV(parsedData)
    } catch (error) {
      console.error('Error importing PDF:', error)
      throw error
    }
  }

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updatePortfolioData,
      setLanguage,
      setTemplate,
      addProject,
      updateProject,
      removeProject,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addLanguage,
      updateLanguage,
      removeLanguage,
      reorderProjects,
      reorderExperiences,
      reorderLanguages,
      addSkill,
      removeSkill,
      importFromPDF,
      importFromImage,
      pendingOptimization,
      setPendingOptimization,
      acceptSection,
      rejectSection,
      acceptAllPending,
      rejectAllPending,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}