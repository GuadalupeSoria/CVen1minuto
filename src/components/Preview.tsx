import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'

const Preview: React.FC = () => {
  const { portfolioData } = usePortfolio()

  return (
    <div className="w-full md:w-1/2 p-4 bg-gray-50 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Vista Previa</h2>
      <div className="preview-content bg-white p-6 rounded-lg shadow-md" style={{ color: portfolioData.theme.primaryColor }}>
        <div className="flex items-center mb-4">
          {portfolioData.photo && (
            <img src={portfolioData.photo} alt={portfolioData.name} className="w-24 h-24 rounded-full mr-4 object-cover" />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{portfolioData.name}</h1>
            <h2 className="text-xl text-gray-600">{portfolioData.title}</h2>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Acerca de mí</h3>
          <p>{portfolioData.about}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Proyectos</h3>
          <ul className="list-disc list-inside">
            {portfolioData.projects.map((project) => (
              <li key={project.id}>
                <strong>{project.name}</strong> - {project.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Experiencia</h3>
          <ul className="space-y-2">
            {portfolioData.experience.map((exp) => (
              <li key={exp.id}>
                <strong>{exp.company}</strong> - {exp.position}
                <br />
                <span className="text-sm text-gray-600">{exp.duration}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Contacto</h3>
          <p>Email: {portfolioData.contact.email}</p>
          <p>Teléfono: {portfolioData.contact.phone}</p>
          <p>LinkedIn: <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{portfolioData.contact.linkedin}</a></p>
        </div>
      </div>
    </div>
  )
}

export default Preview