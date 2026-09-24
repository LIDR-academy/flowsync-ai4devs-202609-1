import { ApiError, NetworkError } from '@/lib/api'

type FormErrors = {
  /** Error shown at the top of the form. */
  form: string | null
  /** Errors shown under a specific input, keyed by field name. */
  fields: Record<string, string>
}

const GENERIC_ERROR = 'Ha ocurrido un error inesperado. Inténtalo de nuevo.'

/** Translates backend validation rules into user-facing messages. */
const RULE_MESSAGES: Record<string, string> = {
  'database.unique': 'Ya existe una cuenta con este email.',
  email: 'Introduce un email válido.',
  required: 'Este campo es obligatorio.',
  minLength: 'Debe tener al menos 8 caracteres.',
  maxLength: 'Es demasiado largo.',
  sameAs: 'Las contraseñas no coinciden.',
}

export function toFormErrors(error: unknown, context: 'login' | 'signup'): FormErrors {
  if (error instanceof NetworkError) return { form: error.message, fields: {} }
  if (!(error instanceof ApiError)) return { form: GENERIC_ERROR, fields: {} }

  // AdonisJS answers bad credentials with a 400 carrying no field info.
  if (context === 'login' && error.status === 400) {
    return { form: 'Email o contraseña incorrectos.', fields: {} }
  }

  if (error.status === 422) {
    const fields: Record<string, string> = {}
    for (const item of error.errors) {
      if (!item.field || fields[item.field]) continue
      fields[item.field] = (item.rule && RULE_MESSAGES[item.rule]) || item.message
    }
    if (fields.email === RULE_MESSAGES['database.unique']) {
      return { form: fields.email, fields }
    }
    return { form: 'Revisa los campos marcados.', fields }
  }

  if (error.status === 429) {
    return { form: 'Demasiados intentos. Espera un momento y vuelve a probar.', fields: {} }
  }

  return { form: GENERIC_ERROR, fields: {} }
}
