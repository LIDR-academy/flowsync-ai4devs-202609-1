# Comparación: con harness vs. sin harness

Mismo encargo (*«Implementar login en el frontend»*, ticket `FLOW-1`), dos copias del proyecto,
ningún plan aplicado. Lo que se compara son **los dos planes**, no el código.

| | Con harness | Sin harness |
|---|---|---|
| Plan | `flow-1-quiet-shannon.md` | `rosy-tinkering-clarke.md` |
| Cómo se lanzó | `/priority-ticket FLOW-1` | la misma instrucción escrita a mano |
| Cómo llegó el ticket | leído del tablero por el **MCP de Atlassian** | pegado a mano en `Tarea.txt` |
| Modelo | claude-opus-5 (Claude Code) | claude-opus-5 (Claude Code) |

---

## 1. Archivos que propone tocar (contados)

**Con harness — 32 archivos** (25 manuales + 7 generados por CLI), en dos tablas separadas:

- Config/scaffolding (12): `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`,
  `components.json`, `src/index.css`, `src/App.css` (borrado), `src/assets/{react.svg,hero.png}`
  (borrados), `.env.example`, `.gitignore`, `README.md`.
- Código (20): `lib/{api-client,api-error,utils}.ts`, `types/auth.ts`,
  `features/auth/{auth-api,auth-context,use-auth,login-form,signup-form,field-error}`,
  `routes/{login-page,signup-page,dashboard-page,protected-route}`, `App.tsx`,
  `components/ui/*` (5).
- **Sección aparte de "generados / no es trabajo manual"**: `components/ui/*`, `lib/utils.ts`,
  `package-lock.json`, y el aviso de que `backend/.adonisjs/**` y `backend/database/schema.ts`
  pueden aparecer en el diff solo por arrancar el dev server → ruido a revisar antes de commitear.

**Sin harness — 27 archivos** (20 manuales + 7 generados), en una lista
Nuevos / Modificados / Borrados:

- Nuevos (16): `lib/api.ts`, `lib/utils.ts`, `types/auth.ts`, `auth/AuthContext.tsx`,
  `components/ProtectedRoute.tsx`, `pages/{LoginPage,SignupPage,ProfilePage}.tsx`,
  `components/ui/*` (5), `components.json`, `.env`, `.env.example`.
- Modificados (7): `App.tsx`, `main.tsx`, `index.css`, `vite.config.ts`, `tsconfig.json`,
  `tsconfig.app.json`, `package.json`.
- Borrados (4): `src/App.css` + los tres assets de la plantilla.

**Diferencia real, no de volumen.** Los 5 archivos de más del plan con harness son
`.gitignore`, `README.md`, y el troceo de la capa de auth (`api-error.ts` aparte de
`api-client.ts`; `use-auth.ts` aparte del contexto; `field-error.tsx` como componente propio).
El plan sin harness mete el parseo de errores dentro de `lib/api.ts` y pone las páginas en
`src/pages/` en vez de `src/features/auth/` + `src/routes/`. Ninguna de las dos organizaciones
contradice el repo: **no había frontend del que copiar un patrón**, así que aquí el harness no
tenía nada que imponer.

Lo que sí es asimétrico: solo el plan con harness **separa lo generado de lo manual** y avisa del
ruido de `backend/.adonisjs/`. Eso sale directo de `AGENTS.md`.

---

## 2. Convenciones respetadas y no respetadas

### Las que ambos acertaron (leyendo el código, no el ticket)

| Convención | Con harness | Sin harness |
|---|---|---|
| `fullName`, `email`, `password`, **`passwordConfirmation`** — el validador real (`backend/app/validators/user.ts`), que el ticket no lista | ✅ | ✅ (además señala que sin `passwordConfirmation` el signup da 422 *siempre*) |
| Envoltorio `{ data: ... }` y la **excepción de `logout`** | ✅ | ✅ |
| `profile` devuelve el user directo bajo `data`; login/signup lo anidan en `data.user` | ✅ | ✅ (lo marca explícitamente como trampa) |
| Guard `api` → `Authorization: Bearer` | ✅ | ✅ |
| `lint` del frontend es **oxlint**, no ESLint, y no hay Prettier | ✅ | ✅ |
| No instalar librería de formularios sin justificarla | ✅ | ✅ |
| No tocar `backend/` | ✅ | ✅ |

### Las que solo salieron con harness

- **«`AGENTS.md` manda sobre el ticket»** como criterio explícito: donde `FLOW-1` da por hecho
  Tailwind + shadcn/ui, el plan lo declara trabajo nuevo y dependencia a justificar en el PR.
  El plan sin harness llega al mismo sitio, pero lo argumenta desde «no existe», no desde una regla.
- **Migration-first / `.adonisjs` generado**: la regla no aplicaba (no hay cambios de backend) y
  aun así el plan la usa para algo útil — *si esos archivos aparecen en el diff, es ruido*.
- **Fechas Luxon**: `createdAt`/`updatedAt` llegan ISO; si se formatean, `Intl`, no una librería nueva.
- **Tests**: nombra que `backend/tests/` solo tiene `bootstrap.ts` y que **no hay ningún `.spec.ts`**,
  y decide *no* traer Vitest en este ticket para no fijar de tapadillo el patrón de testing del
  frontend. El plan sin harness ni menciona tests.
- **Metadatos del ticket** (clave, estado «Por hacer», asignado, prioridad, sin comentarios):
  vienen del MCP. El plan sin harness no los tiene porque el texto pegado no los llevaba.
- **Verificación de que el backend sigue intacto**: `git status` + `npm run lint && npm run typecheck`
  en `backend/`.

### Las que solo salieron sin harness

Esto es lo incómodo de la comparación: **la copia pelada encontró cosas que la de harness no.**

- `.oxlintrc.json` tiene `react/only-export-components` en *warn* → exportar hook y componente
  del mismo módulo lo dispara. (El plan con harness separa `use-auth.ts` del contexto, pero **no
  dice por qué**; el de sin harness sí lo justifica con la regla concreta.)
- `#root { width: 1126px; text-align: center }` en el `index.css` heredado pelea con cualquier
  layout: hay que reescribirlo, no parchearlo.
- `React.StrictMode` está activo → el `getProfile()` inicial corre dos veces en dev; debe ser
  idempotente/abortable.
- En dev, un 500 es un **volcado Youch**: renderizar `err.message` a secas falla.
- **CSRF desactivado** (`backend/config/shield.ts`) — comprobado, no asumido.
- **Accesibilidad**: `aria-invalid` + `aria-describedby` en los campos, `role="alert"` en el banner.
- **Validación de cliente espejo del validador** (password 8–32, confirmación) para no gastar
  una petición en errores evidentes.
- Casos de prueba **«backend caído»** y **«token corrupto en localStorage»**.

### Lo que ninguno de los dos verificó

Los dos planes citan el mensaje de credenciales inválidas **y no coinciden**: con harness dice
`"Invalid email or password"`, sin harness dice `"Invalid user credentials"`. Ninguno de los dos
arrancó el backend para comprobarlo. Es exactamente el criterio de éxito 3 del ticket, así que
hay que resolverlo con un `curl` antes de escribir el mensaje de la UI.

---

## 3. Veces que tuve que intervenir

**Con harness: 1 intervención**, antes de planificar: un único bloque de tres preguntas
(stack UI · router + estado · dónde guardar el token). Después, el plan salió entero sin más
idas y vueltas. Antes de eso hubo una parada *por diseño*: `/priority-ticket` se negó a inventar
el ticket cuando el MCP de Atlassian no estaba montado (plan `flow-1-majestic-kay.md`), lo cual
obligó a montar la pieza 2 — pero esa parada es la skill funcionando, no el modelo perdido.

**Sin harness:** _(rellenar: número de idas y vueltas hasta llegar a `rosy-tinkering-clarke.md`)_

> El plan sin harness registra al menos una decisión negociada contigo («Decisión tomada con el
> usuario: montar el stack que pide el ticket…»), así que hubo ≥1 intervención; el número exacto
> lo sabes tú, no el archivo.

---

## 4. Qué me tocaría arreglar a mano antes de enseñárselo a alguien

**Con harness:**

1. Verificar con `curl` el mensaje real del 400 y la forma exacta del 422 antes de escribir los
   textos de error. El plan lo pone como paso 1, pero sigue siendo un supuesto sin comprobar.
2. Incorporarle lo que encontró la copia pelada: la regla `react/only-export-components`, el
   `#root` de 1126px, StrictMode, el volcado Youch y la accesibilidad. **Ninguna de las cinco
   está en el plan con harness.**
3. Decidir si `src/features/auth/` + `src/routes/` es la estructura que queremos, o si con tres
   pantallas sobra y `src/pages/` es más honesto.
4. Tocar `README.md` y `.gitignore` probablemente sobra para este ticket: es scope que nadie pidió.

**Sin harness:**

1. Añadir la separación **generado vs. manual** y el aviso del ruido de `backend/.adonisjs/`
   y `backend/database/schema.ts` en el diff.
2. Decidir y escribir qué pasa con los tests (el plan no los menciona).
3. Crear `.env` de verdad está bien, pero hay que confirmar que está ignorado por git antes de
   commitear.
4. El mismo `curl` de verificación del mensaje de error.

### Conclusión honesta

La diferencia **no** fue «uno sabe del repo y el otro no»: los dos leyeron el código y los dos
clavaron el contrato del backend, incluida la trampa de `passwordConfirmation`. La diferencia
fue de **encuadre**: el plan con harness trae convenciones del repo que nadie le contó en el
prompt (tests, generados, fechas, `AGENTS.md` por encima del ticket) y metadatos reales del
ticket; el plan sin harness trae **más detalle de implementación concreta**, porque gastó su
esfuerzo en mirar archivos en vez de en encajar con un estándar. El mejor plan es la unión de
los dos, y eso ya es un resultado.

---

# Las tres líneas

**1. Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas.**

_Conseguir con  esfuerzo generar los dos planes y ficheros de comparación debo reconocer que en más tiempo de los 45 minutos. En ese tiempo no hubiera podido hacer casi nada siendo sincera. Me costó ver por dónde empezar una vez instalado todo. También tuve problemas con la ubicación de los ficheros de configuración del MCP con atlassian, de los agentes y skills porque el ámbito donde lo definí no fue el correcto._

**2. La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla.**
_La forma de presentar la información en la salida es diferente, aunque supongo que no os referís a esto pero no he visto nada más significativo._


**3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente.**

_`AGENTS.md` dice que el frontend usa oxlint y que **no** tiene Prettier, mientras que el hook del harness formatea el frontend con Prettier. Parece que el plan lo ignoró._
