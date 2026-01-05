import { useState, useEffect } from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { Edit3, Eye } from 'lucide-react'

function App() {
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor')

  useEffect(() => {
    // Inicializar anuncios de AdSense
    try {
      // @ts-expect-error - adsbygoogle is injected by Google AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Error loading AdSense:', e);
    }
  }, []);

  return (
    <PortfolioProvider>
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Mobile Tab Navigation */}
        <div className="md:hidden flex border-b border-gray-200 bg-white sticky top-0 z-20">
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold transition-all ${
              mobileTab === 'editor'
                ? 'bg-blue-500 text-white border-b-2 border-blue-600'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            <Edit3 size={18} />
            Editor
          </button>
          <button
            onClick={() => setMobileTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold transition-all ${
              mobileTab === 'preview'
                ? 'bg-blue-500 text-white border-b-2 border-blue-600'
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            <Eye size={18} />
            Preview
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Editor with toggle */}
          <div className={`w-full md:w-[380px] lg:w-[400px] xl:w-[420px] bg-white border-r border-gray-200 overflow-y-auto ${
            mobileTab === 'editor' ? 'block' : 'hidden md:block'
          }`}>
            <Editor />
          </div>

          {/* Center Panel - Preview */}
          <div className={`flex-1 overflow-y-auto ${
            mobileTab === 'preview' ? 'block' : 'hidden md:block'
          }`}>
            <Preview />
          </div>

          {/* Right Panel - Vertical AdSense Banner */}
          <div className="hidden xl:block w-[100px] bg-white border-l border-gray-200 p-2 overflow-hidden">
            <div className="sticky top-4">
              {/* AdSense Vertical Banner */}
              <div className="text-xs text-gray-400 text-center mb-2">Publicidad</div>
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-2152317919633317"
                   data-ad-slot="4314723833"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
            </div>
          </div>
        </div>
      </div>
    </PortfolioProvider>
  )
}

export default App