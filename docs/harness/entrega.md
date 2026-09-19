# Entrega — ¿Cuánto cambia el harness la ejecución de FLOW-5?

## Contexto
Se utilizo VS Code. Se tenia instalado claude code y adicionalmente la extesion de claude code en el IDE.
Adicionalmente se tenian los MCP de github y jira los cuales fueron usados durante la realizacion del ejercicio.

Se ejecutó el mismo prompt ([docs/prompts.md](../prompts.md)) en dos proyectos idénticos:

| | Proyecto | Reporte de la ejecución |
|---|---|---|
| **A — Con harness** | Incluye `CLAUDE.md` (reglas) y un hook `Stop` (lint + typecheck + revisión automática del diff) | [comparacion.md](comparacion.md) |
| **B — Sin harness** | Mismo código base, sin `CLAUDE.md` ni hooks | [resultados-sin-harness.md](resultados-sin-harness.md) |

Prompt: *"Toma la tarea FLOW-5 de Jira y realiza la implementación. Al finalizar entrega [...] la lista de archivos y modificaciones [...] máximo 2 líneas por bulletpoint."*

Objetivo: medir (1) cuánto se respetó realmente lo que indica el harness y (2) cuánto difiere el resultado frente a la ejecución sin harness.

En cuanto al harness:

Archivo CLAUDE.md, MCP de Jira y Github, Hook para revision de codigo ante señal de stop.

---

## 1. Comparación lado a lado

### Backend

| Aspecto | A — Con harness | B — Sin harness |
|---|---|---|
| Migración | `1768700000000_create_tasks_table.ts`, con índices en `type` y `status` | `1789740891888_create_tasks_table.ts`, estado con default `creada` |
| `database/schema.ts` | Regenerado con `migration:run` | Regenerado con `migration:run` |
| Modelo | `Task` + `TASK_STATUSES` (`created`, `in_progress`, `done`, `blocked`) | `Task` + enums `TASK_TYPES` y `TASK_STATUSES` |
| Validadores VineJS | Crear, actualizar, listar; `dueDate` posterior a `startDate` | Crear/editar, listar; `dueDate` posterior a `startDate` |
| Transformer | `task_transformer.ts` (fechas ISO `yyyy-MM-dd`) | `task_transformer.ts` (campos públicos) |
| Endpoints | `index`, `store`, `show`, `update`, `destroy` (**`destroy` marca `blocked`**) | `index`, `store`, `show`, `update`, `updateStatus` (**no existe borrado**) |
| Rutas | `router.resource('tasks', …).apiOnly()` bajo `/api/v1` | Grupo `/api/v1/tasks` con rutas explícitas |
| Tests funcionales | `tests/functional/tasks.spec.ts`, **7 tests** | **Ninguno** |
| `eslint.config.js` | **Modificado** (excluye `database/schema.ts`) | No tocado |
| Archivos `.adonisjs/` | Regenerados por las herramientas | Regenerados por `node ace serve` |

### Frontend

| Aspecto | A — Con harness | B — Sin harness |
|---|---|---|
| `src/types/task.ts` | `Task`, `TaskStatus`, `PaginationMeta`, catálogos `TASK_STATUSES`/`TASK_TYPES` | `Task`, `TaskType`, `TaskStatus` + etiquetas en español |
| Capa API | `api/client.ts` (wrapper `fetch` + `ApiError` en 422) y `api/tasks.ts` con `list/create/update/delete` | Solo `api/tasks.ts` con `list/create/update/updateStatus` |
| Componentes | `TaskForm`, `TaskFilters`, `TaskList`, `Pagination` | `TaskForm`, `TaskFilters`, `TaskList`, `Pagination` |
| Acciones en la lista | Cambio de estado inline + Editar + **Eliminar** | Cambio de estado inline + Editar (sin Eliminar) |
| `App.tsx` / `App.css` | Reemplazan la landing de Vite | Reemplazan la landing de Vite |
| `index.html` | Título "FlowSync" | No se menciona |
| Assets del template | **Eliminados** (`react.svg`, `vite.svg`, `hero.png`, `icons.svg`) | No se menciona (solo se retiran estilos) |

### Validación declarada

| | A — Con harness | B — Sin harness |
|---|---|---|
| Backend | `npm run lint`, `npm run typecheck`, `npm test` (7/7) | `curl` manual a los 5 endpoints (válido, inválido, fechas, filtro, paginación, estado inválido) |
| Frontend | `npm run build` + `npm run lint` | `npx tsc -b` + `npm run lint` |
| Navegador (Playwright) | Crear, filtrar, cambiar estado, editar, "eliminar" (queda en *Bloqueada*), consola sin errores | Bloqueo de tarea vacía, bloqueo de rango inválido, alta, cambio de estado, filtro, precarga de edición |

---

## 2. ¿Se respetó el harness?

Reglas tomadas de [CLAUDE.md](../../CLAUDE.md), contrastadas con lo que cada ejecución reporta.

| Regla del harness | A — Con harness | B — Sin harness |
|---|---|---|
| Estructura AdonisJS (controllers/validators/models, rutas bajo `/api/v1`) | ✅ | ✅ |
| Validar toda entrada con VineJS | ✅ | ✅ |
| No editar archivos generados (`schema.ts`, `.adonisjs/`) | ✅ regenerados por herramientas | ✅ regenerados por herramientas |
| Migración nueva con `node ace make:migration` | ⚠️ El timestamp `1768700000000` es un número redondo, lo que sugiere archivo escrito a mano | ✅ El timestamp `1789740891888` corresponde a hoy y tiene forma de salida del generador |
| **Tests funcionales para endpoints nuevos** | ✅ 7 tests | ❌ Ninguno, solo `curl` manual |
| **Correr `lint`, `typecheck` y `test` del backend antes de terminar** | ✅ Reportado | ❌ No reportado (solo se validó el frontend) |
| Correr `npm run lint` en frontend | ✅ | ✅ |
| Sin librerías nuevas "por adelantado" | ✅ `package.json` del frontend no cambió | ➖ No verificable |
| Preferir cliente tipado de `@tuyau/core` sobre `fetch` | ➖ No aplica: la regla dice "una vez cableado" y no lo está; usa `fetch` | ➖ Igual, usa `fetch` |
| Cambios acotados al alcance del ticket | ⚠️ Toca `eslint.config.js` y borra assets del template | ✅ Sin cambios fuera del alcance visibles |
| Hook `Stop` (lint + typecheck + revisión del diff) | ➖ Aplica, pero no hay evidencia en los archivos de si se disparó ni qué encontró | ➖ No existe |

**Balance:** de las reglas que se pueden contrastar, A cumple 6 sin reservas y 2 con reservas (migración, alcance). B incumple 2 (tests y checks de backend).

Adicionalmente, ambas ejecuciones realizaron pruebas con playwrigth que tambien se tenia como MCP instalado. Durante la ejecucion de las pruebas se observo que el diseño de la pagina era diferente entre las 2 ejecuciones, sin embargo nunca se indico un prototipo o diseño para el front.

---

## 3. Diferencias de diseño que no vienen del harness

Estas divergencias afectan el contrato de la API, pero las reglas de `CLAUDE.md` no las cubren:

- **Cómo se "elimina":** A expone `DELETE /tasks/:id` que fuerza `blocked`. B no tiene borrado y cambia el estado con `updateStatus`. Ambas cumplen el criterio "estados en vez de borrado real", pero B lo hace estructuralmente (no hay forma de borrar) y A por convención.
- **Idioma de los estados:** A usa valores en inglés (`created`, `in_progress`…). B usa español (`creada`…).
- **Tipos de tarea:** B exporta un enum `TASK_TYPES` desde el backend. En A el `type` es un string libre (1–60 caracteres) validado solo por longitud, y el catálogo vive en el frontend.
- **Pruebas negativas en UI:** B declara haber probado en navegador el bloqueo de tarea vacía y de rango de fechas inválido. A cubre esos casos en tests de backend, pero su prueba en navegador no los lista.

---

## 4. Conclusiones

1. **El harness sí cambió el comportamiento, en dos puntos concretos:** se escribieron tests funcionales y se corrieron los checks del backend. Ambos están escritos como regla explícita en `CLAUDE.md`. Sin el harness, esos dos pasos no aparecen.
2. **En el resto, las dos ejecuciones convergen:** misma estructura de archivos, mismos componentes, mismas convenciones de AdonisJS y VineJS. El código base y el ticket ya empujan hacia esa solución, así que el harness no cambia el diseño general.
3. **El harness no evitó todo desvío:** A modificó `eslint.config.js` (justificado, pero fuera del ticket), borró assets del template y, según el indicio del timestamp, no habría usado `make:migration`.
4. **Sobre el formato del entregable:** ambos reportes siguen el formato pedido (un bullet por archivo, agrupado en Backend/Frontend). No medí si cada bullet respeta el máximo de 2 líneas. Ambos agregan una sección de validación que el prompt no pedía.
5. **Sobre la causa de las diferencias:** cada variante se ejecutó una sola vez. Diferencias como el idioma de los estados o `DELETE` vs `updateStatus` pueden ser variación normal del modelo y no efecto del harness. Solo la ausencia de tests y de checks en B es atribuible con más confianza a la falta de reglas explícitas.