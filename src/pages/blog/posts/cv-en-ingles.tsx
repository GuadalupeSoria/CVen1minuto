import React from 'react'
import BlogLayout, { BlogPostMeta } from '../BlogLayout'

export const meta: BlogPostMeta = {
  slug: 'como-traducir-cv-al-ingles',
  title: 'Cómo traducir tu CV al inglés correctamente (sin errores que descarten)',
  description: 'No basta con traducir palabra por palabra. Aprende las diferencias clave entre un CV en español y en inglés, y qué términos nunca debes traducir literalmente.',
  date: '28 de abril de 2026',
  readTime: '6 min',
  category: 'CV en Inglés',
  keywords: ['traducir cv al ingles', 'cv en ingles', 'curriculum en ingles', 'cv ingles español', 'resume ingles'],
}

const s = {
  h2: 'text-xl font-bold text-white mt-10 mb-4',
  h3: 'text-base font-semibold text-white mt-6 mb-2',
  p: 'text-white/70 text-[15px] leading-relaxed mb-4',
  ul: 'space-y-2 mb-5 ml-1',
  li: 'flex gap-2.5 text-white/70 text-[15px] leading-relaxed',
  check: 'text-emerald-400 shrink-0 mt-0.5',
  box: 'bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 mb-5',
  strong: 'text-white font-semibold',
  tag: 'inline-flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-sm text-white/70 mb-2 mr-2',
}

export default function CvEnIngles() {
  return (
    <BlogLayout meta={meta}>
      <p className={s.p}>
        Traducir tu CV al inglés no es solo cambiar las palabras. Un CV en inglés tiene convenciones
        propias que difieren del español, y ciertos términos traducidos literalmente pueden resultar
        incorrectos o incluso generar una mala impresión en reclutadores anglófonos.
      </p>

      <h2 className={s.h2}>CV en español vs Resume en inglés: diferencias clave</h2>
      <div className={s.box}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4 text-white/40 font-medium">Aspecto</th>
              <th className="text-left py-2 pr-4 text-white/40 font-medium">CV (español)</th>
              <th className="text-left py-2 text-white/40 font-medium">Resume (inglés)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ['Extensión','1-2 páginas','1 página (EE.UU.), 2 páginas (UK, Australia)'],
              ['Foto','Habitual en España/LATAM','No se incluye en EE.UU. (discriminación)'],
              ['Fecha de nacimiento','A veces se incluye','Nunca en EE.UU. o UK'],
              ['Estado civil','A veces en LATAM','Nunca'],
              ['Sección objetivos','"Objetivo profesional"','"Professional Summary" (más narrativo)'],
              ['Tiempo verbal','Variable','Pasado simple para trabajos anteriores'],
            ].map(([asp, es, en]) => (
              <tr key={asp}>
                <td className="py-2.5 pr-4 font-medium text-white/80">{asp}</td>
                <td className="py-2.5 pr-4 text-white/50">{es}</td>
                <td className="py-2.5 text-white/50">{en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={s.h2}>Errores de traducción más comunes</h2>

      <h3 className={s.h3}>Títulos y cargos</h3>
      <div className="space-y-2 mb-5">
        {[
          ['Jefe de ventas','Sales Chief ✗','Sales Manager ✓'],
          ['Responsable de marketing','Marketing Responsible ✗','Marketing Manager / Head of Marketing ✓'],
          ['Técnico informático','Computer Technician ✗','IT Specialist / IT Support ✓'],
          ['Auxiliar administrativo','Administrative Auxiliary ✗','Administrative Assistant ✓'],
        ].map(([esp, mal, bien]) => (
          <div key={esp} className="bg-[#1a1a1a] rounded-xl p-3">
            <p className="text-white/40 text-xs mb-1">{esp}</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-red-400 text-sm">{mal}</span>
              <span className="text-white/20">→</span>
              <span className="text-emerald-400 text-sm">{bien}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className={s.h3}>Habilidades y herramientas</h3>
      <p className={s.p}>
        Muchos términos técnicos se usan directamente en inglés aunque el CV sea en español.
        En un CV en inglés, no los "traduzcas" a versiones que no existen:
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>"Hojas de cálculo dinámicas" — el término correcto es "Pivot Tables" o "Dynamic Spreadsheets"</span></li>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>"Lenguaje de consulta estructurado" — di siempre "SQL"</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Los nombres propios de herramientas no se traducen: Salesforce, HubSpot, Jira, Figma, etc.</span></li>
      </ul>

      <h2 className={s.h2}>Verbos de acción en inglés para tu CV</h2>
      <p className={s.p}>
        En un resume en inglés, cada punto de la sección de experiencia debe comenzar con un
        <span className={s.strong}> verbo de acción en pasado simple</span> (para trabajos anteriores)
        o presente (para el trabajo actual):
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
        {[
          ['Led','Lideré'], ['Managed','Gestioné'], ['Developed','Desarrollé'],
          ['Implemented','Implementé'], ['Increased','Aumenté'], ['Reduced','Reduje'],
          ['Designed','Diseñé'], ['Coordinated','Coordiné'], ['Launched','Lancé'],
          ['Improved','Mejoré'], ['Negotiated','Negocié'], ['Trained','Formé'],
        ].map(([en, es]) => (
          <div key={en} className="bg-white/5 rounded-xl px-3 py-2 flex items-center justify-between">
            <span className="text-white text-sm font-semibold">{en}</span>
            <span className="text-white/30 text-xs">{es}</span>
          </div>
        ))}
      </div>

      <h2 className={s.h2}>Niveles de idioma en inglés</h2>
      <p className={s.p}>En un CV en inglés para mercado anglosajón, no uses el Marco Europeo (A1, B2, C1).
        Usa las descripciones directas:</p>
      <div className="grid sm:grid-cols-2 gap-2 mb-6">
        {[
          ['Native or Bilingual','Nivel de nativo'],
          ['Full Professional Proficiency','Equivale a C1-C2'],
          ['Professional Working Proficiency','Equivale a B2'],
          ['Limited Working Proficiency','Equivale a B1'],
        ].map(([en, es]) => (
          <div key={en} className="bg-white/5 rounded-xl px-3 py-2.5">
            <p className="text-white text-sm font-medium">{en}</p>
            <p className="text-white/40 text-xs">{es}</p>
          </div>
        ))}
      </div>

      <h2 className={s.h2}>¿Resume o CV?</h2>
      <p className={s.p}>
        En EE.UU. y Canadá se llama <span className={s.strong}>"resume"</span> y suele ser de 1 página.
        En UK, Australia e Irlanda se llama <span className={s.strong}>"CV"</span> y puede ser de 2 páginas.
        Para Europa continental, "CV" está bien con el formato que ya conocés pero en inglés.
      </p>

      <h2 className={s.h2}>Traducción automática con IA: cómo hacerlo bien</h2>
      <p className={s.p}>
        <a href="/app" className="text-violet-400 hover:text-violet-300">TuCV</a> traduce tu CV completo
        entre español e inglés manteniendo el formato, la estructura y los matices profesionales.
        No es una traducción literal: la IA adapta los títulos de cargo, los tiempos verbales y las
        convenciones al mercado del idioma destino.
      </p>
      <p className={s.p}>
        Después de la traducción automática, revisar los títulos de cargo específicos de tu sector
        y asegurarte de que los nombres de herramientas técnicas estén correctos lleva menos de 5 minutos.
      </p>
    </BlogLayout>
  )
}
