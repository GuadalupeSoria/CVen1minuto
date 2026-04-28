import React from 'react'
import BlogLayout, { BlogPostMeta } from '../BlogLayout'

export const meta: BlogPostMeta = {
  slug: 'errores-en-el-cv-que-te-descartan',
  title: '10 errores en el CV que te descartan automáticamente',
  description: 'Estos errores hacen que reclutadores y sistemas ATS descarten tu currículum en segundos. Aprende a evitarlos con ejemplos antes y después.',
  date: '28 de abril de 2026',
  readTime: '7 min',
  category: 'Consejos de CV',
  keywords: ['errores en el cv', 'errores curriculum vitae', 'cv rechazado', 'mejorar curriculum'],
}

const s = {
  h2: 'text-xl font-bold text-white mt-10 mb-4',
  p: 'text-white/70 text-[15px] leading-relaxed mb-4',
  ul: 'space-y-2 mb-6 ml-1',
  li: 'flex gap-2.5 text-white/70 text-[15px] leading-relaxed',
  check: 'text-emerald-400 shrink-0 mt-0.5',
  cross: 'text-red-400 shrink-0 mt-0.5',
  box: 'bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 mb-5',
  redBox: 'bg-red-500/5 border border-red-500/15 rounded-2xl p-5 mb-2',
  greenBox: 'bg-emerald-500/5 border border-emerald-500/15 rounded-2xl p-5 mb-5',
  label: 'text-xs font-semibold uppercase tracking-wider mb-2',
  strong: 'text-white font-semibold',
  num: 'text-violet-400 font-black text-lg shrink-0 w-8',
}

function Comparison({ bad, good }: { bad: string, good: string }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 mb-5">
      <div className={s.redBox}>
        <p className={s.label + ' text-red-400'}>✗ Mal</p>
        <p className="text-white/60 text-sm italic">"{bad}"</p>
      </div>
      <div className={s.greenBox}>
        <p className={s.label + ' text-emerald-400'}>✓ Bien</p>
        <p className="text-white/60 text-sm italic">"{good}"</p>
      </div>
    </div>
  )
}

export default function ErroresEnElCv() {
  return (
    <BlogLayout meta={meta}>

      <p className={s.p}>
        Un reclutador dedica en promedio <span className={s.strong}>6 segundos</span> a revisar un CV antes de decidir
        si lo descarta o lo sigue leyendo. Antes incluso de llegar al reclutador, el CV pasa por filtros
        automáticos que pueden eliminarlo sin que ninguna persona lo haya visto.
      </p>
      <p className={s.p}>
        Estos son los 10 errores que más frecuentemente descartan un currículum, con ejemplos reales de
        cómo corregirlos.
      </p>

      <h2 className={s.h2}>Error 1: Responsabilidades en lugar de logros</h2>
      <p className={s.p}>
        El error más común. Describir qué hacías en tu trabajo anterior no diferencia a nadie —
        todos los que tuvieron ese puesto hacían lo mismo. Lo que importa es qué conseguiste.
      </p>
      <Comparison
        bad="Responsable del equipo de ventas y gestión de clientes"
        good="Lideré un equipo de 8 personas logrando un aumento del 34% en ventas en 6 meses"
      />

      <h2 className={s.h2}>Error 2: Foto inapropiada o ausente cuando se pide</h2>
      <p className={s.p}>
        En España y Latinoamérica suele esperarse foto en el CV. Si la incluís, debe ser profesional:
        fondo neutro, ropa formal, buena iluminación. Una foto de perfil de Instagram o de vacaciones
        genera una primera impresión negativa inmediata.
      </p>

      <h2 className={s.h2}>Error 3: Objetivo profesional vago o genérico</h2>
      <p className={s.p}>
        El resumen o perfil al inicio del CV es lo primero que lee el reclutador. Si es genérico,
        no aporta nada y ocupa espacio valioso.
      </p>
      <Comparison
        bad="Profesional dinámico en busca de nuevas oportunidades para crecer"
        good="Desarrollador full-stack con 4 años en React y Node.js, especializado en apps SaaS B2B. Busco rol senior en startup de fintech"
      />

      <h2 className={s.h2}>Error 4: CV de más de 2 páginas (sin justificación)</h2>
      <p className={s.p}>
        Salvo que tengas más de 10 años de experiencia relevante, un CV debería caber en 1-2 páginas.
        Los reclutadores no leen más. Elimina experiencias de más de 15 años atrás si no son directamente
        relevantes para el puesto.
      </p>

      <h2 className={s.h2}>Error 5: Errores ortográficos y gramaticales</h2>
      <p className={s.p}>
        Un solo error ortográfico puede descartarte en roles que requieren atención al detalle, comunicación
        o manejo de documentos. Lee el CV en voz alta, usa el corrector ortográfico y pídele a alguien
        que lo revise. Parece obvio, pero el 58% de los CVs tienen al menos un error según estudios de RRHH.
      </p>

      <h2 className={s.h2}>Error 6: No adaptar el CV a cada oferta</h2>
      <p className={s.p}>
        Enviar el mismo CV a 50 empresas es la forma más eficiente de no conseguir entrevistas.
        Cada oferta tiene palabras clave diferentes. Un ATS que busca "gestión de proyectos con Scrum"
        no va a detectar "metodologías ágiles" como equivalente — necesita el término exacto.
      </p>

      <h2 className={s.h2}>Error 7: Información de contacto incorrecta o desactualizada</h2>
      <p className={s.p}>
        Parece imposible, pero ocurre constantemente: número de teléfono equivocado, email con typo,
        o LinkedIn con URL genérica en lugar de tu perfil personalizado. Verifica cada dato.
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className={s.check}>✓</span><span>Email profesional (nombre.apellido@gmail.com, no perrochico97@hotmail.com)</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>LinkedIn: linkedin.com/in/tunombre (URL personalizada, no la genérica con números)</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Teléfono con prefijo internacional si aplicas a empresas internacionales</span></li>
      </ul>

      <h2 className={s.h2}>Error 8: Habilidades sin nivel ni contexto</h2>
      <p className={s.p}>
        "Microsoft Office" en habilidades no dice nada en 2026. Especifica el nivel y el uso real:
      </p>
      <Comparison
        bad="Excel, Word, PowerPoint, inglés"
        good="Excel avanzado (tablas dinámicas, macros VBA) · Power BI · Inglés B2 (reuniones con clientes internacionales)"
      />

      <h2 className={s.h2}>Error 9: Fechas ambiguas o inconsistentes</h2>
      <p className={s.p}>
        Los ATS procesan las fechas para calcular cuánto tiempo pasaste en cada empresa. Usa siempre el formato
        mm/aaaa. Si hay huecos de más de 3 meses, explícalos brevemente (formación, viaje, cuidado familiar).
      </p>
      <Comparison
        bad="2019 – 2021 · Empresa XYZ"
        good="03/2019 – 07/2021 · Empresa XYZ (2 años 4 meses)"
      />

      <h2 className={s.h2}>Error 10: Diseño que prioriza lo visual sobre la legibilidad</h2>
      <p className={s.p}>
        Un CV con gráficos de barras para mostrar el nivel de inglés, fondos de color o fuentes decorativas
        puede parecer creativo, pero confunde a los sistemas ATS y distrae a los reclutadores del contenido.
        La regla es simple: si el diseño llama más la atención que el contenido, está mal.
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className={s.cross}>✗</span><span>Barra de progreso que indica "Inglés 80%"</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Inglés — Nivel B2 (Cambridge First Certificate, 2023)</span></li>
      </ul>

      <h2 className={s.h2}>Checklist final antes de enviar tu CV</h2>
      <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 mb-6">
        <ul className={s.ul}>
          {[
            'Sin errores ortográficos ni gramaticales',
            'Logros cuantificados en cada experiencia (números, porcentajes, plazos)',
            'Palabras clave de la oferta incluidas de forma natural',
            'Máximo 2 páginas (o 1 si tenés menos de 5 años de experiencia)',
            'Datos de contacto correctos y actualizados',
            'Exportado en PDF con fuente legible',
            'Foto profesional si se incluye',
            'Sin tablas, columnas múltiples ni íconos que el ATS no pueda leer',
          ].map((item, i) => (
            <li key={i} className={s.li}><span className={s.check}>✓</span><span>{item}</span></li>
          ))}
        </ul>
      </div>

      <p className={s.p}>
        Si querés que la IA analice tu CV actual y te diga exactamente qué mejorar,{' '}
        <a href="/app" className="text-violet-400 hover:text-violet-300">TuCV</a> lo hace gratis
        una vez al día sin necesidad de registro.
      </p>

    </BlogLayout>
  )
}
