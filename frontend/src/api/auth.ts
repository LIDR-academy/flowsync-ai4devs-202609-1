const API_BASE_URL = 'http://localhost:3333/api/v1'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  fullName: string | null
  email: string
  initials: string
}

export interface LoginResult {
  user: AuthUser
  token: string
}

export class LoginError extends Error {}

interface ErrorResponseBody {
  message?: string
  errors?: { message: string }[]
}

export async function login({ email, password }: LoginPayload): Promise<LoginResult> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const body = await response.json()

  if (!response.ok) {
    const errorBody = body as ErrorResponseBody
    throw new LoginError(
      errorBody.errors?.[0]?.message ?? errorBody.message ?? 'No se pudo iniciar sesión',
    )
  }

  return (body as { data: LoginResult }).data
}
