import { FileText, Zap, Languages, Download, Sparkles, CheckCircle, ChevronRight, Star, Users, Clock } from 'lucide-react'

interface LandingPageProps {
  onStart: () => void
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

function AdBanner({ slot }: { slot: string }) {
  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2152317919633317"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans">
      {/* Nav */}
      <nav className="border-b border-[#2C2C2E] bg-[#1C1C1E]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/tucv-logo.svg" alt="TuCV" className="h-10" />
          </div>
          <button
            onClick={onStart}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Crear mi CV gratis
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pb-20">

        {/* Hero */}
        <section className="py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-600/20 border border-violet-600/30 rounded-full text-violet-300 text-xs font-medium mb-6">
            <Sparkles size={12} />
            Impulsado por Inteligencia Artificial
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Crea tu CV profesional<br />
            <span className="text-violet-400">en menos de 1 minuto</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Usa nuestra herramienta gratuita con IA para crear, optimizar y exportar tu currículum vitae.
            Plantillas modernas, traducción automática y análisis inteligente incluidos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 text-lg shadow-xl shadow-violet-900/30"
            >
              Crear mi CV ahora
              <ChevronRight size={20} />
            </button>
            <a
              href="#guia"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl transition-all text-lg"
            >
              Ver guía de CV
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>+10.000 CVs creados</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={14} className="text-yellow-500" />
              <span>4.8 / 5 valoración</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>Gratis, sin registro</span>
            </div>
          </div>
        </section>

        {/* Ad banner top */}
        <AdBanner slot="1234567890" />

        {/* Features */}
        <section className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Todo lo que necesitas para conseguir trabajo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={20} className="text-violet-400" />,
                title: 'Optimización con IA',
                desc: 'Analiza la descripción del trabajo y adapta tu CV automáticamente para pasar los filtros ATS y destacar ante los reclutadores.',
              },
              {
                icon: <Languages size={20} className="text-blue-400" />,
                title: 'Traducción automática',
                desc: 'Traduce tu CV al inglés o español con un clic, manteniendo el tono profesional y preservando los nombres técnicos.',
              },
              {
                icon: <Download size={20} className="text-emerald-400" />,
                title: 'Exportación PDF',
                desc: 'Descarga tu CV en formato PDF con diseño pixel-perfect, listo para enviar a empleadores.',
              },
              {
                icon: <FileText size={20} className="text-orange-400" />,
                title: 'Plantillas profesionales',
                desc: 'Elige entre plantillas modernas y clásicas diseñadas por expertos en recursos humanos.',
              },
              {
                icon: <Sparkles size={20} className="text-pink-400" />,
                title: 'Import desde PDF',
                desc: 'Importa tu CV existente en PDF y la IA extrae toda la información automáticamente.',
              },
              {
                icon: <CheckCircle size={20} className="text-teal-400" />,
                title: 'Múltiples versiones',
                desc: 'Guarda diferentes versiones de tu CV: uno en español, uno en inglés, uno para cada tipo de trabajo.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl hover:border-violet-600/30 transition-colors"
              >
                <div className="w-10 h-10 bg-[#2C2C2E] rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guide — real content for AdSense compliance */}
        <section id="guia" className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Guía completa: cómo escribir un CV profesional en 2025
          </h2>
          <p className="text-white/50 mb-10 max-w-3xl">
            Tu currículum vitae es tu carta de presentación. En promedio, un reclutador dedica
            solo <strong className="text-white">6-7 segundos</strong> a revisar un CV. Por eso cada
            sección debe estar optimizada para captar la atención y comunicar valor rápidamente.
          </p>

          <div className="space-y-10">

            <article className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-violet-300">1. Información de contacto clara</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Tu nombre completo debe estar en la parte superior en un tamaño de fuente mayor.
                Incluye solo los datos de contacto relevantes:
              </p>
              <ul className="space-y-2 text-white/60 text-sm">
                {[
                  'Email profesional (evita apodos como "supercoolchico@...")',
                  'Número de teléfono con código de país si postulas internacionalmente',
                  'URL de LinkedIn actualizada',
                  'Portfolio o GitHub si aplica a tu industria',
                  'Ciudad y país (no es necesaria la dirección completa)',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>

            {/* Ad mid-content */}
            <AdBanner slot="9876543210" />

            <article className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">2. Resumen profesional impactante</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                El resumen (o "about") es el primer texto que lee el reclutador. Debe ser
                un párrafo de 3-4 líneas que responda: ¿quién eres, qué haces mejor y qué valor
                aportás a esta empresa?
              </p>
              <div className="bg-[#2C2C2E] rounded-xl p-4 text-sm">
                <p className="text-white/40 text-xs mb-2 uppercase tracking-wide">Ejemplo efectivo</p>
                <p className="text-white/70 italic leading-relaxed">
                  "Desarrolladora Full Stack con 5 años de experiencia construyendo aplicaciones web
                  escalables con React y Node.js. Especializada en arquitecturas de microservicios y
                  optimización de rendimiento. He liderado equipos de hasta 8 personas y reducido el
                  tiempo de carga de aplicaciones en un 40% en mi último proyecto."
                </p>
              </div>
            </article>

            <article className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-orange-300">3. Experiencia laboral con logros cuantificables</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                En lugar de listar tareas, describe <strong className="text-white">logros medibles</strong>.
                Usa la fórmula: <em className="text-violet-300">acción + contexto + resultado</em>.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-red-950/30 border border-red-900/30 rounded-xl p-4">
                  <p className="text-red-400 font-medium mb-2">❌ Débil</p>
                  <p className="text-white/50">"Responsable de gestionar las redes sociales de la empresa."</p>
                </div>
                <div className="bg-emerald-950/30 border border-emerald-900/30 rounded-xl p-4">
                  <p className="text-emerald-400 font-medium mb-2">✅ Impactante</p>
                  <p className="text-white/50">"Gestioné las redes sociales de la empresa, aumentando los seguidores un 150% en 6 meses y generando 30% más de leads calificados."</p>
                </div>
              </div>
            </article>

            <article className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-pink-300">4. Skills técnicas y blandas</h3>
              <p className="text-white/60 leading-relaxed mb-4">
                Los sistemas ATS (Applicant Tracking System) buscan palabras clave específicas.
                Incluye las habilidades técnicas que aparecen en la descripción del trabajo, y también
                habilidades blandas relevantes como liderazgo, comunicación o trabajo en equipo.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Consejo: usa nuestra función de <strong className="text-white">Optimización con IA</strong>{' '}
                para analizar la oferta y descubrir qué palabras clave agregar a tu CV automáticamente.
              </p>
            </article>

            <article className="bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-teal-300">5. Formato y longitud ideal</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                {[
                  '1 página para menos de 10 años de experiencia; 2 páginas máximo para más',
                  'Fuente legible: Calibri, Arial o Georgia entre 10-12pt',
                  'Márgenes consistentes de 1,5-2 cm',
                  'Orden cronológico inverso: experiencia más reciente primero',
                  'Evitar fotos en CVs para EE.UU., Reino Unido o Canadá (riesgo de sesgo)',
                  'Guardar y enviar siempre en PDF para preservar el diseño',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-teal-400 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* Ad before FAQ */}
        <AdBanner slot="1122334455" />

        {/* FAQ */}
        <section className="py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: '¿TuCV es completamente gratis?',
                a: 'Sí. Podés crear, editar y exportar tu CV sin pagar nada. La versión gratuita incluye 1 descarga, 1 traducción y 1 optimización con IA por día. Con Premium (sin publicidad) tenés acceso ilimitado.',
              },
              {
                q: '¿Necesito registrarme para usar la herramienta?',
                a: 'No. Podés crear tu CV sin cuenta. Si querés guardar múltiples versiones de tu CV en la nube, podés crear una cuenta gratuita con tu email.',
              },
              {
                q: '¿Cómo funciona la optimización con IA?',
                a: 'Pegás la descripción del trabajo al que querés aplicar y nuestra IA analiza las palabras clave y requisitos. Luego sugiere cambios específicos en tu resumen, experiencia y skills para que tu CV pase los filtros automáticos (ATS) y llegue a recursos humanos.',
              },
              {
                q: '¿La traducción automática es precisa?',
                a: 'Sí, usamos modelos de lenguaje avanzados (LLaMA de Meta vía Groq) que entienden el contexto profesional. Las habilidades técnicas como "React" o "TypeScript" se preservan sin traducir.',
              },
              {
                q: '¿Puedo importar mi CV actual?',
                a: 'Sí. Podés subir tu CV en PDF y la IA extrae automáticamente la información: nombre, experiencia, educación, skills e idiomas. Después podés editar lo que quieras.',
              },
              {
                q: '¿Mis datos son privados?',
                a: 'Tu CV solo se guarda en tu navegador (localStorage) a menos que crees cuenta y decidas sincronizarlo. No compartimos ni vendemos tus datos. Podés consultar nuestra política de privacidad para más detalles.',
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-[#1C1C1E] border border-[#2C2C2E] rounded-2xl overflow-hidden"
              >
                <summary className="px-6 py-4 cursor-pointer flex items-center justify-between font-medium hover:text-violet-300 transition-colors list-none">
                  {item.q}
                  <ChevronRight size={16} className="shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-[#2C2C2E] pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 text-center">
          <div className="bg-gradient-to-br from-violet-900/40 to-blue-900/20 border border-violet-600/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para conseguir esa entrevista?
            </h2>
            <p className="text-white/50 text-lg mb-8 max-w-lg mx-auto">
              Creá tu CV profesional ahora mismo. Es gratis, sin registro, y listo en minutos.
            </p>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 text-lg shadow-xl shadow-violet-900/40"
            >
              Empezar ahora — Es gratis
              <ChevronRight size={20} />
            </button>
          </div>
        </section>

        {/* Bottom ad */}
        <AdBanner slot="5544332211" />

      </main>

      {/* Footer */}
      <footer className="border-t border-[#2C2C2E] py-8 text-center text-white/30 text-sm">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-6">
          <span>© 2025 TuCV</span>
          <a href="/privacy" className="hover:text-white/60 transition-colors">Privacidad</a>
          <a href="/terms" className="hover:text-white/60 transition-colors">Términos</a>
          <a href="/about" className="hover:text-white/60 transition-colors">Acerca de</a>
        </div>
      </footer>
    </div>
  )
}
