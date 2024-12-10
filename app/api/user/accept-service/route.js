import { NextResponse } from 'next/server'

let userDashboards = [
  {
    id: 1,
    username: 'fernando',
    timeBalance: 15,
    exchanges: [
      { id: 1, service: 'Clases de Inglés', description: 'Conversación', status: 'COMPLETED' },
      { id: 2, service: 'Reparación de bicis', description: 'Arreglo de frenos', status: 'PENDING' },
    ],
  },
  {
    id: 2,
    username: 'jessie',
    timeBalance: 8,
    exchanges: [
      { id: 3, service: 'Acompañamiento de mascotas', description: 'Paseo de perros', status: 'ACCEPTED' },
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

  const { exchangeId } = await request.json()
  const userDashboard = userDashboards.find(u => u.id === decodedToken.id)

  if (!userDashboard) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
  }

  const exchange = userDashboard.exchanges.find(e => e.id === exchangeId && e.status === 'REQUESTED')

  if (!exchange) {
    return NextResponse.json({ success: false, message: 'Intercambio no disponible' }, { status: 404 })
  }

  exchange.status = 'ACCEPTED'
  userDashboard.timeBalance += 1 // Al completar un intercambio

  const requestingUserDashboard = userDashboards.find(u => u.username === exchange.requestedBy)
  if (requestingUserDashboard) {
    const requestingUserExchange = requestingUserDashboard.exchanges.find(e => e.id === exchangeId)
    if (requestingUserExchange) {
      requestingUserExchange.status = 'ACCEPTED'
      requestingUserDashboard.timeBalance -= 1 // Al requerir un servicio
    }
  }

  return NextResponse.json({ success: true, message: 'Intercambio aceptado' })
}

