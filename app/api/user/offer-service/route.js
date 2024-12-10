import { NextResponse } from 'next/server'

let services = [
  { id: 1, title: 'Clases de Inglés', description: 'Conversación', offeredBy: 'user1' },
  { id: 2, title: 'Reparación de bicis', description: 'Arreglo de frenos', offeredBy: 'user1' },
  { id: 3, title: 'Acompañamiento de mascotas', description: 'Paseo de perros', offeredBy: 'user2' },
  { id: 4, title: 'Clases de Node', description: 'Entorno de desarrollo JS', offeredBy: 'user2' },
];

export async function POST(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString())

  const { serviceTitle, serviceDescription } = await request.json()
  const newService = {
    id: services.length + 1,
    title: serviceTitle,
    description: serviceDescription,
    offeredBy: decodedToken.username
  };

  services.push(newService);

  return NextResponse.json({ success: true, message: 'Servicio ofertado correctamente' })
}
