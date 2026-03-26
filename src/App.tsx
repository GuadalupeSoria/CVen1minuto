import { useState, useEffect } from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { PenLine, Eye, CheckCircle } from 'lucide-react'
import subscriptionService from './services/subscriptionService'

function App() {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')
  const [showStripeSuccess, setShowStripeSuccess] = useState(false)

  useEffect(() => {
    // Verificar retorno desde Stripe Payment Link (?stripe_paid=1)
    const activated = subscriptionService.handleStripeReturn()
    if (activated) {
      setShowStripeSuccess(true)
      setTimeout(() => setShowStripeSuccess(false), 5000)
    }
  }, [])

  return (
    <PortfolioProvider>
      <div className="h-screen flex flex-col bg-[#0F0F0F] overflow-hidden">

        {/* Toast de éxito Stripe */}
        {showStripeSuccess && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-3 bg-emerald-900/90 border border-emerald-700 text-emerald-200 rounded-2xl shadow-2xl backdrop-blur-xl animate-scale-in">
            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold">¡Premium activado! Acceso ilimitado.</span>
          </div>
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
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* Left Panel — Editor */}
          <div className={`w-full md:w-[390px] lg:w-[420px] xl:w-[440px] bg-[#1C1C1E] border-r border-[#38383A] flex flex-col overflow-hidden ${
            mobileTab === 'editor' ? 'flex' : 'hidden md:flex'
          }`}>
            <Editor />
          </div>

          {/* Center Panel — Preview */}
          <div className={`flex-1 overflow-y-auto bg-[#0F0F0F] ${
            mobileTab === 'preview' ? 'block' : 'hidden md:block'
          }`}>
            <Preview />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  )
}

export default App

