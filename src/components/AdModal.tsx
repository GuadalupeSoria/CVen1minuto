import React, { useState, useEffect } from 'react';
import { X, Clock, Play, CheckCircle } from 'lucide-react';

interface AdModalProps {
  visible: boolean;
  onClose: () => void;
  onWatchAd: () => void;
  action: 'download' | 'optimize';
  language?: string;
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
    subtitle: 'Este servicio es completamente gratuito',
    description: 'Para mantener el servicio gratuito, necesitamos mostrar un anuncio breve.',
    instruction: 'Mirá el anuncio durante 15 segundos para continuar:',
    watchingAd: 'Viendo anuncio...',
    waitMessage: 'segundo para desbloquear',
    waitMessagePlural: 'segundos para desbloquear',
    ready: '¡Listo! Ya podés continuar',
    supportMessage: '💚 Gracias por tu apoyo, esto nos ayuda a mantener el servicio gratuito para todos'
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
    subtitle: 'This service is completely free',
    description: 'To keep the service free, we need to show a short advertisement.',
    instruction: 'Watch the ad for 15 seconds to continue:',
    watchingAd: 'Watching ad...',
    waitMessage: 'second to unlock',
    waitMessagePlural: 'seconds to unlock',
    ready: 'Ready! You can continue',
    supportMessage: '💚 Thank you for your support, this helps us keep the service free for everyone'
  }
};

export const AdModal: React.FC<AdModalProps> = ({
  visible,
  onClose,
  onWatchAd,
  action,
  language = 'es'
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

  // Cargar AdSense cuando se muestra el anuncio
  useEffect(() => {
    if (showingAd) {
      try {
        // @ts-expect-error - adsbygoogle is injected by Google AdSense script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Error loading AdSense:', e);
      }
    }
  }, [showingAd]);
  
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
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gray-700 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-xl">
            <img src="/assets/logonew.png" alt="Logo" className="w-14 h-14" />
          </div>

          <h2 className="text-3xl font-bold mb-2">{actionContent.title}</h2>
          <p className="text-green-600 font-semibold text-lg mb-2">
            {t.subtitle}
          </p>
          <p className="text-gray-600">
            {t.description}
          </p>
        </div>

        {!showingAd ? (
          <div className="mb-6">
            <div className="border-2 border-blue-500 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <p className="text-gray-700 mb-4 font-medium text-center">
                {t.instruction}
              </p>
              <button
                onClick={handleStartAd}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Play size={24} fill="white" />
                {language === 'es' ? 'Ver Anuncio (15 seg)' : 'Watch Ad (15 sec)'}
              </button>
            </div>
          </div>
        ) : (
          /* Vista cuando está viendo el anuncio */
          <div className="mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <Clock className="mx-auto text-blue-500 mb-2" size={48} />
                <h3 className="text-2xl font-bold mb-2">{t.watchingAd}</h3>
                {!canUnlock ? (
                  <p className="text-gray-600">
                    {countdown} {countdown === 1 ? t.waitMessage : t.waitMessagePlural}
                  </p>
                ) : (
                  <p className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
                    <CheckCircle size={24} />
                    {t.ready}
                  </p>
                )}
              </div>

              {/* Anuncio de AdSense */}
              <div className="bg-white rounded-lg p-4 min-h-[280px] flex items-center justify-center">
                <ins className="adsbygoogle"
                     style={{ display: 'block' }}
                     data-ad-client="ca-pub-2152317919633317"
                     data-ad-slot={action === 'download' ? '3107429852' : '6910943499'}
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleUnlock}
                  disabled={!canUnlock}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                    canUnlock
                      ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canUnlock 
                    ? `✅ ${actionContent.buttonReady}` 
                    : `⏳ ${actionContent.buttonWaiting} ${countdown}s`
                  }
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-500">
          {t.supportMessage}
        </p>
      </div>
    </div>
  );
};
