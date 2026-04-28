import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0F0F0F] py-4 px-6 shrink-0">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-white/25">
        <div className="flex items-center gap-1.5">
          <img src="/assets/tucv-logo.svg" alt="TuCV" className="h-6" />
          <span>© {new Date().getFullYear()}</span>
        </div>
        <nav className="flex items-center gap-4">
          <a href="/about" className="hover:text-white/60 transition-colors">Acerca de</a>
          <span className="text-white/10">·</span>
          <a href="/privacy" className="hover:text-white/60 transition-colors">Privacidad</a>
          <span className="text-white/10">·</span>
          <a href="/terms" className="hover:text-white/60 transition-colors">Términos</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
