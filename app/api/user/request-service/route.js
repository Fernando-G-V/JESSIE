import { NextResponse } from 'next/server'

let services = [
  { id: 1, title: 'Clases de Inglés', description: 'Conversación', offeredBy: 'user1' },
  { id: 2, title: 'Reparación de bicis', description: 'Arreglo de frenos', offeredBy: 'user1' },
  { id: 3, title: 'Acompañamiento de mascotas', description: 'Paseo de perros', offeredBy: 'user2' },
  { id: 4, title: 'Clases de Node', description: 'Entorno de desarrollo JS', offeredBy: 'user2' },
];


let userDashboards = [
  {
    id: 1,
    username: 'fernando',
    timeBalance: 15,
    exchanges: [
      { id: 1, service: 'Clases de Inglés', description: 'Conversación', status: 'COMPLETED' },
      { id: 2, service: 'Reparación de bicis', description: 'Arreglo de frenos' status: 'PENDING' },
    ],
  },
  {
    id: 2,
    username: 'jessie',
    timeBalance: 8,
    exchanges: [
      { id: 3, service:'Acompañamiento de mascotas', description: 'Paseo de perros', status: 'ACCEPTED' },
      { id: 4, service: 'Clases de Node', description: 'Entorno de desarrollo JS', status: 'COMPLETED' },
    ],
  },
];

export async function POST(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString())

  const { serviceId } = await request.json()
  const service = services.find(s => s.id === serviceId)

  if (!service) {
    return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 })
  }

  if (service.offeredBy === decodedToken.username) {
    return NextResponse.json({ success: false, message: 'No puedes solicitar tu propia propuesta' }, { status: 400 })
  }

  const userDashboard = userDashboards.find(u => u.id === decodedToken.id)

  if (userDashboard) {
    const newExchange = {
      id: Date.now(),
      service: service.title,
      description: service.description,
      status: 'PENDING',
      requestedBy: decodedToken.username,
      offeredBy: service.offeredBy
    };

    userDashboard.exchanges.push(newExchange);

    const offeringUserDashboard = userDashboards.find(u => u.username === service.offeredBy)
    if (offeringUserDashboard) {
      offeringUserDashboard.exchanges.push({...newExchange, status: 'REQUESTED'});
    }

    return NextResponse.json({ success: true, message: 'Solicitud correcta' })
  } else {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
  }
}

