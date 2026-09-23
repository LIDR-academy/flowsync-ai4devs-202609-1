# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

Todos lanzados desde **Claude Code** (CLI), con **Claude Sonnet 5** en todos los casos — no hubo
cambio de modelo ni de herramienta en ninguna sesión. Incluye comandos triviales (`ls`, `/mcp`,
`claude --resume`) y preguntas de orientación, no solo los prompts "de producto": es el registro
completo, sin filtrar.

---

*13 de septiembre — copia con harness: sesión de orientación y conexión del MCP de Atlassian.*

## Prompt 1

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
como saber los modelos que dispongo
```

**Qué salió:** explicó cómo listar/cambiar de modelo.

## Prompt 2

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/model
```

**Qué salió:** abrió el selector de modelo.

## Prompt 3

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
para que sirve cada modelo
```

**Qué salió:** explicó las diferencias entre los modelos disponibles.

## Prompt 4

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Házme un resumen del baackend
```

**Qué salió:** resumen de la arquitectura del backend (AdonisJS).

## Prompt 5

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Házme un resumen del Frontend
```

**Qué salió:** resumen del frontend (scaffold Vite + React sin tocar).

## Prompt 6

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
¿como puedo guardar mis preguntas para continuar después?
```

**Qué salió:** explicó `claude --resume` / persistencia de sesión.

## Prompt 7

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
claude --resume
```

## Prompt 8

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
como puedo conectaar el MCP de Jira?
```

**Qué salió:** explicó cómo añadir el MCP de Atlassian.

## Prompt 9

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
configuramelo a nivel de este proyecto
```

**Qué salió:** configuró el MCP de Atlassian en `.mcp.json` a nivel de proyecto.

## Prompt 10

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
no se aabre ninguna pestaña en el navegador para iniciar sesión con mi cuentaa de Atlassian
```

**Qué salió:** no funcionó a la primera — hubo que depurar el login OAuth del MCP.

## Prompt 11

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
¿cómo puedo comprobar que estoy conectado al MCP de Atlaassiaan?
```

**Qué salió:** indicó usar `/mcp`.

## Prompt 12

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

## Prompt 13

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

**Qué salió:** "Authentication successful. Connected to atlassian."

## Prompt 14

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

## Prompt 15

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

## Prompt 16

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
como puedo saber las herramientaas que puedo usar con MCP
```

**Qué salió:** listó las herramientas MCP disponibles (Atlassian).

## Prompt 17

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

## Prompt 18

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
getVisibleJiraProjects, como ejecuto esto'
```

**Qué salió:** no funcionó a la primera — hubo que reformular dos veces más (prompts 19 y 20).

## Prompt 19

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
getVisibleJiraProjects malcaraz.atlassian.net
```

## Prompt 20

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
getVisibleJiraProjects(malcaraz.atlassian.net)
```

**Qué salió:** listó los proyectos Jira visibles.

---

*14 de septiembre — copia con harness: montaje de las piezas (CLAUDE.md, skills, subagente, hook, AGENTS.md, ticket).*

## Prompt 21

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
ls
```

## Prompt 22

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
claude
```

## Prompt 23

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** generó el `CLAUDE.md` inicial del repo.

## Prompt 24

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
create 'priority-ticket' skill
```

**Qué salió:** creó `.claude/skills/priority-ticket/SKILL.md`.

## Prompt 25

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
create '/commit' skill
```

**Qué salió:** creó `.claude/skills/commit/SKILL.md`.

## Prompt 26

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
create 'adversarial-reviewer' subagent
```

**Qué salió:** creó `.claude/agents/adversarial-reviewer.md`.

## Prompt 27

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
what's next?
```

**Qué salió:** propuso la siguiente pieza del harness a montar (el hook).

## Prompt 28

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
create the hook
```

**Qué salió:** configuró el hook `PostToolUse` de Prettier en `.claude/settings.json`.

## Prompt 29

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
how can I use the prettir hook?
```

**Qué salió:** explicó que se dispara solo, en `Write|Edit` sobre `frontend/`.

## Prompt 30

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
run prettier in App,tsx
```

**Qué salió:** formateó `App.tsx` con Prettier (commit `chore(frontend): formatea App.tsx con prettier`).

## Prompt 31

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
create step 7
```

**Qué salió:** añadió las "Process rules" al final del `CLAUDE.md`.

## Prompt 32

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
yes, create AGENTS.md
```

**Qué salió:** creó `AGENTS.md` como enlace a `CLAUDE.md`.

## Prompt 33

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
commit these changes
```

**Qué salió:** commit `chore(harness): monta CLAUDE.md, MCP de atlassian, skills, subagente y hook de prettier`.

## Prompt 34

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
push it
```

**Qué salió:** push de la rama `s1/start`.

## Prompt 35

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
create the Jira ticket for the login task
```

**Qué salió:** no funcionó del todo a la primera — faltó la descripción (ver prompt 36).

## Prompt 36

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
I can't find the description, put a description
```

**Qué salió:** completó la descripción del ticket FLOW-1 en Jira.

## Prompt 37

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
read Readme and tell me where I am
```

**Qué salió:** confirmó el punto del enunciado en el que estaba.

## Prompt 38

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
how can I check my cunsumed tokens?
```

**Qué salió:** explicó cómo consultar el consumo de tokens.

---

*21 de septiembre — copia con harness: lanzamiento del ticket con `/priority-ticket` e implementación.*

## Prompt 39

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
list my tickets in Jira
```

**Qué salió:** encontró **FLOW-1** ("Implementar login en el frontend"), Por hacer.

## Prompt 40

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Tell me all my propts
```

**Qué salió:** listó los prompts de la sesión actual.

## Prompt 41

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
Tell me all my propts in previous sessions
```

**Qué salió:** recuperó el historial de prompts de sesiones anteriores en este proyecto.

## Prompt 42

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
clear
```

**Qué salió:** limpió el contexto de la conversación.

## Prompt 43

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
with /priority-ticket, launch the task described in Jira
```

**Qué salió:** generó el plan de implementación para FLOW-1 (sin tocar código, tal y como especifica la skill).

## Prompt 44

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
yes run throught adversarial-reviewer
```

**Qué salió:** revisión adversarial del plan — encontró 1 bug bloqueante (`minLength(8)` en login no coincide con el validador real) y 3 notas menores; quedaron corregidas antes de implementar.

## Prompt 45

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
implement the task
```

**Qué salió:** implementó el login (`LoginForm.tsx`, `lib/api.ts`, `lib/auth.tsx`, cambios en `App.tsx`/`main.tsx`) con las correcciones del plan ya aplicadas.

## Prompt 46

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
run diff throuht adversarial-review
```

**Qué salió:** revisión adversarial del diff — confirmó las 3 correcciones previas y encontró 2 hallazgos menores nuevos (llamadas a `localStorage` sin `try/catch` en `logout`, mensajes de error del backend en inglés dentro de una UI en español).

## Prompt 47

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
where folder are you?
```

**Qué salió:** respondió el directorio de trabajo actual (`frontend/`).

---

*21 de septiembre — copia sin harness: misma instrucción, escrita a mano.*

## Prompt 48

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
El backend ya expone autenticación por token bajo /api/v1 (grupo auth: signup/login sin autenticar; grupo account: profile/logout autenticados con middleware.auth(), guard api vía @adonisjs/auth/access_tokens). El frontend sigue siendo el starter de Vite + React sin tocar: no hay routing, gestión de estado ni cliente de API todavía.

Objetivo: construir el flujo de login en el frontend, consumiendo el endpoint de login del backend.

Alcance:

    Formulario de login (email + password) con validación básica en cliente.

    Llamada al endpoint de login del backend y manejo de la respuesta (éxito / credenciales inválidas / errores de red).

    Persistencia del token de acceso recibido (p. ej. en memoria o storage) para usarlo en peticiones autenticadas posteriores.

    Redirección o cambio de vista tras un login exitoso (mostrar que el usuario quedó autenticado, aunque sea de forma mínima).

    Manejo visible de errores de login en la UI.

Fuera de alcance: signup, logout, recuperación de contraseña, persistencia avanzada de sesión (refresh tokens, expiración), diseño visual pulido.

Notas técnicas: revisar .adonisjs/client (Tuyau) si se quiere tipado end-to-end del cliente API; las respuestas del backend van envueltas bajo { data: {...} }.
```

**Qué salió:** al no encontrar `CLAUDE.md`/harness en esta copia, preguntó con `AskUserQuestion` si debía solo generar el plan o implementar directamente; se eligió "solo generar el plan" y produjo el plan sin tocar código, entrando primero en modo planificación.

## Prompt 49

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
implementa el plan
```

**Qué salió:** implementó el login (`AuthContext.tsx`, `AuthenticatedView.tsx`, `LoginForm.tsx`, `lib/api.ts`, cambios en `App.tsx`) — nótese que contradice la respuesta anterior de "solo generar el plan". Sin subagente de revisión en esta copia, el precheck de contraseña ≥8 caracteres (que no coincide con lo que valida el backend en login) quedó sin detectar.
