# Comparación: con harness vs. sin harness

Ticket: *"Implementar login en el frontend"*. Misma instrucción lanzada en las dos copias
(`flowsync-ai4devs-202609-1` con harness montado, `flowsync-ai4devs-202609-1-sin-harness` pelada).

## Parte A: la comparación

### 1. Qué archivos tocó, contados

**Con harness — 9 archivos:**
`backend/package-lock.json` (M) · `frontend/package-lock.json` (M) · `frontend/.env.example` (A) ·
`frontend/src/App.css` (M) · `frontend/src/App.tsx` (M) · `frontend/src/main.tsx` (M) ·
`frontend/src/components/LoginForm.tsx` (A) · `frontend/src/lib/api.ts` (A) ·
`frontend/src/lib/auth.tsx` (A).

**Sin harness — 9 archivos también:**
`backend/package-lock.json` (M) · `frontend/package-lock.json` (M) · `frontend/.env.example` (A) ·
`frontend/src/App.css` (M) · `frontend/src/App.tsx` (M) ·
`frontend/src/auth/AuthContext.tsx` (A) · `frontend/src/components/AuthenticatedView.tsx` (A) ·
`frontend/src/components/LoginForm.tsx` (A) · `frontend/src/lib/api.ts` (A).

Mismo total, pero 2 de cada lado son los mismos dos lockfiles con churn incidental de
`npm install` (versiones transitorias, ninguna dependencia nueva) — así que son 7 archivos "de
producto" por copia. Se reparten distinto: el harness separó el contexto de auth en
`lib/auth.tsx` y tocó `main.tsx` para montar el `Provider` ahí arriba; el sin-harness metió el
`Provider` dentro de `App.tsx` y sacó la vista logueada a un `AuthenticatedView.tsx` aparte.

### 2. Qué convenciones respetó y cuáles no, nombrándolas

**Con harness** (`CLAUDE.md` tenía reglas escritas):

- ✅ *"Ask before adding a new dependency"* — decidió explícitamente NO usar el cliente tipado
  `@tuyau/core` (ya instalado y señalado en `CLAUDE.md` como el camino documentado para "wiring
  the frontend to the API") porque habría sido meter una dependencia nueva sin visto bueno
  previo; hizo `fetch` a mano en su lugar.
- ✅ *"Run lint/typecheck before calling it done"* — corrió `oxlint`, `tsc -b` y `build`.
- ✅ Hook de Prettier (`PostToolUse` sobre `frontend/`) — reformateó todo en automático
  (comillas dobles + `;`, coherente con el resto del scaffold, incluido `main.tsx`).
- ✅ *"Route non-trivial diffs through the `adversarial-reviewer` subagent"* — se invocó dos
  veces (sobre el plan y sobre el diff), aunque no de forma autónoma: Claude lo propuso y hubo
  que confirmarlo las dos veces.
- ⚠️ Convención documentada pero no aprovechada: `CLAUDE.md` señala el cliente Tuyau generado
  (`.adonisjs/client`) justo para "wiring the frontend to the API" — existe e instalado, pero no
  se usó (ver el punto de arriba: fue una decisión consciente, no un descuido).
- ❌ *"Use the `/commit` skill for commits"* — no se usó todavía; el login sigue sin commitear
  en el working tree.

**Sin harness** — no había ningún `CLAUDE.md`/`AGENTS.md`/`.claude` en esa copia. Esa es la
respuesta, y cuenta: cero convenciones escritas contra las que medir cumplimiento. Consecuencia
medible y concreta de no tener el hook de Prettier: el código nuevo usa comillas simples y sin
`;`, que no coincide con el estilo del resto del repo (el scaffold original usa comillas dobles +
`;`) — nadie lo corrigió porque no había mecanismo para hacerlo.

### 3. Cuántas veces tuviste que intervenir

Ninguna de las dos sesiones tuvo correcciones duras tipo "esto está mal, no es lo que pedí".

- **Con harness — 2 intervenciones**, ambas confirmaciones a algo que Claude mismo propuso
  (lanzar `adversarial-reviewer` sobre el plan, y luego sobre el diff) — no correcciones,
  aprobaciones. Esa revisión sí encontró 3 problemas reales antes de cerrar: mismatch del
  `minLength(8)` de login vs. lo que valida realmente el backend, un guard incompleto sobre
  `body?.errors`, y falta de nota sobre el trade-off de guardar el token en `localStorage`.
  Quedaron corregidos antes de terminar.
- **Sin harness — 1 intervención**: Claude, leyendo el README por su cuenta, preguntó con
  `AskUserQuestion` si debía solo planear o implementar directamente; la respuesta fue "solo el
  plan" — y luego se le pidió "impleméntalo" de todas formas, contradiciendo esa respuesta
  anterior. Sin subagente de revisión en esta copia, nadie detectó el problema del
  `minLength(8)`: sigue ahí sin señalar.

### 4. Qué tocaría arreglar a mano antes de enseñárselo a alguien

**Con harness:** nada bloqueante — el `adversarial-reviewer` ya forzó las correcciones antes de
cerrar. Solo cosmético: revertir el churn de los dos lockfiles si no se quiere ese ruido en el PR
(`git checkout -- backend/package-lock.json frontend/package-lock.json`).

**Sin harness:**

1. El precheck de contraseña ≥8 en `LoginForm.tsx` no coincide con lo que valida el backend en
   login (solo exige no-vacío) — puede rechazar en cliente un login que el servidor sí aceptaría.
2. Estilo inconsistente con el resto del repo (comillas simples, sin `;`) — un pase de Prettier
   lo arregla en segundos, pero hay que correrlo a mano.
3. Mismo churn de los dos lockfiles.

## Parte B: las tres líneas

1. Se llegó hasta las ocho piezas del harness y hasta implementar el ticket en las dos copias
   (más allá de lo que pedía la Parte A, que era solo comparar planes). Mi reflexión:
   
   *Lo más complicado fué empezar, desde mi nulo conocimiento y después de leerme el temario varias veces, pude hacerme una idea de cómo comenzar a practicar con Claude code.*
   
   *Mi idea inicial fué crear un archivo Claude.md, alguna skill y algún subagente. además de conectarme a Jira mediante MCP*

   *Primero empecé a crear la conexión con Jira meddiante MCP, para ello pregunte a Claude code como hacerlo y tras unos pocos prompts lo conseguí sin demasiado esfuerzo.*

   *A continuación, ejecuté el comando claude init y automáticamnete se creó el fichero Claude.md, me quede sorprendido al ver toda la información que se añadió, me pregunté de donde había sacado tanta información sin yo decir absolutamente nada, y después empecé a leer los diferentes archivos del proyecto, README.md, código en el frontend y backend. Entendí que Claude hizo una lectura de todo el proyecto y recopiló toda la información relevante guardándola en el fichero Claude.md.*

   *Después de leer los archivos del proyecto, observé que en el fichero README.md listaba todas esas 'piezas' que deberíamos crear para configurar el 'harness', con esto, me limité a decirle a Claude que me creara cada una de ellas y analizando detalladamente lo que escribía. No me resultó complicado.*
   
2. La primera diferencia visible entre las dos salidas fue el estilo del código nuevo: comillas
   dobles y `;` en la copia con harness (por el hook de Prettier) frente a comillas simples y sin
   `;` en la pelada — se nota con solo abrir un archivo, sin necesidad de leer la lógica.

3. Algo escrito en el harness que el agente no cumplió igual: `CLAUDE.md` señala el cliente
   tipado de Tuyau (`@tuyau/core`, `.adonisjs/client`) como el camino para conectar el frontend
   a la API, y el agente lo dejó de lado a propósito por la regla de "pedir permiso antes de
   añadir una dependencia" — cumplió una regla escrita chocando con otra pista escrita en el
   mismo archivo.
