import React, { createContext, useState, useContext, useEffect } from 'react'

interface Project {
  id: string
  name: string
  description: string
}

interface Experience {
  id: string
  company: string
  position: string
  duration: string
}

interface Contact {
  email: string
  phone: string
  linkedin: string
}

interface Theme {
  primaryColor: string
}

interface PortfolioData {
  name: string
  title: string
  about: string
  photo: string
  projects: Project[]
  experience: Experience[]
  skills: string[]
  contact: Contact
  theme: Theme
}

interface PortfolioContextType {
  portfolioData: PortfolioData
  updatePortfolioData: (data: Partial<PortfolioData>) => void
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: string) => void
  removeSkill: (skill: string) => void
}

const defaultPortfolioData: PortfolioData = {
  name: 'Tu Nombre',
  title: 'Desarrollador Web',
  about: 'Escribe una breve descripción sobre ti...',
  photo: '',
  projects: [{ id: '1', name: 'Proyecto 1', description: 'Descripción del proyecto 1' }],
  experience: [{ id: '1', company: 'Empresa', position: 'Cargo', duration: '2020 - Presente' }],
  skills: ['JavaScript', 'React', 'TypeScript'],
  contact: {
    email: 'tu@email.com',
    phone: '+1234567890',
    linkedin: 'https://linkedin.com/in/tu-perfil'
  },
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
      addProject,
      updateProject,
      removeProject,
      addExperience,
      updateExperience,
      removeExperience,
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