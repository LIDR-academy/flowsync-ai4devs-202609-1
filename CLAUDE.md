# FlowSync

Gestión de tareas en equipo. Dos proyectos npm **independientes** en la misma raíz git:

- `backend/` — API REST en AdonisJS 7 (ESM, TypeScript), Lucid + SQLite, auth por access tokens. Escucha en `:3333`.
- `frontend/` — React 19 + Vite. Hoy es la plantilla stock sin tocar. Escucha en `:5173`.

No hay workspaces ni `package.json` en la raíz: `npm install` y todos los scripts se ejecutan **dentro** de `backend/` o de `frontend/`, nunca en la raíz.

## Comandos

```bash
# backend/
npm run dev          # node ace serve --hmr
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run format       # prettier --write .
npm test             # Japa (suites unit + functional)
node ace make:controller|model|migration|validator|test
node ace migration:run

# frontend/
npm run dev          # vite
npm run lint         # oxlint
npm run build        # tsc -b && vite build  ← único typecheck del frontend
```

Setup inicial del backend: `cp .env.example .env` → `node ace generate:key` → `node ace migration:run`.

## Reglas que no se rompen

**`backend/database/schema.ts` es un fichero generado. No lo edites.** Lo regenera `node ace migration:run` a partir de las migraciones, y lleva un `DO NOT EDIT manually` en la cabecera. Los modelos **no declaran `@column`**: extienden la clase generada.

```ts
// Añadir un campo: make:migration → editar la migración → migration:run.
// El schema y el modelo se actualizan solos.
export default class User extends compose(UserSchema, withAuthFinder(hash)) { … }
```

**`backend/.adonisjs/` también es generado** (controllers, routes, registry de Tuyau). Está versionado, pero no se edita a mano.

**En backend, imports por subpath `#…`, nunca rutas relativas hacia arriba.** La lista completa está en `backend/package.json > imports`.

```ts
import User from '#models/user'              // sí
import User from '../models/user.js'         // no
```

**Las rutas referencian controladores por el objeto generado**, no por import directo ni por string:

```ts
import { controllers } from '#generated/controllers'
router.post('login', [controllers.AccessTokens, 'store'])
```

## Convenciones del backend

- **Respuestas**: todo pasa por `ctx.serialize()` (lo inyecta `providers/api_provider.ts`) y sale envuelto en `{ data: … }`. Un modelo Lucid nunca se devuelve crudo: pasa antes por un Transformer con `pick` explícito de campos (`UserTransformer.transform(user)`).
- **Entradas**: se validan siempre con un validator de VineJS en `app/validators/`, vía `await request.validateUsing(xValidator)` como primera línea de la acción. Las reglas repetidas se extraen a funciones (`const email = () => vine.string().email().maxLength(254)`).
- **Controladores finos, uno por recurso, con acciones REST** (`index`, `show`, `store`, `update`, `destroy`). No hay controladores-cajón con métodos de nombre libre: el login es `AccessTokensController.store`, no `AuthController.login`; el registro es `NewAccountController.store`.
- **Ficheros en `snake_case`** (`access_tokens_controller.ts`, `user_transformer.ts`), clases en `PascalCase`.
- **Rutas nuevas bajo `/api/v1`**, dentro de un grupo con `.prefix()` y `.as()`; las privadas con `.use(middleware.auth())`.
- Prefiere `node ace make:*` a crear ficheros a mano: el scaffold ya trae la forma correcta.

Endpoints actuales:

| Método | Ruta | Controlador |
|---|---|---|
| POST | `/api/v1/auth/signup` | `NewAccount.store` |
| POST | `/api/v1/auth/login` | `AccessTokens.store` |
| GET | `/api/v1/account/profile` | `Profile.show` *(auth)* |
| POST | `/api/v1/account/logout` | `AccessTokens.destroy` *(auth)* |

Auth por **Bearer access tokens**, guard `api` por defecto (el guard `web` de sesión existe pero no se usa). `POST /api/v1/auth/login` ya devuelve `{ data: { user, token } }`: el flujo de login está hecho en backend, lo que está vacío es el frontend.

## Convenciones del frontend

- **No hay Prettier instalado** y nada garantiza el formato. Si tocas frontend, imita el estilo del código existente: comillas simples, sin punto y coma, ~80 columnas.
- El linter es **Oxlint**, no ESLint (`npm run lint`).
- CSS plano con variables en `:root` y nesting nativo (`src/index.css`, `src/App.css`). No hay librería de estilos ni CSS-in-JS.
- No hay router, ni cliente HTTP, ni gestión de estado. Si el trabajo los necesita, propónlo explícitamente antes de instalar nada.
- El backend expone un registry tipado de Tuyau (`backend/package.json > exports`), pero `@tuyau/client` **no está instalado en el frontend**. Es el puente previsto para consumir la API con tipos; montarlo es una decisión, no un detalle.

## Estilo de código

Backend: `@adonisjs/prettier-config` — sin punto y coma, comillas simples, `printWidth: 100`, `trailingComma: "es5"`. Ambos: 2 espacios, LF, newline final (`.editorconfig`).

## Verificar antes de decir que está hecho

**Ejecuta esto desde la raíz del repositorio, siempre, antes de dar una tarea por terminada:**

```bash
node scripts/check.mjs
```

Es la única comprobación que hay que recordar. Encadena los scripts que ya existen en los dos proyectos, en este orden, y tarda unos 20 segundos:

| Paso | Qué ejecuta |
|---|---|
| `backend · typecheck` | `npm run typecheck` (`tsc --noEmit`) |
| `backend · lint` | `npm run lint` (ESLint) |
| `backend · formato` | Prettier en modo `--check`, con el mismo preset que `npm run format` |
| `backend · tests` | `npm test` (Japa) |
| `backend · build` | `npm run build` (`node ace build`) |
| `frontend · lint` | `npm run lint` (Oxlint) |
| `frontend · build + typecheck` | `npm run build` (`tsc -b && vite build`) |

Ejecuta todos los pasos aunque alguno falle y termina con un resumen. Sale con código **0 si está todo verde** y **1 si algo falla**, así que sirve tal cual como puerta: si no sale en verde, la tarea no está terminada.

Dos matices sobre el paso de formato:

- Comprueba, **no reescribe**. Una verificación que modifica el árbol de trabajo no verifica nada. Cuando falla, lo arregla `cd backend && npm run format`.
- Respeta los finales de línea de cada fichero (`--end-of-line auto`). En Windows, con `core.autocrlf=true`, el árbol queda en CRLF y sin esto fallarían los 40 ficheros del backend por algo que no tiene que ver con el código.

**No hay CI.** No existe `.github/`, ningún workflow, ningún hook de git. Nada valida el trabajo después de ti: `node scripts/check.mjs` es todo lo que hay entre un fallo y el pull request.

**El repo tiene cero tests.** Japa está configurado (suites `tests/unit/**` y `tests/functional/**`, con plugins de `assert`, `api-client`, `db` y `auth`), pero los directorios ni existen. Si añades lógica, crea los tests: `node ace make:test`, o a mano en `backend/tests/functional/`.

## Git

- Mensajes en **Conventional Commits**, como el historial: `feat(backend): …`, `fix(frontend): …`, `docs: …`, `chore: …`.
- **No commitees** `backend/.env`, `backend/tmp/db.sqlite3`, ni ficheros que solo cambian por finales de línea (CRLF en Windows: `git diff` sale vacío y solo emite avisos `LF will be replaced by CRLF` — eso es ruido, no trabajo).
- El trabajo se entrega por **pull request desde el fork del alumno contra el repositorio del curso**, no contra el fork. Detalles en el `README.md`.
- No hagas commit ni push salvo que se te pida.

## Entorno

Se trabaja en **Windows**. Los comandos del `README.md` están escritos para bash; en PowerShell, `cp -R` y `cp .env.example .env` no funcionan tal cual.

Ejecutar migraciones en local (`node ace migration:run`) es parte del flujo normal y no hace falta preguntar. **Pregunta antes** de `migration:rollback`, `migration:reset`, `db:wipe` o cualquier cosa que borre datos.
