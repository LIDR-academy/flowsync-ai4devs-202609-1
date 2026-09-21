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

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
claude
/init
```

**Qué salió:** Claude estudió la estructura del repositorio y generó CLAUDE.md con información del proyecto.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/mcp
```

**Qué salió:** Verificar la conexión con Atlassian.

# Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea una skill de proyecto llamada priority-ticket.

Debe:
- consultar Jira mediante el MCP de Atlassian
- localizar el ticket prioritario del espacio FlowSync, clave FLOW
- leer su descripción y criterios de aceptación
- analizar el repositorio teniendo en cuenta CLAUDE.md
- proponer un plan de implementación
- no modificar ningún archivo
- no implementar la solución
- devolver únicamente el plan

Guarda la skill dentro de la configuración del proyecto para que pueda invocarse como /priority-ticket.
```

**Qué salió:** Me da la confirmación de que lo ha creado y las intrucciones para su uso


# Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea una skill de proyecto llamada commit.

Debe:
- revisar el estado actual del repositorio con Git
- identificar únicamente los archivos modificados relevantes para la tarea actual
- excluir archivos generados, temporales, secretos o cambios accidentales
- revisar el diff antes de preparar el commit
- proponer un mensaje de commit breve, claro y en formato convencional
- hacer git add solo de los archivos relevantes
- crear el commit
- no hacer git push
- no cambiar de rama
- no hacer reset, revert ni borrar cambios existentes
- detenerse si detecta archivos dudosos, secretos o cambios que no parecen pertenecer a la tarea

Guarda la skill dentro de la configuración del proyecto para que pueda invocarse como /commit.
```

**Qué salió:** Me da la confirmación de que lo ha creado y las intrucciones para su uso

# Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea un subagente de proyecto llamado adversarial-reviewer.

Su función será revisar de forma crítica planes de implementación y cambios propuestos para FlowSync.

Debe:
- leer CLAUDE.md y respetar las convenciones del proyecto
- revisar el ticket de Jira y sus criterios de aceptación cuando estén disponibles
- comprobar si el plan cubre todos los criterios de aceptación
- identificar supuestos no justificados
- detectar riesgos técnicos, de seguridad, de datos o de compatibilidad
- detectar archivos o capas que deberían estar incluidos y no lo estén
- señalar pasos en orden incorrecto o dependencias omitidas
- comprobar que no se propongan cambios contra las convenciones del proyecto
- diferenciar entre problemas bloqueantes y observaciones menores
- no modificar ningún archivo
- no implementar nada
- no modificar Jira
- devolver una revisión breve, concreta y accionable

Guárdalo como subagente dentro de la configuración del proyecto con el nombre adversarial-reviewer.
```

**Qué salió:** Me da la confirmación de que lo ha creado y las intrucciones para su uso

# Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea un hook de proyecto para FlowSync que formatee automáticamente con Prettier los archivos del frontend después de que Claude los edite.

Requisitos:
- debe ser un hook de proyecto, no global
- debe ejecutarse después de operaciones de edición/escritura
- debe aplicarse únicamente a archivos dentro de frontend/
- debe formatear únicamente el archivo que acaba de modificarse, no todo el proyecto
- debe usar Prettier
- no debe ejecutarse sobre backend/
- no debe hacer commits ni push
- no debe modificar archivos distintos del que disparó el hook
- antes de configurarlo, revisa el package.json del frontend para comprobar si Prettier ya está disponible
- si necesitas añadir configuración o dependencias para que el hook funcione, explícame qué archivos vas a modificar y por qué

Configúralo dentro de la configuración de Claude Code de este proyecto.
```

**Qué salió:** Me da la confirmación de que lo ha creado y las intrucciones para su uso. Me informa que prettier no está instalado y recomeidna su instalación. 

# Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Añade al final de CLAUDE.md una sección llamada "Reglas de proceso".

Incluye estas reglas:

- Antes de implementar cualquier cambio, lee primero el ticket de Jira relacionado y sus criterios de aceptación.
- Antes de modificar código, prepara un plan de implementación.
- No implementes nada si el usuario ha pedido únicamente análisis o planificación.
- Respeta siempre las convenciones documentadas en CLAUDE.md.
- No modifiques archivos generados manualmente, especialmente backend/.adonisjs/ y backend/database/schema.ts.
- No modifiques prompts.md ni docs/harness/ salvo que el usuario lo pida explícitamente.
- Antes de dar por terminada una implementación, comprueba que todos los criterios de aceptación estén cubiertos.
- Usa el subagente adversarial-reviewer para revisar planes o cambios importantes antes de considerarlos terminados.
- Ejecuta las comprobaciones disponibles del proyecto (lint, typecheck, tests) cuando apliquen.
- Si una validación falla, no la ignores ni la saltes; informa del fallo.
- No hagas git push automáticamente.
- No cambies de rama sin permiso explícito.
- Si detectas cambios o archivos ajenos a la tarea actual, no los modifiques ni los incluyas en commits.

No cambies el resto del contenido de CLAUDE.md.
Solo añade esta sección al final.
```

**Qué salió:** Me da la confirmación de que lo ha creado y las intrucciones para su uso."Añadí la sección "Reglas de proceso" al final de CLAUDE.md (líneas 65–79), con las 13 reglas en el mismo orden que me diste. El resto del archivo no cambió." 

# Prompt 8 

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Crea un archivo AGENTS.md en la raíz del proyecto.

Debe contener únicamente una referencia clara a CLAUDE.md indicando que las instrucciones, convenciones y reglas de proceso del proyecto están definidas allí.

No dupliques el contenido de CLAUDE.md.
```

**Qué salió:** Claude creó `AGENTS.md` en la raíz del proyecto con una referencia a `CLAUDE.md`, sin duplicar sus instruccione

# Prompt  9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:**  generó un plan de implementación para FLOW-1 con pasos, archivos,criterios de aceptación, pruebas, supuestos y riesgos. No modificó archivos. 

## Prompt 10

**Modelo:** Sonnet 5  
**Herramienta:** Claude Code

```
priority-ticket

Genera un plan de implementación para el ticket más prioritario del espacio FlowSync (clave `FLOW`) en Jira. Esta skill es **solo de lectura y planificación**.

## Restricciones (obligatorias)

- NO crear, editar, borrar ni mover ningún archivo (ni `Write`, `Edit`, `NotebookEdit`, ni redirecciones o comandos de shell que escriban).
- NO implementar la solución, ni siquiera parcialmente. No incluyas código listo para pegar; describe los cambios.
- NO modificar Jira: no comentar, transicionar, asignar ni editar tickets. Usa solo operaciones de lectura del MCP de Atlassian.
- NO ejecutar migraciones, `npm install`, tests ni comandos que cambien el estado del repo (tampoco `node ace serve`, que regenera `backend/.adonisjs/`).
- La respuesta final es **únicamente el plan** (formato más abajo). Sin preámbulos, sin resumen de lo que hiciste, sin ofrecer implementarlo.

## Pasos

### 1. Consultar Jira (MCP de Atlassian)

1. Obtén el `cloudId` con `getAccessibleAtlassianResources` (una sola vez) y reutilízalo.
2. Busca con `searchJiraIssuesUsingJql`:

   project = FLOW AND statusCategory != Done ORDER BY priority DESC, created ASC

   Pide solo los campos necesarios (`summary`, `priority`, `status`, `issuetype`, `created`).

3. El ticket prioritario es el primero de la lista (mayor prioridad; a igualdad, el más antiguo). Si hay empate de prioridad, elige el más antiguo y menciona el empate en "Supuestos".
4. Si la búsqueda no devuelve resultados, o el MCP no está disponible/autenticado, no inventes un ticket: devuelve solo un mensaje breve explicando qué falló y detente.

### 2. Leer el ticket

Con `getJiraIssue` sobre la clave elegida, lee la descripción completa y los **criterios de aceptación**. Pueden estar en la descripción (sección "Criterios de aceptación" / "Acceptance criteria") o en un campo personalizado; si no aparecen en la vista por defecto, vuelve a pedir con una vista completa (`view: full`). Revisa también subtareas, enlaces a otros tickets y comentarios relevantes si el resultado los incluye.

Si el ticket no tiene criterios de aceptación explícitos, dilo en "Supuestos" y deriva criterios verificables de la descripción.

### 3. Analizar el repositorio

Lee `CLAUDE.md` primero y respeta sus convenciones. Después explora con `Read`, `Grep` y `Glob` (solo lectura) el código afectado por el ticket. Ten en cuenta, entre otros:

- `backend/` (AdonisJS 7) y `frontend/` (React 19 + Vite) son proyectos npm independientes; indica cuál(es) toca cada paso y desde qué directorio se ejecuta cada comando.
- Rutas en `backend/start/routes.ts` bajo `/api/v1`; controladores vía el barrel `#generated/controllers`.
- Respuestas con `serialize(Transformer.transform(model))`, nunca modelos/JSON crudos; validación con VineJS en `app/validators/`.
- Cambios de BD mediante migración en `database/migrations/`, nunca editando a mano `database/schema.ts`; `backend/.adonisjs/` es generado, no se toca.
- Usar los alias de importación (`#models/*`, `#validators/*`, etc.).
- El frontend es aún la plantilla de Vite (sin router, cliente API ni proxy): si el ticket lo necesita, el plan debe incluir esa base.
- Backend con harness de tests (`tests/unit`, `tests/functional`); el frontend no tiene test runner.

Comprueba qué existe ya para no proponer duplicados y localiza los archivos concretos a crear o modificar.

## Formato de la respuesta (lo único que se devuelve)

# Plan de implementación: <FLOW-N> — <título>

**Prioridad / Estado:** <valores>

## Objetivo
<1–3 frases>

## Criterios de aceptación
- <criterio, tal como figura en el ticket>

## Supuestos y dudas abiertas
- <solo si los hay>

## Pasos
1. <paso> — archivos: `ruta/archivo.ts` (crear|modificar) — <qué cambia y por qué>
2. ...

## Pruebas
- <qué tests añadir/ejecutar y con qué comando, indicando el directorio>

## Verificación de criterios de aceptación
| Criterio | Cómo se comprueba |
|---|---|

## Riesgos
- <impactos, migraciones, compatibilidad, orden de despliegue>

Ordena los pasos por dependencia (migración → modelo → validador → transformer → controlador → ruta → tests → frontend). Omite secciones que no apliquen, pero nunca omitas "Pasos" ni "Criterios de aceptación".

**Qué salió:**  Claude no pudo generar el plan porque en la copia sin harness no tenía disponible el MCP de Atlassian. Se detuvo sin inventar el ticket y no se realizó ninguna intervención adicional.

# Prompt  10

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** Falló porque la skill todavía no existía. Claude respondió Unknown command: /priority-ticket.