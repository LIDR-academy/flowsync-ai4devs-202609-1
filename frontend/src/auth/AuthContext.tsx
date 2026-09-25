import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import * as api from '@/lib/api'

const TOKEN_KEY = 'flowsync.token'

type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (input: api.SignupInput) => Promise<void>
  logout: () => Promise<void>
  /** Drops the local session without calling the API (e.g. after a 401). */
  clearSession: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function storeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage unavailable (private mode): session lasts only while the tab is open.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readStoredToken)

  const saveToken = useCallback((value: string | null) => {
    storeToken(value)
    setToken(value)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await api.login({ email, password })
      saveToken(result.token)
    },
    [saveToken],
  )

  const signup = useCallback(
    async (input: api.SignupInput) => {
      const result = await api.signup(input)
      saveToken(result.token)
    },
    [saveToken],
  )

  const clearSession = useCallback(() => saveToken(null), [saveToken])

  const logout = useCallback(async () => {
    if (token) {
      // Best effort: the local session is dropped even if revoking the token fails.
      await api.logout(token).catch(() => undefined)
    }
    clearSession()
  }, [token, clearSession])

  const value = useMemo(
    () => ({ token, isAuthenticated: token !== null, login, signup, logout, clearSession }),
    [token, login, signup, logout, clearSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
