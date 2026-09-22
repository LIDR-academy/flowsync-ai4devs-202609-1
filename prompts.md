# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

---

## Prompt 1

**Modelo:** Gemini 3.8 Flash (High)  
**Herramienta:** Google Antigravity IDE (Agentic Pair Programmer)

```
Revisa el ticket asignado en Jira FLOW-3 ("Implementar login en el frontend"):
- Descripción: "Como usuario de FlowSync, quiero poder iniciar sesión en la plataforma con mi correo y contraseña para acceder a mis tareas y proyectos de forma segura."
- Criterios de aceptación:
  1. Añadir una pantalla o formulario de inicio de sesión accesible para usuarios no autenticados.
  2. Permitir al usuario ingresar su email y contraseña.
  3. Mostrar mensajes de error claros y amigables si las credenciales no son válidas o si ocurre un fallo de red.
  4. Si el login es exitoso, guardar la sesión del usuario y redirigirlo a la vista principal mostrando su nombre/estado.
  5. El formulario debe contar con validación básica de campos (email obligatorio con formato válido, contraseña obligatoria).

Genera un plan de implementación técnico para resolver este encargo en el proyecto. No apliques cambios de código todavía; describe los archivos que propones crear o modificar, las capas afectadas, el flujo de autenticación propuesto y los contratos de datos que utilizarás.
```

**Qué salió:**
- **En la copia pelada (`flowsync-sin-harness`):** Propuso 7 archivos tocando tanto frontend como backend (intentando crear un controlador `auth_controller.ts` y reescribir rutas en `/api/login`), además de proponer instalar `react-router-dom` y `axios` sin verificar el stack existente.
- **En la copia con harness (`flowsync-ai4devs`):** Leyó de inmediato `AGENTS.md`, respetó la prohibición de tocar `backend/`, inspeccionó los validadores reales en `backend/app/validators/user.ts` (descubriendo el endpoint real `POST /api/v1/auth/login` y el token `oat_`), propuso únicamente 4 archivos en `frontend/` y añadió la ejecución del guardrail `scripts/verify.sh`.
