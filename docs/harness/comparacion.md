# Comparación: con harness vs sin harness

Encargo: FLOW-2 (registro). Las dos corridas **implementaron** (no se quedaron en Plan).

| | Con harness (este repo) | Sin harness (`flowsync-sin-harness`) |
|---|---|---|
| Prompt | `Implementa el ticket FLOW-2` (el agente leyó Jira). | El texto de producto + criterios, pegado a mano. **No** es el mismo texto palabra por palabra. |
| Archivos que tocó | **4:** `frontend/src/App.tsx`, `App.css`, `index.html`, `vite.config.ts`. | **28** en git (sin contar codegen de `.adonisjs`). Frontend nuevo: carpeta `src/auth/` (12 archivos) + `lib/http.ts` + `auth.css`. Backend: validador, mensajes Vine, controlador, tests, `adonisrc.ts`, etc. Borró `App.css`. |
| Convenciones | **Respetó:** no inventar API (`POST /api/v1/auth/signup` tal cual); no tocar README; no añadir librerías; solo frontend. **No:** «cambios pequeños» — reescribió entero `App.css`. | **No había ninguna escrita.** Eso vale. Hizo el formulario, pero **cambió la API** (validador, mensajes en servidor, reinicio) y montó un módulo de auth entero. |
| Intervenciones | 0 en la corrida del ticket. | 0 mensajes extra de la usuaria. En la captura inicial hubo diálogo Skip/Run de búsqueda web. Al final el `npm run dev` del frontend (5174) se **abortó**. |
| Antes de enseñarlo | Probar a mano en `http://localhost:5173`. El CSS de la plantilla Vite desapareció. | Revisar el cambio de contrato del signup; bajar de ~12 archivos de `auth/` a algo mínimo; volver a levantar Vite (el de 5174 se cayó). |

Algo sin terminar: no se verificó el registro a clics en el navegador en ninguna de las dos.

---

## Parte B

1. Piezas: `AGENTS.md` (antes) y hook `.cursor/hooks.json` + `format-frontend.ps1` (después). Jira de extra. Lo que más rato comió: el hook (se creó mal dentro de `backend/`; Cursor solo lo carga en la raíz).
2. Primera diferencia: en la ventana Agents de la pelada el agente quería **buscar en internet** mensajes de Vine; en la de harness, en ese mismo momento, ya mapeaba errores en `App.tsx` sin tocar backend. Me fijé en el recuadro `Search web: AdonisJS 7 vine.create…`. Luego, en el export, se ve el desenlace: la pelada **reinicia el servidor para cambiar el validador**.
3. En `AGENTS.md` puse «Cambios pequeños: lo mínimo para cumplir el ticket». El agente de harness igual reescribió todo `App.css` de Vite, no solo el formulario. Estaba negro sobre blanco y no se cumplió.
