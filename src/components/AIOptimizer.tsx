import React, { useState } from 'react';
import { Sparkles, Building, Briefcase, FileText, CheckCircle, Globe, X, Check, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AIService } from '../services/AIService';
import subscriptionService from '../services/subscriptionService';
import { AdModal } from './AdModal';
import { useAuth } from '../context/AuthContext';
import type { PendingOptimization, DiffSection } from '../context/PortfolioContext';

interface OptimizationResult {
  optimizedAbout: string;
  suggestedTitle: string;
  skillsToReplace?: string[];
  suggestedSkills: string[];
  experienceHighlights: string[];
  projectRecommendations: string[];
  atsKeywords: string[];
}

const LABELS = {
  es: {
    title: 'Optimizador con IA',
    description: 'Analiza la oferta y optimiza tu CV para aumentar tus chances de entrevista',
    company: 'Empresa',
    position: 'Puesto',
    jobDescription: 'Descripción del trabajo',
    jobDescriptionPlaceholder: 'Pega aquí la descripción completa de la oferta...',
    optimize: 'Analizar y optimizar',
    optimizing: 'Analizando...',
    jobLanguage: 'Idioma de la oferta',
    results: 'Cambios sugeridos',
    optimizedAbout: 'Sobre mí',
    suggestedTitle: 'Título profesional',
    suggestedSkills: 'Habilidades a agregar',
    experienceHighlights: 'Destacados de experiencia',
    atsKeywords: 'Palabras clave ATS',
    applyChanges: 'Aplicar todos',
    sendToPreview: 'Ver en preview',
    changesApplied: 'Cambios aplicados correctamente',
    errorMessage: 'Ocurrió un error al optimizar el CV',
    acceptSection: 'Aceptar',
    rejectSection: 'Rechazar',
    inPreview: 'En preview',
    fillAll: 'Por favor completa todos los campos',
    pendingMsg: 'cambios visibles en el preview',
    acceptAll: 'Aceptar todos',
    rejectAll: 'Rechazar todos',
    premiumRequired: '¿Activar Premium? (Simulado - $5/mes)',
  },
  en: {
    title: 'AI Optimizer',
    description: 'Analyze the job offer and optimize your CV to increase your interview chances',
    company: 'Company',
    position: 'Position',
    jobDescription: 'Job description',
    jobDescriptionPlaceholder: 'Paste the full job description here...',
    optimize: 'Analyze & optimize',
    optimizing: 'Analyzing...',
    jobLanguage: 'Job offer language',
    results: 'Suggested changes',
    optimizedAbout: 'About me',
    suggestedTitle: 'Professional title',
    suggestedSkills: 'Skills to add',
    experienceHighlights: 'Experience highlights',
    atsKeywords: 'ATS keywords',
    applyChanges: 'Apply all',
    sendToPreview: 'View in preview',
    changesApplied: 'Changes applied successfully',
    errorMessage: 'An error occurred while optimizing the CV',
    acceptSection: 'Accept',
    rejectSection: 'Reject',
    inPreview: 'In preview',
    fillAll: 'Please fill in all fields',
    pendingMsg: 'changes visible in preview',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    premiumRequired: 'Activate Premium? (Simulated - $5/month)',
  },
};

// ─── DiffRow: fila de resultado con Accept/Reject ────────────────────────────
interface DiffRowProps {
  label: string;
  isPending: boolean;
  onAccept: () => void;
  onReject: () => void;
  acceptLabel: string;
  rejectLabel: string;
  children: React.ReactNode;
}

const DiffRow: React.FC<DiffRowProps> = ({ label, isPending, onAccept, onReject, acceptLabel, rejectLabel, children }) => (
  <div className={`px-4 py-3 transition-colors ${isPending ? 'bg-emerald-500/8' : ''}`}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">{label}</p>
      {isPending && (
        <div className="flex items-center gap-1">
          <button
            onClick={onAccept}
            className="flex items-center gap-0.5 px-2 py-0.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-[10px] font-semibold transition-colors"
          >
            <Check size={9} /> {acceptLabel}
          </button>
          <button
            onClick={onReject}
            className="flex items-center gap-0.5 px-2 py-0.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg text-[10px] font-semibold transition-colors"
          >
            <X size={9} /> {rejectLabel}
          </button>
        </div>
      )}
    </div>
    {children}
  </div>
);

// ─── AIOptimizer ──────────────────────────────────────────────────────────────
const AIOptimizer: React.FC = () => {
  const {
    portfolioData,
    updatePortfolioData,
    addSkill,
    setPendingOptimization,
    pendingOptimization,
    acceptSection,
    rejectSection,
    acceptAllPending,
    rejectAllPending,
  } = usePortfolio();

  const { isPremium: supabasePremium } = useAuth()
  const isPremiumUser = supabasePremium || subscriptionService.isPremium()
  const lang = ((portfolioData as unknown as { language?: string }).language as 'es' | 'en') ?? 'es';
  const t = LABELS[lang];

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLanguage, setJobLanguage] = useState<'es' | 'en'>('es');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [localResult, setLocalResult] = useState<OptimizationResult | null>(null);
  const [showAdModal, setShowAdModal] = useState(false);
  const [showLimitReached, setShowLimitReached] = useState(false);
  const [sentToPreview, setSentToPreview] = useState(false);

  const handleOptimize = async () => {
    if (!company.trim() || !position.trim() || !jobDescription.trim()) {
      alert(t.fillAll);
      return;
    }
    if (!AIService.isConfigured()) {
      alert('Agrega VITE_GROQ_API_KEY en el archivo .env');
      return;
    }
    if (!isPremiumUser) {
      const status = subscriptionService.canOptimize();
      if (!status.allowed) {
        setShowLimitReached(true);
        setShowAdModal(true);
        return;
      }
    }
    try {
      setIsOptimizing(true);
      setSentToPreview(false);
      setPendingOptimization(null);
      const result = await AIService.optimizeCV(
        portfolioData,
        { company, position, description: jobDescription },
        jobLanguage,
      );
      setLocalResult(result as OptimizationResult);
    } catch (err) {
      console.error(err);
      alert(t.errorMessage);
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleSendToPreview = () => {
    if (!localResult) return;
    const pending: PendingOptimization = {
      optimizedAbout: localResult.optimizedAbout ?? '',
      suggestedTitle: localResult.suggestedTitle ?? '',
      suggestedSkills: localResult.suggestedSkills ?? [],
      skillsToReplace: localResult.skillsToReplace,
      experienceHighlights: localResult.experienceHighlights ?? [],
      projectRecommendations: localResult.projectRecommendations ?? [],
      atsKeywords: localResult.atsKeywords ?? [],
      originalAbout: portfolioData.about,
      originalTitle: portfolioData.title,
      originalSkills: [...portfolioData.skills],
      pendingSections: ['about', 'title', 'skills'] as DiffSection[],
    };
    setPendingOptimization(pending);
    setSentToPreview(true);
    subscriptionService.recordOptimization();
  };

  const applyDirect = () => {
    if (!localResult) return;
    if (localResult.optimizedAbout) updatePortfolioData({ about: localResult.optimizedAbout });
    if (localResult.suggestedTitle) updatePortfolioData({ title: localResult.suggestedTitle });
    (localResult.suggestedSkills ?? []).forEach((skill: string) => {
      if (!portfolioData.skills.includes(skill)) addSkill(skill);
    });
    subscriptionService.recordOptimization();
    setPendingOptimization(null);
    setLocalResult(null);
    setSentToPreview(false);
    alert(t.changesApplied);
  };

  const handleApplyAll = () => {
    if (!localResult) return;
    if (!isPremiumUser) {
      setShowLimitReached(false);
      setShowAdModal(true);
      return;
    }
    applyDirect();
  };

  const handleSubscribe = () => {
    setShowAdModal(false);
    const ok = subscriptionService.redirectToCheckout();
    if (!ok) {
      alert(lang === 'es'
        ? 'Stripe no configurado. Agrega VITE_STRIPE_PAYMENT_LINK al .env'
        : 'Stripe not configured. Add VITE_STRIPE_PAYMENT_LINK to .env');
    }
  };

  const inp =
    'w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#3A3A3C] rounded-xl text-white text-sm ' +
    'placeholder:text-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/15 transition-all';

  const isPending = (s: DiffSection) => !!(pendingOptimization?.pendingSections.includes(s));

  return (
    <div className="p-4 space-y-3">
      <AdModal
        visible={showAdModal}
        onClose={() => { setShowAdModal(false); setShowLimitReached(false); }}
        onWatchAd={applyDirect}
        onSubscribe={handleSubscribe}
        action="optimize"
        language={lang}
        showLimitReached={showLimitReached}
      />

      {/* Header */}
      <div className="flex items-center gap-2.5 px-1 mb-1">
        <div className="w-7 h-7 bg-violet-600/20 rounded-lg flex items-center justify-center">
          <Sparkles size={14} className="text-violet-400" />
        </div>
        <div>
          <h2 className="text-[13px] font-semibold text-white">{t.title}</h2>
          <p className="text-[11px] text-white/40 leading-tight">{t.description}</p>
        </div>
      </div>

      {/* Pending optimization banner (shown when diff is in preview) */}
      {pendingOptimization && (
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-3 flex items-start gap-2">
          <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-emerald-300">
              {pendingOptimization.pendingSections.length} {t.pendingMsg}
            </p>
            <div className="flex gap-2 mt-1.5">
              <button
                onClick={acceptAllPending}
                className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <Check size={11} /> {t.acceptAll}
              </button>
              <span className="text-emerald-700 select-none">|</span>
              <button
                onClick={rejectAllPending}
                className="text-[11px] font-semibold text-emerald-500/70 hover:text-emerald-400 flex items-center gap-1"
              >
                <X size={11} /> {t.rejectAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job details card */}
      <div className="bg-[#2C2C2E] border border-[#3A3A3C] rounded-2xl p-4 space-y-3">
        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
            <Building size={10} /> {t.company}
          </label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Google, Apple, Microsoft..."
            className={inp}
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
            <Briefcase size={10} /> {t.position}
          </label>
          <input
            type="text"
            value={position}
            onChange={e => setPosition(e.target.value)}
            placeholder="Senior Software Engineer"
            className={inp}
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
            <FileText size={10} /> {t.jobDescription}
          </label>
          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder={t.jobDescriptionPlaceholder}
            rows={4}
            className={`${inp} resize-none`}
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">
            <Globe size={10} /> {t.jobLanguage}
          </label>
          <div className="flex gap-1 p-1 bg-[#0F0F0F] rounded-xl">
            {(['es', 'en'] as const).map(l => (
              <button
                key={l}
                onClick={() => setJobLanguage(l)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  jobLanguage === l
                    ? 'bg-[#3A3A3C] text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optimize button – iOS dark (NOT violet) */}
      <button
        onClick={handleOptimize}
        disabled={isOptimizing}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all border ${
          isOptimizing
            ? 'bg-[#2C2C2E] text-white/30 cursor-not-allowed border-[#3A3A3C]'
            : 'bg-violet-600 hover:bg-violet-500 text-white border-transparent active:scale-[0.98]'
        }`}
      >
        {isOptimizing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            {t.optimizing}
          </>
        ) : (
          <>
            <Sparkles size={14} />
            {t.optimize}
          </>
        )}
      </button>

      {/* Results panel */}
      {localResult && (
        <div className="border border-[#3A3A3C] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1C1C1E] px-4 py-3 flex items-center justify-between border-b border-[#3A3A3C]">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="text-xs font-semibold text-white">{t.results}</span>
            </div>
            <button
              onClick={() => { setLocalResult(null); setSentToPreview(false); }}
              className="p-1 text-white/40 hover:text-white rounded-lg transition-colors"
            >
              <X size={13} />
            </button>
          </div>

          <div className="bg-[#2C2C2E] divide-y divide-[#3A3A3C]/60">
            {/* About diff */}
            <DiffRow
              label={t.optimizedAbout}
              isPending={isPending('about')}
              onAccept={() => acceptSection('about')}
              onReject={() => rejectSection('about')}
              acceptLabel={t.acceptSection}
              rejectLabel={t.rejectSection}
            >
              <div className="space-y-1.5">
                <p className="text-[11px] text-white/30 line-through leading-relaxed">
                  {portfolioData.about.slice(0, 80)}{portfolioData.about.length > 80 ? '\u2026' : ''}
                </p>
                <p className="text-[11px] text-white/90 leading-relaxed bg-emerald-500/10 px-2 py-1.5 rounded-lg border border-emerald-500/20">
                  {localResult.optimizedAbout.slice(0, 120)}{localResult.optimizedAbout.length > 120 ? '…' : ''}
                </p>
              </div>
            </DiffRow>

            {/* Title diff */}
            <DiffRow
              label={t.suggestedTitle}
              isPending={isPending('title')}
              onAccept={() => acceptSection('title')}
              onReject={() => rejectSection('title')}
              acceptLabel={t.acceptSection}
              rejectLabel={t.rejectSection}
            >
              <div className="space-y-1">
                <p className="text-[11px] text-white/30 line-through">{portfolioData.title}</p>
                <p className="text-[11px] font-semibold text-emerald-400">{localResult.suggestedTitle}</p>
              </div>
            </DiffRow>

            {/* Skills diff */}
            <DiffRow
              label={t.suggestedSkills}
              isPending={isPending('skills')}
              onAccept={() => acceptSection('skills')}
              onReject={() => rejectSection('skills')}
              acceptLabel={t.acceptSection}
              rejectLabel={t.rejectSection}
            >
              <div className="flex flex-wrap gap-1.5">
                {(localResult.suggestedSkills ?? []).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-emerald-500/12 border border-emerald-500/25 text-emerald-400 rounded-full text-[10px] font-medium"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </DiffRow>

            {/* Experience highlights (informational) */}
            {(localResult.experienceHighlights ?? []).length > 0 && (
              <div className="px-4 py-3">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  {t.experienceHighlights}
                </p>
                <ul className="space-y-1">
                  {localResult.experienceHighlights.map((h, i) => (
                    <li key={i} className="text-[11px] text-white/70 leading-relaxed flex gap-1.5">
                      <span className="text-white/25 shrink-0">\u2022</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ATS keywords */}
            {(localResult.atsKeywords ?? []).length > 0 && (
              <div className="px-4 py-3">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-2">
                  {t.atsKeywords}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {localResult.atsKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#3A3A3C] text-white/60 rounded-full text-[10px]">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action bar */}
          <div className="bg-[#1C1C1E] px-4 py-3 border-t border-[#3A3A3C] flex gap-2">
            <button
              onClick={handleSendToPreview}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                sentToPreview
                  ? 'bg-emerald-500/12 text-emerald-400 border-emerald-500/25'
                  : 'bg-[#2C2C2E] text-white/70 border-[#3A3A3C] hover:bg-[#3A3A3C]'
              }`}
            >
              {sentToPreview ? (
                <><CheckCircle size={12} /> {t.inPreview}</>
              ) : (
                <><ArrowRight size={12} /> {t.sendToPreview}</>
              )}
            </button>

            <button
              onClick={handleApplyAll}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <Check size={12} /> {t.applyChanges}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIOptimizer;
