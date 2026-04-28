import React from 'react'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { meta as ats } from './posts/cv-para-ats'
import { meta as errores } from './posts/errores-en-el-cv'
import { meta as sinExp } from './posts/cv-sin-experiencia'
import { meta as ia } from './posts/optimizar-cv-con-ia'
import { meta as formatos } from './posts/cv-cronologico-vs-funcional'
import { meta as ingles } from './posts/cv-en-ingles'
import type { BlogPostMeta } from './BlogLayout'

const posts: BlogPostMeta[] = [ats, errores, sinExp, ia, formatos, ingles]

const categoryColors: Record<string, string> = {
  'ATS': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Consejos de CV': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Primer Empleo': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'IA y CV': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Formatos de CV': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'CV en Inglés': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Header */}
      <header className="border-b border-white/8 bg-[#0F0F0F]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <a
            href="/app"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="font-medium">TuCV</span>
          </a>
          <a
            href="/app"
            className="text-xs px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition-colors font-medium"
          >
            Crear CV gratis
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            Guías de CV y empleo
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Consejos prácticos para crear un CV profesional, superar filtros ATS y conseguir más entrevistas.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 hover:border-white/20 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${categoryColors[post.category] ?? 'bg-white/5 text-white/40 border-white/10'}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-white/30 text-xs">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-violet-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
                {post.description}
              </p>
              <div className="flex items-center gap-1.5 text-violet-400 text-xs font-medium group-hover:gap-2.5 transition-all">
                <span>Leer artículo</span>
                <ArrowRight size={13} />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-violet-600/10 border border-violet-600/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">¿Listo para crear tu CV?</h2>
          <p className="text-white/50 mb-5 text-sm">
            Aplicá todo lo que aprendiste. Creá tu CV optimizado para ATS en minutos, gratis.
          </p>
          <a
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-sm transition-all hover:scale-105 active:scale-95"
          >
            Crear CV gratis
            <ArrowRight size={15} />
          </a>
        </div>
      </main>

      <footer className="border-t border-white/8 mt-12 py-8">
        <div className="max-w-4xl mx-auto px-5 flex flex-wrap gap-4 justify-between items-center">
          <p className="text-white/30 text-xs">© 2026 TuCV. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-xs text-white/30">
            <a href="/app" className="hover:text-white/60 transition-colors">App</a>
            <a href="/about" className="hover:text-white/60 transition-colors">Acerca de</a>
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacidad</a>
            <a href="/terms" className="hover:text-white/60 transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
