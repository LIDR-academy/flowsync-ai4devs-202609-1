# Comparación: con harness vs. sin harness

## Parte A — Comparación

| Criterio | Con harness | Sin harness |
|---|---|---|
| Archivos tocados | 4 archivos: `frontend/src/App.css`, `frontend/src/App.tsx`, `frontend/src/LoginForm.tsx`, `frontend/src/api.ts`. | 5 archivos: `frontend/src/App.css`, `frontend/src/App.tsx`, `frontend/.env.example`, `frontend/src/api/auth.ts`, `frontend/src/components/LoginForm.tsx`. |
| Convenciones respetadas/incumplidas | Respetó trabajar en `frontend/`, no modificó `backend/`, inspeccionó el backend para obtener el contrato existente, no agregó dependencias, ejecutó `lint` y `build` e invocó al subagente `revisor`. No respetó completamente la instrucción de limitar los cambios a lo requerido: añadió persistencia de sesión y logout aunque la Story no los pedía explícitamente. | No había convenciones de harness escritas. Aun así trabajó sobre el frontend y ejecutó `lint` y `build`. Además arrancó el backend, ejecutó migraciones y creó un usuario de prueba para validar el login. |
| Intervenciones necesarias | 0 aclaraciones o correcciones del encargo por parte del usuario. | 0 aclaraciones o correcciones del encargo por parte del usuario. |
| Qué arreglaría manualmente | Revisaría si mantener o eliminar la persistencia de sesión y logout por estar fuera del alcance explícito de FLOW-1. También validaría manualmente el login contra el backend en ejecución, ya que el agente indicó que no lo hizo. | Revisaría si mantener o eliminar persistencia de sesión y logout, y si realmente corresponde añadir `frontend/.env.example`. También revisaría el efecto de haber ejecutado migraciones y creado un usuario de prueba en la base local. |

## Parte B — Tres líneas

1. Piezas del harness montadas y cuál costó más: monté `CLAUDE.md` como instrucciones persistentes y el subagente `revisor` como comprobación posterior. El revisor costó más de lo esperado porque tuve que entender cómo definirlo y cómo hacer que el agente principal lo utilizara al finalizar.
2. Primera diferencia observada entre ambas salidas: en la terminal de la corrida con harness vi que Claude invocó explícitamente al subagente `revisor` y esperó su resultado antes de cerrar la tarea; en la corrida sin harness no existió esa revisión especializada.
3. Algo escrito en el harness que el agente no cumplió: `CLAUDE.md` indicaba limitar los cambios a lo requerido por la tarea, pero el agente añadió persistencia de sesión y logout aunque reconoció que la Story no los pedía explícitamente.
