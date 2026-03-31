import { useState, useEffect } from 'react'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import About from './pages/About'
import Terms from './pages/Terms'
import OnboardingTour, { useOnboarding } from './components/OnboardingTour'
import { PenLine, Eye, CheckCircle, HelpCircle } from 'lucide-react'
import subscriptionService from './services/subscriptionService'

type Page = 'app' | 'privacy' | 'about' | 'terms'

function getPageFromHash(): Page {
  const hash = window.location.hash.replace('#', '')
  if (hash === 'privacy') return 'privacy'
  if (hash === 'about') return 'about'
  if (hash === 'terms') return 'terms'
  return 'app'
}

function AppInner() {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')
  const [showStripeSuccess, setShowStripeSuccess] = useState(false)
  const { portfolioData } = usePortfolio()
  const lang = (portfolioData.language as string) || 'es'
  const { show: showTour, complete: completeTour, reset: resetTour } = useOnboarding()

  useEffect(() => {
    // Verificar retorno desde Stripe Payment Link (?stripe_paid=1)
    const activated = subscriptionService.handleStripeReturn()
    if (activated) {
      setShowStripeSuccess(true)
      setTimeout(() => setShowStripeSuccess(false), 5000)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col bg-[#0F0F0F] overflow-hidden">

        {/* Toast de éxito Stripe */}
        {showStripeSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-3 bg-emerald-900/90 border border-emerald-700 text-emerald-200 rounded-2xl shadow-2xl backdrop-blur-xl animate-spring-in">
            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">¡Premium activado! Acceso ilimitado.</span>
          </div>
        )}

        {showTour && <OnboardingTour language={lang} onDone={completeTour} />}

        {/* Mobile Tab Navigation */}
        <div className="md:hidden flex border-b border-[#38383A] bg-[#1C1C1E]/90 backdrop-blur-xl sticky top-0 z-20">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all duration-200 ${
              mobileTab === 'editor'
                ? 'text-white border-b-2 border-violet-500'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <PenLine size={15} />
            Editor
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-all duration-200 ${
              mobileTab === 'preview'
                ? 'text-white border-b-2 border-violet-500'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Eye size={15} />
            Vista previa
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* Left Panel — Editor */}
          <div className={`w-full md:w-[390px] lg:w-[420px] xl:w-[440px] bg-[#1C1C1E] border-r border-[#38383A] flex flex-col overflow-hidden ${
            mobileTab === 'editor' ? 'flex' : 'hidden md:flex'
          }`}>
            <Editor />
          </div>

          {/* Center Panel — Preview */}
          <div className={`flex-1 overflow-y-auto bg-[#0F0F0F] flex flex-col ${
            mobileTab === 'preview' ? 'block' : 'hidden md:flex'
          }`}>
            <div className="flex-1">
              <Preview />
            </div>
            <Footer />
          </div>
        </div>

        {/* Floating help button */}
        <button
          onClick={resetTour}
          title={lang === 'es' ? 'Ver tutorial' : 'Show tutorial'}
          className="fixed bottom-6 right-5 z-[9999] w-10 h-10 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] text-white/50 hover:text-white hover:border-violet-500/50 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        >
          <HelpCircle size={18} />
        </button>
      </div>
  )
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromHash())

  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (page === 'privacy') return <PrivacyPolicy />
  if (page === 'about') return <About />
  if (page === 'terms') return <Terms />

  return (
    <PortfolioProvider>
      <AppInner />
    </PortfolioProvider>
  )
}

export default App

