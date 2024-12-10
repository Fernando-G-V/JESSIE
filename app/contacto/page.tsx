'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { sendEmail } from './actions'
import { Button } from "/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "/components/ui/form"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { useToast } from "/components/ui/use-toast"

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

export default function BancoDelTiempoContact() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendEmail(values)
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      })
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Banco del Tiempo</h1>
          <nav>
            <a href="/" className="mx-2 hover:text-blue-200">Inicio</a>
            <a href="/quienes-somos" className="mx-2 hover:text-blue-200">Quiénes Somos</a>
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Contacta con Nosotros</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduce tu nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="ejemplo@correo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono (Opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Introduce tu número de teléfono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensaje</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Escribe tu mensaje aquí" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Enviar Mensaje</Button>
            </form>
          </Form>
        </div>
      </main>

      <footer className="container mx-auto px-4 text-center">
        <p>© 2024 Banco del Tiempo. Todos los derechos reservados.</p>
        <div className="mt-4">
          <a href="/politica-privacidad" className="mx-2 hover:text-blue-200">
            Política de Privacidad
          </a>
        </div>
      </footer>
    </>
  )
}

