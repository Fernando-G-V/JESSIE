import { NextResponse } from 'next/server'

let users = [
  { id: 1, username: 'fernando', password: 'password1', email: 'fgonzalezvale@gmail.com' },
  { id: 2, username: 'jessie', password: 'password2', email: 'jessie@gmail.com' },
];

export async function POST(request) {
  const { usuario, password, email, telefono, intereses, servicio, zona, disponibilidad, contacto, comentarios, boletin } = await request.json()

  if (users.some(u => u.username === usuario || u.email === email)) {
    return NextResponse.json({ success: false, message: 'Usuario o correo ya registrados' }, { status: 400 })
  }

  const newUser = {
    id: users.length + 1,
    username: usuario,
    password: password,
    email: email,
    telefono: telefono,
    intereses: intereses,
    servicio: servicio,
    zona: zona,
    disponibilidad: disponibilidad,
    contacto: contacto,
    comentarios: comentarios,
    boletin: boletin === 'on'
  };

  users.push(newUser);

  return NextResponse.json({ success: true, message: 'El registro se ha realizado correctamente' })
}

