import React from 'react'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPolicy() {
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
            <Shield size={15} className="text-violet-400" />
            <span className="text-sm font-semibold text-white">Política de Privacidad</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Política de Privacidad</h1>
          <p className="text-white/50 text-sm">Última actualización: 31 de marzo de 2026</p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-white/80">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Quiénes somos</h2>
            <p>
              <strong className="text-white">TuCV</strong> es un servicio web gratuito que permite a los usuarios
              crear, editar y exportar currículums vitae profesionales con ayuda de inteligencia artificial.
              Accesible en <a href="https://tucv.es" className="text-violet-400 hover:text-violet-300">tucv.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Datos que recopilamos</h2>
            <div className="space-y-4">
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">2.1 Datos que tú ingresas</h3>
                <p className="text-white/60 text-sm">
                  Los datos de tu CV (nombre, experiencia, educación, habilidades) se guardan exclusivamente en el
                  almacenamiento local de tu navegador (<code className="text-violet-300">localStorage</code>).
                  Nunca son enviados a nuestros servidores sin tu consentimiento.
                </p>
              </div>
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">2.2 Datos de uso anónimos</h3>
                <p className="text-white/60 text-sm">
                  A través de Google Analytics y Google AdSense recopilamos datos anónimos de navegación:
                  páginas visitadas, tiempo de sesión, tipo de dispositivo y región geográfica aproximada.
                  No incluyen información de identificación personal.
                </p>
              </div>
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">2.3 Datos de pago</h3>
                <p className="text-white/60 text-sm">
                  Los pagos de suscripción Premium son procesados íntegramente por <strong className="text-white">Stripe</strong>.
                  No almacenamos datos de tarjetas de crédito. Al suscribirte, aceptas también la
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300 ml-1">
                    política de privacidad de Stripe
                  </a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Cookies y tecnologías de seguimiento</h2>
            <p className="mb-4">
              Utilizamos cookies propias y de terceros para mejorar la experiencia del usuario y mostrar publicidad relevante:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Cookies funcionales:</strong> Guardan tus preferencias (idioma, tema) y estado de suscripción.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Google AdSense:</strong> Muestra anuncios personalizados basados en tu actividad de navegación. Puedes optar por no recibirlos en <a href="https://adssettings.google.com" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">adssettings.google.com</a>.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Groq AI:</strong> Cuando usas el optimizador de IA, el texto de tu CV es enviado a la API de Groq para su procesamiento. No se almacena de forma permanente.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Cómo usamos tus datos</h2>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Operar y mejorar el servicio</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Mostrar publicidad que financie el servicio gratuito</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Procesar pagos de suscripción Premium</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Analizar el rendimiento y detectar errores técnicos</span></li>
            </ul>
            <p className="mt-4 text-white/60">
              <strong className="text-white">No vendemos</strong> tus datos personales a terceros bajo ninguna circunstancia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Tus derechos</h2>
            <p className="mb-4">De acuerdo con el GDPR y leyes de protección de datos aplicables, tienes derecho a:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Acceder a los datos que tenemos sobre ti</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Rectificar datos inexactos</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Solicitar la eliminación de tus datos</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Oponerte al procesamiento de tus datos</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Portabilidad de tus datos</span></li>
            </ul>
            <p className="mt-4 text-white/60">
              Puedes eliminar todos tus datos locales vaciando el <code className="text-violet-300">localStorage</code> de tu navegador en
              cualquier momento sin necesidad de contactarnos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Terceros y servicios externos</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-white/50 font-medium">Servicio</th>
                    <th className="text-left py-2 pr-4 text-white/50 font-medium">Propósito</th>
                    <th className="text-left py-2 text-white/50 font-medium">Política</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Google AdSense</td>
                    <td className="py-3 pr-4 text-white/60">Publicidad</td>
                    <td className="py-3"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Stripe</td>
                    <td className="py-3 pr-4 text-white/60">Pagos</td>
                    <td className="py-3"><a href="https://stripe.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Groq AI</td>
                    <td className="py-3 pr-4 text-white/60">Optimización IA</td>
                    <td className="py-3"><a href="https://groq.com/privacy-policy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Seguridad</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información.
              Sin embargo, ningún sistema es 100% seguro. Te recomendamos no ingresar contraseñas ni
              información financiera en los campos del editor de CV.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos
              mediante un aviso destacado en la aplicación. El uso continuado del servicio después de
              dichos cambios constituye tu aceptación de la nueva política.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Contacto</h2>
            <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
              <p className="text-white/60 text-sm">
                Para cualquier consulta sobre privacidad o para ejercer tus derechos, contáctanos en:
              </p>
              <p className="mt-2 text-white font-medium">tucv.support@gmail.com</p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer mini */}
      <footer className="border-t border-white/6 py-6">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between text-sm text-white/30">
          <span>© {new Date().getFullYear()} TuCV</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Editor</a>
            <a href="#about" className="hover:text-white transition-colors">Acerca de</a>
            <a href="#terms" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
