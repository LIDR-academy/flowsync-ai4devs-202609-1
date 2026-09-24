import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ApiError, getProfile, type User } from '@/lib/api'

type ProfileState =
  { status: 'loading' } | { status: 'ready'; user: User } | { status: 'error'; message: string }

export function ProfilePage() {
  const { token, logout, clearSession } = useAuth()
  const [state, setState] = useState<ProfileState>({ status: 'loading' })
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (!token) return
    let cancelled = false

    getProfile(token)
      .then((user) => {
        if (!cancelled) setState({ status: 'ready', user })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        // Expired or revoked token: drop it, RequireAuth sends the user back to /login.
        if (error instanceof ApiError && error.status === 401) {
          clearSession()
          return
        }
        setState({
          status: 'error',
          message: error instanceof Error ? error.message : 'No se pudo cargar tu perfil.',
        })
      })

    return () => {
      cancelled = true
    }
  }, [token, clearSession])

  async function handleLogout() {
    setLoggingOut(true)
    await logout()
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Tu perfil</CardTitle>
          <CardDescription>Datos de tu cuenta en FlowSync.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {state.status === 'loading' && (
            <p className="text-sm text-muted-foreground">Cargando perfil…</p>
          )}

          {state.status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {state.status === 'ready' && <ProfileDetails user={state.user} />}

          <Button variant="outline" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

function ProfileDetails({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
        {user.initials}
      </div>
      <dl className="grid gap-1 text-sm">
        <div>
          <dt className="sr-only">Nombre</dt>
          <dd className="text-base font-medium">{user.fullName ?? 'Sin nombre'}</dd>
        </div>
        <div>
          <dt className="sr-only">Email</dt>
          <dd className="text-muted-foreground">{user.email}</dd>
        </div>
        <div>
          <dt className="sr-only">Miembro desde</dt>
          <dd className="text-muted-foreground">
            Miembro desde {new Date(user.createdAt).toLocaleDateString('es-ES')}
          </dd>
        </div>
      </dl>
    </div>
  )
}
