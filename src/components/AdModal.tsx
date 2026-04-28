import React, { useState, useEffect } from 'react';
import { X, Clock, Play, CheckCircle, Crown, Zap } from 'lucide-react';
import { ADSENSE_MODAL_SLOT } from '../config/stripe';

const ADSENSE_PUB = 'ca-pub-2152317919633317';

interface AdModalProps {
  visible: boolean;
  onClose: () => void;
  onWatchAd: () => void;
  onSubscribe?: () => void;
  action: 'download' | 'optimize' | 'translate';
  language?: string;
  showLimitReached?: boolean;
}

const translations = {
  es: {
    download:  { title: 'Para descargar tu CV',   emoji: '📄', buttonReady: 'Descargar PDF',    buttonWaiting: 'Esperá' },
    optimize:  { title: 'Para optimizar con IA',   emoji: '✨', buttonReady: 'Optimizar con IA', buttonWaiting: 'Esperá' },
    translate: { title: 'Para traducir tu CV',     emoji: '🌍', buttonReady: 'Traducir CV',      buttonWaiting: 'Esperá' },
    subtitle:        'Este servicio es completamente gratuito',
    description:     'Para mantener el servicio gratuito, necesitamos mostrar un anuncio breve.',
    instruction:     'Mirá el anuncio durante 15 segundos para continuar:',
    watchingAd:      'Viendo anuncio...',
    waitMessage:     'segundo para desbloquear',
    waitMessagePlural:'segundos para desbloquear',
    ready:           '¡Listo! Ya podés continuar',
    supportMessage:  'Gracias por tu apoyo, esto nos ayuda a mantener el servicio gratuito para todos',
    limitReached:    'Límite diario alcanzado',
    limitMessage:    'Ya usaste este recurso hoy. Volvé mañana o activá Premium sin límites.',
    watchAd:         'Ver anuncio (15s)',
    orWithoutAds:    'O accede sin anuncios',
    cancelAnytime:   'Cancela cuando quieras',
    features: ['Descargas ilimitadas', 'Traducciones ilimitadas', 'IA ilimitada', 'Sin publicidad'],
    premiumTitle:    'Premium',
    premiumPrice:    '$3.99',
    premiumPeriod:   '/mes',
    subscribeCTA:    'Activar Premium',
  },
  en: {
    download:  { title: 'To download your CV',   emoji: '📄', buttonReady: 'Download PDF',     buttonWaiting: 'Wait' },
    optimize:  { title: 'To optimize with AI',   emoji: '✨', buttonReady: 'Optimize with AI', buttonWaiting: 'Wait' },
    translate: { title: 'To translate your CV',  emoji: '🌍', buttonReady: 'Translate CV',     buttonWaiting: 'Wait' },
    subtitle:        'This service is completely free',
    description:     'To keep the service free, we need to show a short advertisement.',
    instruction:     'Watch the ad for 15 seconds to continue:',
    watchingAd:      'Watching ad...',
    waitMessage:     'second to unlock',
    waitMessagePlural:'seconds to unlock',
    ready:           'Ready! You can continue',
    supportMessage:  'Thank you for your support, this helps us keep the service free for everyone',
    limitReached:    'Daily limit reached',
    limitMessage:    "You've used this today. Come back tomorrow or activate Premium for unlimited access.",
    watchAd:         'Watch ad (15s)',
    orWithoutAds:    'Or access without ads',
    cancelAnytime:   'Cancel anytime',
    features: ['Unlimited downloads', 'Unlimited translations', 'Unlimited AI', 'No ads'],
    premiumTitle:    'Premium',
    premiumPrice:    '$3.99',
    premiumPeriod:   '/month',
    subscribeCTA:    'Activate Premium',
  },
};

export const AdModal: React.FC<AdModalProps> = ({
  visible,
  onClose,
  onWatchAd,
  onSubscribe,
  action,
  language = 'es',
  showLimitReached = false,
}) => {
  const [showingAd, setShowingAd] = useState(false);
  const [countdown, setCountdown]   = useState(15);
  const [canUnlock, setCanUnlock]   = useState(false);

  const t = translations[language as keyof typeof translations] || translations.es;
  const actionContent = t[action];

  useEffect(() => {
    if (showingAd && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) setCanUnlock(true);
  }, [showingAd, countdown]);

  useEffect(() => {
    if (!visible) {
      setShowingAd(false);
      setCountdown(15);
      setCanUnlock(false);
    }
  }, [visible]);

  // Inject AdSense ad when the countdown starts
  useEffect(() => {
    if (!showingAd || !ADSENSE_MODAL_SLOT) return;
    const t = setTimeout(() => {
      try {
        const w = window as Window & { adsbygoogle?: unknown[] };
        w.adsbygoogle = w.adsbygoogle || [];
        w.adsbygoogle.push({});
      } catch { /* noop */ }
    }, 150);
    return () => clearTimeout(t);
  }, [showingAd]);

  if (!visible) return null;

  const progress = ((15 - countdown) / 15) * 100;

  /* ── Limit reached view ────────────────────────────────── */
  const LimitView = () => (
    <div className="space-y-3 animate-slide-up">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 text-center">
        <p className="text-sm font-semibold text-white mb-1">{t.limitReached}</p>
        <p className="text-zinc-500 text-xs leading-relaxed">{t.limitMessage}</p>
      </div>
      <PremiumCard />
    </div>
  );

  /* ── Premium card ───────────────────────────────────────── */
  const PremiumCard = () => (
    <div className="premium-section p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center">
          <Crown size={15} className="text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">{t.premiumTitle}</p>
          <p className="text-[10px] text-zinc-500">{t.cancelAnytime}</p>
        </div>
        <div className="ml-auto text-right">
          <span className="text-2xl font-black text-white">{t.premiumPrice}</span>
          <span className="text-xs text-zinc-500">{t.premiumPeriod}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {t.features.map((feat, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-zinc-300">
            <CheckCircle size={11} className="text-emerald-400 shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onSubscribe}
        className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white
          bg-violet-600 hover:bg-violet-500 transition-all duration-200
          press-scale premium-glow flex items-center justify-center gap-2"
      >
        <Zap size={14} />
        {t.subscribeCTA}
      </button>
    </div>
  );

  /* ── Pre-ad view ────────────────────────────────────────── */
  const PreAdView = () => (
    <div className="space-y-3 animate-slide-up">
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
        <p className="text-zinc-400 text-xs text-center mb-3">{t.instruction}</p>
        <button
          onClick={() => setShowingAd(true)}
          className="w-full bg-white hover:bg-zinc-100 text-black py-3 px-5 rounded-xl
            font-semibold text-sm transition-all duration-200 press-scale
            flex items-center justify-center gap-2"
        >
          <Play size={14} fill="black" />
          {t.watchAd}
        </button>
      </div>

      <div className="flex items-center gap-3 px-1">
        <div className="flex-1 h-px bg-[#2a2a2a]" />
        <span className="text-[11px] text-zinc-600">{t.orWithoutAds}</span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </div>

      <PremiumCard />
    </div>
  );

  /* ── Ad playing view ────────────────────────────────────── */
  const AdView = () => (
    <div className="space-y-4 animate-fade-in">

      {/* AdSense banner — solo se muestra si hay slot configurado */}
      {ADSENSE_MODAL_SLOT && !canUnlock && (
        <div className="rounded-2xl overflow-hidden bg-[#111] border border-[#1e1e1e] flex items-center justify-center min-h-[100px]">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '100px' }}
            data-ad-client={ADSENSE_PUB}
            data-ad-slot={ADSENSE_MODAL_SLOT}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}

      {/* Countdown / success */}
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 min-h-[120px]">
        {!canUnlock ? (
          <>
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#2a2a2a" strokeWidth="4" />
                <circle
                  cx="32" cy="32" r="28" fill="none"
                  stroke="#7c3aed" strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.9s ease' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-black text-violet-400">
                {countdown}
              </span>
            </div>
            <p className="text-zinc-500 text-xs text-center">{t.watchingAd}</p>
          </>
        ) : (
          <div className="animate-spring-in flex flex-col items-center gap-2">
            <CheckCircle size={36} className="text-emerald-400" />
            <p className="text-emerald-400 text-sm font-semibold">{t.ready}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => { onWatchAd(); setShowingAd(false); setCountdown(15); setCanUnlock(false); }}
        disabled={!canUnlock}
        className={`w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200
          flex items-center justify-center gap-2 press-scale ${
          canUnlock
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
            : 'bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-600 cursor-not-allowed'
        }`}
      >
        {canUnlock
          ? <><CheckCircle size={14} />{actionContent.buttonReady}</>
          : <><Clock size={14} />{actionContent.buttonWaiting} {countdown}s</>
        }
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 ios-blur flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl max-w-md w-full
        max-h-[90vh] flex flex-col relative shadow-ios-modal animate-spring-in">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-zinc-300
            hover:bg-white/5 rounded-xl transition-all z-10 press-scale"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="shrink-0 p-6 pb-4 text-center border-b border-white/5">
          <div className="w-12 h-12 bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl
            flex items-center justify-center mb-3 mx-auto">
            <img src="/assets/tucv-logo.svg" alt="TuCV" className="w-8 h-8 rounded-xl" />
          </div>
          <h2 className="text-base font-semibold text-white mb-1">{actionContent.title}</h2>
          <p className="text-emerald-400 text-xs font-medium mb-0.5">{t.subtitle}</p>
          <p className="text-zinc-600 text-xs">{t.description}</p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {showLimitReached ? <LimitView /> : !showingAd ? <PreAdView /> : <AdView />}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 pb-5 pt-3 border-t border-white/5">
          <p className="text-center text-[11px] text-zinc-700">{t.supportMessage}</p>
        </div>
      </div>
    </div>
  );
};
