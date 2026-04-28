import React from 'react'
import BlogLayout, { BlogPostMeta } from '../BlogLayout'

export const meta: BlogPostMeta = {
  slug: 'como-hacer-cv-sin-experiencia-laboral',
  title: 'Cómo hacer un CV sin experiencia laboral (y conseguir entrevistas)',
  description: 'Guía completa para crear un CV profesional cuando acabas de terminar tus estudios o buscas tu primer empleo. Qué poner, cómo estructurarlo y qué destacar.',
  date: '28 de abril de 2026',
  readTime: '7 min',
  category: 'Primer Empleo',
  keywords: ['cv sin experiencia', 'cv primer empleo', 'curriculum sin experiencia laboral', 'cv recién graduado'],
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
}

export default function CvSinExperiencia() {
  return (
    <BlogLayout meta={meta}>

      <p className={s.p}>
        No tener experiencia laboral no significa tener un CV vacío. Significa que hay que saber
        qué poner en lugar de experiencia — y hay más de lo que pensás.
        Esta guía te muestra exactamente cómo estructurar tu primer CV para que sea competitivo.
      </p>

      <h2 className={s.h2}>Primero: cambia el enfoque</h2>
      <p className={s.p}>
        Un CV sin experiencia laboral no debe intentar parecerse a uno con experiencia.
        Debe destacar lo que sí tenés: formación, proyectos, habilidades y potencial.
        El objetivo no es disimular que sos nuevo, sino demostrar que tenés base sólida.
      </p>
      <p className={s.p}>
        Dato importante: los reclutadores que buscan perfiles junior <span className={s.strong}>saben que no van a encontrar 5 años de experiencia</span>.
        Lo que evalúan es si sos alguien que puede aprender rápido y encajar en el equipo.
      </p>

      <h2 className={s.h2}>Estructura ideal para un CV sin experiencia</h2>

      <div className={s.highlight}>
        <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Orden recomendado</p>
        <ul className={s.ul}>
          {[
            ['1.', 'Datos de contacto'],
            ['2.', 'Resumen profesional / Perfil (3-4 líneas)'],
            ['3.', 'Educación (más detallado que en un CV con experiencia)'],
            ['4.', 'Proyectos personales o académicos'],
            ['5.', 'Prácticas, voluntariado o trabajos informales'],
            ['6.', 'Habilidades técnicas'],
            ['7.', 'Idiomas y certificaciones'],
          ].map(([num, text]) => (
            <li key={num} className={s.li}>
              <span className="text-violet-400 font-bold shrink-0 w-5">{num}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className={s.h2}>Qué poner en cada sección</h2>

      <h3 className={s.h3}>Resumen profesional</h3>
      <p className={s.p}>
        No empieces con "Soy una persona dinámica y proactiva". Empieza con tu formación,
        tu especialización y lo que buscás:
      </p>
      <div className={s.box}>
        <p className="text-white/60 text-sm italic leading-relaxed">
          "Graduado en Ingeniería de Software (Universidad de Buenos Aires, 2025) con especialización en
          desarrollo web full-stack. Durante la carrera desarrollé 3 proyectos con React y Node.js,
          incluyendo una app de gestión de tareas con 200+ usuarios activos. Busco mi primer rol como
          desarrollador junior en un equipo que trabaje con metodologías ágiles."
        </p>
      </div>

      <h3 className={s.h3}>Educación — ponle más detalle del habitual</h3>
      <p className={s.p}>Sin experiencia laboral, la formación cobra más peso. Incluí:</p>
      <ul className={s.ul}>
        <li className={s.li}><span className={s.check}>✓</span><span>Nombre del título y especialidad</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Universidad / institución y año de graduación</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Promedio o calificación si es buena (7+ sobre 10 o equivalente)</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Materias más relevantes para el puesto</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Proyectos finales o tesis si son relevantes</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span>Premios académicos, becas o menciones</span></li>
      </ul>

      <h3 className={s.h3}>Proyectos personales — el diferenciador real</h3>
      <p className={s.p}>
        Los proyectos propios son el equivalente a la experiencia para alguien recién graduado.
        Si estudiaste tecnología, diseño, marketing o cualquier campo práctico, tenés proyectos que mostrar.
      </p>
      <p className={s.p}>
        Describí cada proyecto como si fuera un trabajo: qué construiste, qué tecnologías usaste, qué resultado tuvo.
      </p>
      <div className={s.box}>
        <p className="text-sm font-semibold text-white mb-2">App de gestión de inventario — 2024</p>
        <p className="text-white/60 text-sm leading-relaxed">
          Aplicación web para pequeños comercios que reduce el tiempo de gestión de stock en un 40%.
          Construida con React, Node.js y PostgreSQL. Desplegada en Vercel con 50+ usuarios activos.
          <a href="#" className="text-violet-400 ml-1 text-xs">github.com/usuario/proyecto</a>
        </p>
      </div>

      <h3 className={s.h3}>Prácticas y trabajos informales</h3>
      <p className={s.p}>
        Cualquier experiencia cuenta, aunque no sea formal. Tutorías particulares, diseño de la web de un familiar,
        gestión de redes sociales de una peña, ayuda contable en el negocio de tus padres.
        Formatealo como si fuera un empleo real con fechas y logros.
      </p>

      <h3 className={s.h3}>Voluntariado</h3>
      <p className={s.p}>
        El voluntariado muestra iniciativa, trabajo en equipo y valores. Si no lo tenés,
        considera apuntarte a algo ahora — además de sumar al CV, suma como experiencia real.
      </p>

      <h2 className={s.h2}>Lo que NO poner si no tenés experiencia</h2>
      <ul className={s.ul}>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Secciones vacías o con "en construcción"</span></li>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Experiencias irrelevantes (ej: trabajo de verano en hostelería si aplicas a marketing)</span></li>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Hobbies genéricos ("me gusta la música, viajar, estar con amigos")</span></li>
        <li className={s.li}><span className="text-red-400 shrink-0">✗</span><span>Referencias "disponibles a petición" — ocupa espacio sin agregar valor</span></li>
      </ul>

      <h2 className={s.h2}>Hobbies relevantes sí pueden sumar</h2>
      <p className={s.p}>
        Si un hobby demuestra una habilidad relevante para el puesto, incluyelo con contexto:
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className={s.check}>✓</span><span><span className={s.strong}>Fotografía:</span> "Fotografía y edición — gestiono una cuenta de Instagram con 3.000 seguidores sobre viajes" (relevante para marketing o diseño)</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span><span className={s.strong}>Gaming competitivo:</span> relevante para roles de diseño de juegos, QA o esports</span></li>
        <li className={s.li}><span className={s.check}>✓</span><span><span className={s.strong}>Blog personal:</span> siempre relevante para comunicación, contenido o marketing</span></li>
      </ul>

      <h2 className={s.h2}>Tip final: carta de presentación corta y específica</h2>
      <p className={s.p}>
        Para posiciones junior, una buena carta de presentación de 3 párrafos puede marcar la diferencia.
        No la uses para repetir el CV: úsala para explicar <span className={s.strong}>por qué esa empresa específica</span> y
        qué podés aportar aunque no tengas experiencia.
      </p>
      <p className={s.p}>
        Con <a href="/app" className="text-violet-400 hover:text-violet-300">TuCV</a> podés crear un CV estructurado
        y bien formateado en minutos, optimizado para sistemas ATS, y descargarlo en PDF gratis.
      </p>

    </BlogLayout>
  )
}
