import React, { useState, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { useAuth } from '../context/AuthContext'
import {
  Plus, X, Upload, Phone, MapPin, Mail, Globe,
  PenLine, Sparkles, ChevronLeft, ChevronRight, FileUp, User, Briefcase,
  GraduationCap, Code2, Languages, FolderGit2, AtSign,
  LogIn, Crown, GripVertical, Settings
} from 'lucide-react'
import AIOptimizer from './AIOptimizer'
import PDFImporter from './PDFImporter'
import { LoginModal } from './LoginModal'
import SettingsPanel from './SettingsPanel'
import subscriptionService from '../services/subscriptionService'

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
      education: 'Educacion',
      skills: 'Habilidades',
      languages: 'Idiomas'
    },
    changePhoto: 'Cambiar foto',
    includePhoto: 'Mostrar foto',
    addProject: 'Agregar proyecto',
    addExperience: 'Agregar experiencia',
    addEducation: 'Agregar educacion',
    addSkill: 'Agregar habilidad',
    newProjectSkillPlaceholder: 'Skill del proyecto',
    previewTitle: 'Vista previa',
    personal_photoLabel: 'Foto de perfil',
    personal_noPhoto: 'Sin foto',
    personal_nameLabel: 'Nombre',
    personal_titleLabel: 'Titulo profesional',
    personal_aboutLabel: 'Acerca de mi',
    personal_colorLabel: 'Color del CV',
    project_namePlaceholder: 'Nombre del proyecto',
    project_descriptionPlaceholder: 'Descripcion',
    project_monthStartPlaceholder: 'Mes inicio',
    project_yearStartPlaceholder: 'Ano inicio',
    project_monthEndPlaceholder: 'Mes fin',
    project_yearEndPlaceholder: 'Ano fin',
    project_addSkillPlaceholder: 'Agregar skill',
    project_newNamePlaceholder: 'Nombre del nuevo proyecto',
    exp_companyPlaceholder: 'Empresa',
    exp_positionPlaceholder: 'Cargo',
    exp_monthStartPlaceholder: 'Mes inicio',
    exp_yearStartPlaceholder: 'Ano inicio',
    exp_monthEndPlaceholder: 'Mes fin',
    exp_yearEndPlaceholder: 'Ano fin',
    exp_descriptionPlaceholder: 'Descripcion del rol',
    skills_newPlaceholder: 'Nueva habilidad',
    edu_institutionPlaceholder: 'Institucion',
    edu_degreePlaceholder: 'Titulo / Grado',
    edu_monthStartPlaceholder: 'Mes inicio',
    edu_yearStartPlaceholder: 'Ano inicio',
    edu_monthEndPlaceholder: 'Mes fin',
    edu_yearEndPlaceholder: 'Ano fin',
    edu_descriptionPlaceholder: 'Detalles adicionales',
    contact_phoneLabel: 'Telefono',
    contact_addressLabel: 'Direccion',
    contact_emailLabel: 'Correo electronico',
    contact_websiteLabel: 'Sitio web',
    languages_title: 'Idiomas',
    language_namePlaceholder: 'Idioma (ej: Espanol)',
    language_levelPlaceholder: 'Nivel (ej: Nativo)',
    addLanguage: 'Agregar idioma',
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
    includePhoto: 'Show photo',
    addProject: 'Add project',
    addExperience: 'Add experience',
    addEducation: 'Add education',
    addSkill: 'Add skill',
    newProjectSkillPlaceholder: 'Project skill',
    previewTitle: 'Preview',
    personal_photoLabel: 'Profile photo',
    personal_noPhoto: 'No photo',
    personal_nameLabel: 'Name',
    personal_titleLabel: 'Professional title',
    personal_aboutLabel: 'About me',
    personal_colorLabel: 'CV color',
    contact_phoneLabel: 'Phone',
    contact_addressLabel: 'Address',
    contact_emailLabel: 'Email',
    contact_websiteLabel: 'Website',
    languages_title: 'Languages',
    language_namePlaceholder: 'Language (eg: Spanish)',
    language_levelPlaceholder: 'Level (eg: Native)',
    addLanguage: 'Add language',
    project_namePlaceholder: 'Project name',
    project_descriptionPlaceholder: 'Description',
    project_monthStartPlaceholder: 'Start month',
    project_yearStartPlaceholder: 'Start year',
    project_monthEndPlaceholder: 'End month',
    project_yearEndPlaceholder: 'End year',
    project_addSkillPlaceholder: 'Add skill',
    project_newNamePlaceholder: 'New project name',
    exp_companyPlaceholder: 'Company',
    exp_positionPlaceholder: 'Position',
    exp_monthStartPlaceholder: 'Start month',
    exp_yearStartPlaceholder: 'Start year',
    exp_monthEndPlaceholder: 'End month',
    exp_yearEndPlaceholder: 'End year',
    exp_descriptionPlaceholder: 'Role description',
    skills_newPlaceholder: 'New skill',
    edu_institutionPlaceholder: 'Institution',
    edu_degreePlaceholder: 'Degree',
    edu_monthStartPlaceholder: 'Start month',
    edu_yearStartPlaceholder: 'Start year',
    edu_monthEndPlaceholder: 'End month',
    edu_yearEndPlaceholder: 'End year',
    edu_descriptionPlaceholder: 'Additional details',
  }
}

const inp = 'w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#3A3A3C] rounded-xl text-white text-sm placeholder:text-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all'
const sel = 'w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#3A3A3C] rounded-xl text-white text-sm focus:border-violet-500 focus:outline-none transition-colors cursor-pointer'

const DarkInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input {...props} className={`${inp} ${className ?? ''}`} />
)
const DarkTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...props }) => (
  <textarea {...props} className={`${inp} resize-none ${className ?? ''}`} />
)
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">{children}</label>
)
const SectionCard: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...rest }) => (
  <div {...rest} className={`bg-[#2C2C2E] border border-[#3A3A3C] rounded-2xl p-4 relative group animate-fade-up ${className}`}>{children}</div>
)

const tabIcons: Record<string, React.ReactNode> = {
  personal: <User size={13} />,
  contact: <AtSign size={13} />,
  projects: <FolderGit2 size={13} />,
  experience: <Briefcase size={13} />,
  education: <GraduationCap size={13} />,
  skills: <Code2 size={13} />,
  languages: <Languages size={13} />,
}

const Editor: React.FC = () => {
  const {
    portfolioData, updatePortfolioData,
    addProject, updateProject, removeProject, reorderProjects,
    addExperience, updateExperience, removeExperience, reorderExperiences,
    addEducation, updateEducation, removeEducation,
    addLanguage, updateLanguage, removeLanguage, reorderLanguages,
    addSkill, removeSkill, setLanguage, importFromPDF, importFromImage
  } = usePortfolio()

  const { user, isPremium, signOut } = useAuth()

  const lang = (portfolioData.language as string) || 'es'
  const t = translations[lang] || translations.es

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [viewMode, setViewMode] = useState<'editor' | 'optimizer'>('editor')
  const [activeTab, setActiveTab] = useState('personal')
  const [newProject, setNewProject] = useState({ name: '', description: '', startMonth: '', startYear: '', endMonth: '', endYear: '', skills: [] as string[] })
  const [newProjectSkill, setNewProjectSkill] = useState('')
  const [projectSkillInputs, setProjectSkillInputs] = useState<Record<string, string>>({})
  const [experienceSkillInputs, setExperienceSkillInputs] = useState<Record<string, string>>({})
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '', skills: [] as string[] })
  const [newExpSkill, setNewExpSkill] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const [newLangName, setNewLangName] = useState('')
  const [newLangLevel, setNewLangLevel] = useState('')
  const [newLangCustom, setNewLangCustom] = useState(false)
  const [customLevelIds, setCustomLevelIds] = useState<Set<string>>(new Set())
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [showPDFImporter, setShowPDFImporter] = useState(false)
  const dragRef = useRef<{ type: string; index: number } | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const checkScrollButtons = () => {
    if (tabsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsScrollRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }
  const scrollTabs = (d: 'left' | 'right') => {
    tabsScrollRef.current?.scrollBy({ left: d === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  React.useEffect(() => {
    checkScrollButtons()
    const ref = tabsScrollRef.current
    ref?.addEventListener('scroll', checkScrollButtons)
    window.addEventListener('resize', checkScrollButtons)
    return () => { ref?.removeEventListener('scroll', checkScrollButtons); window.removeEventListener('resize', checkScrollButtons) }
  }, [viewMode])

  const handleAddProject = () => {
    addProject(newProject)
    setNewProject({ name: '', description: '', startMonth: '', startYear: '', endMonth: '', endYear: '', skills: [] })
    setNewProjectSkill('')
  }
  const handleAddExperience = () => {
    if (newExperience.company || newExperience.position) {
      addExperience(newExperience)
      setNewExperience({ company: '', position: '', duration: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '', skills: [] })
      setNewExpSkill('')
    }
  }
  const handleAddSkill = () => { if (newSkill.trim()) { addSkill(newSkill.trim()); setNewSkill('') } }
  const handleAddProjectSkill = () => {
    if (!newProjectSkill) return
    setNewProject(prev => ({ ...prev, skills: [...(prev.skills || []), newProjectSkill] }))
    setNewProjectSkill('')
  }
  const handleAddSkillToProject = (id: string) => {
    const val = projectSkillInputs[id]
    if (!val) return
    const proj = portfolioData.projects.find(p => p.id === id)
    updateProject(id, { skills: [...(proj?.skills || []), val] })
    setProjectSkillInputs(prev => ({ ...prev, [id]: '' }))
  }
  const handleAddSkillToExperience = (id: string) => {
    const val = experienceSkillInputs[id]
    if (!val) return
    const exp = portfolioData.experience.find(e => e.id === id)
    updateExperience(id, { skills: [...(exp?.skills || []), val] })
    setExperienceSkillInputs(prev => ({ ...prev, [id]: '' }))
  }
  const handleAddExpSkill = () => {
    if (!newExpSkill.trim()) return
    setNewExperience(prev => ({ ...prev, skills: [...(prev.skills || []), newExpSkill.trim()] }))
    setNewExpSkill('')
  }
  const handleAddEducation = () => {
    if (newEducation.institution || newEducation.degree) {
      addEducation(newEducation)
      setNewEducation({ institution: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })
    }
  }
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const img = new Image()
      img.onload = () => {
        const MAX = 160 // máx 160px — suficiente para CV, muy liviano
        let w = img.width, h = img.height
        if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX } }
        else { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX } }
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h)
        // JPEG quality 0.7 → reduce de ~200KB+ a ~5-10KB
        updatePortfolioData({ photo: canvas.toDataURL('image/jpeg', 0.7) })
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }
  const enter = (cb: () => void) => (e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); cb() } }

  const optLevels = lang === 'es'
    ? ['Nativo', 'C2 - Dominio', 'C1 - Avanzado', 'B2 - Intermedio alto', 'B1 - Intermedio', 'A2 - Pre-intermedio', 'A1 - Basico']
    : ['Native', 'C2 - Mastery', 'C1 - Advanced', 'B2 - Upper-Intermediate', 'B1 - Intermediate', 'A2 - Pre-Intermediate', 'A1 - Basic']
  const isCustomLevel = (level: string | undefined) => !!level && !optLevels.includes(level)

  const currentLabel = lang === 'es' ? 'Actualidad' : 'Present'
  const isCurrently = (endMonth: string | undefined) =>
    endMonth === 'Actualidad' || endMonth === 'Present' || endMonth === 'Currently'

  return (
    <div className="flex flex-col h-full bg-[#1C1C1E] overflow-hidden">

      {/* Header */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-[#38383A] space-y-3 bg-[#1C1C1E] sticky top-0 z-10">

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/tucv-logo.svg" alt="TuCV" className="h-14 w-auto" />
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowSettings(true)}
                  title={lang === 'es' ? 'Configuración' : 'Settings'}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2C2C2E] border border-[#3A3A3C] hover:border-violet-500/40 hover:text-white rounded-xl text-white/50 text-xs transition-all"
                >
                  {isPremium && <Crown size={11} className="text-yellow-400" />}
                  <Settings size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 rounded-xl text-violet-400 text-xs font-medium transition-all"
              >
                <LogIn size={12} />
                {lang === 'es' ? 'Entrar' : 'Sign in'}
              </button>
            )}
            <select value={lang} onChange={(e) => setLanguage?.(e.target.value)} className={`${sel} !w-auto px-3 py-2 text-xs`} aria-label="Idioma">
              <option value="es" className="bg-[#1C1C1E]">ES</option>
              <option value="en" className="bg-[#1C1C1E]">EN</option>
            </select>
          </div>
        </div>

        <button data-tour="import-btn" onClick={() => setShowPDFImporter(true)} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2C2C2E] border border-[#3A3A3C] hover:bg-[#3A3A3C] text-white/70 text-sm font-medium transition-all group">
          <FileUp size={14} className="text-violet-400 group-hover:text-violet-300 transition-colors" />
          {lang === 'es' ? 'Importar CV (PDF o imagen)' : 'Import CV (PDF or image)'}
        </button>

        <div className="flex gap-1.5 p-1 bg-[#0F0F0F] rounded-xl border border-[#38383A]">
          <button onClick={() => setViewMode('editor')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${viewMode === 'editor' ? 'bg-[#2C2C2E] text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
            <PenLine size={13} />Editor
          </button>
          <button data-tour="ai-optimizer" onClick={() => setViewMode('optimizer')} className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${viewMode === 'optimizer' ? 'bg-violet-600 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
            <Sparkles size={13} />IA Optimizer
          </button>
        </div>

        {viewMode === 'editor' && (
          <div className="relative">
            {showLeftArrow && <button onClick={() => scrollTabs('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-[#1C1C1E] rounded-lg text-white/40 hover:text-white transition-colors"><ChevronLeft size={14} /></button>}
            {showRightArrow && <button onClick={() => scrollTabs('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-[#1C1C1E] rounded-lg text-white/40 hover:text-white transition-colors"><ChevronRight size={14} /></button>}
            <div ref={tabsScrollRef} className="overflow-x-auto custom-scrollbar flex gap-1">
              {['personal', 'contact', 'projects', 'experience', 'education', 'skills', 'languages'].map((tab, idx) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-[#3A3A3C] text-white'
                    : 'text-white/40 hover:text-white/70 hover:bg-[#2C2C2E]'
                }`}>
                  <span className={`text-[10px] font-bold ${activeTab === tab ? 'text-white/50' : 'text-white/25'}`}>{idx + 1}</span>
                  {tabIcons[tab]}{t.tabs[tab]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#0F0F0F]">
        {viewMode === 'optimizer' ? <AIOptimizer /> : (
          <div className="p-4 space-y-4">

            {/* Personal */}
            {activeTab === 'personal' && (
              <div className="space-y-4 animate-fade-up">
                <SectionCard>
                  <Label>{t.personal_photoLabel}</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div onClick={() => portfolioData.showPhoto && fileInputRef.current?.click()} className={`relative shrink-0 ${portfolioData.showPhoto ? 'cursor-pointer group/photo' : ''}`}>
                      {portfolioData.showPhoto ? (
                        portfolioData.photo
                          ? <img src={portfolioData.photo} alt="Profile" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#3A3A3C] group-hover/photo:ring-violet-500 transition-all" />
                          : <div className="w-16 h-16 rounded-2xl bg-[#3A3A3C] border border-[#48484A] flex items-center justify-center group-hover/photo:border-violet-500 transition-all"><Upload size={18} className="text-white/40 group-hover/photo:text-violet-400 transition-colors" /></div>
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-[#2C2C2E] border border-[#3A3A3C] flex items-center justify-center"><span className="text-[10px] text-white/30">{t.personal_noPhoto}</span></div>
                      )}
                      <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <button onClick={() => fileInputRef.current?.click()} className="py-2 px-3 bg-[#3A3A3C] hover:bg-[#48484A] border border-[#48484A] text-white/70 rounded-xl text-xs font-medium transition-all">{t.changePhoto}</button>
                      <label className="flex items-center gap-2.5 cursor-pointer group/toggle">
                        <div className="relative inline-flex w-9 h-5 shrink-0">
                          <input type="checkbox" checked={!!portfolioData.showPhoto} onChange={(e) => updatePortfolioData({ showPhoto: e.target.checked })} className="sr-only peer" />
                          <div className="w-9 h-5 bg-[#3A3A3C] rounded-full peer peer-checked:bg-violet-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                        </div>
                        <span className="text-xs text-white/50 group-hover/toggle:text-white/80 transition-colors">{t.includePhoto}</span>
                      </label>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard>
                  <div className="space-y-3">
                    <div><Label>{t.personal_nameLabel}</Label><DarkInput value={portfolioData.name} onChange={(e) => updatePortfolioData({ name: e.target.value })} placeholder="Tu Nombre Completo" /></div>
                    <div><Label>{t.personal_titleLabel}</Label><DarkInput value={portfolioData.title} onChange={(e) => updatePortfolioData({ title: e.target.value })} placeholder="Desarrollador Full Stack" /></div>
                    <div><Label>{t.personal_aboutLabel}</Label><DarkTextarea value={portfolioData.about} onChange={(e) => updatePortfolioData({ about: e.target.value })} rows={8} className="min-h-[180px]" placeholder={lang === 'es' ? 'Escribe sobre ti...' : 'Write about yourself...'} /></div>
                  </div>
                </SectionCard>

              </div>
            )}

            {/* Contact */}
            {activeTab === 'contact' && (
              <div className="space-y-3 animate-fade-up">
                <SectionCard>
                  <div className="space-y-3">
                    {([
                      { icon: <Mail size={13} />, label: t.contact_emailLabel, key: 'email', type: 'email', placeholder: 'tu@email.com' },
                      { icon: <Phone size={13} />, label: t.contact_phoneLabel, key: 'phone', type: 'text', placeholder: '+1 234 567 890' },
                      { icon: <MapPin size={13} />, label: t.contact_addressLabel, key: 'address', type: 'text', placeholder: 'Ciudad, Pais' },
                      { icon: <Globe size={13} />, label: t.contact_websiteLabel, key: 'website', type: 'text', placeholder: 'https://tusitio.com' },
                      { icon: <Globe size={13} />, label: 'LinkedIn', key: 'linkedin', type: 'text', placeholder: 'https://linkedin.com/in/...' },
                    ] as const).map(({ icon, label, key, type, placeholder }) => (
                      <div key={key}>
                        <label className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-1.5">
                          <span className="text-white/40">{icon}</span>{label}
                        </label>
                        <DarkInput type={type} placeholder={placeholder} value={(portfolioData.contact as unknown as Record<string, string>)[key] || ''} onChange={(e) => updatePortfolioData({ contact: { ...portfolioData.contact, [key]: e.target.value } })} />
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-3 animate-fade-up">
                {portfolioData.projects.map((project, index) => (
                  <SectionCard
                    key={project.id}
                    draggable
                    onDragStart={() => { dragRef.current = { type: 'project', index } }}
                    onDragOver={(e) => { e.preventDefault(); setDragOverId(project.id) }}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (dragRef.current?.type === 'project' && dragRef.current.index !== index) {
                        reorderProjects(dragRef.current.index, index)
                      }
                      setDragOverId(null); dragRef.current = null
                    }}
                    onDragEnd={() => { setDragOverId(null); dragRef.current = null }}
                    className={dragOverId === project.id && dragRef.current?.index !== index ? 'ring-1 ring-violet-500/60' : ''}
                  >
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"><GripVertical size={14} /></div>
                    <button onClick={() => removeProject(project.id)} className="absolute top-3 right-3 p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"><X size={13} /></button>
                    <div className="space-y-2.5 pr-6 pl-5">
                      <DarkInput value={project.name} onChange={(e) => updateProject(project.id, { name: e.target.value })} placeholder={t.project_namePlaceholder} />
                      <DarkTextarea value={project.description} onChange={(e) => updateProject(project.id, { description: e.target.value })} placeholder={t.project_descriptionPlaceholder} rows={2} />
                      <div className="grid grid-cols-2 gap-2">
                        <DarkInput value={project.startMonth || ''} onChange={(e) => updateProject(project.id, { startMonth: e.target.value })} placeholder={t.project_monthStartPlaceholder} />
                        <DarkInput value={project.startYear || ''} onChange={(e) => updateProject(project.id, { startYear: e.target.value })} placeholder={t.project_yearStartPlaceholder} />
                        <DarkInput value={project.endMonth || ''} onChange={(e) => updateProject(project.id, { endMonth: e.target.value })} placeholder={t.project_monthEndPlaceholder} disabled={isCurrently(project.endMonth)} className={isCurrently(project.endMonth) ? 'opacity-40 cursor-not-allowed' : ''} />
                        <DarkInput value={project.endYear || ''} onChange={(e) => updateProject(project.id, { endYear: e.target.value })} placeholder={t.project_yearEndPlaceholder} disabled={isCurrently(project.endMonth)} className={isCurrently(project.endMonth) ? 'opacity-40 cursor-not-allowed' : ''} />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer group/check">
                        <input type="checkbox" checked={isCurrently(project.endMonth)} onChange={(e) => updateProject(project.id, e.target.checked ? { endMonth: currentLabel, endYear: '' } : { endMonth: '', endYear: '' })} className="w-3.5 h-3.5 rounded accent-violet-500 cursor-pointer" />
                        <span className="text-xs text-white/40 group-hover/check:text-white/60 transition-colors">{currentLabel}</span>
                      </label>
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {(project.skills || []).map((s, i) => (
                            <span key={i} className="tag-item flex items-center gap-1 px-2.5 py-1 bg-[#3A3A3C] border border-[#48484A] rounded-full text-white/80 text-xs">
                              {s}<button onClick={() => updateProject(project.id, { skills: (project.skills || []).filter(x => x !== s) })} className="text-white/30 hover:text-red-400 transition-colors ml-0.5"><X size={10} /></button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1.5">
                          <DarkInput placeholder={t.project_addSkillPlaceholder} value={projectSkillInputs[project.id] || ''} onChange={(e) => setProjectSkillInputs(prev => ({ ...prev, [project.id]: e.target.value }))} onKeyDown={enter(() => handleAddSkillToProject(project.id))} className="flex-1" />
                          <button onClick={() => handleAddSkillToProject(project.id)} className="px-3 py-2.5 bg-[#3A3A3C] hover:bg-[#48484A] border border-[#48484A] rounded-xl text-white/70 transition-all"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                ))}
                <div className="bg-[#161616] border border-dashed border-[#3A3A3C] rounded-2xl p-4 space-y-2.5">
                  <p className="text-xs text-white/40 font-medium">{lang === 'es' ? 'Nuevo proyecto' : 'New project'}</p>
                  <DarkInput value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} placeholder={t.project_newNamePlaceholder} />
                  <DarkTextarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} placeholder={t.project_descriptionPlaceholder} rows={2} />
                  <div className="grid grid-cols-2 gap-2">
                    <DarkInput value={newProject.startMonth} onChange={(e) => setNewProject({ ...newProject, startMonth: e.target.value })} placeholder={t.project_monthStartPlaceholder} />
                    <DarkInput value={newProject.startYear} onChange={(e) => setNewProject({ ...newProject, startYear: e.target.value })} placeholder={t.project_yearStartPlaceholder} />
                    <DarkInput value={newProject.endMonth} onChange={(e) => setNewProject({ ...newProject, endMonth: e.target.value })} placeholder={t.project_monthEndPlaceholder} />
                    <DarkInput value={newProject.endYear} onChange={(e) => setNewProject({ ...newProject, endYear: e.target.value })} placeholder={t.project_yearEndPlaceholder} />
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(newProject.skills || []).map((s, i) => (
                        <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-[#3A3A3C] border border-[#48484A] rounded-full text-white/80 text-xs">
                          {s}<button onClick={() => setNewProject(prev => ({ ...prev, skills: prev.skills.filter(x => x !== s) }))} className="text-white/30 hover:text-red-400 transition-colors"><X size={10} /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      <DarkInput placeholder={t.newProjectSkillPlaceholder} value={newProjectSkill} onChange={(e) => setNewProjectSkill(e.target.value)} onKeyDown={enter(handleAddProjectSkill)} className="flex-1" />
                      <button onClick={handleAddProjectSkill} className="px-3 py-2.5 bg-[#3A3A3C] border border-[#48484A] rounded-xl text-white/70 hover:bg-[#48484A] transition-all"><Plus size={14} /></button>
                    </div>
                  </div>
                  <button onClick={handleAddProject} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"><Plus size={14} />{t.addProject}</button>
                </div>
              </div>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-3 animate-fade-up">
                {portfolioData.experience.map((exp, index) => (
                  <SectionCard
                    key={exp.id}
                    draggable
                    onDragStart={() => { dragRef.current = { type: 'experience', index } }}
                    onDragOver={(e) => { e.preventDefault(); setDragOverId(exp.id) }}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (dragRef.current?.type === 'experience' && dragRef.current.index !== index) {
                        reorderExperiences(dragRef.current.index, index)
                      }
                      setDragOverId(null); dragRef.current = null
                    }}
                    onDragEnd={() => { setDragOverId(null); dragRef.current = null }}
                    className={dragOverId === exp.id && dragRef.current?.index !== index ? 'ring-1 ring-violet-500/60' : ''}
                  >
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"><GripVertical size={14} /></div>
                    <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"><X size={13} /></button>
                    <div className="space-y-2.5 pr-6 pl-5">
                      <DarkInput value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder={t.exp_companyPlaceholder} />
                      <DarkInput value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} placeholder={t.exp_positionPlaceholder} />
                      <div className="grid grid-cols-2 gap-2">
                        <DarkInput value={exp.startMonth || ''} onChange={(e) => updateExperience(exp.id, { startMonth: e.target.value })} placeholder={t.exp_monthStartPlaceholder} />
                        <DarkInput value={exp.startYear || ''} onChange={(e) => updateExperience(exp.id, { startYear: e.target.value })} placeholder={t.exp_yearStartPlaceholder} />
                        <DarkInput value={exp.endMonth || ''} onChange={(e) => updateExperience(exp.id, { endMonth: e.target.value })} placeholder={t.exp_monthEndPlaceholder} disabled={isCurrently(exp.endMonth)} className={isCurrently(exp.endMonth) ? 'opacity-40 cursor-not-allowed' : ''} />
                        <DarkInput value={exp.endYear || ''} onChange={(e) => updateExperience(exp.id, { endYear: e.target.value })} placeholder={t.exp_yearEndPlaceholder} disabled={isCurrently(exp.endMonth)} className={isCurrently(exp.endMonth) ? 'opacity-40 cursor-not-allowed' : ''} />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer group/check">
                        <input type="checkbox" checked={isCurrently(exp.endMonth)} onChange={(e) => updateExperience(exp.id, e.target.checked ? { endMonth: currentLabel, endYear: '' } : { endMonth: '', endYear: '' })} className="w-3.5 h-3.5 rounded accent-violet-500 cursor-pointer" />
                        <span className="text-xs text-white/40 group-hover/check:text-white/60 transition-colors">{currentLabel}</span>
                      </label>
                      <DarkTextarea value={exp.description || ''} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} placeholder={t.exp_descriptionPlaceholder} rows={2} />
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {(exp.skills || []).map((s, i) => (
                            <span key={i} className="tag-item flex items-center gap-1 px-2.5 py-1 bg-[#3A3A3C] border border-[#48484A] rounded-full text-white/80 text-xs">
                              {s}<button onClick={() => updateExperience(exp.id, { skills: (exp.skills || []).filter(x => x !== s) })} className="text-white/30 hover:text-red-400 transition-colors ml-0.5"><X size={10} /></button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-1.5">
                          <DarkInput placeholder={t.project_addSkillPlaceholder} value={experienceSkillInputs[exp.id] || ''} onChange={(e) => setExperienceSkillInputs(prev => ({ ...prev, [exp.id]: e.target.value }))} onKeyDown={enter(() => handleAddSkillToExperience(exp.id))} className="flex-1" />
                          <button onClick={() => handleAddSkillToExperience(exp.id)} className="px-3 py-2.5 bg-[#3A3A3C] hover:bg-[#48484A] border border-[#48484A] rounded-xl text-white/70 transition-all"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                ))}
                <div className="bg-[#161616] border border-dashed border-[#3A3A3C] rounded-2xl p-4 space-y-2.5">
                  <p className="text-xs text-white/40 font-medium">{lang === 'es' ? 'Nueva experiencia' : 'New experience'}</p>
                  <DarkInput value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} placeholder={t.exp_companyPlaceholder} />
                  <DarkInput value={newExperience.position} onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })} placeholder={t.exp_positionPlaceholder} />
                  <div className="grid grid-cols-2 gap-2">
                    <DarkInput value={newExperience.startMonth} onChange={(e) => setNewExperience({ ...newExperience, startMonth: e.target.value })} placeholder={t.exp_monthStartPlaceholder} />
                    <DarkInput value={newExperience.startYear} onChange={(e) => setNewExperience({ ...newExperience, startYear: e.target.value })} placeholder={t.exp_yearStartPlaceholder} />
                    <DarkInput value={newExperience.endMonth} onChange={(e) => setNewExperience({ ...newExperience, endMonth: e.target.value })} placeholder={t.exp_monthEndPlaceholder} />
                    <DarkInput value={newExperience.endYear} onChange={(e) => setNewExperience({ ...newExperience, endYear: e.target.value })} placeholder={t.exp_yearEndPlaceholder} />
                  </div>
                  <DarkTextarea value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} placeholder={t.exp_descriptionPlaceholder} rows={2} />
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(newExperience.skills || []).map((s, i) => (
                        <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-[#3A3A3C] border border-[#48484A] rounded-full text-white/80 text-xs">
                          {s}<button onClick={() => setNewExperience(prev => ({ ...prev, skills: prev.skills.filter(x => x !== s) }))} className="text-white/30 hover:text-red-400 transition-colors"><X size={10} /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1.5">
                      <DarkInput placeholder={t.project_addSkillPlaceholder} value={newExpSkill} onChange={(e) => setNewExpSkill(e.target.value)} onKeyDown={enter(handleAddExpSkill)} className="flex-1" />
                      <button onClick={handleAddExpSkill} className="px-3 py-2.5 bg-[#3A3A3C] border border-[#48484A] rounded-xl text-white/70 hover:bg-[#48484A] transition-all"><Plus size={14} /></button>
                    </div>
                  </div>
                  <button onClick={handleAddExperience} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"><Plus size={14} />{t.addExperience}</button>
                </div>
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div className="space-y-3 animate-fade-up">
                {portfolioData.education?.map((ed) => (
                  <SectionCard key={ed.id}>
                    <button onClick={() => removeEducation(ed.id)} className="absolute top-3 right-3 p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"><X size={13} /></button>
                    <div className="space-y-2.5 pr-6">
                      <DarkInput value={ed.institution} onChange={(e) => updateEducation(ed.id, { institution: e.target.value })} placeholder={t.edu_institutionPlaceholder} />
                      <DarkInput value={ed.degree} onChange={(e) => updateEducation(ed.id, { degree: e.target.value })} placeholder={t.edu_degreePlaceholder} />
                      <div className="grid grid-cols-2 gap-2">
                        <DarkInput value={ed.startMonth || ''} onChange={(e) => updateEducation(ed.id, { startMonth: e.target.value })} placeholder={t.edu_monthStartPlaceholder} />
                        <DarkInput value={ed.startYear || ''} onChange={(e) => updateEducation(ed.id, { startYear: e.target.value })} placeholder={t.edu_yearStartPlaceholder} />
                        <DarkInput value={ed.endMonth || ''} onChange={(e) => updateEducation(ed.id, { endMonth: e.target.value })} placeholder={t.edu_monthEndPlaceholder} />
                        <DarkInput value={ed.endYear || ''} onChange={(e) => updateEducation(ed.id, { endYear: e.target.value })} placeholder={t.edu_yearEndPlaceholder} />
                      </div>
                      <DarkTextarea value={ed.description || ''} onChange={(e) => updateEducation(ed.id, { description: e.target.value })} placeholder={t.edu_descriptionPlaceholder} rows={2} />
                    </div>
                  </SectionCard>
                ))}
                <div className="bg-[#161616] border border-dashed border-[#3A3A3C] rounded-2xl p-4 space-y-2.5">
                  <p className="text-xs text-white/40 font-medium">{lang === 'es' ? 'Nueva educacion' : 'New education'}</p>
                  <DarkInput value={newEducation.institution} onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })} placeholder={t.edu_institutionPlaceholder} />
                  <DarkInput value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} placeholder={t.edu_degreePlaceholder} />
                  <div className="grid grid-cols-2 gap-2">
                    <DarkInput value={newEducation.startMonth} onChange={(e) => setNewEducation({ ...newEducation, startMonth: e.target.value })} placeholder={t.edu_monthStartPlaceholder} />
                    <DarkInput value={newEducation.startYear} onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })} placeholder={t.edu_yearStartPlaceholder} />
                    <DarkInput value={newEducation.endMonth} onChange={(e) => setNewEducation({ ...newEducation, endMonth: e.target.value })} placeholder={t.edu_monthEndPlaceholder} />
                    <DarkInput value={newEducation.endYear} onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })} placeholder={t.edu_yearEndPlaceholder} />
                  </div>
                  <DarkTextarea value={newEducation.description} onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })} placeholder={t.edu_descriptionPlaceholder} rows={2} />
                  <button onClick={handleAddEducation} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"><Plus size={14} />{t.addEducation}</button>
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <div className="space-y-4 animate-fade-up">
                <SectionCard>
                  <Label>{lang === 'es' ? 'Habilidades' : 'Skills'}</Label>
                  <div className="flex flex-wrap gap-2 mt-2 mb-3 min-h-[40px]">
                    {portfolioData.skills.map((skill, i) => (
                      <span key={i} className="tag-item flex items-center gap-1 px-3 py-1.5 bg-[#3A3A3C] border border-[#48484A] rounded-full text-white/80 text-xs font-medium group/tag">
                        {skill}<button onClick={() => removeSkill(skill)} className="text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover/tag:opacity-100 ml-0.5"><X size={10} /></button>
                      </span>
                    ))}
                    {portfolioData.skills.length === 0 && <p className="text-xs text-white/25 italic">{lang === 'es' ? 'Sin habilidades aun' : 'No skills yet'}</p>}
                  </div>
                  <div className="flex gap-1.5">
                    <DarkInput placeholder={t.skills_newPlaceholder} value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={enter(handleAddSkill)} className="flex-1" />
                    <button onClick={handleAddSkill} className="px-3 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl transition-all shrink-0"><Plus size={14} /></button>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Languages */}
            {activeTab === 'languages' && (
              <div className="space-y-3 animate-fade-up">
                {(portfolioData.languages || []).map((li, index) => {
                  const inCustomMode = customLevelIds.has(li.id) || isCustomLevel(li.level)
                  return (
                    <SectionCard
                      key={li.id}
                      draggable
                      onDragStart={() => { dragRef.current = { type: 'language', index } }}
                      onDragOver={(e) => { e.preventDefault(); setDragOverId(li.id) }}
                      onDrop={(e) => {
                        e.preventDefault()
                        if (dragRef.current?.type === 'language' && dragRef.current.index !== index) {
                          reorderLanguages(dragRef.current.index, index)
                        }
                        setDragOverId(null); dragRef.current = null
                      }}
                      onDragEnd={() => { setDragOverId(null); dragRef.current = null }}
                      className={dragOverId === li.id && dragRef.current?.index !== index ? 'ring-1 ring-violet-500/60' : ''}
                    >
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-600 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing"><GripVertical size={14} /></div>
                      <button onClick={() => { removeLanguage(li.id); setCustomLevelIds(prev => { const s = new Set(prev); s.delete(li.id); return s }) }} className="absolute top-3 right-3 p-1.5 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"><X size={13} /></button>
                      <div className="space-y-2.5 pr-6 pl-5">
                        <DarkInput value={li.name} onChange={(e) => updateLanguage(li.id, { name: e.target.value })} placeholder={t.language_namePlaceholder} />
                        <select
                          value={inCustomMode ? '__custom__' : (li.level || '')}
                          onChange={(e) => {
                            if (e.target.value === '__custom__') {
                              setCustomLevelIds(prev => new Set([...prev, li.id]))
                            } else {
                              setCustomLevelIds(prev => { const s = new Set(prev); s.delete(li.id); return s })
                              updateLanguage(li.id, { level: e.target.value })
                            }
                          }}
                          className={sel}
                        >
                          <option value="" className="bg-[#1C1C1E]">{lang === 'es' ? 'Seleccionar nivel...' : 'Select level...'}</option>
                          {optLevels.map(l => <option key={l} value={l} className="bg-[#1C1C1E]">{l}</option>)}
                          <option value="__custom__" className="bg-[#1C1C1E]">{lang === 'es' ? 'Personalizado...' : 'Custom...'}</option>
                        </select>
                        {inCustomMode && (
                          <DarkInput
                            value={li.level || ''}
                            onChange={(e) => updateLanguage(li.id, { level: e.target.value })}
                            placeholder={lang === 'es' ? 'Escribe el nivel...' : 'Type level...'}
                            autoFocus
                          />
                        )}
                      </div>
                    </SectionCard>
                  )
                })}
                <div className="bg-[#161616] border border-dashed border-[#3A3A3C] rounded-2xl p-4 space-y-2.5">
                  <p className="text-xs text-white/40 font-medium">{lang === 'es' ? 'Nuevo idioma' : 'New language'}</p>
                  <DarkInput value={newLangName} onChange={(e) => setNewLangName(e.target.value)} placeholder={t.language_namePlaceholder} />
                  <select
                    value={newLangCustom ? '__custom__' : newLangLevel}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') { setNewLangCustom(true); setNewLangLevel('') }
                      else { setNewLangCustom(false); setNewLangLevel(e.target.value) }
                    }}
                    className={sel}
                  >
                    <option value="" className="bg-[#1C1C1E]">{lang === 'es' ? 'Seleccionar nivel...' : 'Select level...'}</option>
                    {optLevels.map(l => <option key={l} value={l} className="bg-[#1C1C1E]">{l}</option>)}
                    <option value="__custom__" className="bg-[#1C1C1E]">{lang === 'es' ? 'Personalizado...' : 'Custom...'}</option>
                  </select>
                  {newLangCustom && (
                    <DarkInput
                      value={newLangLevel}
                      onChange={(e) => setNewLangLevel(e.target.value)}
                      placeholder={lang === 'es' ? 'Escribe el nivel...' : 'Type level...'}
                      autoFocus
                    />
                  )}
                  <button onClick={() => {
                    if (!newLangName) return
                    addLanguage({ name: newLangName, level: newLangLevel })
                    setNewLangName(''); setNewLangLevel(''); setNewLangCustom(false)
                  }} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"><Plus size={14} />{t.addLanguage}</button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>

      <PDFImporter
        isOpen={showPDFImporter}
        onClose={() => setShowPDFImporter(false)}
        onImport={(file) => importFromPDF(file)}
        onImportImage={(file) => importFromImage(file)}
        language={lang}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        language={lang}
      />

      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        language={lang}
        onSubscribe={() => subscriptionService.redirectToCheckout(user?.email ?? undefined)}
      />

    </div>
  )
}

export default Editor
