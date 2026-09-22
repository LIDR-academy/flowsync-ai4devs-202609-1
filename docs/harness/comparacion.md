# Comparación: Con Harness vs. Sin Harness

Ejercicio práctico del Módulo 1 (FlowSync) — Medición empírica del impacto del andamiaje (*harness*) sobre el mismo encargo y el mismo modelo.

---

## Tabla Comparativa

| Casilla evaluada | Copia Pelada (`flowsync-sin-harness`) | Copia con Harness (`flowsync-ai4devs`) |
| :--- | :--- | :--- |
| **Archivos propuestos (contados)** | **7 archivos** (3 en backend: `auth_controller.ts`, `routes.ts`, migración tokens; 4 en frontend: `Login.tsx`, `api.ts`, `App.tsx`, `package.json`). | **4 archivos** (0 en backend; 4 en frontend: `types/auth.ts`, `services/auth.ts`, `components/LoginForm.tsx`, `App.tsx`). |
| **Convenciones respetadas y violadas** | ❌ **Violó:** Modificó el backend (prohibido). Inventó ruta `/api/login` ignorando la real (`/api/v1/auth/login`). Propuso añadir dependencias (`axios`, `react-router-dom`) sin verificar el stack.<br>✔️ **Respetó:** Uso de TypeScript en frontend. | ✔️ **Respetó:** Prohibición estricta de tocar backend. Consultó validadores VineJS (`user.ts`). Usó la ruta real `POST /api/v1/auth/login` y reconoció el token `oat_`.<br>❌ **Violó:** Propuso instalar librerías externas de UI para componentes en lugar de usar utilidades nativas. |
| **Intervenciones requeridas** | **3 intervenciones:** Frenar la modificación del backend, corregir la URL del endpoint inventado y descartar dependencias innecesarias en `package.json`. | **0 intervenciones:** El plan inicial respetó la frontera de backend y los contratos reales de la API en el primer intento (*first-pass acceptance*). |
| **Arreglos a mano antes de enseñar** | Deshacer todos los cambios en `backend/`, corregir la URL del fetch a `/api/v1/auth/login`, y eliminar dependencias no instaladas de `package.json`. | Ajustar los componentes propuestos para que reutilicen los iconos/estilos locales de Vite en lugar de importar paquetes externos de UI. |

---

## Parte B: Las tres líneas

1. **Piezas montadas y cuál costó más:** Monté `AGENTS.md` (orientación previa y guardrails de backend), `CLAUDE.md` (atajos de ejecución), tablero de Jira Cloud `FLOW` (ticket `FLOW-3` asignado) y el script de comprobación `./scripts/verify.sh` (build + lint + detección de diff en backend). Lo que más costó fue la puesta a punto inicial del backend de AdonisJS en Node 22 (`v22.16.0`), donde `node ace` requería `NODE_OPTIONS="--experimental-strip-types"` para que el loader de TypeScript ESM funcionara sin fallar.
2. **Primera diferencia vista y en qué me fijé:** En la lista de archivos propuestos en el primer bloque del plan: la copia pelada empezó proponiendo modificar `backend/start/routes.ts` y crear un controlador de backend, inventándose la ruta `/api/login`; la copia con harness leyó `AGENTS.md`, acotó el 100% de los cambios a `frontend/` y fue directa a inspeccionar `backend/app/validators/user.ts` para extraer el contrato real.
3. **Algo dejado escrito en el harness que el agente no cumplió:** En `AGENTS.md` dejé explícito *"no añadir librerías externas pesadas a package.json para UI y reutilizar recursos locales"*; aun así, el agente propuso instalar `@radix-ui/react-slot` para el formulario asumiendo la inercia habitual de shadcn. Una regla sube drásticamente la probabilidad, pero el modelo tiende a rellenar con sus patrones más frecuentes de entrenamiento.
