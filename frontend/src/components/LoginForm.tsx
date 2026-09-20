import { useState } from 'react'
import type { FormEvent } from 'react'
import { login, LoginError, type AuthUser } from '../api/auth'

// El campo se muestra como "usuario" pero viaja como email: el backend solo
// tiene columna `email` (ver backend/database/schema.ts), así que la regla del
// ticket de "sin espacios ni caracteres especiales" se aplica como "sin
// espacios y con formato de email válido".
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MIN_LENGTH = 6
const PASSWORD_HAS_NUMBER = /\d/
const PASSWORD_HAS_SPECIAL_CHAR = /[^A-Za-z0-9]/

function validate(email: string, password: string) {
  const errors: { email?: string; password?: string } = {}

  if (!email.trim()) {
    errors.email = 'Ingresá tu usuario.'
  } else if (/\s/.test(email)) {
    errors.email = 'El usuario no puede contener espacios.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Ingresá un usuario con formato de email válido.'
  }

  if (!password) {
    errors.password = 'Ingresá tu contraseña.'
  } else if (password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`
  } else if (!PASSWORD_HAS_NUMBER.test(password)) {
    errors.password = 'La contraseña debe incluir al menos un número.'
  } else if (!PASSWORD_HAS_SPECIAL_CHAR.test(password)) {
    errors.password = 'La contraseña debe incluir al menos un carácter especial.'
  }

  return errors
}

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<AuthUser | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const errors = validate(email, password)
    setFieldErrors(errors)
    if (errors.email || errors.password) {
      return
    }

    setSubmitting(true)
    try {
      const result = await login({ email, password })
      setLoggedInUser(result.user)
    } catch (error) {
      setFormError(error instanceof LoginError ? error.message : 'No se pudo iniciar sesión.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loggedInUser) {
    return (
      <p role="status">
        Sesión iniciada correctamente. ¡Hola, {loggedInUser.fullName ?? loggedInUser.email}!
      </p>
    )
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <div className="login-field">
        <label htmlFor="login-email">Usuario</label>
        <input
          id="login-email"
          name="email"
          type="text"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
        />
        {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
      </div>

      <div className="login-field">
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={Boolean(fieldErrors.password)}
        />
        {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
      </div>

      {formError && (
        <p className="field-error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}
