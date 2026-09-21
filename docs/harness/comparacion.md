# FLOW-1: con harness vs. sin harness

Mismo ticket (FLOW-1) y **el mismo prompt, literal, en las dos copias**. Está guardado en
[`prompts.md`](../../prompts.md). La única variable es el harness: la copia con harness partía del
commit `80e5588 chore: add coding agent harness` (`CLAUDE.md` + `scripts/check.mjs`); la copia
`flowsync-sin-harness` partía del mismo código sin ninguno de los dos.

No se cuentan como cambios de FLOW-1 las modificaciones aparentes en los archivos generados de
AdonisJS (`.adonisjs/`, `database/schema.ts`) ni en `backend/.env.example`: son ruido de finales de
línea LF/CRLF en Windows, presente en ambas copias antes de empezar.

## 1. Archivos tocados, contados

| | CON harness | SIN harness |
|---|---|---|
| **Total** | **9** (8 nuevos + 1 modificado) | **7** (5 nuevos + 2 modificados) |
| Frontend | 8 | 7 |
| Backend | 1 (solo tests) | 0 |

**CON harness** — `frontend/src/lib/api.ts`, `frontend/src/lib/session.ts`,
`frontend/src/hooks/useSession.ts`, `frontend/src/components/SessionBar.tsx`,
`frontend/src/components/LoginForm.tsx`, `frontend/src/components/SessionBar.css`,
`frontend/.env.example`, `backend/tests/functional/account_profile.spec.ts`; modificado
`frontend/src/App.tsx` (3 líneas insertadas, 0 borradas).

**SIN harness** — `frontend/src/api.ts`, `frontend/src/useSession.ts`,
`frontend/src/SessionBar.tsx`, `frontend/src/SessionBar.css`, `frontend/.env.example`; modificados
`frontend/src/App.tsx` y `frontend/.gitignore`.

Las dos resolvieron el ticket igual de lejos: solo frontend, `fetch` nativo, `localStorage`,
validación de la sesión contra `/account/profile` y un formulario mínimo de login (el frontend
original no tenía forma de autenticarse), sin cambios funcionales en el backend. Las diferencias
están en dónde aterrizaron los archivos, en los tests y en cómo se verificó.

## 2. Convenciones respetadas y no respetadas

**CON harness** (convenciones escritas en `CLAUDE.md`):

- Respetadas: no instalar dependencias sin proponerlo antes (`fetch` nativo, sin router ni cliente
  HTTP, `@tuyau/client` descartado explícitamente); no editar los archivos generados
  (`database/schema.ts`, `.adonisjs/`); tests del backend en `tests/functional/` con Japa y nombre
  en `snake_case`; el preset de Prettier del backend; verificar con `node scripts/check.mjs`
  (7/7 en verde); no commitear sin que se pida.
- No respetadas: `CLAUDE.md` dice «prefiere `node ace make:*` a crear ficheros a mano» y el test se
  escribió a mano; y el mismo archivo salió mal formateado a la primera (ver §3 de la Parte B).

**SIN harness**: **no había convenciones escritas** — sin `CLAUDE.md`, hubo que inspeccionar el
repositorio para deducir la API y el estilo. El resultado es coherente por dentro, pero ignora dos
cosas que solo estaban escritas en el harness: la estructura por carpetas (`lib/`, `hooks/`,
`components/`) — todo quedó plano en `frontend/src/` — y la regla de crear tests al añadir lógica.
Además tocó `frontend/.gitignore`, que no es parte del ticket.

## 3. Veces que tuve que intervenir

| | CON harness | SIN harness |
|---|---|---|
| Intervenciones | **0** | **0** |

Durante las ejecuciones de FLOW-1 no hubo que corregir, aclarar, repetir el encargo ni parar al
agente en ninguna de las dos copias: cada una salió de una sola instrucción.

## 4. Qué habría que arreglar a mano antes de enseñarlo a un equipo

**Las dos copias:**

- Ningún test del frontend: la lógica de sesión del cliente no está cubierta. Hay que decidir si se
  instala un runner.
- La interfaz no se ha visto renderizada en un navegador en ninguna de las dos (sin la extensión de
  Chrome instalada); solo está verificado el flujo HTTP real login → profile → logout → 401.
- Los textos de la barra de sesión están en español y en duro, sobre una plantilla que está en
  inglés.
- Separar el ruido de LF/CRLF de los archivos generados antes de abrir el PR.

**Solo CON harness:** el usuario `demo@flowsync.test` quedó creado en la base de datos local
durante la verificación (no está versionado, pero conviene saberlo).

**Solo SIN harness:** mover los archivos a la estructura del proyecto, revisar el cambio en
`frontend/.gitignore` y pasar la verificación completa — esa copia no tiene `scripts/check.mjs`, así
que el typecheck, el lint, el formato, los tests y el build del backend no llegaron a ejecutarse.

## Parte B — Las tres líneas

1. **Piezas montadas y cuál costó más.** Monté dos piezas principales, ambas en el commit
   `80e5588 chore: add coding agent harness`: `CLAUDE.md`, como instrucciones persistentes previas
   a la actuación del agente (estructura, comandos, archivos generados, convenciones de backend y
   frontend, estilo, verificación, reglas de Git, entorno Windows), y `scripts/check.mjs`, como
   comprobación automática posterior, con sus siete comprobaciones. La que más trabajo dio fue
   `scripts/check.mjs`: hubo que identificar y encadenar los comandos reales de backend y frontend,
   y resolver los problemas que iban apareciendo en las comprobaciones hasta conseguir las siete en
   verde.

2. **Primera diferencia y dónde la vi.** En la lista de archivos creados por cada ejecución: con
   harness aterrizaron en `frontend/src/lib/`, `frontend/src/hooks/` y `frontend/src/components/`, y
   sin harness todo quedó plano en `frontend/src/`. Mirando la misma lista aparece la segunda: con
   harness hay un archivo de backend (`tests/functional/account_profile.spec.ts`) y sin harness
   ninguno. Las dos se ven en un `git status` de cada copia, sin abrir un solo archivo.

3. **Algo escrito en el harness que el agente no cumplió igualmente.** `CLAUDE.md` dice «Prefiere
   `node ace make:*` a crear ficheros a mano: el scaffold ya trae la forma correcta», y el test
   `backend/tests/functional/account_profile.spec.ts` se escribió a mano, sin `node ace make:test`.
   Se nota en la consecuencia: la primera pasada de `node scripts/check.mjs` terminó **5/7**, con
   `backend · lint` y `backend · formato` en rojo, y el único archivo señalado en ambos fue ese
   test. Hubo que formatearlo y volver a pasar la verificación para llegar al 7/7.
