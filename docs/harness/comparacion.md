# Comparación con y sin harness — FLOW-19 «Implementar login en el frontend»

- **Con harness:** `flowsync-ai4devs-202609-1` (`CLAUDE.md`, `AGENTS.md`, skills `/priority-ticket` y `/commit`, subagente `adversarial-reviewer`, MCP de Atlassian, hook de Prettier).
- **Sin harness:** `flowsync-sin-harness` (copia pelada: sin `CLAUDE.md`, sin `AGENTS.md`, sin `.claude/`).
- Modelo en las dos: Sonnet 5, Claude Code.

> **Desviación respecto al enunciado.** El README pide no aplicar el plan en ninguna copia y comparar
> los dos planes. En las dos copias acabó implementándose el código, así que esta comparación es de
> **cambios implementados**, no de planes. En la copia pelada no queda ningún plan escrito: el agente
> preguntó si implementar o solo planear y se respondió «Implementar».

## 1. Archivos modificados por copia

Solo se cuentan los archivos que aparecen en `git status` de cada copia. Los cambios previos a este
ticket (`frontend/package.json`, `frontend/package-lock.json`, `frontend/.prettierrc.json`, que solo
añaden Prettier) y los archivos del propio harness (`CLAUDE.md`, `AGENTS.md`, `.claude/`) no se cuentan.

| | Con harness | Sin harness |
|---|---|---|
| Archivos de código en `frontend/` | **8** (3 modificados + 5 nuevos) | **4** (2 modificados + 2 nuevos) |
| Modificados | `src/App.tsx`, `src/App.css`, `src/main.tsx` | `src/App.tsx`, `src/App.css` |
| Nuevos | `src/api/client.ts`, `src/auth/AuthContext.ts`, `src/auth/AuthProvider.tsx`, `src/components/LoginForm.tsx`, `.env.example` | `src/api.ts`, `src/LoginForm.tsx` |
| Tocó `backend/` | No | No |
| Otros | `prompts.md`, `docs/harness/comparacion.md` | `prompts.md` |

Diferencia de estructura: la copia con harness separa cliente de API, contexto de autenticación,
proveedor y formulario, y envuelve `<App />` en `<AuthProvider>` en `main.tsx`. La copia pelada
mantiene el estado de sesión dentro de `App.tsx` y no toca `main.tsx`.

## 2. Convenciones del proyecto: respetadas y no respetadas

Las convenciones salen del `CLAUDE.md` de la copia con harness y del estilo del código existente. La
copia pelada no tenía `CLAUDE.md`, así que evaluarla contra él mide justo lo que aporta el harness.

| Convención | Con harness | Sin harness |
|---|---|---|
| Cambios acotados a `frontend/` (no tocar `backend/` ni `.adonisjs/`) | ✅ | ✅ |
| Auth por token Bearer (no cookies ni `credentials: 'include'`) | ✅ | ✅ |
| Respuestas envueltas en `{ data }` (se desenvuelven al leerlas) | ✅ estricto | ✅ tolerante (`body.data ?? body`) |
| Estilo Prettier (sin punto y coma, comillas simples) | ✅ `prettier --check src` pasa | ⚠️ `src/api.ts` no pasa `prettier --check` con ese estilo (no hay hook ni `.prettierrc.json` en esta copia) |
| Imports con extensión explícita `.tsx`, como en `main.tsx` | ✅ | ❌ imports sin extensión (`./api`, `./LoginForm`); funciona con `bundler`, pero rompe el estilo existente |
| `verbatimModuleSyntax` / `erasableSyntaxOnly` (`import type`, sin `enum`) | ✅ | ✅ |
| `tsc` y lint sin errores | ✅ `npm run build` y `npm run lint` | ✅ `tsc -p tsconfig.app.json --noEmit` sin errores (comprobado); lint según lo que dijo el agente |
| Cliente tipado de Tuyau preferido frente a `fetch` a mano | ⚠️ desviación decidida: se preguntó y se eligió `fetch` plano | ❌ no se planteó; `fetch` a mano sin preguntar |
| Plan antes de implementar y confirmación explícita | ✅ plan, respuestas a las preguntas abiertas y un «Go ahead» | ❌ sin plan; solo la pregunta «¿implementar o planear?» |
| Revisión adversarial del plan antes de implementar | ✅ hecha (sin bloqueantes; 8 correcciones aplicadas) | ❌ no existe el subagente |
| Revisión adversarial del diff antes de commit | ❌ pendiente | ❌ no existe el subagente |
| Commit por `/commit`, sin `git add -A`, sin push | ✅ no se ha hecho commit ni push | ✅ no se ha hecho commit ni push |
| No editar a mano archivos generados (`.adonisjs/`, `schema.ts`) | ✅ | ✅ |

## 3. Diferencias de comportamiento del login

Contrastadas con el código del backend (`access_tokens_controller.ts`, `validators/user.ts`):

| Aspecto | Con harness | Sin harness |
|---|---|---|
| Credenciales incorrectas (backend responde **400**) | Mensaje de formulario «Correo o contraseña incorrectos.» | Mensaje equivalente (mapea 400 y 401) |
| Errores de validación (**422**, `errors[].field`) | Se muestran bajo cada campo | No se muestran por campo: usa el primer mensaje del servidor, en inglés |
| Restaurar sesión al recargar | Llama a `GET account/profile`; borra el token solo si recibe 401; estado `initializing` para evitar el parpadeo del login | Solo lee `localStorage`; no valida el token con el servidor, así que un token revocado deja al usuario «dentro» con sesión muerta |
| Logout | `POST account/logout` y limpia el estado local siempre (`finally`) | `POST account/logout`, ignora errores y limpia el estado local |
| `fullName` nulo | Cae a `email` | Cae a `email` |
| Protección StrictMode / respuestas tardías | Bandera `cancelled` en el efecto | No aplica (no hay efecto de restauración) |
| URL base de la API | `VITE_API_URL` (solo el host) + `/api/v1`, con `.env.example` | `VITE_API_URL` incluye ya `/api/v1`; sin `.env.example` |
| Idioma de la interfaz | Español | Español |

## 4. Casillas de la comparación

| | Con harness | Sin harness |
|---|---|---|
| Archivos propuestos/tocados | 8 en `frontend/` | 4 en `frontend/` |
| Convenciones respetadas | Las de la tabla 2, salvo la revisión del diff (pendiente) y Tuyau (desviación decidida) | Alcance, Bearer, `{ data }`, tipos y no tocar generados; fallan estilo/imports, Tuyau, plan, revisión |
| Veces que intervine | 3 prompts en la sesión del ticket: `/priority-ticket FLOW-19`, respuesta a las preguntas abiertas y «Go ahead. UI language is Spanish» | 2: el prompt inicial y la respuesta «Implementar» |
| Qué tocaría arreglar a mano | Pasar la revisión adversarial del diff antes de commitear; probar contra el backend en marcha (no probado) | Formatear `api.ts`; imports con extensión; añadir validación de sesión al restaurar y errores por campo; probar contra el backend (no probado) |

Nota sobre «veces que intervine»: la copia con harness requirió menos decisiones sueltas por resultado,
pero el harness en sí (`CLAUDE.md`, skills, subagente, hook) costó una sesión entera de montaje. Ese
coste no está en la casilla.

## Parte B: las tres líneas

<!-- README: esta parte «no se puede fallar». Son juicios tuyos; no los relleno yo. -->

1. Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas: llegué hasta el final (creo!) pero tardé 1:30
2. La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla: no he visto ninguna diferencia. Sospecho que algo se ha quedado corriendo del modelo con el harness al otro porque la verdad me ha parecido el mismo resutado pero con la diferencia de que en el modelo del harness he tenido que montarlo. 
3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente: ha implementado todo lo que ha pedido. No he hecho más testing porque me paso de tiempo. 
