# Comparación: mismo ticket, con y sin harness

Ticket: página de login en el frontend + avatar de usuario tras iniciar sesión.
Modo: Plan mode en ambas copias, sin aprobar el plan (se comparan planes, no código).
Harness: `AGENTS.md` (+ `CLAUDE.md` con `@AGENTS.md`) y hook `PostToolUse` (Prettier + oxlint en `frontend/`).

| Casilla | Sin harness | Con harness |
|---|---|---|
| Archivos que propone tocar | 6 (2 modificados, 4 creados), todos en `src/` | 9 (3 modificados, 6 creados), incl. `vite.config.ts` y carpeta `components/` |
| Convenciones respetadas | No añade dependencias. No toca `backend/`, pero porque cree que no existe | No toca `backend/`. No añade dependencias. Lista exacta de archivos. Usa el contrato real (`POST /api/v1/auth/login`, `{ user, token }`, `initials`). Toma `maxLength 254` del validador. Verifica con `npm run lint` y `npm run build` |
| Convenciones no respetadas | No lee el backend ni el validador: afirma "there's no backend" y simula el login. Lista de archivos no cerrada ("or put them in a separate file"). No incluye lint en la verificación | Ninguna regla escrita incumplida en el plan. |
| Intervenciones | [COMPLETA] | [COMPLETA] |
| Qué arreglaría a mano | Rehacer la auth entera (es falsa). Iniciales desde el email en vez de `user.initials`. Quitar el contenido de la plantilla que conserva | Quitar el proxy de Vite (CORS ya está abierto en dev: cambio innecesario). Token solo en memoria: se pierde al recargar. Decidir si 3 CSS por componente es aceptable |

**Validez:** [COMPLETA si aplica — p. ej. "El prompt no fue idéntico: en la copia sin harness referencié ticket.txt y en la otra pegué el texto."]

## Las tres líneas

1. **Piezas montadas:** `AGENTS.md` + `CLAUDE.md` (`@AGENTS.md`) y hook `PostToolUse` con Prettier + oxlint. Lo que más costó: [COMPLETA — p. ej. el setup en bash: la variable `$H` vacía en otra terminal escribió `AGENTS.md`/`CLAUDE.md` en un archivo `.md` y tuve que rehacerlo].
2. **Primera diferencia:** en el apartado *Context* del plan sin harness, la frase "Since there's no backend": el agente exploró solo `frontend/` y decidió simular el login, aunque `backend/` estaba en la misma carpeta. El plan con harness, en ese mismo apartado, cita el endpoint real y la forma `{ user, token }`. Lo vi leyendo el primer párrafo de cada plan, sin abrir archivos; el desglose de uso lo confirma: la copia sin harness no lanzó ninguna lectura sobre `backend/`.
3. **Escrito en el harness y no cumplido:** [COMPLETA]. Lo que sí puedo afirmar es que la pieza de "comprobar después" (el hook) **no llegó a ejecutarse nunca**: en Plan mode no hay ediciones, así que la mitad del harness quedó sin medir. La regla "lee el validador antes de asumir" sí se cumplió: lanzó un subagente Explore dedicado a `backend/app/validators/user.ts`.

## Coste de exploración (auto-reportado por el agente, aproximado)

| | Sin harness | Con harness |
|---|---|---|
| Subagentes Explore | 1 (~25,5k tokens, 12 tool calls) | 3 en paralelo (~44k tokens, 18 tool calls) |
| Qué exploró | Solo `frontend/`: 5 lecturas directas (`index.css`, `App.tsx`, `App.css`, `main.tsx`, `package.json`) | Estructura del frontend + validador del backend + `UserTransformer` |
| Contexto hilo principal | ~42k (total declarado) | ~40k |
| Total aprox. | ~42k | ~84k (40k principal + 44k subagentes) |

Lectura: volumen de tool calls parecido (~20 vs 18), pero dirigido a sitios distintos. El harness gastó ~2x tokens,
casi todo en subagentes aislados (el hilo principal se mantuvo igual), y ese gasto fue justo a los dos archivos del
backend que el `AGENTS.md` señalaba. Sin harness, el presupuesto se fue en CSS de la plantilla y nunca abrió `backend/`.
