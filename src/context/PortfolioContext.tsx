import React, { createContext, useState, useContext, useEffect } from 'react'

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

interface PortfolioData {
  name: string
  title: string
  about: string
  photo: string
  showPhoto?: boolean
  language?: string
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
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
}

const defaultPortfolioData: PortfolioData = {
  name: 'Tu Nombre',
  title: 'Desarrollador Web',
  about: 'Escribe una breve descripción sobre ti...',
  photo: '',
  showPhoto: true,
  projects: [{ id: '1', name: 'Proyecto 1', description: 'Descripción del proyecto 1', skills: ['JavaScript', 'React'] }],
  experience: [{ id: '1', company: 'Empresa', position: 'Cargo', duration: '2020 - Presente' }],
  education: [],
  skills: ['JavaScript', 'React', 'TypeScript'],
  contact: {
    email: 'tu@email.com',
    phone: '+1234567890',
    linkedin: 'https://linkedin.com/in/tu-perfil'
  },
  languages: [],
  theme: {
    primaryColor: '#3B82F6',
  },
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const savedData = localStorage.getItem('portfolioData')
    return savedData ? { ...defaultPortfolioData, ...JSON.parse(savedData) } : defaultPortfolioData
  })

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData))
  }, [portfolioData])

  const updatePortfolioData = (data: Partial<PortfolioData>) => {
    setPortfolioData(prevData => ({
      ...prevData,
      ...data,
      contact: { ...prevData.contact, ...(data.contact || {}) },
      theme: { ...prevData.theme, ...(data.theme || {}) }
    }))
  }

  const setLanguage = (lang: string) => {
    setPortfolioData(prev => ({ ...prev, language: lang }))
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

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      updatePortfolioData,
      setLanguage,
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
      addSkill,
      removeSkill
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