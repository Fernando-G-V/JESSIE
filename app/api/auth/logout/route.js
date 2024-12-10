import { NextResponse } from 'next/server'

export async function POST() {
  // In a real application, you might invalidate the token on the server
  return NextResponse.json({ success: true, message: 'ha salido de la sesión' })
}

