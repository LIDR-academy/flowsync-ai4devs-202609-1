# Prompts — Ejercicio harness FlowSync

**Modelo:** Opus (Claude Code)
**Herramienta:** Claude Code (modo plan)

## Encargo 

Título: Iniciar sesión en FlowSync

Descripción:
Como usuario de FlowSync, necesito iniciar sesión en la aplicación para
acceder a mis tareas de forma segura. Hoy no hay forma de entrar desde el
frontend. Quiero entrar con mis credenciales y que la app me reconozca.

Criterios de aceptación:
- El usuario puede iniciar sesión desde la pantalla de login con sus credenciales.
- Si las credenciales son incorrectas, recibe un aviso claro de qué pasó.
- Una vez dentro, accede a su espacio de tareas.


## Copia CON harness

1. Pegué el encargo de arriba.
2. El agente preguntó si instalar shadcn/ui o usar CSS propio → elegí la opción 2: CSS propio, sin dependencias nuevas.
3. El agente preguntó por la navegación (router o no) → elegí la opción 2: render condicional, sin router.

## Copia SIN harness

1. Pegué el mismo encargo, palabra por palabra.
2. El agente preguntó por la navegación (router o no) → elegí la opción 2: render condicional, sin router.
3. El agente preguntó si añadir tests automatizados → elegí la opción 2: solo verificación manual.