import React from 'react'
import BlogLayout, { BlogPostMeta } from '../BlogLayout'

export const meta: BlogPostMeta = {
  slug: 'como-hacer-cv-para-pasar-filtros-ats',
  title: 'Cómo hacer un CV para pasar filtros ATS en 2026',
  description: 'Aprende a optimizar tu currículum vitae para superar los sistemas ATS que usan el 98% de las grandes empresas. Guía práctica con ejemplos reales.',
  date: '28 de abril de 2026',
  readTime: '8 min',
  category: 'Optimización ATS',
  keywords: ['cv ats', 'curriculum ats', 'pasar filtros ats', 'optimizar cv ats', 'applicant tracking system'],
}

const s = {
  h2: 'text-xl font-bold text-white mt-10 mb-4',
  h3: 'text-base font-semibold text-white mt-6 mb-2',
  p: 'text-white/70 text-[15px] leading-relaxed mb-4',
  ul: 'space-y-2 mb-6 ml-1',
  li: 'flex gap-2.5 text-white/70 text-[15px] leading-relaxed',
  dot: 'text-violet-400 shrink-0 mt-0.5',
  check: 'text-emerald-400 shrink-0 mt-0.5',
  cross: 'text-red-400 shrink-0 mt-0.5',
  box: 'bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 mb-6',
  highlight: 'bg-violet-500/10 border border-violet-500/20 rounded-2xl p-5 mb-6',
  strong: 'text-white font-semibold',
  tag: 'inline-block bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white/60 mr-2 mb-2',
}

export default function CvParaAts() {
  return (
    <BlogLayout meta={meta}>

      <p className={s.p}>
        El 98% de las empresas del Fortune 500 y la mayoría de las medianas empresas utilizan un sistema ATS
        (Applicant Tracking System) para filtrar currículums antes de que un humano los vea.
        Si tu CV no está optimizado, puede ser rechazado automáticamente aunque tengas el perfil perfecto para el puesto.
      </p>
      <p className={s.p}>
        En esta guía te explico exactamente cómo funciona un ATS, qué busca y cómo escribir un CV que pase el filtro
        y llegue a la mesa del reclutador.
      </p>

      <h2 className={s.h2}>¿Qué es un ATS y cómo funciona?</h2>
      <p className={s.p}>
        Un ATS es un software que lee, clasifica y puntúa currículums de forma automática antes de que lleguen
        a un reclutador. Cuando envías tu CV a una oferta, el sistema lo escanea buscando:
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className={s.dot}>·</span><span><span className={s.strong}>Palabras clave</span> que coincidan con la descripción del puesto</span></li>
        <li className={s.li}><span className={s.dot}>·</span><span><span className={s.strong}>Estructura y secciones</span> reconocibles: experiencia, educación, habilidades</span></li>
        <li className={s.li}><span className={s.dot}>·</span><span><span className={s.strong}>Fechas y formatos</span> que el sistema pueda interpretar correctamente</span></li>
        <li className={s.li}><span className={s.dot}>·</span><span><span className={s.strong}>Relevancia general</span> del perfil para el puesto</span></li>
      </ul>
      <p className={s.p}>
        Los CVs con puntuación alta pasan al reclutador. Los demás van directamente a la papelera, sin importar
        cuánto tiempo le dedicaste a tu currículum.
      </p>

      <h2 className={s.h2}>Los 7 errores que hacen que el ATS rechace tu CV</h2>

      <div className={s.box}>
        <h3 className={s.h3}>1. Usar tablas, columnas o diseños complejos</h3>
        <p className={s.p}>
          Los ATS leen el texto de forma lineal. Una tabla con dos columnas puede mezclarse y producir texto
          incomprensible para el sistema. Usa un diseño de una sola columna, limpio y ordenado.
        </p>
        <ul className={s.ul}>
          <li className={s.li}><span className={s.cross}>✗</span><span>CV en dos columnas con sidebar lateral</span></li>
          <li className={s.li}><span className={s.check}>✓</span><span>CV de una sola columna con secciones claras</span></li>
        </ul>
      </div>

      <div className={s.box}>
        <h3 className={s.h3}>2. Guardar el CV en formato incorrecto</h3>
        <p className={s.p}>
          Envía siempre el CV en <span className={s.strong}>PDF</span> (el más compatible) o Word (.docx).
          Nunca en imagen (.jpg, .png) ni en formatos propietarios como Pages de Mac.
        </p>
      </div>

      <div className={s.box}>
        <h3 className={s.h3}>3. No incluir las palabras clave del puesto</h3>
        <p className={s.p}>
          Este es el error más crítico. El ATS busca términos exactos de la oferta. Lee la descripción del trabajo
          e incluye sus palabras clave de forma natural en tu CV. Si la oferta dice "gestión de proyectos ágiles",
          tu CV debe decir exactamente eso, no "manejo de proyectos" o "metodologías modernas".
        </p>
      </div>

      <div className={s.box}>
        <h3 className={s.h3}>4. Usar encabezados no estándar</h3>
        <p className={s.p}>
          El ATS reconoce secciones por sus títulos. Usa los nombres estándar:
        </p>
        <ul className={s.ul}>
          <li className={s.li}><span className={s.check}>✓</span><span>"Experiencia laboral" o "Experiencia profesional" (no "Mi trayectoria")</span></li>
          <li className={s.li}><span className={s.check}>✓</span><span>"Educación" o "Formación académica" (no "Mis estudios")</span></li>
          <li className={s.li}><span className={s.check}>✓</span><span>"Habilidades" o "Competencias" (no "Lo que sé hacer")</span></li>
        </ul>
      </div>

      <div className={s.box}>
        <h3 className={s.h3}>5. No incluir información de contacto en texto plano</h3>
        <p className={s.p}>
          El nombre, teléfono y email deben estar en texto normal, nunca dentro de un cuadro de texto,
          encabezado de Word o como imagen.
        </p>
      </div>

      <div className={s.box}>
        <h3 className={s.h3}>6. Usar fuentes poco comunes o íconos en lugar de texto</h3>
        <p className={s.p}>
          Fuentes como Calibri, Arial, Georgia o Times New Roman funcionan bien. Íconos de Font Awesome
          o símbolos especiales pueden aparecer como caracteres extraños en el ATS.
        </p>
      </div>

      <div className={s.box}>
        <h3 className={s.h3}>7. No adaptar el CV a cada oferta</h3>
        <p className={s.p}>
          Un CV genérico pasa menos filtros. Lo ideal es ajustar la sección de habilidades y el resumen
          profesional para cada oferta, añadiendo las palabras clave específicas de ese puesto.
        </p>
      </div>

      <h2 className={s.h2}>Cómo extraer las palabras clave correctas de una oferta</h2>
      <p className={s.p}>
        Sigue este proceso para cada oferta a la que apliques:
      </p>
      <ul className={s.ul}>
        <li className={s.li}><span className={s.strong + ' shrink-0'}>01</span><span>Lee la descripción completa del puesto y subraya los términos técnicos, herramientas y habilidades mencionadas</span></li>
        <li className={s.li}><span className={s.strong + ' shrink-0'}>02</span><span>Identifica qué términos se repiten más veces — esos son los más importantes para el ATS</span></li>
        <li className={s.li}><span className={s.strong + ' shrink-0'}>03</span><span>Distingue entre habilidades "duras" (Excel, Python, Salesforce) y "blandas" (liderazgo, comunicación)</span></li>
        <li className={s.li}><span className={s.strong + ' shrink-0'}>04</span><span>Incluye esas palabras en tu CV de forma natural, especialmente en la sección de habilidades y en los puntos de experiencia relevantes</span></li>
      </ul>

      <h2 className={s.h2}>Estructura ideal de un CV optimizado para ATS</h2>
      <p className={s.p}>Un CV que pasa los filtros ATS tiene esta estructura:</p>
      <div className={s.highlight}>
        <ul className={s.ul}>
          {['Nombre y datos de contacto (email, teléfono, LinkedIn)', 'Resumen profesional (3-4 líneas con las palabras clave más importantes)', 'Experiencia laboral (orden cronológico inverso, con logros cuantificados)', 'Educación y formación', 'Habilidades técnicas (lista clara con las herramientas y tecnologías)', 'Idiomas', 'Certificaciones o cursos relevantes (opcional)'].map((item, i) => (
            <li key={i} className={s.li}><span className={s.check}>✓</span><span>{item}</span></li>
          ))}
        </ul>
      </div>

      <h2 className={s.h2}>Habilidades y keywords con más valor en 2026</h2>
      <p className={s.p}>Dependiendo del sector, estos son algunos de los términos más buscados por los ATS actualmente:</p>

      <h3 className={s.h3}>Tecnología</h3>
      <div className="mb-4">
        {['Python', 'React', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Agile/Scrum', 'CI/CD', 'REST APIs'].map(k => <span key={k} className={s.tag}>{k}</span>)}
      </div>

      <h3 className={s.h3}>Marketing y negocio</h3>
      <div className="mb-4">
        {['Google Analytics', 'SEO/SEM', 'CRM', 'Salesforce', 'Email Marketing', 'KPIs', 'ROI', 'Growth Hacking', 'B2B/B2C', 'Embudo de ventas'].map(k => <span key={k} className={s.tag}>{k}</span>)}
      </div>

      <h3 className={s.h3}>Administración y finanzas</h3>
      <div className="mb-4">
        {['Excel avanzado', 'SAP', 'Contabilidad', 'Análisis financiero', 'Power BI', 'ERP', 'Gestión de proyectos', 'PMP', 'ISO 9001', 'Six Sigma'].map(k => <span key={k} className={s.tag}>{k}</span>)}
      </div>

      <h2 className={s.h2}>Optimiza tu CV para ATS en segundos con IA</h2>
      <p className={s.p}>
        Hacer esto manualmente para cada oferta lleva tiempo. La IA de <a href="/app" className="text-violet-400 hover:text-violet-300">TuCV</a> analiza
        la descripción del puesto al que quieres aplicar y sugiere automáticamente qué palabras clave añadir,
        qué secciones reforzar y cómo reformular tus logros para maximizar tu puntuación ATS.
      </p>
      <p className={s.p}>
        En menos de un minuto tenés un CV adaptado a esa oferta específica, listo para descargar en PDF.
      </p>

    </BlogLayout>
  )
}
