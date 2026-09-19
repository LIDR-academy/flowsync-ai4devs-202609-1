import './App.css'
import { LoginForm } from './components/LoginForm.tsx'
import { useAuth } from './auth/AuthContext.ts'

function App() {
  const { user, initializing, logout } = useAuth()

  if (initializing) return <main className="center">Cargando…</main>

  if (!user) {
    return (
      <main className="center">
        <LoginForm />
      </main>
    )
  }

  return (
    <main className="center">
      <h1>Hola, {user.fullName ?? user.email}</h1>
      <p>Has iniciado sesión como {user.email}.</p>
      <button type="button" onClick={logout}>
        Cerrar sesión
      </button>
    </main>
  )
}

export default App
