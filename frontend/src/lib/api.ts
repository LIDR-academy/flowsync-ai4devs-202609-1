const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api/v1'

export type User = {
  id: number
  fullName: string | null
  email: string
  initials: string
  createdAt: string
  updatedAt: string | null
}

type AuthResponse = { user: User; token: string }

export type ApiErrorItem = { message: string; field?: string; rule?: string }

export class ApiError extends Error {
  readonly status: number
  readonly errors: ApiErrorItem[]

  constructor(status: number, errors: ApiErrorItem[]) {
    super(errors[0]?.message ?? `Request failed with status ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

/** Thrown when the backend cannot be reached at all (server down, CORS, offline). */
export class NetworkError extends Error {
  constructor() {
    super('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.')
    this.name = 'NetworkError'
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST'
  body?: unknown
  token?: string | null
}

async function apiFetch<T>(path: string, { method = 'GET', body, token }: RequestOptions = {}) {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new NetworkError()
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const errors: ApiErrorItem[] = Array.isArray(payload?.errors)
      ? payload.errors
      : payload?.message
        ? [{ message: payload.message }]
        : []
    throw new ApiError(response.status, errors)
  }

  return (payload?.data ?? payload) as T
}

export type SignupInput = {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

export function signup(input: SignupInput) {
  return apiFetch<AuthResponse>('/auth/signup', { method: 'POST', body: input })
}

export function login(input: { email: string; password: string }) {
  return apiFetch<AuthResponse>('/auth/login', { method: 'POST', body: input })
}

export function getProfile(token: string) {
  return apiFetch<User>('/account/profile', { token })
}

export function logout(token: string) {
  return apiFetch<{ message: string }>('/account/logout', { method: 'POST', token })
}
