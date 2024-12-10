import React from 'react';

const Page = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white py-6">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="text-3xl font-bold">Banco del Tiempo</a>
                    <nav>
                        <a href="./" className="mx-2 hover:text-blue-200">Inicio</a>
                        <a href="./registro" className="bg-white text-blue-600 px-4 py-2 rounded">Registro</a>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <section className="bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiénes Somos</h1>

                    <div className="space-y-4 text-gray-700">
                        <p>
                            Es una red de <strong>colaboración mutua</strong> a través del intercambio de servicios y actividades donde la moneda de cambio es el tiempo.
                        </p>

                        <p>
                            Un espacio en el que encontrar soluciones a nuestras necesidades cotidianas y crear <strong>redes</strong> basadas en la <strong>solidaridad</strong>.
                        </p>

                        <div className="bg-blue-50 p-4 rounded-md">
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">Contacto</h2>
                            <p>
                                <strong>Horario:</strong> Lunes a viernes, de 9:00 a 13:30 horas y de 16:30 a 20:00 horas
                            </p>
                            <p>
                                <strong>Correo electrónico:</strong> BdTJandF@gmail.com
                            </p>
                            <p>
                                <strong>Teléfono:</strong> XXX XXX XXX
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-blue-700 mb-2">¿A quién se dirige?</h2>
                            <p>
                                Puede participar cualquier persona mayor de edad dispuesta a ofrecer sus destrezas y conocimientos a cambio de enriquecerse de lo que ofrece el resto del grupo. 
                                No es necesario residir en Pamplona.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-blue-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>© 2024 Banco del Tiempo. Todos los derechos reservados.</p>
                    <div className="mt-4">
                        <a href="./politica-privacidad" className="mx-2 hover:text-blue-200">Política de Privacidad</a>
                        <a href="./contacto" className="mx-2 hover:text-blue-200">Contacto: BdTJandF@gmail.com</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Page;
