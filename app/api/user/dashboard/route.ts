import { NextResponse } from 'next/server'

const userDashboards = [
  {
    id: 1,
    username: 'fernando',
    timeBalance: 15,
    exchanges: [
      { service: 'Clases de Inglés', description: 'Clase de conversación', status: 'COMPLETED' },
      { service: 'Reparación de Bicicleta', description: 'Arreglo de frenos', status: 'PENDING' },
    ],
  },
  {
    id: 2,
    username: 'jessie',
    timeBalance: 8,
    exchanges: [
      { service: 'Cuidado de Mascotas', description: 'Paseo de perros', status: 'ACCEPTED' },
      { service: 'Clases de Node', description: 'Entorno de desarrollo de JS', status: 'COMPLETED' },
    ],
  },
]

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]
  const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString())

  const userDashboard = userDashboards.find(u => u.id === decodedToken.id)

  if (userDashboard) {
    return NextResponse.json(userDashboard)
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
}

