import React, { useState } from 'react';
import { Sparkles, Building, Briefcase, FileText, CheckCircle, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AIService } from '../services/AIService';
import { AdModal } from './AdModal';

interface OptimizationResult {
  optimizedAbout: string;
  suggestedTitle: string;
  skillsToReplace?: string[];
  suggestedSkills: string[];
  experienceHighlights: string[];
  projectRecommendations: string[];
  atsKeywords: string[];
}

interface TranslationType {
  title: string;
  description: string;
  company: string;
  position: string;
  jobDescription: string;
  jobDescriptionPlaceholder: string;
  optimize: string;
  optimizing: string;
  errorMessage: string;
  applyChanges: string;
  optimizedAboutTitle: string;
  suggestedTitleLabel: string;
  suggestedSkillsTitle: string;
  experienceHighlightsTitle: string;
  projectRecommendationsTitle: string;
  atsKeywordsTitle: string;
  jobLanguage: string;
  spanish: string;
  english: string;
  results: string;
  optimizedAbout: string;
  suggestedTitle: string;
  suggestedSkills: string;
  experienceHighlights: string;
  projectRecommendations: string;
  atsKeywords: string;
  changesApplied: string;
  errorTitle: string;
  adModalTitle: string;
  adModalDescription: string;
}

const translations: Record<string, TranslationType> = {
  es: {
    title: 'Optimizador de CV con IA',
    description: 'Optimiza tu CV para una oferta de trabajo específica usando inteligencia artificial',
    company: 'Nombre de la empresa',
    position: 'Puesto',
    jobDescription: 'Descripción del trabajo',
    jobDescriptionPlaceholder: 'Pega aquí la descripción completa del trabajo...',
    optimize: 'Optimizar CV',
    optimizing: 'Optimizando...',
    jobLanguage: 'Idioma de la oferta',
    results: 'Resultados de la optimización',
    optimizedAbout: 'Sección "Sobre mí" optimizada',
    suggestedTitle: 'Título sugerido',
    suggestedSkills: 'Habilidades sugeridas',
    experienceHighlights: 'Destacados de experiencia',
    projectRecommendations: 'Recomendaciones de proyectos',
    atsKeywords: 'Palabras clave ATS',
    applyChanges: 'Aplicar cambios',
    changesApplied: 'Cambios aplicados correctamente',
    errorTitle: 'Error',
    errorMessage: 'Ocurrió un error al optimizar el CV',
    adModalTitle: 'Ver anuncio para continuar',
    adModalDescription: 'Mira un breve anuncio para desbloquear la optimización con IA'
  },
  en: {
    title: 'AI CV Optimizer',
    description: 'Optimize your CV for a specific job offer using artificial intelligence',
    company: 'Company name',
    position: 'Position',
    jobDescription: 'Job description',
    jobDescriptionPlaceholder: 'Paste the full job description here...',
    optimize: 'Optimize CV',
    optimizing: 'Optimizing...',
    jobLanguage: 'Job offer language',
    results: 'Optimization results',
    optimizedAbout: 'Optimized "About" section',
    suggestedTitle: 'Suggested title',
    suggestedSkills: 'Suggested skills',
    experienceHighlights: 'Experience highlights',
    projectRecommendations: 'Project recommendations',
    atsKeywords: 'ATS keywords',
    applyChanges: 'Apply changes',
    changesApplied: 'Changes applied successfully',
    errorTitle: 'Error',
    errorMessage: 'An error occurred while optimizing the CV',
    adModalTitle: 'Watch ad to continue',
    adModalDescription: 'Watch a short ad to unlock AI optimization'
  }
};

const AIOptimizer: React.FC = () => {
  const { portfolioData, updatePortfolioData, addSkill } = usePortfolio();
  const lang = (portfolioData.language as string) || 'es';
  const t = translations[lang] || translations.es;

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLanguage, setJobLanguage] = useState<'es' | 'en'>('es');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);

  const handleOptimize = async () => {
    if (!company.trim() || !position.trim() || !jobDescription.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!AIService.isConfigured()) {
      alert('La clave API de Groq no está configurada. Agrega VITE_GROQ_API_KEY en el archivo .env');
      return;
    }

    try {
      setIsOptimizing(true);
      const result = await AIService.optimizeCV(portfolioData, {
        company,
        position,
        description: jobDescription,
      }, jobLanguage);
      setOptimizationResult(result);
    } catch (error) {
      console.error('Error optimizing CV:', error);
      alert(t.errorMessage);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleApplyChanges = () => {
    if (!optimizationResult) return;
    setShowAdModal(true);
  };

  const applyOptimizationChanges = () => {
    if (!optimizationResult) return;

    // Update "About" section
    if (optimizationResult.optimizedAbout) {
      updatePortfolioData({ about: optimizationResult.optimizedAbout });
    }

    // Update suggested title
    if (optimizationResult.suggestedTitle) {
      updatePortfolioData({ title: optimizationResult.suggestedTitle });
    }

    // Add suggested skills
    if (optimizationResult.suggestedSkills) {
      optimizationResult.suggestedSkills.forEach((skill: string) => {
        if (!portfolioData.skills.includes(skill)) {
          addSkill(skill);
        }
      });
    }

    alert(t.changesApplied);
    setOptimizationResult(null);
    setCompany('');
    setPosition('');
    setJobDescription('');
    setShowAdModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <AdModal
        visible={showAdModal}
        onClose={() => setShowAdModal(false)}
        onWatchAd={applyOptimizationChanges}
        action="optimize"
        language={lang}
      />

      <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 rounded-xl p-4 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Sparkles size={22} className="text-white" />
          </div>
          <h2 className="text-xl font-bold">{t.title}</h2>
        </div>
        <p className="text-purple-50 text-sm">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="inline-flex items-center gap-2">
              <Building className="text-blue-500" size={18} />
              {t.company}
            </span>
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Ej: Google, Microsoft, etc."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-gray-300"
          />
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            <span className="inline-flex items-center gap-2">
              <Briefcase className="text-green-500" size={18} />
              {t.position}
            </span>
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Ej: Senior Software Engineer"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-gray-300"
          />
        </div>
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="inline-flex items-center gap-2">
            <FileText className="text-orange-500" size={18} />
            {t.jobDescription}
          </span>
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder={t.jobDescriptionPlaceholder}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all group-hover:border-gray-300 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <span className="inline-flex items-center gap-2">
            <Globe className="text-purple-500" size={18} />
            {t.jobLanguage}
          </span>
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setJobLanguage('es')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              jobLanguage === 'es'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setJobLanguage('en')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              jobLanguage === 'en'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <button
        onClick={handleOptimize}
        disabled={isOptimizing}
        className={`w-full py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          isOptimizing
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 via-purple-600 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-2xl shadow-purple-500/50 hover:scale-105'
        }`}
      >
        {isOptimizing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            {t.optimizing}
          </>
        ) : (
          <>
            <Sparkles size={20} />
            {t.optimize}
          </>
        )}
      </button>

      {optimizationResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-700 font-semibold text-lg mb-4">
            <CheckCircle size={24} />
            {t.results}
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.optimizedAbout}</h4>
            <p className="text-gray-600 text-sm bg-white p-3 rounded">{optimizationResult.optimizedAbout}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.suggestedTitle}</h4>
            <p className="text-gray-600 text-sm bg-white p-3 rounded">{optimizationResult.suggestedTitle}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.suggestedSkills}</h4>
            <div className="flex flex-wrap gap-2">
              {optimizationResult.suggestedSkills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.experienceHighlights}</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 bg-white p-3 rounded">
              {optimizationResult.experienceHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.projectRecommendations}</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 bg-white p-3 rounded">
              {optimizationResult.projectRecommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-2">{t.atsKeywords}</h4>
            <div className="flex flex-wrap gap-2">
              {optimizationResult.atsKeywords.map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleApplyChanges}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            {t.applyChanges}
          </button>
        </div>
      )}
    </div>
  );
};

export default AIOptimizer;
