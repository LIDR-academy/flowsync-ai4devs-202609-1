# Comparación con harness vs. sin harness

## Parte A - Comparación

### Con harness

1. ** Archivos tocados
frontend/.env.example                    (nuevo)
frontend/src/lib/api.ts                  (nuevo)
frontend/src/auth/AuthContext.tsx        (nuevo)
frontend/src/components/LoginForm.tsx    (nuevo)
frontend/src/components/Dashboard.tsx    (nuevo)
frontend/src/App.tsx                     (reemplazo completo del scaffold)
frontend/src/main.tsx                    (envolver <App/> con <AuthProvider>)

2. ** Convenciones respetadas e ignoradas:** Respetó la validación de dependencias para no instalar sin justificación.

3. ** Cuántas veces tuviste que intervenir: ** 1 vez para toma de decisiones respecto a cambios sin convención en archivo. 

### Sin harness

1. ** Archivos tocados
.env.example                 (nuevo)
package.json                 (modificar: + react-router-dom)
main.tsx                     (modificar: BrowserRouter + AuthProvider)
App.tsx                      (reemplazar boilerplate: definición de rutas)
config/env.ts                (nuevo)
types/auth.ts                (nuevo: Profile, LoginResponse)
services/httpClient.ts       (nuevo: wrapper fetch + ApiError, desenvuelve `data`)
services/authService.ts      (nuevo: login/fetchProfile/logout)
context/AuthContext.tsx      (nuevo: AuthProvider + useAuth, sincroniza localStorage)
routes/ProtectedRoute.tsx    (nuevo: redirige a /login si no autenticado)
pages/LoginPage.tsx          (nuevo)
pages/ProfilePage.tsx        (nuevo)

2. ** Convenciones respetadas e ignoradas:** No existen convenciones.

3. ** Cuántas veces tuviste que intervenir: ** 3 veces, para ingresar el texto del ticket por error en la conexión a Jira, revisión de cambios y reintentar. 

## Parte B - Tres líneas

1. ** Hasta qué punto llegué: (en orden) ** CLAUDE.md por medio de /init, MCP de Jira, import de AGENTS al final de CLAUDE.md; tuve problemas con skill, subagente y hook.
2. ** Diferencias en las salidas: ** Con harness no tuvo inconvenientes para la búsqueda del ticket, cosa que sí al ejecutar sin harness; respetó la convenciones agregadas en CLAUDE.md y por el otro lado solicitó instalación de dependencias adicionales.
3. ** Qué no se cumplió: ** El agente sugirió cambios adicionales que no estaban dentro del ticket.
