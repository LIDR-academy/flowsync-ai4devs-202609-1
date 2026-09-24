import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/auth/AuthContext'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

/** Keeps signed-in users away from the login/signup screens. */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/profile" replace />
  return children
}
