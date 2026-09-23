# Comparación: con harness vs. sin harness

**Encargo:** ticket FLOW «Implementar login en el frontend». Criterios usados: login con correo + password (mín. 6 caracteres, una mayúscula, un carácter especial); botón habilitado solo si ambos son válidos.

> **Cómo se armó este archivo.** Las casillas se rellenaron el 2026-09-23 a las 04:02 (Lima) **a partir de evidencia en los dos repos**: `git status`, contenido de archivos, timestamps, `prettier --check` (misma config en ambos), `tsc -b`, `backend/backend-dev.log` y `prompts.md`. Nada de esto sale de memoria.
> Las casillas marcadas **[PENDIENTE — Héctor]** no tienen evidencia en archivos: dependen de lo que viste en pantalla.
> Hora de escritura de los archivos: con harness, 03:22 · sin harness, 03:57.

| Casilla | Con harness (`flowsync-ai4devs-202609-1`) | Sin harness (`flowsync-sin-harness`) |
|---|---|---|
| **1. Archivos tocados (contados)** | **13** (3 modificados + 10 nuevos), más 3 ignorados por git (`.env.local`, `dist/`, `backend-dev.log`). | **5** (2 modificados + 3 nuevos), más 1 ignorado (`dist/`). |
| **2. Convenciones** | Escritas en `CLAUDE.md` y en las skills: **9 respetadas, 4 no respetadas, 2 no verificables** (detalle abajo). | **Ninguna escrita en ninguna parte** (solo el README de setup). Frente a las implícitas del código: 4 respetadas, 3 no respetadas (detalle abajo). |
| **3. Intervenciones** | **≥ 2** según `prompts.md`: interrumpirlo por «procesamiento extenso y sin aparente fin» y pedirle un usuario y una clave en duro. El segundo prompt **no está registrado**. Ver (¹). | **0 registradas**: un solo prompt, idéntico al de la otra copia. Nota en su `prompts.md`: «fue la ejecución más rápida». |
| **4. Qué arreglaría a mano** | 7 puntos (abajo). Lo principal: formato, reglas de password frente al backend y decisión sobre el token. | 5 puntos (abajo). Lo principal: **no usa el backend**; es un mock con credenciales en el código fuente. |

(¹) **Inconsistencia sin resolver.** En la copia con harness, `prompts.md` dice que hubo que pedir un usuario y una clave en duro, pero su código **no** los tiene: llama al API real. En la copia sin harness nadie lo pidió (un solo prompt) y el agente **decidió por su cuenta** hacer un mock con credenciales en el código, apoyándose en una premisa falsa («no database connection yet»). **[PENDIENTE — Héctor]** qué pasó con esa petición en la copia con harness: ¿el agente la rechazó, la ignoró o se revirtió?

> Nota: los dos prompts registrados son el texto de la historia, no `/priority-ticket`. La copia con harness no se lanzó con la skill.

## La diferencia de fondo
| | Con harness | Sin harness |
|---|---|---|
| Autenticación | API real: `POST /api/v1/auth/login`, `GET /account/profile`, `POST /account/logout` | **Mock**: compara con `admin@flowsync.com` / `Admin@123` escritos en `src/lib/auth.ts` y genera un token falso `mock-<uuid>` |
| Supuesto sobre el backend | Lo usa y lo configura con `VITE_API_URL` | Comentario en el código: «There is no database connection yet». **Falso**: el backend tiene SQLite, migraciones y endpoint de login |
| Sesión | Contexto de React (`AuthProvider`); token en `localStorage`; valida el token con `/profile` al recargar | Estado en `App`; sesión completa (usuario + token falso) en `localStorage` |
| Arquitectura | `api/` · `auth/` · `components/` | `lib/` · `components/` |

## Detalle: con harness
**Archivos.** Modificados: `App.tsx`, `App.css`, `main.tsx`. Nuevos: `.env.example`, `vite-env.d.ts`, `api/client.ts`, `api/auth.ts`, `auth/AuthContext.ts`, `auth/AuthProvider.tsx`, `auth/useAuth.ts`, `auth/validation.ts`, `components/LoginForm.tsx`, `components/HomeScreen.tsx`. Backend: 0 archivos. El cambio en `package.json` y el lockfile viene de instalar Prettier al montar el harness, no del agente.

**Respetadas (9):**
1. `import type`.
2. Imports con extensión `.ts` / `.tsx`.
3. Sin `enum` ni `namespace`.
4. `fetch` centralizado en `src/api/`.
5. `VITE_API_URL` con `.env.example`, sin darla por existente.
6. Contexto de React 19 (`use()` y `<AuthContext value>`).
7. Estados de carga, error y éxito, y manejo del 401.
8. No tocó el backend (regla 2).
9. No añadió dependencias (regla 3).

**No respetadas (4):**
1. **Prettier:** 4 archivos no pasan `--check`, aunque el hook `format-frontend` debía formatearlos.
2. **Solo plan, no implementar:** lo pedían la regla 1, la skill `/priority-ticket` y el ejercicio.
3. **Revisión con `adversarial-reviewer` (regla 6):** no hay evidencia de que se invocara.
4. **Regla 4 (`.env`):** creó `frontend/.env.local`.

**No verificables (2):** si preguntó antes de guardar el token en `localStorage`, y si corrió lint y typecheck (hoy `tsc -b` pasa).

**Arreglos manuales:**
1. Pasar Prettier a los 4 archivos.
2. Reglas de password del login frente al backend: el signup acepta 8–32 caracteres sin mayúscula ni carácter especial, así que un usuario válido puede quedar bloqueado en el login.
3. Decidir el almacenamiento del token (riesgo de XSS).
4. Verificar dos supuestos del cliente: credenciales inválidas → **400** y respuesta envuelta en `{ data }`.
5. Aclarar lo de «usuario y clave en duro» (¹).
6. Unificar `node_modules` en un solo entorno (hoy están mezclados Windows y WSL; el backend no arranca en Windows según `backend-dev.log`).
7. Sin tests.

## Detalle: sin harness
**Archivos.** Modificados: `App.tsx`, `App.css`. Nuevos: `components/LoginForm.tsx`, `lib/auth.ts`, `lib/validation.ts`. No tocó `main.tsx` ni el backend.

**Convenciones escritas:** ninguna. Frente a las **implícitas** del código:
- **Respetadas (4):** imports con extensión; `type` en imports (inline); sin `enum`; componentes con `export default`, como el template. Prettier: solo `lib/auth.ts` falla el `--check`.
- **No respetadas (3):**
  1. Ignora los endpoints existentes del backend y los reemplaza por un mock.
  2. Afirma algo falso sobre el proyecto («no database connection yet»).
  3. Mete credenciales en el código fuente, que además quedarían en el bundle.

**Arreglos manuales:**
1. Reemplazar el mock por llamadas reales a `/api/v1/auth/*` y `/account/*`.
2. Eliminar `DEMO_USER` y la contraseña del código.
3. Corregir el comentario falso.
4. Las mismas reglas de password frente al backend (punto 2 del otro lado).
5. Prettier en `lib/auth.ts`. Sin tests.

---

# Parte B: las tres líneas

1. **Piezas montadas:** `CLAUDE.md` (redactado, **no** generado con `/init`), MCP `atlassian`, skills `/priority-ticket` y `/commit` (más `adonisjs-v7` y `react-vite`), subagente `adversarial-reviewer`, hook Prettier para el frontend (más hook Stop), reglas de proceso al final de `CLAUDE.md`. **`AGENTS.md` como enlace: no montado.** La que más costó y en qué se fue el rato: **[PENDIENTE — Héctor]**
2. **Primera diferencia y dónde miraba:** **[PENDIENTE — Héctor]**. Como referencia de evidencia, la diferencia más visible en archivos es que la copia sin harness autentica contra un usuario escrito en `src/lib/auth.ts` y la copia con harness llama a `/api/v1/auth/login`. Si lo notaste abriendo ese archivo, dilo.
3. **Algo escrito en el harness que no se cumplió:** **[PENDIENTE — Héctor: elige y redacta]**. Candidatos con evidencia:
   - Regla 1 de `CLAUDE.md` y `/priority-ticket`: «plan antes de código». El agente implementó 13 archivos.
   - Hook y skill `react-vite`: «Prettier tras cada edición». Quedaron 4 archivos sin formatear, **más que en la copia sin harness (1)**. Posible causa (no verificada): Claude Code corrió en Windows y el harness se montó para WSL.
