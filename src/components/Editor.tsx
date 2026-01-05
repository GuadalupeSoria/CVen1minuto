import React, { useState, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Plus, X, Upload, Phone, MapPin, Mail, Globe, Edit3, Sparkles, ChevronLeft, ChevronRight, FileUp } from 'lucide-react'
import AIOptimizer from './AIOptimizer'
import PDFImporter from './PDFImporter'

type TranslationsShape = {
  editorTitle: string
  tabs: Record<string, string>
  changePhoto: string
  includePhoto: string
  addProject: string
  addExperience: string
  addEducation: string
  addSkill: string
  newProjectSkillPlaceholder: string
  previewTitle?: string

  
  personal_photoLabel: string
  personal_noPhoto: string
  personal_nameLabel: string
  personal_titleLabel: string
  personal_aboutLabel: string
  personal_colorLabel: string

  
  project_namePlaceholder: string
  project_descriptionPlaceholder: string
  project_monthStartPlaceholder: string
  project_yearStartPlaceholder: string
  project_monthEndPlaceholder: string
  project_yearEndPlaceholder: string
  project_addSkillPlaceholder: string
  project_newNamePlaceholder: string

  
  exp_companyPlaceholder: string
  exp_positionPlaceholder: string
  exp_monthStartPlaceholder: string
  exp_yearStartPlaceholder: string
  exp_monthEndPlaceholder: string
  exp_yearEndPlaceholder: string
  exp_descriptionPlaceholder: string

  
  skills_newPlaceholder: string

  
  edu_institutionPlaceholder: string
  edu_degreePlaceholder: string
  edu_monthStartPlaceholder: string
  edu_yearStartPlaceholder: string
  edu_monthEndPlaceholder: string
  edu_yearEndPlaceholder: string
  edu_descriptionPlaceholder: string
  
  contact_phoneLabel: string
  contact_addressLabel: string
  contact_emailLabel: string
  contact_websiteLabel: string
  
  languages_title: string
  language_namePlaceholder: string
  language_levelPlaceholder: string
  addLanguage: string
}

const translations: Record<string, TranslationsShape> = {
  es: {
    editorTitle: 'Editor',
    tabs: {
        personal: 'Personal',
        contact: 'Contacto',
        projects: 'Proyectos',
        experience: 'Experiencia',
        education: 'Educación',
        skills: 'Habilidades',
        languages: 'Idiomas'
    },
    changePhoto: 'Cambiar foto',
    includePhoto: 'Incluir foto',
    addProject: 'Agregar proyecto',
    addExperience: 'Agregar experiencia',
    addEducation: 'Agregar educación',
    addSkill: 'Agregar habilidad',
    newProjectSkillPlaceholder: 'Skill para el nuevo proyecto',
    previewTitle: 'Vista previa',

    personal_photoLabel: 'Foto de perfil',
    personal_noPhoto: 'Sin foto',
    personal_nameLabel: 'Nombre',
    personal_titleLabel: 'Título',
    personal_aboutLabel: 'Acerca de mí',
    personal_colorLabel: 'Color principal',

    project_namePlaceholder: 'Nombre del proyecto',
    project_descriptionPlaceholder: 'Descripción',
    project_monthStartPlaceholder: 'Mes inicio (ej: Ene)',
    project_yearStartPlaceholder: 'Año inicio (ej: 2023)',
    project_monthEndPlaceholder: 'Mes fin',
    project_yearEndPlaceholder: 'Año fin',
    project_addSkillPlaceholder: 'Agregar skill al proyecto',
    project_newNamePlaceholder: 'Nombre del nuevo proyecto',

    exp_companyPlaceholder: 'Empresa',
    exp_positionPlaceholder: 'Cargo',
    exp_monthStartPlaceholder: 'Mes inicio',
    exp_yearStartPlaceholder: 'Año inicio',
    exp_monthEndPlaceholder: 'Mes fin',
    exp_yearEndPlaceholder: 'Año fin',
    exp_descriptionPlaceholder: 'Descripción de la experiencia',

    skills_newPlaceholder: 'Nueva habilidad',

    edu_institutionPlaceholder: 'Institución',
    edu_degreePlaceholder: 'Título / Grado',
    edu_monthStartPlaceholder: 'Mes inicio',
    edu_yearStartPlaceholder: 'Año inicio',
    edu_monthEndPlaceholder: 'Mes fin',
    edu_yearEndPlaceholder: 'Año fin',
    edu_descriptionPlaceholder: 'Descripción / detalles',
    
    contact_phoneLabel: 'Teléfono',
    contact_addressLabel: 'Dirección',
    contact_emailLabel: 'Correo',
    contact_websiteLabel: 'Sitio web',
    
    languages_title: 'Idiomas',
    language_namePlaceholder: 'Idioma (ej: Español)',
    language_levelPlaceholder: 'Nivel (ej: Nativo)',
    addLanguage: '+',
  },
  en: {
    editorTitle: 'Editor',
    tabs: {
        personal: 'Personal',
        contact: 'Contact',
        projects: 'Projects',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        languages: 'Languages'
    },
    changePhoto: 'Change photo',
    includePhoto: 'Include photo',
    addProject: 'Add project',
    addExperience: 'Add experience',
    addEducation: 'Add education',
    addSkill: 'Add skill',
    newProjectSkillPlaceholder: 'Skill for new project',
    previewTitle: 'Preview',

    personal_photoLabel: 'Profile photo',
    personal_noPhoto: 'No photo',
    personal_nameLabel: 'Name',
    personal_titleLabel: 'Title',
    personal_aboutLabel: 'About me',
    personal_colorLabel: 'Primary color',
    
    contact_phoneLabel: 'Phone',
    contact_addressLabel: 'Address',
    contact_emailLabel: 'Email',
    contact_websiteLabel: 'Website',
    
    languages_title: 'Languages',
    language_namePlaceholder: 'Language (eg: Spanish)',
    language_levelPlaceholder: 'Level (eg: Native)',
    addLanguage: '+',

    project_namePlaceholder: 'Project name',
    project_descriptionPlaceholder: 'Description',
    project_monthStartPlaceholder: 'Start month (eg: Jan)',
    project_yearStartPlaceholder: 'Start year (eg: 2023)',
    project_monthEndPlaceholder: 'End month',
    project_yearEndPlaceholder: 'End year',
    project_addSkillPlaceholder: 'Add skill to project',
    project_newNamePlaceholder: 'New project name',

    exp_companyPlaceholder: 'Company',
    exp_positionPlaceholder: 'Position',
    exp_monthStartPlaceholder: 'Start month',
    exp_yearStartPlaceholder: 'Start year',
    exp_monthEndPlaceholder: 'End month',
    exp_yearEndPlaceholder: 'End year',
    exp_descriptionPlaceholder: 'Experience description',

    skills_newPlaceholder: 'New skill',

    edu_institutionPlaceholder: 'Institution',
    edu_degreePlaceholder: 'Degree',
    edu_monthStartPlaceholder: 'Start month',
    edu_yearStartPlaceholder: 'Start year',
    edu_monthEndPlaceholder: 'End month',
    edu_yearEndPlaceholder: 'End year',
    edu_descriptionPlaceholder: 'Description / details',
  }
}

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
    addEducation,
    updateEducation,
    removeEducation,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addSkill,
    removeSkill,
    setLanguage,
    importFromPDF
  } = usePortfolio()


  const lang = (portfolioData.language as string) || 'es'
  const t = translations[lang] || translations.es

  const [viewMode, setViewMode] = useState<'editor' | 'optimizer'>('editor')
  const [activeTab, setActiveTab] = useState('personal')
  const [newProject, setNewProject] = useState({ name: '', description: '', startMonth: '', startYear: '', endMonth: '', endYear: '', skills: [] as string[] })
  const [newProjectSkill, setNewProjectSkill] = useState('')
  const [projectSkillInputs, setProjectSkillInputs] = useState<Record<string, string>>({})

  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })
  const [newSkill, setNewSkill] = useState('')
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const [newLangName, setNewLangName] = useState('')
  const [newLangLevel, setNewLangLevel] = useState('')
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [showPDFImporter, setShowPDFImporter] = useState(false)

  const checkScrollButtons = () => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsScrollRef.current) {
      const scrollAmount = 200
      tabsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  React.useEffect(() => {
    checkScrollButtons()
    const handleScroll = () => checkScrollButtons()
    const ref = tabsScrollRef.current
    ref?.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkScrollButtons)
    
    return () => {
      ref?.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkScrollButtons)
    }
  }, [viewMode])

  const handleAddProject = () => {
    addProject(newProject)
    setNewProject({ name: '', description: '', startMonth: '', startYear: '', endMonth: '', endYear: '', skills: [] })
    setNewProjectSkill('')
  }

  const handleAddExperience = () => {
    if (newExperience.company || newExperience.position) {
      addExperience(newExperience)
      setNewExperience({ company: '', position: '', duration: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })
    }
  }

  const handleAddSkill = () => {
    if (newSkill) {
      addSkill(newSkill)
      setNewSkill('')
    }
  }

  const handleAddProjectSkill = () => {
    if (!newProjectSkill) return
    setNewProject(prev => ({ ...prev, skills: [...(prev.skills || []), newProjectSkill] }))
    setNewProjectSkill('')
  }

  const handleAddSkillToProject = (projectId: string) => {
    const val = projectSkillInputs[projectId]
    if (!val) return
    const proj = portfolioData.projects.find(p => p.id === projectId)
    const updatedSkills = [...(proj?.skills || []), val]
    updateProject(projectId, { skills: updatedSkills })
    setProjectSkillInputs(prev => ({ ...prev, [projectId]: '' }))
  }

  const handleAddEducation = () => {
    if (newEducation.institution || newEducation.degree) {
      addEducation(newEducation)
      setNewEducation({ institution: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })
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

  const handlePDFImport = async (file: File) => {
    await importFromPDF(file);
  }

  return (
    <div className="w-full bg-white overflow-y-auto h-full">
      {/* Toggle between Editor and AI Optimizer */}
      <div className="p-3 md:p-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white sticky top-0 z-10 shadow-xl">
        {/* Logo and Language selector at top */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img src="/assets/logonew.png" alt="CV ATS" className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-lg" />
            
          </div>
          <select
            value={lang}
            onChange={(e) => setLanguage?.(e.target.value)}
            className="bg-slate-700 text-white px-3 py-2 rounded-xl border border-slate-600 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-md hover:bg-slate-600 cursor-pointer"
            aria-label="Seleccionar idioma"
          >
            <option value="es">🇪🇸 ES</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>

        {/* Import CV Button */}
        <div className="mb-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl p-3">
          <p className="text-sm text-emerald-100 mb-2 font-medium">
            {lang === 'es' ? '¿Ya tenés un CV creado?' : 'Do you already have a CV?'}
          </p>
          <button
            onClick={() => setShowPDFImporter(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/30"
          >
            <FileUp size={18} />
            {lang === 'es' ? 'Importar desde PDF' : 'Import from PDF'}
          </button>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setViewMode('editor')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-[1.02] ${
              viewMode === 'editor'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            <Edit3 size={16} />
            Editor
          </button>
          <button
            onClick={() => setViewMode('optimizer')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all transform hover:scale-[1.02] ${
              viewMode === 'optimizer'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            <Sparkles size={16} />
            Optimizador IA
          </button>
        </div>

        {/* Show editor controls only when in editor mode */}
        {viewMode === 'editor' && (
          <div className="relative group">
            {/* Left Arrow - Desktop only */}
            {showLeftArrow && (
              <button
                onClick={() => scrollTabs('left')}
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/90 backdrop-blur-sm p-1.5 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-700"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} className="text-white" />
              </button>
            )}
            
            {/* Right Arrow - Desktop only */}
            {showRightArrow && (
              <button
                onClick={() => scrollTabs('right')}
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-slate-800/90 backdrop-blur-sm p-1.5 rounded-l-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-700"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} className="text-white" />
              </button>
            )}
            
            <div ref={tabsScrollRef} className="overflow-x-auto -mx-2 px-2 pb-2 custom-scrollbar">
              <div className="flex gap-2 whitespace-nowrap">
                {['personal', 'contact', 'projects', 'experience', 'education', 'skills', 'languages'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`min-w-max px-3 py-2 rounded-lg text-xs font-medium transition-all transform hover:scale-105 ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-md ring-2 ring-blue-400/50' 
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {t.tabs[tab]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-6">
        {viewMode === 'optimizer' ? (
          <AIOptimizer />
        ) : (
          <>
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.personal_photoLabel}</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {portfolioData.showPhoto ? (
                    portfolioData.photo ? (
                      <img src={portfolioData.photo} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <Upload className="text-gray-400" size={24} />
                      </div>
                    )
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">{t.personal_noPhoto}</div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    {t.changePhoto}
                  </button>

                  <label className="flex items-center gap-3 text-sm cursor-pointer group">
                    <div className="relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        checked={!!portfolioData.showPhoto}
                        onChange={(e) => updatePortfolioData({ showPhoto: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 shadow-inner"></div>
                    </div>
                    <span className="group-hover:text-blue-600 transition-colors">{t.includePhoto}</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal_nameLabel}</label>
              <input
                type="text"
                value={portfolioData.name}
                onChange={(e) => updatePortfolioData({ name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal_titleLabel}</label>
              <input
                type="text"
                value={portfolioData.title}
                onChange={(e) => updatePortfolioData({ title: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{t.personal_aboutLabel}</label>
              <textarea
                value={portfolioData.about}
                onChange={(e) => updatePortfolioData({ about: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:border-gray-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.personal_colorLabel}</label>
              <input
                type="color"
                value={portfolioData.theme.primaryColor}
                onChange={(e) => updatePortfolioData({ theme: { ...portfolioData.theme, primaryColor: e.target.value } })}
                className="color-picker"
                aria-label={t.personal_colorLabel}
              />
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium text-gray-700">{t.tabs.contact}</label>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder={t.contact_emailLabel}
                  value={portfolioData.contact.email}
                  onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, email: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center gap-2">
                <Phone size={18} />
                <input
                  type="text"
                  placeholder={t.contact_phoneLabel}
                  value={portfolioData.contact.phone}
                  onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, phone: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <input
                  type="text"
                  placeholder={t.contact_addressLabel}
                  value={portfolioData.contact.address || ''}
                  onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, address: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex items-center gap-2">
                <Globe size={18} />
                <input
                  type="text"
                  placeholder={t.contact_websiteLabel}
                  value={portfolioData.contact.website || ''}
                  onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, website: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="flex items-center gap-2">
                <Globe size={18} />
                <input
                  type="text"
                  placeholder="LinkedIn"
                  value={portfolioData.contact.linkedin || ''}
                  onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, linkedin: e.target.value } })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            {portfolioData.projects.map((project) => (
              <div key={project.id} className="p-3 border rounded-md relative group">
                <button
                  onClick={() => removeProject(project.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded-md"
                  placeholder={t.project_namePlaceholder}
                />

                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder={t.project_descriptionPlaceholder}
                  rows={2}
                />

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    value={project.startMonth || ''}
                    onChange={(e) => updateProject(project.id, { startMonth: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.project_monthStartPlaceholder}
                  />
                  <input
                    type="text"
                    value={project.startYear || ''}
                    onChange={(e) => updateProject(project.id, { startYear: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.project_yearStartPlaceholder}
                  />
                  <input
                    type="text"
                    value={project.endMonth || ''}
                    onChange={(e) => updateProject(project.id, { endMonth: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.project_monthEndPlaceholder}
                  />
                  <input
                    type="text"
                    value={project.endYear || ''}
                    onChange={(e) => updateProject(project.id, { endYear: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.project_yearEndPlaceholder}
                  />
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(project.skills || []).map((s, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
                        {s}
                        <button
                          onClick={() => updateProject(project.id, { skills: (project.skills || []).filter(x => x !== s) })}
                          className="text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t.project_addSkillPlaceholder}
                      value={projectSkillInputs[project.id] || ''}
                      onChange={(e) => setProjectSkillInputs(prev => ({ ...prev, [project.id]: e.target.value }))}
                      className="flex-grow px-3 py-2 border rounded-md"
                    />
                    <button
                      onClick={() => handleAddSkillToProject(project.id)}
                      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="space-y-2">
              <input
                type="text"
                placeholder={t.project_newNamePlaceholder}
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                placeholder={t.project_descriptionPlaceholder}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t.project_monthStartPlaceholder}
                  value={newProject.startMonth}
                  onChange={(e) => setNewProject({ ...newProject, startMonth: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.project_yearStartPlaceholder}
                  value={newProject.startYear}
                  onChange={(e) => setNewProject({ ...newProject, startYear: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.project_monthEndPlaceholder}
                  value={newProject.endMonth}
                  onChange={(e) => setNewProject({ ...newProject, endMonth: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.project_yearEndPlaceholder}
                  value={newProject.endYear}
                  onChange={(e) => setNewProject({ ...newProject, endYear: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills del proyecto</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(newProject.skills || []).map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2">
                      {s}
                      <button
                        onClick={() => setNewProject(prev => ({ ...prev, skills: (prev.skills || []).filter(x => x !== s) }))}
                        className="text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={t.newProjectSkillPlaceholder}
                    value={newProjectSkill}
                    onChange={(e) => setNewProjectSkill(e.target.value)}
                    className="flex-grow px-3 py-2 border rounded-md"
                  />
                  <button
                    onClick={handleAddProjectSkill}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAddProject}
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {t.addProject}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-4">
            {portfolioData.experience.map((exp) => (
              <div key={exp.id} className="p-3 border rounded-md relative group">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded-md"
                  placeholder={t.exp_companyPlaceholder}
                />
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded-md"
                  placeholder={t.exp_positionPlaceholder}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.startMonth || ''}
                    onChange={(e) => updateExperience(exp.id, { startMonth: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.exp_monthStartPlaceholder}
                  />
                  <input
                    type="text"
                    value={exp.startYear || ''}
                    onChange={(e) => updateExperience(exp.id, { startYear: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.exp_yearStartPlaceholder}
                  />
                  <input
                    type="text"
                    value={exp.endMonth || ''}
                    onChange={(e) => updateExperience(exp.id, { endMonth: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.exp_monthEndPlaceholder}
                  />
                  <input
                    type="text"
                    value={exp.endYear || ''}
                    onChange={(e) => updateExperience(exp.id, { endYear: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.exp_yearEndPlaceholder}
                  />
                </div>
                <textarea
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  className="w-full mt-2 px-3 py-2 border rounded-md"
                  placeholder={t.exp_descriptionPlaceholder}
                  rows={2}
                />
              </div>
            ))}

            <div className="space-y-2">
              <input
                type="text"
                placeholder={t.exp_companyPlaceholder}
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder={t.exp_positionPlaceholder}
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t.exp_monthStartPlaceholder}
                  value={newExperience.startMonth}
                  onChange={(e) => setNewExperience({ ...newExperience, startMonth: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.exp_yearStartPlaceholder}
                  value={newExperience.startYear}
                  onChange={(e) => setNewExperience({ ...newExperience, startYear: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.exp_monthEndPlaceholder}
                  value={newExperience.endMonth}
                  onChange={(e) => setNewExperience({ ...newExperience, endMonth: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.exp_yearEndPlaceholder}
                  value={newExperience.endYear}
                  onChange={(e) => setNewExperience({ ...newExperience, endYear: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              <textarea
                placeholder={t.exp_descriptionPlaceholder}
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddExperience}
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {t.addExperience}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2 group"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={t.skills_newPlaceholder}
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-md"
              />
              <button
                onClick={handleAddSkill}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 gap-3">
                {(portfolioData.languages || []).map((langItem) => (
                  <div key={langItem.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <Globe size={20} className="text-blue-500 mt-2" />
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={langItem.name}
                          onChange={(e) => updateLanguage(langItem.id, { name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                          placeholder={t.language_namePlaceholder}
                        />
                        <select
                          value={langItem.level || ''}
                          onChange={(e) => updateLanguage(langItem.id, { level: e.target.value })}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm cursor-pointer"
                        >
                          <option value="">{lang === 'es' ? 'Seleccionar nivel...' : 'Select level...'}</option>
                          <option value={lang === 'es' ? 'Nativo' : 'Native'}>{lang === 'es' ? 'Nativo' : 'Native'}</option>
                          <option value={lang === 'es' ? 'Avanzado' : 'Advanced'}>{lang === 'es' ? 'Avanzado' : 'Advanced'}</option>
                          <option value={lang === 'es' ? 'Intermedio' : 'Intermediate'}>{lang === 'es' ? 'Intermedio' : 'Intermediate'}</option>
                          <option value={lang === 'es' ? 'Básico' : 'Basic'}>{lang === 'es' ? 'Básico' : 'Basic'}</option>
                        </select>
                      </div>
                      <button 
                        onClick={() => removeLanguage(langItem.id)} 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-dashed border-blue-300">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={t.language_namePlaceholder}
                    value={newLangName}
                    onChange={(e) => setNewLangName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                  />
                  <select
                    value={newLangLevel}
                    onChange={(e) => setNewLangLevel(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="">{lang === 'es' ? 'Seleccionar nivel...' : 'Select level...'}</option>
                    <option value={lang === 'es' ? 'Nativo' : 'Native'}>{lang === 'es' ? 'Nativo' : 'Native'}</option>
                    <option value={lang === 'es' ? 'Avanzado' : 'Advanced'}>{lang === 'es' ? 'Avanzado' : 'Advanced'}</option>
                    <option value={lang === 'es' ? 'Intermedio' : 'Intermediate'}>{lang === 'es' ? 'Intermedio' : 'Intermediate'}</option>
                    <option value={lang === 'es' ? 'Básico' : 'Basic'}>{lang === 'es' ? 'Básico' : 'Basic'}</option>
                  </select>
                  <button
                    onClick={() => {
                      if (!newLangName) return
                      addLanguage({ name: newLangName, level: newLangLevel })
                      setNewLangName('')
                      setNewLangLevel('')
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    <Plus size={18} />
                    {t.addLanguage === '+' ? (lang === 'es' ? 'Agregar idioma' : 'Add language') : t.addLanguage}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-4">
            
            {portfolioData.education && portfolioData.education.map((ed) => (
              <div key={ed.id} className="p-3 border rounded-md relative group">
                <button
                  onClick={() => removeEducation(ed.id)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
                <input
                  type="text"
                  value={ed.institution}
                  onChange={(e) => updateEducation(ed.id, { institution: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded-md"
                  placeholder={t.edu_institutionPlaceholder}
                />
                <input
                  type="text"
                  value={ed.degree}
                  onChange={(e) => updateEducation(ed.id, { degree: e.target.value })}
                  className="w-full mb-2 px-3 py-2 border rounded-md"
                  placeholder={t.edu_degreePlaceholder}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={ed.startMonth || ''}
                    onChange={(e) => updateEducation(ed.id, { startMonth: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.edu_monthStartPlaceholder}
                  />
                  <input
                    type="text"
                    value={ed.startYear || ''}
                    onChange={(e) => updateEducation(ed.id, { startYear: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.edu_yearStartPlaceholder}
                  />
                  <input
                    type="text"
                    value={ed.endMonth || ''}
                    onChange={(e) => updateEducation(ed.id, { endMonth: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.edu_monthEndPlaceholder}
                  />
                  <input
                    type="text"
                    value={ed.endYear || ''}
                    onChange={(e) => updateEducation(ed.id, { endYear: e.target.value })}
                    className="px-3 py-2 border rounded-md"
                    placeholder={t.edu_yearEndPlaceholder}
                  />
                </div>
                <textarea
                  value={ed.description || ''}
                  onChange={(e) => updateEducation(ed.id, { description: e.target.value })}
                  className="w-full mt-2 px-3 py-2 border rounded-md"
                  placeholder={t.edu_descriptionPlaceholder}
                  rows={2}
                />
              </div>
            ))}

            <div className="space-y-2">
              <input
                type="text"
                placeholder={t.edu_institutionPlaceholder}
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                placeholder={t.edu_degreePlaceholder}
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t.edu_monthStartPlaceholder}
                  value={newEducation.startMonth}
                  onChange={(e) => setNewEducation({ ...newEducation, startMonth: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.edu_yearStartPlaceholder}
                  value={newEducation.startYear}
                  onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.edu_monthEndPlaceholder}
                  value={newEducation.endMonth}
                  onChange={(e) => setNewEducation({ ...newEducation, endMonth: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder={t.edu_yearEndPlaceholder}
                  value={newEducation.endYear}
                  onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              <textarea
                placeholder={t.edu_descriptionPlaceholder}
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddEducation}
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {t.addEducation}
                </button>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>

      {/* PDF Importer Modal */}
      <PDFImporter
        isOpen={showPDFImporter}
        onClose={() => setShowPDFImporter(false)}
        onImport={handlePDFImport}
        language={lang}
      />
    </div>
  )
}

export default Editor