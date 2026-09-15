# Comparación: con harness vs. sin harness

- **Ticket:** FLOW-1 · Implementar login en el frontend
- **Modelo y herramienta (igual en las dos):** Opus 5 · Claude Code
- **Reloj:** sin registrar
- **Piezas montadas:** las 8, en orden: `CLAUDE.md` de `/init` · MCP de Atlassian · skills `/priority-ticket` y `/commit` · subagente `adversarial-reviewer` · hook de Prettier para el frontend · reglas de proceso al final de `CLAUDE.md` · `AGENTS.md` como enlace simbólico

> **Salvedades.** (1) Las dos copias acabaron **implementando**, no solo planificando como pide el ejercicio. (2) El encargo no fue idéntico: con harness, `/priority-ticket` pedía «solo el plan, no escribas archivos»; sin harness se pegó el texto del ticket sin esa instrucción y el agente programó directamente. La comparación de la copia sin harness se hizo leyendo su código (sin modificarlo) y su propio resumen de sesión.

## Parte A: la comparación

| Casilla | Con harness | Sin harness |
|---|---|---|
| Archivos que propone tocar (contados) | **10** (plan = implementación). Nuevos: `api/client.ts`, `api/auth.ts`, `auth/tokenStorage.ts`, `auth/useSession.ts`, `components/LoginForm.tsx`, `components/HomeScreen.tsx`. Modificados: `App.tsx`, `App.css`, `index.html`, `vite.config.ts` | **9** (sin plan previo). Nuevos: `api/client.ts`, `auth/authContext.ts`, `auth/AuthProvider.tsx`, `components/LoginForm.tsx`, `components/Workspace.tsx`. Modificados: `App.tsx`, `App.css`, `main.tsx`, `index.html` |
| Convenciones respetadas (nombradas) | Backend congelado · sin dependencias nuevas para el ticket · sin `any` ni `@ts-ignore` · nada en consola · contrato de la API leído del código y verificado con `curl` · huecos del ticket declarados en el plan · plan presentado y confirmado antes de escribir código · lint y build pasan · código formateado por el hook de Prettier · revisión con `adversarial-reviewer` | Backend sin tocar · sin dependencias nuevas · sin `any` explícito ni `@ts-ignore` · nada en consola · contrato verificado con `curl` · lint pasa (build pasa según su resumen) · probado en el navegador |
| Convenciones no respetadas (nombradas) | Prettier instalado sin preguntar (antes de que existiera la regla de dependencias) · sin re-revisión tras la última ronda de correcciones · sin prueba en el navegador | Sin plan antes de escribir código · decisiones del ticket no declaradas (token en `localStorage`, API directa por CORS) · respuesta de la API sin validar (`body as T` sobre `response.json()` sin tipo) · proceso de Vite dejado en marcha en el 5174 |
| Veces que intervine (corregir, aclarar, repetir, parar) | **2** hasta el plan: mover FLOW-1 a Backlog para que la JQL de `/priority-ticket` lo encontrara · relanzar `/priority-ticket`. El montaje del harness requirió bastantes más (enlace simbólico, Modo de desarrollador, etc.) | **1**: pegar el ticket |
| Qué arreglaría a mano antes de enseñarlo | Probar los 7 criterios en el navegador · borrar la cuenta de prueba `prueba.login@flowsync.test` de la BD local | Validación de email más laxa que `vine.email()` (criterio 4 a medias) · al recargar sin conexión muestra el login con el token aún guardado y sin reintento · errores 422 sin mensaje por campo · decidir si `localStorage` es aceptable (la sesión sobrevive a cerrar la pestaña, roza el «recordarme» fuera de alcance) · apagar Vite |

### Diferencias concretas en el código

- **Validación de email:** las dos copias escribieron la misma expresión, `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Con harness, `adversarial-reviewer` la marcó y quedó alineada con el backend (verificado en 10 emails contra la API real). Sin harness sigue igual.
- **Sesión:** `sessionStorage`, justificado en el plan, frente a `localStorage`, sin justificar.
- **Estado:** hook con cuatro estados, incluido el fallo al recuperar la sesión con reintento, frente a un contexto de React con tres estados.
- **A favor de la copia sin harness:** probó de verdad en Chrome el triple envío, la recarga y el cierre de sesión, y confirmó que el token queda revocado. Con harness solo hubo lint, build y pruebas de la API con `curl`.

## Parte B: las tres líneas

1. **Hasta qué pieza llegué y cuál me costó más:** Llegué a las 8. La que más me costó fue `AGENTS.md` como enlace: primero lancé un comando de PowerShell en Bash, después Windows pidió privilegios de administrador, y hubo que activar el Modo de desarrollador y crearlo con `mklink`.
2. **Primera diferencia que vi y en qué me fijé para verla:** Con harness el agente trajo solo el ticket de Jira y se detuvo en un plan con decisiones y riesgos; sin harness empezó a escribir código directamente. Me fijé en si había un plan antes del primer archivo.
3. **Algo escrito en el harness que el agente no cumplió igualmente:** La regla «Al terminar, pide una revisión al subagente `adversarial-reviewer`»: tras la última ronda de correcciones se cerró el ticket sin volver a pedirla.
