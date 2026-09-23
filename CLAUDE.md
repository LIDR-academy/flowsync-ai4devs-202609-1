# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

FlowSync is a team task-management practice project with two independent apps that are never run
from a shared root command:

- `backend/` — AdonisJS 7 API (TypeScript, ESM, SQLite via Lucid ORM).
- `frontend/` — React 19 + Vite SPA (TypeScript). Currently the default Vite starter page; no
  routing or API wiring has been built yet.

There is no root `package.json` — always `cd backend` or `cd frontend` before running scripts.

## Commands

### Backend (`backend/`)

```bash
npm install
cp .env.example .env
node ace generate:key       # fills APP_KEY in .env
node ace migration:run      # creates the SQLite schema
npm run dev                 # http://localhost:3333, HMR mode
npm test                    # node ace test (Japa: unit + functional suites)
npm run lint                # eslint .
npm run typecheck           # tsc --noEmit
npm run format              # prettier --write . (uses @adonisjs/prettier-config)
```

Run a single test file with `node ace test <path/to/file.spec.ts>`. Functional tests boot a real
HTTP server via `testUtils.httpServer()` (see `tests/bootstrap.ts`).

### Frontend (`frontend/`)

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint       # oxlint
```

Both dev servers must run in separate terminals simultaneously for end-to-end work.

## Backend architecture

- **Subpath imports**: the backend uses Node's `imports` map instead of relative paths — always
  import via aliases like `#controllers/*`, `#models/*`, `#validators/*`, `#services/*`,
  `#transformers/*`, `#database/*`, `#start/*`, `#config/*` (full list in `backend/package.json`).
- **Generated code lives in `.adonisjs/`** — `controllers.ts`, `events.ts`, `listeners.ts` and the
  Tuyau API registry are regenerated on boot/build (`adonisrc.ts` hooks: `indexEntities` +
  `generateRegistry`). Never hand-edit files under `.adonisjs/`; change the source
  controller/route and let the generator refresh them.
- **Routing** (`start/routes.ts`) references controllers only through the generated
  `#generated/controllers` registry (`controllers.NewAccount`, `controllers.AccessTokens`,
  `controllers.Profile`), not direct imports — this is what `indexEntities` wires up.
- **Auth** is token-based (`@adonisjs/auth` access tokens, not sessions, despite
  `SESSION_DRIVER` being configured). `User` composes `withAuthFinder` for
  `verifyCredentials`/hashing and exposes `User.accessTokens` (`DbAccessTokensProvider`). Protected
  routes use `middleware.auth()`; the current user comes from `auth.getUserOrFail()`.
- **Schema generation**: `database/schema.ts` is auto-generated from the DB by
  `node ace migration:run` (see its header comment) — edit migrations, not the schema file
  directly. Model-level customization (getters, mixins) belongs in `app/models/*.ts`, which
  extends the generated `*Schema` base class (see `User extends compose(UserSchema, ...)`).
  `database/schema_rules.ts` controls how that generation behaves per table/column.
- **Response shape**: controllers return data through `serialize()`/`serialize.withoutWrapping()`,
  injected onto `HttpContext` by `providers/api_provider.ts`. This wraps all JSON responses in a
  `{ data: ... }` envelope by default — use it instead of returning raw objects so responses stay
  consistent across endpoints.
- **Transformers** (`app/transformers/*_transformer.ts`, extending `BaseTransformer`) control
  which model fields are exposed over the API (e.g. `UserTransformer` picks `id`, `fullName`,
  `email`, `createdAt`, `updatedAt`, `initials`, deliberately excluding `password`). Add a
  transformer for any new model exposed via the API instead of returning the model directly.
- **Validation** uses VineJS validators in `app/validators/*.ts` (e.g. shared `email()`/
  `password()` builders reused between signup/login).
- **Current API surface** (`/api/v1`): `POST auth/signup`, `POST auth/login`,
  `GET account/profile` and `POST account/logout` (the latter two behind `middleware.auth()`).

## Frontend architecture

The frontend has no backend integration yet — `App.tsx` is still the unmodified Vite/React
starter (counter button, Vite/React links). When wiring it to the API, the backend already
generates a typed Tuyau client registry at `backend/.adonisjs/client/registry` (`@tuyau/core`) —
prefer consuming that typed registry over hand-writing fetch calls, since routes/param types stay
in sync with the backend automatically.

## Process rules

- **Plan before implementing.** For any ticket-sized change, produce a plan (see `/priority-ticket`)
  and get explicit confirmation before writing code. Do not silently apply a plan you generated.
- **Adversarially review before committing.** Run the `adversarial-reviewer` subagent on a plan
  before implementing it, and on a diff before committing it — not as a rubber stamp, but to find
  what actually breaks.
- **Commit through `/commit`.** Never `git add -A`/`git add .`; stage named files. Never push
  without being explicitly asked to. If a pre-commit hook fails, fix the issue and create a new
  commit — never `--amend` a commit a failed hook prevented from being created, and never
  `--no-verify`.
- **Never hand-edit generated files** under `backend/.adonisjs/` or `backend/database/schema.ts`
  — change the source (migration, controller, route) and let the generator refresh them.
- **Keep backend and frontend changes scoped to their own directory.** There is no root
  `package.json`; run backend and frontend commands from inside `backend/` and `frontend/`
  respectively, not from the repo root.
