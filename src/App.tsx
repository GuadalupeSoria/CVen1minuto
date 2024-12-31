import React from 'react'
import { PortfolioProvider } from './context/PortfolioContext'
<<<<<<< HEAD
import Editor from './components/Editor'
import Preview from './components/Preview'
=======
import Header from './components/Header'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Footer from './components/Footer'
>>>>>>> 56907ed71f91868b814009125b8de65a178d87f7

function App() {
  return (
    <PortfolioProvider>
<<<<<<< HEAD
      <div className="h-screen flex bg-gray-50">
        <Editor />
        <Preview />
=======
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col md:flex-row">
          <Editor />
          <Preview />
        </main>
        <Footer />
>>>>>>> 56907ed71f91868b814009125b8de65a178d87f7
      </div>
    </PortfolioProvider>
  )
}

export default App