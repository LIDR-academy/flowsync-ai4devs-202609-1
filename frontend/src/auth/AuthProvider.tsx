import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import * as api from '../api/client.ts'
import type { User } from '../api/client.ts'
import { AuthContext } from './AuthContext.ts'

const TOKEN_KEY = 'flowsync.token'

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function writeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage unavailable: session simply won't persist across reloads.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(readToken)
  const [initializing, setInitializing] = useState(() => readToken() !== null)

  // Session restore: runs once on mount. `cancelled` guards against StrictMode's
  // double-invocation and against a late response overwriting a fresh login/logout.
  useEffect(() => {
    const stored = readToken()
    if (!stored) return

    let cancelled = false
    api
      .getProfile(stored)
      .then((profile) => {
        if (!cancelled) setUser(profile)
      })
      .catch((error: unknown) => {
        if (cancelled) return
        // Only a 401 means the token is dead; network/5xx errors keep it.
        if (error instanceof api.ApiError && error.status === 401) {
          writeToken(null)
          setToken(null)
        }
      })
      .finally(() => {
        if (!cancelled) setInitializing(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const result = await api.login(email, password)
    writeToken(result.token)
    setToken(result.token)
    setUser(result.user)
    setInitializing(false)
  }, [])

  const logout = useCallback(async () => {
    try {
      if (token) await api.logout(token)
    } catch {
      // Token already invalid or network down: local state is cleared regardless.
    } finally {
      writeToken(null)
      setToken(null)
      setUser(null)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ user, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
