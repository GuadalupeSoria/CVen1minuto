import React from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Editor from './components/Editor'
import Preview from './components/Preview'

function App() {
  return (
    <PortfolioProvider>
      <div className="h-screen flex flex-col md:flex-row bg-gray-50">
        <Editor />
        <div className="hidden md:block md:flex-1">
          <Preview />
        </div>
      </div>
    </PortfolioProvider>
  )
}

export default App