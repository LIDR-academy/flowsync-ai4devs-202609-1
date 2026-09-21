# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Prompt 1 — Corrida con harness

**Modelo:** Sonnet 5 — High effort
**Herramienta:** Claude Code

~~~text
Implementa la siguiente Story de Jira en FlowSync.

FLOW-1 — Permitir iniciar sesión desde el frontend

Como usuario de FlowSync,
quiero poder iniciar sesión desde la aplicación,
para acceder a mi cuenta con mis credenciales.

Criterios de aceptación

- El usuario puede ingresar su correo y contraseña.
- Al enviar credenciales válidas, la aplicación debe completar el inicio de sesión.
- Si las credenciales son inválidas, el usuario debe recibir un mensaje de error comprensible.
- La funcionalidad debe integrarse con el backend existente.
~~~

**Qué salió:** Implementó el login en el frontend, ejecutó lint y build correctamente e invocó al subagente revisor. El revisor detectó un problema de alcance de CSS que fue corregido. La corrida terminó en 5m 9s.

## Prompt 2 — Corrida sin harness

**Modelo:** Sonnet 5 — High effort
**Herramienta:** Claude Code

~~~text
Implementa la siguiente Story de Jira en FlowSync.

FLOW-1 — Permitir iniciar sesión desde el frontend

Como usuario de FlowSync,
quiero poder iniciar sesión desde la aplicación,
para acceder a mi cuenta con mis credenciales.

Criterios de aceptación

- El usuario puede ingresar su correo y contraseña.
- Al enviar credenciales válidas, la aplicación debe completar el inicio de sesión.
- Si las credenciales son inválidas, el usuario debe recibir un mensaje de error comprensible.
- La funcionalidad debe integrarse con el backend existente.
~~~

**Qué salió:** Implementó el login, ejecutó lint y build correctamente, arrancó el backend, ejecutó migraciones y creó un usuario local para probar el flujo. No hubo revisión especializada. La corrida terminó en 4m 49s.
