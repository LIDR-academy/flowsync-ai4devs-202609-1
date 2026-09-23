const API_URL = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3333'}/api/v1`

export interface User {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string | null
  initials: string
}

export interface LoginResult {
  user: User
  token: string
}

interface ApiErrorItem {
  field?: string
  message: string
  rule?: string
}

export class ApiError extends Error {
  status: number
  errors: ApiErrorItem[]

  constructor(status: number, errors: ApiErrorItem[], message: string) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  let payload: unknown = null
  try {
    payload = await response.json()
  } catch {
    // Non-JSON body (e.g. proxy error): fall through to the generic error.
  }

  if (!response.ok) {
    const errors = (payload as { errors?: ApiErrorItem[] } | null)?.errors ?? []
    throw new ApiError(
      response.status,
      errors,
      errors[0]?.message ?? `Error ${response.status}`,
    )
  }

  return (payload as { data: T }).data
}

export function login(email: string, password: string) {
  return request<LoginResult>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

export function getProfile(token: string) {
  return request<User>('/account/profile', { token })
}

export async function logout(token: string) {
  await request<unknown>('/account/logout', { method: 'POST', token })
}
