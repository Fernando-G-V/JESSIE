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
                    <h1 className="text-3xl font-bold text-blue-600 mb-6">Cómo Funciona</h1>

                    <div className="space-y-6 text-gray-700">
                        <div>
                            <h2 className="text-xl font-semibold text-blue-700 mb-3">¿Cómo funciona?</h2>
                            <p className="mb-4">
                                Cada persona interesada en formar parte del Banco de Tiempo tiene que detallar los conocimientos o destrezas que quiere ofrecer a las demás personas. 
                                A continuación, se le abre una cuenta de horas y se le entrega un fondo de 10 horas para comenzar los intercambios.
                            </p>
                            <p>
                                Desde ese momento, ya puede comenzar a realizar intercambios, los cuales no tienen por qué ser bilaterales. 
                                Cada vez que alguien presta un servicio, quien lo recibe le entrega el tiempo dedicado, el cual se ingresará en su cuenta personal.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-blue-700 mb-3">¿Cómo puedo participar?</h2>
                            <p className="mb-4">
                                Existe una amplia gama de habilidades y saberes para poder llevar a cabo intercambios individuales entre las distintas personas que forman parte del banco del tiempo:
                            </p>

                            <div className="bg-blue-50 p-4 rounded-md mb-4">
                                <h3 className="font-semibold text-blue-700 mb-2">Áreas de Intercambio</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Distintas áreas</li>
                                    <li>Idiomas</li>
                                    <li>Nuevas tecnologías</li>
                                    <li>Apoyo escolar</li>
                                    <li>Acompañamientos</li>
                                    <li>Labores domésticas y jardín</li>
                                    <li>Diferentes técnicas para el cuidado y bienestar</li>
                                    <li>Asesoramiento técnico en distintas áreas</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-blue-700 mb-3">Otras Posibilidades de Participación</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-blue-600 mb-2">Encuentros Grupales</h3>
                                    <p>
                                        Reuniones periódicas donde las personas socias puedan conocerse, contar sus experiencias, proponer ideas y mucho más.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-blue-600 mb-2">Talleres y Charlas</h3>
                                    <p>
                                        Impartidos por los propios socios y socias y dirigidos a las personas que integran el Banco del Tiempo. 
                                        Algunos ejemplos incluyen: jardinería, meditación, informática, cocina, danza, salud y bienestar.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-blue-600 mb-2">Actividades Organizadas</h3>
                                    <p>
                                        Actividades abiertas a toda la población, como jornadas informativas, mercadillos de trueque, entre otros.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-md">
                            <h3 className="font-semibold text-blue-700 mb-2">Colaboración Adicional</h3>
                            <p>
                                El banco participa de forma puntual en servicios: imparten charlas para familias, dinamizan talleres infantiles, colaboran con la secretaría y participan en otras iniciativas.
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
