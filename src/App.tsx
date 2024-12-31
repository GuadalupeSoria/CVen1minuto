import React from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Editor from './components/Editor'
import Preview from './components/Preview'

function App() {
  return (
    <PortfolioProvider>
      <div className="h-screen flex bg-gray-50">
        <Editor />
        <Preview />
      </div>
    </PortfolioProvider>
  )
}

export default App