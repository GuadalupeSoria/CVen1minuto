import React, { useState, useEffect } from 'react'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Footer from './components/Footer'
import PrivacyPolicy from './pages/PrivacyPolicy'
import About from './pages/About'
import Terms from './pages/Terms'
import LandingPage from './pages/LandingPage'
import BlogIndex from './pages/blog/BlogIndex'
import CvParaAts from './pages/blog/posts/cv-para-ats'
import ErroresEnElCv from './pages/blog/posts/errores-en-el-cv'
import CvSinExperiencia from './pages/blog/posts/cv-sin-experiencia'
import OptimizarCvConIa from './pages/blog/posts/optimizar-cv-con-ia'
import CvCronologicoVsFuncional from './pages/blog/posts/cv-cronologico-vs-funcional'
import CvEnIngles from './pages/blog/posts/cv-en-ingles'
import OnboardingTour, { useOnboarding } from './components/OnboardingTour'
import { PenLine, Eye, CheckCircle, HelpCircle } from 'lucide-react'
import subscriptionService from './services/subscriptionService'
import { activatePremiumForUser } from './lib/supabase'

type Page = 'landing' | 'app' | 'privacy' | 'about' | 'terms' | 'blog' | 'blog-post'

function getPageFromPath(): Page {
  const path = window.location.pathname
  if (path === '/') { window.location.replace('/app'); return 'app' }
  if (path === '/welcome') return 'landing'
  if (path === '/privacy') return 'privacy'
  if (path === '/about') return 'about'
  if (path === '/terms') return 'terms'
  if (path === '/blog') return 'blog'
  if (path.startsWith('/blog/')) return 'blog-post'
  return 'app'
}

function navigate(path: string) {
  window.history.pushState({}, '', path)
}

function AppInner() {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')
  const [showStripeSuccess, setShowStripeSuccess] = useState(false)
  const [pendingPremiumActivation, setPendingPremiumActivation] = useState(false)
  const { portfolioData } = usePortfolio()
  const lang = (portfolioData.language as string) || 'es'
  const { show: showTour, complete: completeTour, reset: resetTour } = useOnboarding()
  const { user, loading: authLoading, refreshProfile } = useAuth()

  // Paso 1: detectar retorno de Stripe y limpiar URL
  useEffect(() => {
    if (subscriptionService.detectStripeReturn()) {
      setPendingPremiumActivation(true)
    }
  }, [])

  // Paso 2: cuando auth carga y hay activación pendiente, activar
  // (siempre llega logueado porque login es obligatorio antes de ir a Stripe)
  useEffect(() => {
    if (!pendingPremiumActivation || authLoading) return
    setPendingPremiumActivation(false)
    if (!user) return  // no debería ocurrir, pero por seguridad

    subscriptionService.activatePremium()                                   // localStorage inmediato
    activatePremiumForUser(user.id).then(ok => { if (ok) refreshProfile() }) // Supabase
    setShowStripeSuccess(true)
    setTimeout(() => setShowStripeSuccess(false), 6000)
  }, [pendingPremiumActivation, authLoading, user])

  return (
    <div className="h-screen flex flex-col bg-[#0F0F0F] overflow-hidden">

        {/* Toast de éxito Stripe */}
        {showStripeSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-3 bg-emerald-900/90 border border-emerald-700 text-emerald-200 rounded-2xl shadow-2xl backdrop-blur-xl animate-spring-in">
            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">
              {lang === 'es' ? '¡Premium activado! Acceso ilimitado.' : 'Premium activated! Unlimited access.'}
            </span>
          </div>
        )}

        {showTour && (
          <OnboardingTour
            language={lang}
            onDone={completeTour}
            mobileTab={mobileTab}
            onTabSwitch={setMobileTab}
          />
        )}

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
        <div className="flex-1 flex overflow-visible min-h-0">

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
  const [page, setPage] = useState<Page>(getPageFromPath())

  useEffect(() => {
    const onPopState = () => {
      setPage(getPageFromPath())
      try {
        (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle =
          (window as Window & { adsbygoogle?: unknown[] }).adsbygoogle || []
        ;((window as Window & { adsbygoogle?: unknown[] }).adsbygoogle as unknown[]).push({})
      } catch { /* noop */ }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (page === 'privacy') return <PrivacyPolicy />
  if (page === 'about') return <About />
  if (page === 'terms') return <Terms />
  if (page === 'blog') return <BlogIndex />
  if (page === 'blog-post') {
    const slug = window.location.pathname.replace('/blog/', '')
    const blogPosts: Record<string, React.ReactElement> = {
      'como-hacer-cv-para-pasar-filtros-ats': <CvParaAts />,
      'errores-en-el-cv-que-te-descartan': <ErroresEnElCv />,
      'como-hacer-cv-sin-experiencia-laboral': <CvSinExperiencia />,
      'optimizar-cv-con-inteligencia-artificial': <OptimizarCvConIa />,
      'cv-cronologico-vs-funcional': <CvCronologicoVsFuncional />,
      'como-traducir-cv-al-ingles': <CvEnIngles />,
    }
    return blogPosts[slug] ?? <BlogIndex />
  }

  if (page === 'landing') {
    return (
      <LandingPage
        onStart={() => {
          navigate('/')
          setPage('app')
        }}
      />
    )
  }

  return (
    <AuthProvider>
      <PortfolioProvider>
        <AppInner />
      </PortfolioProvider>
    </AuthProvider>
  )
}

export default App

