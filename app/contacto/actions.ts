'use server'

import { z } from 'zod'
import nodemailer from 'nodemailer'

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un correo electrónico válido.",
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

export async function sendEmail(formData: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(formData)

  if (!result.success) {
    throw new Error('Invalid form data')
  }

  const { fullName, email, phone, message } = result.data

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // Define email options
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPIENT, // The Gmail address where you want to receive the contact form submissions
    subject: 'Nuevo mensaje de contacto - Banco del Tiempo',
    text: `
      Nombre: ${fullName}
      Email: ${email}
      Teléfono: ${phone || 'No proporcionado'}
      Mensaje: ${message}
    `,
    html: `
      <h1>Nuevo mensaje de contacto</h1>
      <p><strong>Nombre:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

