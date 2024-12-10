import { render, screen } from '@testing-library/react'
import LandingPage from '../../app/page'

describe('LandingPage', () => {
  it('renders the main heading', () => {
    render(<LandingPage />)
    const heading = screen.getByRole('heading', { name: /Banco del Tiempo/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the hero section', () => {
    render(<LandingPage />)
    const heroHeading = screen.getByRole('heading', { name: /Intercambia Servicios, Comparte Tiempo/i })
    expect(heroHeading).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<LandingPage />)
    const quienesSomosLink = screen.getByRole('link', { name: /Quiénes Somos/i })
    const comoFuncionaLink = screen.getByRole('link', { name: /Cómo Funciona/i })
    const registroLink = screen.getByRole('link', { name: /Registro/i })
    expect(quienesSomosLink).toBeInTheDocument()
    expect(comoFuncionaLink).toBeInTheDocument()
    expect(registroLink).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<LandingPage />)
    const uneteButton = screen.getByRole('link', { name: /Únete Ahora/i })
    const conocenosButton = screen.getByRole('link', { name: /Conócenos/i })
    expect(uneteButton).toBeInTheDocument()
    expect(conocenosButton).toBeInTheDocument()
  })
})

