import React, { useState } from 'react'
import { ArrowLeft, Sparkles, Download, Languages, Palette, FileText, ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    q: '¿Es completamente gratuito?',
    a: 'Sí. Puedes crear, editar y exportar tu CV en PDF de forma gratuita, con 1 descarga diaria. La versión Premium ($4.99/mes) elimina el límite de descargas y permite usar la IA sin restricciones.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Tu CV se guarda en el almacenamiento local de tu propio navegador. No subimos ni almacenamos tu información en servidores externos, salvo cuando usas la función de IA (el texto es procesado por Groq AI y no se guarda).',
  },
  {
    q: '¿Necesito registrarme?',
    a: 'No. Puedes usar todas las funciones gratuitas sin crear una cuenta. Solo necesitas suscribirte si quieres acceso Premium ilimitado.',
  },
  {
    q: '¿Cómo funciona la optimización con IA?',
    a: 'Nuestra IA analiza el contenido de tu CV y sugiere mejoras específicas en cada sección: mejores verbos de acción, cuantificación de logros, optimización para sistemas ATS, y más. Puedes aceptar o rechazar cada sugerencia individualmente.',
  },
  {
    q: '¿Puedo traducir mi CV?',
    a: 'Sí. Con un solo clic puedes traducir todo el contenido de tu CV entre español e inglés, manteniendo el formato y la estructura intactos.',
  },
  {
    q: '¿En qué formatos puedo exportar?',
    a: 'Actualmente exportamos en PDF de alta calidad, optimizado para impresión y para sistemas ATS (rastreo de candidatos). Próximamente agregaremos DOCX.',
  },
  {
    q: '¿Cómo cancelo la suscripción Premium?',
    a: 'Puedes cancelar tu suscripción en cualquier momento desde el portal de Stripe. Seguirás teniendo acceso Premium hasta el final del período pagado.',
  },
]

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Volver al editor
          </a>
          <span className="text-white/20">·</span>
          <span className="text-sm font-semibold text-white">Acerca de</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-6">
            <Sparkles size={12} />
            Generador de CV con IA
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Crea tu CV profesional<br />en menos de un minuto
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
            Herramienta gratuita para construir, optimizar y exportar tu currículum
            con inteligencia artificial. Sin registro, sin complicaciones.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Crear mi CV ahora
          </a>
        </div>

        {/* Features grid */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">¿Qué puedes hacer?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FileText size={18} className="text-violet-400" />,
                title: 'Editor completo',
                desc: 'Agrega información personal, experiencia, educación, habilidades, proyectos e idiomas con un editor intuitivo y responsive.',
              },
              {
                icon: <Sparkles size={18} className="text-violet-400" />,
                title: 'Optimización con IA',
                desc: 'Nuestra IA analiza tu CV y sugiere mejoras reales: verbos de acción, logros cuantificados, palabras clave para ATS.',
              },
              {
                icon: <Languages size={18} className="text-violet-400" />,
                title: 'Traducción automática',
                desc: 'Traduce todo tu CV entre español e inglés con un solo clic, manteniendo formato y estructura perfectos.',
              },
              {
                icon: <Palette size={18} className="text-violet-400" />,
                title: 'Múltiples plantillas',
                desc: 'Elige entre tres diseños modernos: Original, Moderno y Clásico. Personaliza el color principal a tu gusto.',
              },
              {
                icon: <Download size={18} className="text-violet-400" />,
                title: 'Exportación PDF',
                desc: 'Exporta tu CV en PDF de alta calidad, optimizado para impresión y compatible con sistemas ATS empresariales.',
              },
              {
                icon: <FileText size={18} className="text-violet-400" />,
                title: 'Importación de PDF',
                desc: 'Sube tu CV existente en PDF y nuestra IA extrae y estructura la información automáticamente para editarla.',
              },
            ].map((f, i) => (
              <div key={i} className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-white">{f.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">Cómo funciona</h2>
          <div className="space-y-3">
            {[
              { num: '01', title: 'Completa el editor', desc: 'Ingresa tu información en cada sección del editor.' },
              { num: '02', title: 'Optimiza con IA', desc: 'Activa el asistente de IA para recibir sugerencias personalizadas.' },
              { num: '03', title: 'Elige tu plantilla', desc: 'Selecciona el diseño que mejor represente tu perfil.' },
              { num: '04', title: 'Exporta tu CV', desc: 'Descarga el PDF y empieza a postular.' },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white/3 transition-colors">
                <span className="text-2xl font-black text-violet-500/30 w-10 shrink-0">{s.num}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm">{s.title}</h3>
                  <p className="text-white/50 text-sm mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-6">Preguntas frecuentes</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#1C1C1E] border border-white/8 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="font-medium text-sm text-white">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} className="text-white/30 shrink-0" />
                    : <ChevronDown size={16} className="text-white/30 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-10 border-t border-white/8">
          <h2 className="text-2xl font-bold mb-3">¿Listo para empezar?</h2>
          <p className="text-white/50 text-sm mb-6">Gratis, sin registro, en menos de un minuto.</p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Crear mi CV
          </a>
        </section>

      </main>

      <footer className="border-t border-white/6 py-6">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between text-sm text-white/30">
          <span>© {new Date().getFullYear()} TuCV</span>
          <div className="flex gap-4">
            <a href="/" className="hover:text-white transition-colors">Editor</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacidad</a>
            <a href="/terms" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
