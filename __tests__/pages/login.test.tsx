import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../../app/login/page'
import { useRouter } from 'next/navigation'

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders the login form', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/Usuario o Correo Electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument()
  })

  it('handles form submission', async () => {
    const mockRouter = { push: jest.fn() }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ access_token: 'fake_token' }),
    })

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/Usuario o Correo Electrónico/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object))
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles login failure', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'Invalid credentials' }),
    })

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<LoginPage />)

    fireEvent.change(screen.getByLabelText(/Usuario o Correo Electrónico/i), { target: { value: 'wronguser' } })
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrongpassword' } })
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Credenciales incorrectas')
    })

    alertMock.mockRestore()
  })
})

