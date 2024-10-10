import React, { useState, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Plus, X, Upload } from 'lucide-react'

const Editor: React.FC = () => {
  const {
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
  } = usePortfolio()

  const [newProject, setNewProject] = useState({ name: '', description: '' })
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '' })
  const [newSkill, setNewSkill] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      addProject(newProject)
      setNewProject({ name: '', description: '' })
    }
  }

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position && newExperience.duration) {
      addExperience(newExperience)
      setNewExperience({ company: '', position: '', duration: '' })
    }
  }

  const handleAddSkill = () => {
    if (newSkill) {
      addSkill(newSkill)
      setNewSkill('')
    }
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePortfolioData({ photo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full md:w-1/2 p-4 bg-white shadow-md overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Portafolio</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            value={portfolioData.name}
            onChange={(e) => updatePortfolioData({ name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            value={portfolioData.title}
            onChange={(e) => updatePortfolioData({ title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">Acerca de mí</label>
          <textarea
            id="about"
            value={portfolioData.about}
            onChange={(e) => updatePortfolioData({ about: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Foto de perfil</label>
          <div className="mt-1 flex items-center">
            {portfolioData.photo ? (
              <img src={portfolioData.photo} alt="Foto de perfil" className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Upload className="text-gray-400" />
              </div>
            )}
            <input
              type="file"
              id="photo"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Subir foto
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Proyectos</h3>
          {portfolioData.projects.map((project, index) => (
            <div key={project.id} className="mb-2 p-2 border rounded">
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(project.id, { name: e.target.value })}
                className="block w-full mb-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                className="block w-full mb-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Nombre del proyecto"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleAddProject}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Experiencia</h3>
          {portfolioData.experience.map((exp, index) => (
            <div key={exp.id} className="mb-2 p-2 border rounded">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                className="block w-full mb-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                className="block w-full mb-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateExperience(exp.id, { duration: e.target.value })}
                className="block w-full mb-1 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Empresa"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Cargo"
              value={newExperience.position}
              onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
              className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Duración"
              value={newExperience.duration}
              onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
              className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleAddExperience}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Habilidades</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {portfolioData.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Nueva habilidad"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow mr-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Contacto</h3>
          <input
            type="email"
            placeholder="Email"
            value={portfolioData.contact.email}
            onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, email: e.target.value } })}
            className="block w-full mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={portfolioData.contact.phone}
            onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, phone: e.target.value } })}
            className="block w-full mb-2 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <input
            type="url"
            placeholder="LinkedIn"
            value={portfolioData.contact.linkedin}
            onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, linkedin: e.target.value } })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Tema</h3>
          <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Color principal</label>
          <input
            type="color"
            id="primaryColor"
            value={portfolioData.theme.primaryColor}
            onChange={(e) => updatePortfolioData({ theme: { ...portfolioData.theme, primaryColor: e.target.value } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </form>
    </div>
  )
}

export default Editor