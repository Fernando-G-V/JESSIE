import { NextResponse } from 'next/server'

const users = [
  { id: 1, username: 'fernando', password: 'password1' },
  { id: 2, username: 'jessie', password: 'password2' },
]

export async function POST(request: Request) {
  const { username, password } = await request.json()
  const user = users.find(u => u.username === username && u.password === password)

  if (user) {
    const token = Buffer.from(JSON.stringify({ id: user.id, username: user.username })).toString('base64')
    return NextResponse.json({ access_token: token })
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}

