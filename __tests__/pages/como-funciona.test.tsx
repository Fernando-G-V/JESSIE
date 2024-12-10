import { render, screen } from '@testing-library/react'
import ComoFunciona from '../../app/como-funciona/page'


  it('renders the how it works section', () => {
    render(<ComoFunciona />)
    const howItWorksHeading = screen.getByRole('heading', { name: /¿Cómo funciona?/i })
    expect(howItWorksHeading).toBeInTheDocument()
  })

  it('renders the participation section', () => {
    render(<ComoFunciona />)
    const participationHeading = screen.getByRole('heading', { name: /¿Cómo puedo participar?/i })
    expect(participationHeading).toBeInTheDocument()
  })

  it('renders the exchange areas', () => {
    render(<ComoFunciona />)
    const exchangeAreasHeading = screen.getByRole('heading', { name: /Áreas de Intercambio/i })
    expect(exchangeAreasHeading).toBeInTheDocument()
    const exchangeAreas = screen.getAllByRole('listitem')
    expect(exchangeAreas.length).toBeGreaterThan(0)
  })

  it('renders other participation possibilities', () => {
    render(<ComoFunciona />)
    const otherPossibilitiesHeading = screen.getByRole('heading', { name: /Otras Posibilidades de Participación/i })
    expect(otherPossibilitiesHeading).toBeInTheDocument()
    expect(screen.getByText(/Encuentros Grupales/i)).toBeInTheDocument()
    expect(screen.getByText(/Talleres y Charlas/i)).toBeInTheDocument()
    expect(screen.getByText(/Actividades Organizadas/i)).toBeInTheDocument()
  })
})

