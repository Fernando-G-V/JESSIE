import { NextResponse } from 'next/server'
import crypto from 'crypto'

let users = [
  { id: 1, username: 'fernando', password: 'password1', email: 'fgonzalezvale@gmail.com' },
  { id: 2, username: 'jessie', password: 'password2', email: 'jessie@gmail.com' },
];

let resetTokens = {};

export async function POST(request) {
  const { email } = await request.json()
  const user = users.find(u => u.email === email)

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
  }

  const token = crypto.randomBytes(20).toString('hex')
  resetTokens[token] = { userId: user.id, expiration: Date.now() + 3600000 } // Token valid for 1 hour

  const resetLink = `http://localhost:3000/reset-password/${token}`

  // In a real application, you would send an email here
  console.log(`Reset link: ${resetLink}`)

  return NextResponse.json({ success: true, message: 'Un enlace se ha enviado a tu correo' })
}

