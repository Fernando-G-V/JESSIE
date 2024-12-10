'use client'
import { getToken, removeToken } from './lib/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        router.push('/dashboard')
      } else {
        alert('Credenciales incorrectas')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error en el inicio de sesión')
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Banco del Tiempo</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario o Correo Electrónico
            </label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="flex">
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-2xl"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Iniciar Sesión
            </button>
          </div>
          
          <div className="text-center">
            <Link href="/recuperar-contraseña" className="text-blue-500 hover:text-blue-700 text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta? 
            <Link href="/registro" className="text-blue-500 hover:text-blue-700">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}