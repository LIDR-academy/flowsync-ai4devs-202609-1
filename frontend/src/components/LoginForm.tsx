import { useState } from 'react'
import type { FormEvent } from 'react'
import { ApiError } from '../api/client.ts'
import { useAuth } from '../auth/AuthContext.ts'

export function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setFormError(null)
    setFieldErrors({})

    try {
      await login(email, password)
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) {
        const byField: Record<string, string> = {}
        for (const item of error.errors) {
          if (item.field) byField[item.field] = item.message
        }
        setFieldErrors(byField)
      } else if (error instanceof ApiError && error.status === 400) {
        setFormError('Correo o contraseña incorrectos.')
      } else {
        setFormError('No se pudo iniciar sesión. Inténtalo de nuevo.')
      }
      setSubmitting(false)
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <h1>Iniciar sesión</h1>

      <label>
        Correo electrónico
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        {fieldErrors.email && (
          <span className="field-error">{fieldErrors.email}</span>
        )}
      </label>

      <label>
        Contraseña
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
        {fieldErrors.password && (
          <span className="field-error">{fieldErrors.password}</span>
        )}
      </label>

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
