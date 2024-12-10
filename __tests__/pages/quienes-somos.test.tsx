import { render, screen } from '@testing-library/react'
import QuienesSomos from '../../app/quienes-somos/page'

describe('QuienesSomos', () => {
  it('renders the main heading', () => {
    render(<QuienesSomos />)
    const heading = screen.getByRole('heading', { name: /Quiénes Somos/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the contact information', () => {
    render(<QuienesSomos />)
    const contactHeading = screen.getByRole('heading', { name: /Contacto/i })
    expect(contactHeading).toBeInTheDocument()
    expect(screen.getByText(/Horario:/i)).toBeInTheDocument()
    expect(screen.getByText(/Correo electrónico:/i)).toBeInTheDocument()
    expect(screen.getByText(/Teléfono:/i)).toBeInTheDocument()
  })

  it('renders the target audience section', () => {
    render(<QuienesSomos />)
    const targetHeading = screen.getByRole('heading', { name: /¿A quién se dirige?/i })
    expect(targetHeading).toBeInTheDocument()
  })
})

