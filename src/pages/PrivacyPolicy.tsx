import React from 'react'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0F0F0F]/90 backdrop-blur-xl border-b border-white/6">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <a
            href="/app"
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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-3">Política de Privacidad</h1>
          <p className="text-white/50 text-sm">Última actualización: 28 de abril de 2026</p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-white/80">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Quiénes somos</h2>
            <p>
              <strong className="text-white">TuCV</strong> es un servicio web que permite a los usuarios
              crear, editar y exportar currículums vitae profesionales con ayuda de inteligencia artificial.
              Accesible en <a href="https://tucv.es" className="text-violet-400 hover:text-violet-300">tucv.es</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Dónde se guardan tus datos</h2>
            <p className="mb-4 text-white/60">El lugar donde se almacena tu CV depende de si tienes cuenta o no:</p>
            <div className="space-y-4">
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Sin cuenta (modo anónimo)</h3>
                <p className="text-white/60 text-sm">
                  Toda la información de tu CV se guarda <strong className="text-white">únicamente en el almacenamiento local
                  de tu navegador</strong> (<code className="text-violet-300">localStorage</code>). No se envía
                  ningún dato a nuestros servidores. Si borras los datos del navegador o cambias de dispositivo, el CV
                  se perderá ya que no hay copia en la nube.
                </p>
              </div>
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Con cuenta (gratuita o Premium)</h3>
                <p className="text-white/60 text-sm">
                  Al crear una cuenta e iniciar sesión, puedes optar por <strong className="text-white">guardar tu CV en la nube</strong>.
                  En ese caso, los datos se almacenan de forma segura en nuestra base de datos asociados
                  a tu cuenta. Esto te permite acceder a tu CV desde cualquier dispositivo. Los CVs guardados en la nube
                  son visibles <strong className="text-white">exclusivamente para ti</strong>: no los compartimos,
                  analizamos con fines comerciales ni vendemos a terceros.
                </p>
              </div>
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Datos de cuenta</h3>
                <p className="text-white/60 text-sm">
                  Al registrarte almacenamos tu dirección de correo electrónico para identificar tu cuenta,
                  gestionar tu suscripción y enviarte comunicaciones transaccionales (confirmación de pago,
                  aviso de cancelación). No enviamos correos de marketing sin tu consentimiento explícito.
                </p>
              </div>
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Datos de uso anónimos</h3>
                <p className="text-white/60 text-sm">
                  A través de Google Analytics y Google AdSense recopilamos datos anónimos de navegación:
                  páginas visitadas, tiempo de sesión, tipo de dispositivo y región geográfica aproximada.
                  No incluyen información de identificación personal.
                </p>
              </div>
              <div className="bg-[#1C1C1E] border border-white/8 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-white mb-2">Datos de pago</h3>
                <p className="text-white/60 text-sm">
                  Los pagos de suscripción Premium son procesados íntegramente por <strong className="text-white">Stripe</strong>.
                  No almacenamos datos de tarjetas de crédito ni información financiera sensible en nuestros servidores.
                  Al suscribirte, aceptas también la{' '}
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">
                    política de privacidad de Stripe
                  </a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Cookies y tecnologías de seguimiento</h2>
            <p className="mb-4">
              Utilizamos cookies propias y de terceros para mejorar la experiencia del usuario y financiar el servicio gratuito:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Cookies de sesión:</strong> Mantienen tu sesión activa mientras usas la aplicación.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Cookies funcionales:</strong> Guardan tus preferencias de idioma y estado de suscripción.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Google AdSense:</strong> Muestra anuncios en el plan gratuito. Puedes gestionar tus preferencias en{' '}
                  <a href="https://adssettings.google.com" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">adssettings.google.com</a>.
                  Los usuarios Premium no ven publicidad.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400 shrink-0">·</span>
                <span><strong className="text-white">Groq AI:</strong> Cuando usas el optimizador o traductor de IA, el texto de tu CV es enviado temporalmente a la API de Groq para su procesamiento. No se almacena de forma permanente.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Cómo usamos tus datos</h2>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Permitirte guardar y acceder a tu CV desde cualquier dispositivo (si tienes cuenta)</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Gestionar tu suscripción Premium y procesar pagos</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Mostrar publicidad contextual en el plan gratuito</span></li>
              <li className="flex gap-2"><span className="text-violet-400 shrink-0">·</span><span>Operar, mejorar y detectar errores en el servicio</span></li>
            </ul>
            <p className="mt-4 text-white/60">
              <strong className="text-white">No vendemos</strong> tus datos personales ni el contenido de tu CV a terceros bajo ninguna circunstancia.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Tus derechos</h2>
            <p className="mb-4">De acuerdo con el GDPR y leyes de protección de datos aplicables, tienes derecho a:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Acceder a los datos que tenemos sobre ti</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Rectificar datos inexactos</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Solicitar la eliminación de tu cuenta y todos tus datos</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Oponerte al procesamiento de tus datos</span></li>
              <li className="flex gap-2"><span className="text-emerald-400 shrink-0">✓</span><span>Portabilidad de tus datos</span></li>
            </ul>
            <p className="mt-4 text-white/60">
              Si no tienes cuenta, puedes eliminar todos tus datos locales vaciando el <code className="text-violet-300">localStorage</code> de tu navegador.
              Si tienes cuenta, escríbenos a <strong className="text-white">tucv.support@gmail.com</strong> para solicitar la eliminación completa de tu cuenta y datos.
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
                    <td className="py-3 pr-4 font-medium text-white">Supabase</td>
                    <td className="py-3 pr-4 text-white/60">Autenticación y almacenamiento en la nube</td>
                    <td className="py-3"><a href="https://supabase.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Stripe</td>
                    <td className="py-3 pr-4 text-white/60">Pagos y suscripciones</td>
                    <td className="py-3"><a href="https://stripe.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Google AdSense</td>
                    <td className="py-3 pr-4 text-white/60">Publicidad (solo plan gratuito)</td>
                    <td className="py-3"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Groq AI</td>
                    <td className="py-3 pr-4 text-white/60">Optimización y traducción con IA</td>
                    <td className="py-3"><a href="https://groq.com/privacy-policy" target="_blank" rel="noopener" className="text-violet-400 hover:text-violet-300">Ver</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Seguridad</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
              conexiones HTTPS, autenticación segura vía Supabase Auth y almacenamiento cifrado en tránsito.
              Sin embargo, ningún sistema es 100% seguro. Te recomendamos no ingresar contraseñas ni
              información financiera en los campos del editor de CV.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos
              mediante un aviso en la aplicación. El uso continuado del servicio constituye tu aceptación.
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

      <footer className="border-t border-white/6 py-6">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap gap-4 items-center justify-between text-sm text-white/30">
          <span>© {new Date().getFullYear()} TuCV</span>
          <div className="flex gap-4">
            <a href="/app" className="hover:text-white transition-colors">Editor</a>
            <a href="/about" className="hover:text-white transition-colors">Acerca de</a>
            <a href="/terms" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
