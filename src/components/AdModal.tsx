import React, { useState, useEffect } from 'react';
import { X, Clock, Play, CheckCircle } from 'lucide-react';

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
    download: {
      title: 'Para descargar tu CV',
      emoji: '📄',
      buttonReady: 'Descargar PDF',
      buttonWaiting: 'Esperá'
    },
    optimize: {
      title: 'Para optimizar con IA',
      emoji: '✨',
      buttonReady: 'Optimizar con IA',
      buttonWaiting: 'Esperá'
    },
    translate: {
      title: 'Para traducir tu CV',
      emoji: '🌍',
      buttonReady: 'Traducir CV',
      buttonWaiting: 'Esperá'
    },
    subtitle: 'Este servicio es completamente gratuito',
    description: 'Para mantener el servicio gratuito, necesitamos mostrar un anuncio breve.',
    instruction: 'Mirá el anuncio durante 15 segundos para continuar:',
    watchingAd: 'Viendo anuncio...',
    waitMessage: 'segundo para desbloquear',
    waitMessagePlural: 'segundos para desbloquear',
    ready: '¡Listo! Ya podés continuar',
    supportMessage: '💚 Gracias por tu apoyo, esto nos ayuda a mantener el servicio gratuito para todos',
    limitReached: 'Límite diario alcanzado',
    limitMessage: 'Ya descargaste tu CV hoy. Volvé mañana o suscribite para descargas ilimitadas.',
    subscribeCTA: 'Suscribirse - $5/mes',
    unlimitedDownloads: '✓ Descargas ilimitadas',
    noAds: '✓ Sin anuncios',
    aiFeatures: '✓ IA ilimitada'
  },
  en: {
    download: {
      title: 'To download your CV',
      emoji: '📄',
      buttonReady: 'Download PDF',
      buttonWaiting: 'Wait'
    },
    optimize: {
      title: 'To optimize with AI',
      emoji: '✨',
      buttonReady: 'Optimize with AI',
      buttonWaiting: 'Wait'
    },
    translate: {
      title: 'To translate your CV',
      emoji: '🌍',
      buttonReady: 'Translate CV',
      buttonWaiting: 'Wait'
    },
    subtitle: 'This service is completely free',
    description: 'To keep the service free, we need to show a short advertisement.',
    instruction: 'Watch the ad for 15 seconds to continue:',
    watchingAd: 'Watching ad...',
    waitMessage: 'second to unlock',
    waitMessagePlural: 'seconds to unlock',
    ready: 'Ready! You can continue',
    supportMessage: '💚 Thank you for your support, this helps us keep the service free for everyone',
    limitReached: 'Daily limit reached',
    limitMessage: 'You already downloaded your CV today. Come back tomorrow or subscribe for unlimited downloads.',
    subscribeCTA: 'Subscribe - $5/month',
    unlimitedDownloads: '✓ Unlimited downloads',
    noAds: '✓ No ads',
    aiFeatures: '✓ Unlimited AI'
  }
};

export const AdModal: React.FC<AdModalProps> = ({
  visible,
  onClose,
  onWatchAd,
  onSubscribe,
  action,
  language = 'es',
  showLimitReached = false
}) => {
  const [showingAd, setShowingAd] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [canUnlock, setCanUnlock] = useState(false);
  
  const t = translations[language as keyof typeof translations] || translations.es;
  const actionContent = t[action];
  
  useEffect(() => {
    if (showingAd && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanUnlock(true);
    }
  }, [showingAd, countdown]);

  useEffect(() => {
    if (!visible) {
      setShowingAd(false);
      setCountdown(15);
      setCanUnlock(false);
    }
  }, [visible]);
  
  if (!visible) return null;

  const handleStartAd = () => {
    setShowingAd(true);
  };

  const handleUnlock = () => {
    onWatchAd();
    setShowingAd(false);
    setCountdown(15);
    setCanUnlock(false);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-2xl flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col relative shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-zinc-400 hover:bg-[#1e1e1e] rounded-xl transition-all z-10"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="shrink-0 p-6 pb-4 text-center border-b border-[#1e1e1e]">
          <div className="w-12 h-12 bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl flex items-center justify-center mb-3 mx-auto">
            <img src="/assets/logonew.png" alt="Logo" className="w-8 h-8 rounded-xl" />
          </div>
          <h2 className="text-base font-semibold text-white mb-1">{actionContent.title}</h2>
          <p className="text-emerald-400 text-xs font-medium mb-1">{t.subtitle}</p>
          <p className="text-zinc-500 text-xs">{t.description}</p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {showLimitReached ? (
            <div className="space-y-3">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4 text-center">
                <p className="text-sm font-semibold text-white mb-1">{t.limitReached}</p>
                <p className="text-zinc-500 text-xs">{t.limitMessage}</p>
              </div>

              <div className="bg-[#1a1a1a] border border-violet-500/20 rounded-2xl p-5">
                <div className="text-center mb-4">
                  <p className="text-sm font-semibold text-white mb-1">
                    {language === 'es' ? 'Premium' : 'Go Premium'}
                  </p>
                  <p className="text-2xl font-bold text-violet-400 mb-0.5">$5<span className="text-sm font-normal text-zinc-500">/mes</span></p>
                  <p className="text-zinc-600 text-xs">{language === 'es' ? 'Cancela cuando quieras' : 'Cancel anytime'}</p>
                </div>
                <div className="space-y-2 mb-4">
                  {[t.unlimitedDownloads, language === 'es' ? 'Traducciones ilimitadas' : 'Unlimited translations', t.aiFeatures, t.noAds].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                      <span>{feat.replace('✓ ', '')}</span>
                    </div>
                  ))}
                </div>
                <button onClick={onSubscribe} className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all">
                  {t.subscribeCTA}
                </button>
              </div>
            </div>
          ) : !showingAd ? (
            <div className="space-y-3">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
                <p className="text-zinc-400 text-xs text-center mb-4">{t.instruction}</p>
                <button
                  onClick={handleStartAd}
                  className="w-full bg-white hover:bg-zinc-100 text-black py-3 px-5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Play size={14} fill="black" />
                  {language === 'es' ? 'Ver anuncio (15s)' : 'Watch ad (15s)'}
                </button>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-4">
                <p className="text-center text-xs text-zinc-500 mb-3">
                  {language === 'es' ? 'O accede sin anuncios' : 'Or access without ads'}
                </p>
                <button onClick={onSubscribe} className="w-full bg-violet-600 hover:bg-violet-500 text-white py-2.5 px-4 rounded-xl font-medium text-sm transition-all">
                  {language === 'es' ? 'Premium $5/mes' : 'Premium $5/month'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 text-center">
                <Clock className="mx-auto text-violet-400 mb-2" size={28} />
                <h3 className="text-sm font-semibold text-white mb-1">{t.watchingAd}</h3>
                {!canUnlock ? (
                  <p className="text-zinc-500 text-xs">{countdown}s {countdown === 1 ? t.waitMessage : t.waitMessagePlural}</p>
                ) : (
                  <p className="text-emerald-400 text-xs font-medium flex items-center justify-center gap-1.5">
                    <CheckCircle size={13} />{t.ready}
                  </p>
                )}
              </div>

              {/* Sponsor placeholder – no real ad shown per AdSense policy */}
              <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-3 min-h-[200px] flex flex-col items-center justify-center gap-4 overflow-hidden">
                {!canUnlock ? (
                  <>
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 border-4 border-[#2a2a2a] rounded-full" />
                      <div
                        className="absolute inset-0 border-4 border-transparent border-t-violet-500 rounded-full animate-spin"
                        style={{ animationDuration: '1s' }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-violet-400">
                        {countdown}
                      </span>
                    </div>
                    <p className="text-zinc-600 text-xs text-center max-w-[180px]">
                      {language === 'es'
                        ? 'Esperando para desbloquear tu CV…'
                        : 'Waiting to unlock your CV…'}
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle size={36} className="text-emerald-400" />
                    <p className="text-emerald-400 text-sm font-semibold">{t.ready}</p>
                  </>
                )}
              </div>

              <button
                onClick={handleUnlock}
                disabled={!canUnlock}
                className={`w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
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
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 pb-5 pt-3 border-t border-[#1e1e1e]">
          <p className="text-center text-[11px] text-zinc-700">
            {t.supportMessage.replace('💚 ', '')}
          </p>
        </div>
      </div>
    </div>
  );
};