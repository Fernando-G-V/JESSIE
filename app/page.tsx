import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Banco del Tiempo</h1>
          <nav>
            <Link href="./quienes-somos" className="mx-2 hover:text-blue-200">Quiénes Somos</Link>
            <Link href="./como-funciona" className="mx-2 hover:text-blue-200">Cómo Funciona</Link>
            <Link href="./login" className="mx-2 hover:text-blue-200">Area personal</Link>
            <Link href="./registro" className="bg-white text-blue-600 px-4 py-2 rounded">Registro</Link>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="bg-blue-500 text-white py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Intercambia Servicios, Comparte Tiempo</h2>
          <p className="text-xl mb-6">Una comunidad donde una hora vale lo mismo para todos</p>
          <div className="space-x-4">
            <Link href="./registro" className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-100">Únete Ahora</Link>
            <Link href="./quienes-somos" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-blue-600">Conócenos</Link>
          </div>
        </section>

        <section id="testimonios" className="section py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-12">Experiencias de Nuestra Comunidad</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <img src="/api/placeholder/100/100" alt="Testimonio" className="mx-auto mb-6 rounded-full" />
                <p className="mb-4">"Gracias al Banco del Tiempo, he aprendido idiomas y he ayudado a otros con Node.JS. ¡Es una experiencia increíble!"</p>
                <h4 className="text-xl font-semibold text-blue-800 mt-4">Jessie</h4>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <img src="/api/placeholder/100/100" alt="Testimonio" className="mx-auto mb-6 rounded-full" />
                <p className="mb-4">"He realizado un proyecto de desarrollo de un aplicativo. ¡El Banco del Tiempo es fantástico!"</p>
                <h4 className="text-xl font-semibold text-green-800 mt-4">Fernando</h4>
              </div>
            </div>
          </div>
        </section>

        <section id="metricas" className="section py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-bold mb-12">Nuestra Comunidad en Números</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-700 p-8 rounded-xl transform hover:scale-105 transition-transform">
                <h4 className="text-2xl font-semibold mb-4">Usuarios Activos</h4>
                <p className="text-3xl">0</p>
              </div>
              <div className="bg-blue-700 p-8 rounded-xl transform hover:scale-105 transition-transform">
                <h4 className="text-2xl font-semibold mb-4">Servicios Intercambiados</h4>
                <p className="text-3xl">0</p>
              </div>
              <div className="bg-blue-700 p-8 rounded-xl transform hover:scale-105 transition-transform">
                <h4 className="text-2xl font-semibold mb-4">Horas Totales</h4>
                <p className="text-3xl">0</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Banco del Tiempo. Todos los derechos reservados.</p>
          <div className="mt-4">
            <Link href="/politica-privacidad" className="mx-2 hover:text-blue-200">Política de Privacidad</Link>
            <Link href="./contacto" className="mx-2 hover:text-blue-200">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}