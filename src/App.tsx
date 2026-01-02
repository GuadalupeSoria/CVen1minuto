import React, { useState } from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Editor from './components/Editor'
import Preview from './components/Preview'
import AIOptimizer from './components/AIOptimizer'
import { FileText } from 'lucide-react'

function App() {
  return (
    <PortfolioProvider>
      <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Editor with toggle */}
          <div className="w-full md:w-[550px] bg-white border-r border-gray-200 overflow-y-auto">
            <Editor />
          </div>

          {/* Center Panel - Preview */}
          <div className="flex-1 overflow-y-auto hidden md:block">
            <Preview />
          </div>

          {/* Right Panel - Vertical AdSense Banner */}
          <div className="hidden lg:block w-[160px] bg-white border-l border-gray-200 p-2 overflow-hidden">
            <div className="sticky top-4">
              {/* AdSense Vertical Banner 160x600 */}
              <div className="text-xs text-gray-400 text-center mb-2">Publicidad</div>
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-XXXXXXXXXX"
                   data-ad-slot="XXXXXXXXX"
                   data-ad-format="vertical"
                   data-full-width-responsive="false"></ins>
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div>
          </div>
        </div>
      </div>
    </PortfolioProvider>
  )
}

export default App