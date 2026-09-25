import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '@/auth/AuthContext'
import { AuthCard } from '@/components/AuthCard'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { toFormErrors } from '@/lib/errors'

// Mirrors the backend rules in backend/app/validators/user.ts.
const PASSWORD_MIN = 8
const PASSWORD_MAX = 32

type Fields = {
  fullName: string
  email: string
  password: string
  passwordConfirmation: string
}

function validate(fields: Fields) {
  const errors: Record<string, string> = {}
  if (!fields.email.trim()) errors.email = 'Este campo es obligatorio.'
  if (fields.password.length < PASSWORD_MIN) {
    errors.password = `Debe tener al menos ${PASSWORD_MIN} caracteres.`
  } else if (fields.password.length > PASSWORD_MAX) {
    errors.password = `No puede tener más de ${PASSWORD_MAX} caracteres.`
  }
  if (fields.passwordConfirmation !== fields.password) {
    errors.passwordConfirmation = 'Las contraseñas no coinciden.'
  }
  return errors
}

export function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [fields, setFields] = useState<Fields>({
    fullName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const update = (name: keyof Fields) => (event: ChangeEvent<HTMLInputElement>) =>
    setFields((current) => ({ ...current, [name]: event.target.value }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const clientErrors = validate(fields)
    setFieldErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    setSubmitting(true)
    try {
      await signup({
        fullName: fields.fullName.trim() || null,
        email: fields.email.trim(),
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
      })
      navigate('/profile', { replace: true })
    } catch (error) {
      const errors = toFormErrors(error, 'signup')
      setFormError(errors.form)
      setFieldErrors(errors.fields)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthCard
      title="Crear cuenta"
      description="Regístrate para empezar a usar FlowSync."
      error={formError}
      footer={
        <span>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-foreground underline underline-offset-4">
            Inicia sesión
          </Link>
        </span>
      }
    >
      <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
        <FormField
          id="fullName"
          label="Nombre (opcional)"
          autoComplete="name"
          value={fields.fullName}
          onChange={update('fullName')}
          error={fieldErrors.fullName}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={update('email')}
          error={fieldErrors.email}
          required
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          value={fields.password}
          onChange={update('password')}
          error={fieldErrors.password}
          required
        />
        <FormField
          id="passwordConfirmation"
          label="Repite la contraseña"
          type="password"
          autoComplete="new-password"
          value={fields.passwordConfirmation}
          onChange={update('passwordConfirmation')}
          error={fieldErrors.passwordConfirmation}
          required
        />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthCard>
  )
}
