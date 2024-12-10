import { NextResponse } from 'next/server'

let services = [
  { id: 1, title: 'Clases de Inglés', description: 'Conversación', offeredBy: 'fernando' },
  { id: 2, title: 'Reparación de bicis', description: 'Arreglo de frenos', offeredBy: 'fernando' },
  { id: 3, title: 'Acompañamiento de mascotas', description: 'Paseo de perros', offeredBy: 'jessie' },
  { id: 4, title: 'Clases de Node', description: 'Entorno de desarrollo JS', offeredBy: 'jessie' },
];

export async function GET(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const term = searchParams.get('term')

  if (!term) {
    return NextResponse.json({ success: false, message: 'Especifica su solicitud' }, { status: 400 })
  }

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(term.toLowerCase()) ||
    service.description.toLowerCase().includes(term.toLowerCase())
  );

  return NextResponse.json({ success: true, services: filteredServices })
}

