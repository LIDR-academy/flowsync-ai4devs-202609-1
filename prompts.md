# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

# Copia con harness (`flowsync-ai4devs-202609-1`)

## Prompt 1

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** generó `CLAUDE.md` con comandos y arquitectura del backend.

## Prompt 2

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
/agents
```

**Qué salió:** no funcionó; el asistente `/agents` ya no existe y remite a crear el subagente a mano.

## Prompt 3

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
crea este agente revisor
```

**Qué salió:** sin texto del agente, empezó a escribir un revisor propio; lo sustituyó al llegar el prompt 4.

## Prompt 4

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
---
  name: adversarial-reviewer
  description: Revisor adversarial. Úsalo después de proponer o escribir cambios, para buscar activamente errores, incumplimientos de las convenciones de CLAUDE.md y huecos frente a los criterios de aceptación
  del ticket. Solo lee; nunca edita.
  tools: Read, Grep, Glob, Bash
  ---

  Eres un revisor escéptico. Tu trabajo es encontrar por qué el cambio NO está listo, no confirmar que lo está. Asume que hay al menos un problema hasta demostrar lo contrario.

  No modificas archivos. Bash solo para comandos de lectura o verificación (git diff, git status, npm run lint, npm run build).

  Qué revisar, en este orden:
  1. Contrato con la API: contrasta cada llamada del frontend con `backend/start/routes.ts`, los validadores y los controladores. Señala endpoints, campos o formatos de respuesta/error inventados.
  2. Criterios de aceptación: recorre cada criterio del ticket y di si el cambio lo cumple, lo cumple a medias o no lo cumple, citando archivo y línea.
  3. Reglas de CLAUDE.md: indica cada regla incumplida por su nombre (backend tocado, dependencias añadidas sin pedir, `any`, etc.).
  4. Seguridad y sesión: contraseñas o tokens en logs, token accesible donde no debe, sesión que no se limpia al cerrar sesión o ante un 401.
  5. Casos borde: doble envío, error de red, backend caído, respuesta inesperada, recarga de página.
  6. Verificación: ejecuta `npm run lint` y `npm run build` en `frontend/` e informa el resultado real.

  Formato de respuesta:
  - **Bloqueantes**: impiden enseñarlo al equipo. Archivo:línea, qué falla, por qué.
  - **Importantes**: deberían corregirse antes de mergear.
  - **Menores**: estilo o mejoras.
  - **Criterios de aceptación**: tabla criterio / estado / evidencia.
  - **Veredicto**: LISTO o NO LISTO, en una línea.

  No elogies. No propongas reescrituras completas: señala el problema y el arreglo mínimo.

  ---
```

**Qué salió:** lo copió tal cual a `.claude/agents/adversarial-reviewer.md` (enviado mientras el agente seguía trabajando en el prompt 3).

## Prompt 5

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
ok ejecutalo
```

**Qué salió:** no funcionó; al crear `AGENTS.md` como enlace simbólico a `CLAUDE.md`, Windows pidió privilegios de administrador.

## Prompt 6

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
.claude/skills/priority-ticket/SKILL.md

  ---
  name: priority-ticket
  description: Toma mi ticket de Jira de mayor prioridad pendiente y propone un plan de implementación sin escribir código.
  disable-model-invocation: true
  ---

  1. Con el MCP de Atlassian, busca con esta JQL:
     `assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, created ASC`
     Toma el primer resultado. Si no hay ninguno, dilo y detente.
  2. Muestra clave, título, descripción y criterios de aceptación del ticket.
  3. Ejecuta la instrucción siguiente usando ese ticket.

  ## Instrucción

  Lee el ticket y explora el código del proyecto que necesites para entenderlo. Después, propone un plan de implementación que incluya:
  - Los archivos que vas a crear o modificar, con una línea sobre qué cambia en cada uno.
  - Cómo cubres cada criterio de aceptación, uno por uno.
  - Las decisiones que el ticket no especifica y qué propones para cada una.
  - Riesgos o dudas abiertas.

  No escribas ni modifiques ningún archivo: solo el plan.

  .claude/skills/commit/SKILL.md (opcional)

  ---
  name: commit
  description: Prepara un commit de los cambios actuales siguiendo Conventional Commits.
  disable-model-invocation: true
  ---

  1. Ejecuta `git status` y `git diff` y resume qué cambió.
  2. Si hay cambios en `frontend/`, ejecuta `npm run lint` y `npm run build` ahí. Si fallan, detente y muéstrame el error.
  3. Nunca incluyas `.env`, `.mcp.json`, `.claude/settings.local.json` ni archivos generados.
  4. Propón un mensaje en formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`), en español, con el asunto en menos de 72 caracteres.
  5. Espera mi confirmación antes de ejecutar `git commit`. Nunca hagas `git push`. crea estas dos skills
```

**Qué salió:** creó las dos skills tal cual.

## Prompt 7

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
activado
```

**Qué salió:** con el Modo de desarrollador de Windows ya activo, creó `AGENTS.md` como enlace simbólico con `mklink` y activó `core.symlinks`.

## Prompt 8

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
antes de empezar con la lectura del ticket hace lo del hook de prettier del front porque no se lo que es, dame un explicación simple
```

**Qué salió:** explicó el hook, instaló Prettier en `frontend/` (sin preguntar), creó el script y `.claude/settings.json`, y lo probó.

## Prompt 9

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
corregi la regla con salto fallido
```

**Qué salió:** unió la regla de las reglas de proceso de `CLAUDE.md` que había quedado partida en dos líneas.

## Prompt 10

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** no funcionó; la JQL no encontró nada porque FLOW-1 estaba en «Seleccionado para desarrollo», que en este Jira es de la categoría «En curso».

## Prompt 11

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
tengo un ticket creado asignado en la columna seleccionado para desarrollo como le cambio el estado?
```

**Qué salió:** diagnosticó la categoría del estado y explicó cómo moverlo a Backlog; lo moví a mano.

## Prompt 12

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** trajo FLOW-1 y propuso un plan de 10 archivos con criterios, decisiones y riesgos, sin escribir código.

## Prompt 13

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
● Plan de ejecución

  No escribí un plan antes de empezar. Esta es la secuencia que seguí,
  reconstruida de la sesión.

  1. Explorar (sin tocar nada)
  - Leí el README, package.json, App.tsx, main.tsx, index.css,
    vite.config.ts y .oxlintrc.json del frontend.
  - Leí las rutas, los controladores de auth, el validador, el modelo User,
    el transformer, config/auth.ts y config/cors.ts del backend.

  2. Verificar el contrato de la API contra el backend real (con curl)
  - Creé cuentas de prueba con signup.
  - Login correcto: responde {data:{token,user}}.
  - Credenciales malas: 400. Validación: 422 con errors[].
  - /account/profile con token Bearer: 200. Después de /account/logout: 401.
  - Revisé el preflight de CORS desde el origen del frontend.

  3. Diseñar (sin dependencias nuevas)
  - Autenticación con token Bearer guardado en localStorage; así la sesión
    sobrevive a una recarga.
  - Un contexto de React con los estados loading, authenticated y anonymous.
  - Separé el contexto (authContext.ts) del provider (AuthProvider.tsx) para
    no disparar la regla only-export-components del lint.

  4. Implementar
  - src/api/client.ts: fetch con manejo de errores y las funciones login,
    fetchProfile y logout.
  - src/auth/authContext.ts y src/auth/AuthProvider.tsx: restauran la sesión
    al recargar y borran el token si la API responde 401.
  - src/components/LoginForm.tsx: validación antes de enviar, mensajes de
    error y bloqueo del doble envío (estado + ref).
  - src/components/Workspace.tsx: cabecera con iniciales, nombre y «Cerrar
    sesión».
  - App.tsx y App.css reescritos. main.tsx envuelve la app con el provider.
    index.html quedó con lang="es" y título «FlowSync».

  5. Verificación estática
  - npm run build (tsc + vite) y npm run lint: los dos sin errores.

  6. Verificación en el navegador (Chrome)
  - Descubrí que el 5173 era de la otra copia y levanté esta en el 5174.
  - Probé con scripts: pantalla inicial, campos vacíos, email inválido,
    triple envío (una sola petición) y credenciales incorrectas (email
    conservado).
  - Para no escribir la contraseña real en el navegador, conseguí un token
    con curl y lo guardé en localStorage. Con eso probé la recarga (la
    sesión sigue), la cabecera con «LE» y el cierre de sesión. Después
    confirmé con curl que el token quedó revocado (401).
  - Pendiente: entrar con la contraseña correcta desde el formulario.

  7. Limpieza y resumen
  - Cerré la pestaña e intenté apagar Vite, pero el proceso siguió vivo en
    el 5174. Por eso en tu segundo pedido ya estaba levantado.

  Prompts de la sesión

  No modifiqué ningún archivo de prompts; prompts.md sigue igual. Estos son
  los tres prompts que escribiste, tal cual. Modelo: Claude Opus 5
  (claude-opus-5), herramienta: Claude Code.

  Prompt 1
  Implementar login en el frontend Como miembro de un equipo registrado en
  FlowSync, quiero iniciar sesión con mi email y contraseña para acceder a
  mi espacio de trabajo.

    Hoy la aplicación web no tiene forma de entrar: al abrirla se ve la
  página por defecto. La cuenta ya se puede crear y la API ya permite
  autenticarse; falta la experiencia en la web.

    Criterios de aceptación:

  Al abrir la aplicación sin sesión iniciada, veo una pantalla de inicio de
  sesión con campos de email y contraseña.

  Si ingreso credenciales correctas, entro a la aplicación y veo mi nombre
  (o mis iniciales) indicando que estoy dentro.

  Si ingreso credenciales incorrectas, veo un mensaje claro de error y puedo
  volver a intentarlo sin perder el email escrito.

  Si dejo un campo vacío o el email no tiene un formato válido, se me avisa
  antes de enviar.

  Mientras se procesa el inicio de sesión, no puedo enviar el formulario dos
  veces.

  Si recargo la página después de entrar, sigo con la sesión iniciada.

  Puedo cerrar sesión y vuelvo a la pantalla de inicio de sesión.

    Fuera de alcance: registro de cuentas, recuperar contraseña,
  "recordarme".

  Prompt 2
  levantame el servidor y decime como lo puedo probar este es el plan de la session sin harness, hace las comparaciones
```

**Qué salió:** leyó el código de la copia sin harness (sin modificarla), pasó oxlint y armó la comparación con las casillas del ejercicio.

---

# Copia sin harness (`flowsync-sin-harness`)

Copiado del resumen que dio esa sesión.

## Prompt 14

**Modelo:** Opus 5
**Herramienta:** Claude Code

```
Implementar login en el frontend Como miembro de un equipo registrado en
  FlowSync, quiero iniciar sesión con mi email y contraseña para acceder a
  mi espacio de trabajo.

    Hoy la aplicación web no tiene forma de entrar: al abrirla se ve la
  página por defecto. La cuenta ya se puede crear y la API ya permite
  autenticarse; falta la experiencia en la web.

    Criterios de aceptación:

  Al abrir la aplicación sin sesión iniciada, veo una pantalla de inicio de
  sesión con campos de email y contraseña.

  Si ingreso credenciales correctas, entro a la aplicación y veo mi nombre
  (o mis iniciales) indicando que estoy dentro.

  Si ingreso credenciales incorrectas, veo un mensaje claro de error y puedo
  volver a intentarlo sin perder el email escrito.

  Si dejo un campo vacío o el email no tiene un formato válido, se me avisa
  antes de enviar.

  Mientras se procesa el inicio de sesión, no puedo enviar el formulario dos
  veces.

  Si recargo la página después de entrar, sigo con la sesión iniciada.

  Puedo cerrar sesión y vuelvo a la pantalla de inicio de sesión.

    Fuera de alcance: registro de cuentas, recuperar contraseña,
  "recordarme".
```

**Qué salió:** implementó el login directamente, sin plan previo (el prompt no incluía la instrucción «solo el plan» de `/priority-ticket`).
