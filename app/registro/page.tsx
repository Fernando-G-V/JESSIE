'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ToastAction } from "/components/ui/toast"
import { useToast } from "/components/ui/use-toast"

const formSchema = z.object({
  username: z.string().min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, introduce un email válido.' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export default function RegistroPage() {
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data) => {
    // Here you would typically send the data to your server
    console.log(data)
    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada. Por favor, inicia sesión.",
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Nombre de usuario</label>
          <input
            id="username"
            {...register('username')}
            className="w-full p-2 border rounded"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Confirmar contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  )
}

