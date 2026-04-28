import React from 'react'
import BlogLayout, { BlogPostMeta } from '../BlogLayout'

export const meta: BlogPostMeta = {
  slug: 'optimizar-cv-con-inteligencia-artificial',
  title: 'Cómo optimizar tu CV con inteligencia artificial en 2026',
  description: 'La IA puede mejorar tu CV en segundos: detecta errores, sugiere palabras clave ATS y reescribe tus logros. Aprende cómo aprovecharla al máximo.',
  date: '28 de abril de 2026',
  readTime: '6 min',
  category: 'IA y CV',
  keywords: ['optimizar cv con ia', 'cv inteligencia artificial', 'cv ia', 'curriculum con ia', 'ia para curriculum'],
}

const s = {
  h2: 'text-xl font-bold text-white mt-10 mb-4',
  h3: 'text-base font-semibold text-white mt-6 mb-2',
  p: 'text-white/70 text-[15px] leading-relaxed mb-4',
  ul: 'space-y-2 mb-6 ml-1',
  li: 'flex gap-2.5 text-white/70 text-[15px] leading-relaxed',
  check: 'text-emerald-400 shrink-0 mt-0.5',
  dot: 'text-violet-400 shrink-0 mt-0.5',
  box: 'bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 mb-5',
  highlight: 'bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5 mb-6',
  strong: 'text-white font-semibold',
  num: 'bg-violet-500/20 text-violet-300 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5',
}

export default function OptimizarCvConIa() {
  return (
    <BlogLayout meta={meta}>

      <p className={s.p}>
        La inteligencia artificial cambió la forma de crear currículums. Lo que antes llevaba horas —
        adaptar el CV a cada oferta, encontrar las palabras clave correctas, reformular logros — ahora
        se puede hacer en segundos. Pero para usarla bien, hay que entender qué puede hacer y qué no.
      </p>

      <h2 className={s.h2}>Qué puede hacer la IA por tu CV</h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          { title: 'Detectar palabras clave ATS', desc: 'Compara tu CV con la descripción del puesto e identifica qué términos faltan para superar el filtro.' },
          { title: 'Reescribir logros con impacto', desc: 'Convierte frases genéricas en logros cuantificados con verbos de acción y métricas concretas.' },
          { title: 'Eliminar redundancias', desc: 'Identifica frases repetidas, relleno innecesario y secciones que no aportan valor.' },
          { title: 'Adaptar el tono al sector', desc: 'Ajusta el lenguaje según el sector (más técnico para tecnología, más orientado a negocio para ventas).' },
          { title: 'Sugerir estructura', desc: 'Recomienda el orden óptimo de las secciones según tu experiencia y el puesto.' },
          { title: 'Traducción profesional', desc: 'Traduce el CV completo entre idiomas manteniendo los matices profesionales del sector.' },
        ].map((item) => (
          <div key={item.title} className={s.box} style={{ margin: 0 }}>
            <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
            <p className="text-white/50 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className={s.h2}>Qué NO puede hacer la IA</h2>
      <p className={s.p}>
        La IA mejora lo que ya existe, pero no puede inventar experiencias o logros.
        Si no hiciste algo, no lo incluyas aunque la IA lo sugiera. Las mentiras en el CV
        se detectan fácilmente en la entrevista.
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Inventar años de experiencia que no tenés</span></li>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Exagerar habilidades que no dominás</span></li>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Reemplazar tu voz personal — el CV debe sonar a vos, no a un robot</span></li>
      </ul>

      <h2 className={s.h2}>Cómo usar la IA correctamente paso a paso</h2>

      <div className="space-y-4 mb-8">
        {[
          { n: '1', title: 'Empieza con tu contenido real', text: 'Antes de pedirle a la IA que optimice, escribe toda tu experiencia, logros y habilidades de forma honesta y completa. La IA mejora contenido existente, no lo crea desde cero.' },
          { n: '2', title: 'Pega la descripción del puesto', text: 'El mejor uso de la IA es darle la oferta de trabajo específica junto con tu CV. Así puede comparar qué falta y qué sobra para ese rol concreto.' },
          { n: '3', title: 'Revisa cada sugerencia individualmente', text: 'No aceptes los cambios en bloque. Lee cada sugerencia y asegúrate de que es verdad y de que suena como vos.' },
          { n: '4', title: 'Guarda versiones por sector', text: 'Una vez optimizado para una categoría de puestos, guarda esa versión. Para otro tipo de rol, parte del CV base y optimiza de nuevo.' },
        ].map((step) => (
          <div key={step.n} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
              <span className="text-violet-400 font-black text-sm">{step.n}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">{step.title}</p>
              <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className={s.h2}>De esto a esto: ejemplo real de mejora con IA</h2>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-3">Antes (sin IA)</p>
          <p className="text-white/60 text-sm leading-relaxed italic">
            "Trabajé en el departamento de marketing. Me encargué de las redes sociales y
            ayudé a crear contenido. También participé en la organización de eventos."
          </p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">Después (con IA)</p>
          <p className="text-white/60 text-sm leading-relaxed italic">
            "Gestioné las redes sociales de la empresa (Instagram, LinkedIn, Twitter)
            aumentando el engagement un 47% en 6 meses. Produje 20+ piezas de contenido mensual
            y coordiné 3 eventos corporativos con más de 200 asistentes cada uno."
          </p>
        </div>
      </div>

      <h2 className={s.h2}>Herramientas de IA para CV: comparativa</h2>
      <div className={s.box}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4 text-white/40 font-medium">Herramienta</th>
              <th className="text-left py-2 pr-4 text-white/40 font-medium">Precio</th>
              <th className="text-left py-2 text-white/40 font-medium">Ideal para</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-2.5 pr-4 font-medium text-white">TuCV</td>
              <td className="py-2.5 pr-4 text-white/60">Gratis / $3.99</td>
              <td className="py-2.5 text-white/60">CV completo + optimización ATS + traducción</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-white">ChatGPT</td>
              <td className="py-2.5 pr-4 text-white/60">Gratis / $20</td>
              <td className="py-2.5 text-white/60">Reescribir párrafos específicos con prompts</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-white">Kickresume</td>
              <td className="py-2.5 pr-4 text-white/60">$19/mes</td>
              <td className="py-2.5 text-white/60">Plantillas premium + IA integrada</td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4 font-medium text-white">Resume.io</td>
              <td className="py-2.5 pr-4 text-white/60">$2.95/semana</td>
              <td className="py-2.5 text-white/60">Diseños modernos, menos enfoque en ATS</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className={s.h2}>Optimiza tu CV con IA ahora mismo, gratis</h2>
      <p className={s.p}>
        <a href="/app" className="text-violet-400 hover:text-violet-300">TuCV</a> integra IA
        directamente en el editor: pegá la descripción del puesto, hacé clic en "Optimizar con IA"
        y recibís sugerencias específicas para cada sección de tu CV. Una vez por día gratis,
        ilimitado con Premium.
      </p>

    </BlogLayout>
  )
}
