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
Tras el montaje de claude.md, los settings y los hooks para hacer un pre para no modificar backend realizo el test para correcto funcionamiento

## Prompt 1 - 10:52

**Modelo:** Sonnet 5 Medium
**Herramienta:** Claude Code

```
modificame la fuente de .counter en frontend a 15 px
```

**Qué salió:** Funciono a la primera

## Prompt 2

**Modelo:** Sonnet 5 Medium
**Herramienta:** Claude Code

```
modificame en backend para que profile_controller aparezca al final del archivo  la palabra prueba
```

**Qué salió:** Fallo, permitio la modificación del archivo por que habia puesto mal la ruta en el sh

## Prompt 3

**Modelo:** Sonnet 5 Medium
**Herramienta:** Claude Code

```
modificame en backend para que profile_controller aparezca al final del archivo  la palabra prueba
```

**Qué salió:** Funciono a la primera. Devolvio "Un hook del proyecto bloquea modificaciones dentro de backend/: BLOQUEADO: no está permitido modificar archivos dentro de backend/. Consulta CLAUDE.md.

No puedo aplicar el cambio. Revisa claude.md/CLAUDE.md en la raíz del repo para ver la política — si quieres que edite ahí, dime y lo consulto, o si tienes permiso para desactivarlo temporalmente, avísame."

## Prompt 4 - Con Harness

**Modelo:** Sonnet 5 Medium
**Herramienta:** Claude Code

```
Como usuario, quiero poder iniciar sesión desde la web para acceder a mi cuenta

Descripción

Actualmente el backend ya soporta login (POST /api/v1/auth/login) pero el frontend no tiene ninguna pantalla ni flujo para usarlo — solo está el scaffold por defecto de Vite.

Necesitamos una pantalla de login funcional donde el usuario introduzca su email y contraseña, y si son correctos, acceda a la aplicación. Si las credenciales son incorrectas, el usuario debe enterarse de que algo ha ido mal sin quedarse con la duda de si es un problema de conexión o de sus datos.

Una vez logueado, el usuario debería poder ver que está autenticado (por ejemplo, algo tan simple como ver su perfil) y poder cerrar sesión cuando quiera.

Criterios de aceptación:

Existe una pantalla de login accesible desde la raíz de la aplicación.

El usuario puede introducir email y contraseña y enviarlos.

Si el login es correcto, el usuario pasa a una vista donde se confirma que ha entrado (puede mostrar su información de perfil, usando el endpoint ya existente).

Si el login falla, el usuario ve un mensaje que le indica que revise sus datos.

El usuario puede cerrar sesión y volver a la pantalla de login.

Si un usuario ya logueado recarga la página, la aplicación no le hace loguearse de nuevo si su sesión sigue siendo válida.

No se debe modificar nada en backend
```

**Qué salió:** Listo. He construido el flujo completo de login en el frontend, sin tocar nada de backend/.

Archivos creados/modificados (todos en frontend/src/):

api.ts — cliente fetch fino: login, fetchProfile, logout, desenrollando el { data: ... } que devuelve la API y distinguiendo NetworkError (fallo de conexión) de InvalidCredentialsError (credenciales/sesión inválida).
App.tsx — reemplaza el scaffold de Vite por: pantalla de carga inicial → si hay token en localStorage se valida contra /account/profile; si es válido pasa directo a perfil (sin re-login), si no, lo limpia y muestra login. Login guarda token+usuario, logout llama al endpoint y limpia estado.
App.css — estilos mínimos para el formulario/tarjeta de perfil, reutilizando las variables ya definidas en index.css.
Verificado end-to-end con curl contra el backend real (ya corriendo en :3333): login válido, login inválido (400 → mensaje de credenciales), perfil con token, logout, y perfil tras logout (401, sesión inválida). tsc -b y oxlint limpios.

El frontend está corriendo en http://localhost:5174 (el 5173 estaba ocupado por otro proceso ya activo). No he añadido dependencias nuevas ni tocado config de build.

→ skipped: React Router (una sola vista condicional cubre "accesible desde la raíz"), refresh-token/expiración silenciosa. Añadir si se necesitan más rutas o expiración de sesión real.

Comprobado que funciona

## Prompt 5 - Sin Harness 11:20

**Modelo:** Sonnet 5 Medium
**Herramienta:** Claude Code

```
Como usuario, quiero poder iniciar sesión desde la web para acceder a mi cuenta

Descripción

Actualmente el backend ya soporta login (POST /api/v1/auth/login) pero el frontend no tiene ninguna pantalla ni flujo para usarlo — solo está el scaffold por defecto de Vite.

Necesitamos una pantalla de login funcional donde el usuario introduzca su email y contraseña, y si son correctos, acceda a la aplicación. Si las credenciales son incorrectas, el usuario debe enterarse de que algo ha ido mal sin quedarse con la duda de si es un problema de conexión o de sus datos.

Una vez logueado, el usuario debería poder ver que está autenticado (por ejemplo, algo tan simple como ver su perfil) y poder cerrar sesión cuando quiera.

Criterios de aceptación:

Existe una pantalla de login accesible desde la raíz de la aplicación.

El usuario puede introducir email y contraseña y enviarlos.

Si el login es correcto, el usuario pasa a una vista donde se confirma que ha entrado (puede mostrar su información de perfil, usando el endpoint ya existente).

Si el login falla, el usuario ve un mensaje que le indica que revise sus datos.

El usuario puede cerrar sesión y volver a la pantalla de login.

Si un usuario ya logueado recarga la página, la aplicación no le hace loguearse de nuevo si su sesión sigue siendo válida.

No se debe modificar nada en backend
```

**Qué salió:** Only the two frontend files changed, backend untouched as required. Done:

frontend/src/api.ts — thin fetch wrappers for login/profile/logout, token kept in localStorage.
frontend/src/App.tsx — replaced the Vite scaffold with login form → profile view → logout, using a single checking/guest/authenticated state machine; on mount it validates any stored token against /account/profile so a reload doesn't force re-login. Bad credentials (400) show a Spanish "revisa tus datos" message; network failures show a distinct "no se pudo conectar" message.
Verified against the real backend on port 3333: signup/login/profile/logout/bad-credentials all match the {data: ...} envelope shape I coded against, and tsc -b plus Vite serve both pass clean.

skipped: no router (single view, doesn't need one), no new deps (plain fetch), no visual browser screenshot (no chromium-cli/Playwright available in this Windows shell) — worth a manual click-through before shipping.

Comprobado que funciona