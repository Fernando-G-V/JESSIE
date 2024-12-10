
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Banco del Tiempo',
  description: 'Intercambia servicios, comparte tiempo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}