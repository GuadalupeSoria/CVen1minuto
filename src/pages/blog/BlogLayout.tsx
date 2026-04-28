import React from 'react'
import { ArrowLeft, Clock, Calendar, Pen } from 'lucide-react'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  keywords: string[]
}

interface BlogLayoutProps {
  meta: BlogPostMeta
  children: React.ReactNode
}

export default function BlogLayout({ meta, children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <header className="sticky top-0 z-10 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <a href="/blog" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} />
            Blog
          </a>
          <span className="text-white/20">·</span>
          <span className="text-xs text-violet-400 font-medium">{meta.category}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-4 text-xs text-white/30 mb-4">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{meta.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={12} />{meta.readTime} de lectura</span>
            <span className="flex items-center gap-1.5"><Pen size={12} />TuCV</span>
          </div>
          <h1 className="text-3xl font-bold leading-tight mb-4">{meta.title}</h1>
          <p className="text-white/50 text-lg leading-relaxed">{meta.description}</p>
        </div>

        <div className="prose-tucv">
          {children}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-[#1C1C1E] border border-violet-500/20 rounded-3xl p-8 text-center">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Ponlo en práctica ahora</p>
          <h2 className="text-2xl font-bold mb-3">Crea tu CV profesional gratis</h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Editor completo, optimización con IA, plantillas ATS y exportación PDF. Sin registro, en minutos.
          </p>
          <a
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Crear mi CV gratis →
          </a>
        </div>
      </main>

      <footer className="border-t border-white/6 py-6 mt-10">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between text-sm text-white/30">
          <span>© {new Date().getFullYear()} TuCV</span>
          <div className="flex gap-4">
            <a href="/app" className="hover:text-white transition-colors">Editor</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/about" className="hover:text-white transition-colors">Acerca de</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
