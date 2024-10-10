import React from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
import Header from './components/Header'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Footer from './components/Footer'

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col md:flex-row">
          <Editor />
          <Preview />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  )
}

export default App