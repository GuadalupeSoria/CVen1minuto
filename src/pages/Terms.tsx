import React from 'react'
import { ArrowLeft, FileText } from 'lucide-react'

export default function Terms() {
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
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-violet-400" />
            <span className="text-sm font-semibold text-white">Términos de Uso</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Términos de Uso</h1>
          <p className="text-white/50 text-sm">Última actualización: 31 de marzo de 2026</p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-white/80">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Aceptación de los términos</h2>
            <p>
              Al acceder y usar <strong className="text-white">CV en 1 Minuto</strong> (cven1minuto.com),
              aceptas estos Términos de Uso en su totalidad. Si no estás de acuerdo con algún término,
              te pedimos que no uses el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Descripción del servicio</h2>
            <p>
              CV en 1 Minuto es una plataforma web que permite a los usuarios crear, editar, optimizar
              con inteligencia artificial y exportar currículums vitae profesionales. El servicio se
              ofrece bajo un modelo freemium:
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Plan Gratuito</h3>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> Editor completo de CV</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> Múltiples plantillas</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> 1 descarga PDF por día</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> 1 optimización con IA por día</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> 1 traducción por día</li>
                  <li className="flex gap-2"><span className="text-white/30">·</span> Publicidad de Google AdSense</li>
                </ul>
              </div>
              <div className="bg-[#1C1C1E] border border-violet-500/30 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-1">Plan Premium</h3>
                <p className="text-violet-400 text-xs font-bold mb-3">$4.99 / mes</p>
                <ul className="space-y-2 text-sm text-white/60">
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> Todo lo del plan gratuito</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> Descargas ilimitadas</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> IA ilimitada</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> Traducciones ilimitadas</li>
                  <li className="flex gap-2"><span className="text-emerald-400">✓</span> Sin publicidad</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Uso aceptable</h2>
            <p className="mb-4">Al usar este servicio, te comprometes a:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Ingresar información veraz en tu CV</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>No usar el servicio para actividades ilegales o fraudulentas</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>No intentar comprometer la seguridad o el funcionamiento del sistema</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>No usar scripts automatizados para sobrecargar el servicio</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Propiedad intelectual</h2>
            <p className="mb-4">
              El contenido de tu CV (datos personales, experiencia, etc.) es de tu exclusiva propiedad.
              Mantienes todos los derechos sobre el contenido que ingresas en el editor.
            </p>
            <p>
              Los elementos de la plataforma (diseño, código, plantillas, algoritmos de IA) son
              propiedad de CV en 1 Minuto y están protegidos por las leyes de propiedad intelectual.
              No está permitida su reproducción sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Pagos y suscripciones</h2>
            <div className="space-y-4">
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Facturación</h3>
                  <p className="text-white/60 text-sm">La suscripción Premium se factura mensualmente a $4.99 USD. Los pagos son procesados por Stripe.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Renovación automática</h3>
                  <p className="text-white/60 text-sm">Tu suscripción se renueva automáticamente cada mes. Puedes cancelarla en cualquier momento.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Política de reembolso</h3>
                  <p className="text-white/60 text-sm">Ofrecemos reembolso completo dentro de los 7 días posteriores al primer pago si no estás satisfecho. Para solicitar un reembolso, contáctanos en soporte@cven1minuto.com.</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Cancelación</h3>
                  <p className="text-white/60 text-sm">Al cancelar, mantendrás el acceso Premium hasta el final del período facturado. No se realizan cobros adicionales.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Publicidad</h2>
            <p>
              El plan gratuito está financiado por publicidad de Google AdSense. Al usar el servicio
              gratuito, consientes la visualización de anuncios contextuales. La suscripción Premium
              elimina toda publicidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitación de responsabilidad</h2>
            <p>
              CV en 1 Minuto se proporciona "tal como está" sin garantías de ningún tipo. No somos
              responsables de: pérdida de datos, resultados de procesos de selección, decisiones
              tomadas basándose en el servicio, ni interrupciones del servicio.
            </p>
            <p className="mt-4">
              Siempre recomendamos hacer una copia del contenido de tu CV fuera de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Modificaciones al servicio</h2>
            <p>
              Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del
              servicio con previo aviso. Los precios pueden cambiar con 30 días de anticipación para
              usuarios existentes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Ley aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de Argentina. Cualquier disputa se resolverá
              en los tribunales competentes de Buenos Aires, Argentina.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contacto</h2>
            <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
              <p className="text-white/60 text-sm">Para consultas sobre estos términos:</p>
              <p className="mt-2 text-white font-medium">soporte@cven1minuto.com</p>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-white/6 py-6">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between text-sm text-white/30">
          <span>© {new Date().getFullYear()} CV en 1 Minuto</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Editor</a>
            <a href="#about" className="hover:text-white transition-colors">Acerca de</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
