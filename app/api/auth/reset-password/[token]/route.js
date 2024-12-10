import { NextResponse } from 'next/server'

let users = [
  { id: 1, username: 'fernando', password: 'password1', email: 'fgonzalezvale@gmail.com' },
  { id: 2, username: 'jessie', password: 'password2', email: 'jessie@gmail.com' },
];

let resetTokens = {};

export async function POST(request, { params }) {
  const { newPassword } = await request.json()
  const { token } = params

  if (!resetTokens[token] || resetTokens[token].expiration < Date.now()) {
    return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 400 })
  }

  const user = users.find(u => u.id === resetTokens[token].userId)
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
  }

  user.password = newPassword
  delete resetTokens[token]

  return NextResponse.json({ success: true, message: 'Contraseña actualizada' })
}

