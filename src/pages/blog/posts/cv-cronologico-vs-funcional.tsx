import React from 'react'
import BlogLayout, { BlogPostMeta } from '../BlogLayout'

export const meta: BlogPostMeta = {
  slug: 'cv-cronologico-vs-funcional',
  title: 'CV cronológico vs funcional: cuál usar según tu situación',
  description: 'Dos formatos, dos estrategias. Te explicamos cuándo usar cada tipo de CV, cuáles son sus ventajas y cuál prefieren realmente los reclutadores.',
  date: '28 de abril de 2026',
  readTime: '5 min',
  category: 'Formatos de CV',
  keywords: ['cv cronologico', 'cv funcional', 'tipos de curriculum vitae', 'formato cv', 'curriculum cronologico vs funcional'],
}

const s = {
  h2: 'text-xl font-bold text-white mt-10 mb-4',
  p: 'text-white/70 text-[15px] leading-relaxed mb-4',
  ul: 'space-y-2 mb-5 ml-1',
  li: 'flex gap-2.5 text-white/70 text-[15px] leading-relaxed',
  check: 'text-emerald-400 shrink-0 mt-0.5',
  cross: 'text-red-400 shrink-0 mt-0.5',
  box: 'bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 mb-5',
  strong: 'text-white font-semibold',
}

export default function CvCronologicoVsFuncional() {
  return (
    <BlogLayout meta={meta}>
      <p className={s.p}>
        Cuando creas tu CV, una de las primeras decisiones es el formato: ¿organizo mi experiencia
        por fechas (cronológico) o por habilidades (funcional)? La respuesta depende de tu situación
        específica — y en la mayoría de los casos hay una opción claramente mejor.
      </p>

      <h2 className={s.h2}>El CV cronológico inverso</h2>
      <p className={s.p}>
        Es el formato estándar y el más utilizado en el mundo. Lista tu experiencia laboral comenzando
        por el trabajo más reciente y retrocediendo en el tiempo.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className={s.box} style={{margin:0}}>
          <p className="text-sm font-semibold text-white mb-3">Ventajas</p>
          <ul className={s.ul}>
            {['Lo prefieren el 90% de los reclutadores','Compatible con todos los sistemas ATS','Muestra progresión de carrera clara','Fácil de leer y escanear en segundos'].map(v => (
              <li key={v} className={s.li}><span className={s.check}>✓</span><span>{v}</span></li>
            ))}
          </ul>
        </div>
        <div className={s.box} style={{margin:0}}>
          <p className="text-sm font-semibold text-white mb-3">Desventajas</p>
          <ul className={s.ul}>
            {['Expone huecos laborales claramente','No ideal si cambiás mucho de sector','Puede mostrar estancamiento si no hay ascensos'].map(v => (
              <li key={v} className={s.li}><span className={s.cross}>·</span><span>{v}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <p className={s.p}><span className={s.strong}>Usalo cuando:</span> tenés una trayectoria continua y coherente, buscás un empleo en el mismo sector, o tenés menos de 10 años de experiencia.</p>

      <h2 className={s.h2}>El CV funcional (por competencias)</h2>
      <p className={s.p}>
        Organiza el CV por áreas de habilidades en lugar de por fechas. En lugar de listar dónde trabajaste,
        agrupa tus capacidades: liderazgo, gestión de proyectos, habilidades técnicas, etc.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className={s.box} style={{margin:0}}>
          <p className="text-sm font-semibold text-white mb-3">Ventajas</p>
          <ul className={s.ul}>
            {['Disimula huecos o cambios frecuentes','Útil en cambios de carrera','Destaca habilidades transferibles','Bueno para perfiles con experiencia muy variada'].map(v => (
              <li key={v} className={s.li}><span className={s.check}>✓</span><span>{v}</span></li>
            ))}
          </ul>
        </div>
        <div className={s.box} style={{margin:0}}>
          <p className="text-sm font-semibold text-white mb-3">Desventajas</p>
          <ul className={s.ul}>
            {['Muchos reclutadores lo ven con desconfianza','Muy mal compatible con sistemas ATS','Oculta información que los reclutadores quieren ver','Puede parecer que estás escondiendo algo'].map(v => (
              <li key={v} className={s.li}><span className={s.cross}>·</span><span>{v}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <p className={s.p}><span className={s.strong}>Usalo cuando:</span> hacés un cambio radical de sector, tenés grandes huecos laborales que no podés explicar brevemente, o tu experiencia formal es muy escasa pero tus habilidades son sólidas.</p>

      <h2 className={s.h2}>El CV mixto o combinado: lo mejor de ambos</h2>
      <p className={s.p}>
        Para la mayoría de las situaciones, el formato combinado es la mejor opción. Tiene una sección de
        habilidades clave al principio (como el funcional) y luego lista la experiencia cronológicamente.
      </p>
      <div className={s.box}>
        <p className="text-sm font-semibold text-white mb-3">Estructura del CV combinado</p>
        <ul className={s.ul}>
          {['Datos de contacto','Resumen profesional (con keywords)','Habilidades clave (6-8 puntos)','Experiencia laboral (cronológico inverso)','Educación','Certificaciones e idiomas'].map((item,i) => (
            <li key={i} className={s.li}><span className="text-violet-400 font-bold w-5 shrink-0">{i+1}.</span><span>{item}</span></li>
          ))}
        </ul>
      </div>

      <h2 className={s.h2}>Tabla de decisión rápida</h2>
      <div className={s.box}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4 text-white/40 font-medium">Tu situación</th>
              <th className="text-left py-2 text-white/40 font-medium">Formato recomendado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ['Primer empleo o recién graduado','Combinado (habilidades + educación + proyectos)'],
              ['Trayectoria lineal y continua','Cronológico inverso'],
              ['Cambio de carrera o sector','Combinado (habilidades transferibles al frente)'],
              ['Freelance o múltiples proyectos cortos','Combinado o funcional'],
              ['Más de 10 años de experiencia','Cronológico (solo últimos 10-12 años)'],
              ['Brecha laboral de más de 1 año','Combinado (no cronológico puro)'],
            ].map(([sit, rec]) => (
              <tr key={sit}>
                <td className="py-2.5 pr-4 text-white/60">{sit}</td>
                <td className="py-2.5 text-violet-300 font-medium">{rec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={s.p}>
        Las plantillas de <a href="/app" className="text-violet-400 hover:text-violet-300">TuCV</a> están
        diseñadas con el formato combinado optimizado para ATS. Podés personalizar el color y el diseño
        sin sacrificar compatibilidad con los filtros automáticos de las empresas.
      </p>
    </BlogLayout>
  )
}
