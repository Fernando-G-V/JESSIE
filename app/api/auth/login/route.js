import { NextResponse } from 'next/server'

let users = [
  { id: 1, username: 'fernando', password: 'password1', email: 'fgonzalezvale@gmail.com' },
  { id: 2, username: 'jessie', password: 'password2', email: 'jessie@gmail.com' },
];

export async function POST(request) {
  const { username, password } = await request.json()
  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    const token = Buffer.from(JSON.stringify({ id: user.id, username: user.username })).toString('base64')
    return NextResponse.json({ success: true, access_token: token })
  } else {
    return NextResponse.json({ success: false, message: 'Credenciales incorrectas' }, { status: 401 })
  }
}

