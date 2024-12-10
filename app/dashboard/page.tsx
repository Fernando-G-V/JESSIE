'use client'
import { getToken, removeToken } from '/api/auth''
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Exchange {
  service: string
  description: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED'
}

interface UserData {
  username: string
  timeBalance: number
  exchanges: Exchange[]
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [serviceTitle, setServiceTitle] = useState('')
  const [serviceDescription, setServiceDescription] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<Exchange[]>([])
  const router = useRouter()

  useEffect(() => {
    loadUserData()
  }, [])

  async function loadUserData() {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch('/api/user/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setUserData(data)
    } catch (error) {
      console.error('Error cargando datos:', error)
    }
  }

  async function offerService(e: FormEvent) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    
    try {
      const response = await fetch('/api/services/offer', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: serviceTitle,
          description: serviceDescription
        })
      })
      
      if (response.ok) {
        // Reset form and potentially refresh services
        setServiceTitle('')
        setServiceDescription('')
        alert('Servicio ofertado exitosamente')
      }
    } catch (error) {
      console.error('Error ofertando servicio:', error)
    }
  }

  async function searchServices() {
    const token = localStorage.getItem('token')
    
    try {
      const response = await fetch(`/api/services/search?keyword=${searchKeyword}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const results = await response.json()
      setSearchResults(results)
    } catch (error) {
      console.error('Error buscando servicios:', error)
    }
  }

  function getStatusColor(status: string) {
    const colors: { [key: string]: string } = {
      'PENDING': 'text-yellow-600',
      'ACCEPTED': 'text-green-600',
      'REJECTED': 'text-red-600',
      'COMPLETED': 'text-blue-600'
    }
    return colors[status] || 'text-gray-600'
  }

  if (!userData) {
    return <div>Cargando...</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Mi Banco del Tiempo</h1>
          <div>
            <span className="mr-4">{userData.username}</span>
            <button 
              onClick={() => {
                localStorage.clear()
                router.push('/login')
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Mis Horas</h2>
            <div className="text-4xl font-bold text-blue-600">
              {userData.timeBalance} hrs
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow col-span-2">
            <h2 className="text-xl font-semibold mb-4">Intercambios Recientes</h2>
            <div>
              {userData.exchanges.map((exchange, index) => (
                <div key={index} className="bg-white p-4 rounded shadow mb-4">
                  <div className="flex justify-between">
                    <span>{exchange.service}</span>
                    <span className={`font-bold ${getStatusColor(exchange.status)}`}>
                      {exchange.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {exchange.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Ofertar Servicio</h2>
            <form onSubmit={offerService}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Título del Servicio
                </label>
                <input
                  type="text"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  required
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-500 text-white w-full py-2 rounded"
              >
                Ofertar Servicio
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Buscar Servicios</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Buscar por palabra clave
              </label>
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <button 
              onClick={searchServices}
              className="bg-green-500 text-white w-full py-2 rounded mb-4"
            >
              Buscar Servicios
            </button>
            <div id="searchResults" className="mt-4">
              {searchResults.map((result, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded mb-2">
                  <div className="font-bold">{result.service}</div>
                  <div className="text-sm text-gray-600">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
