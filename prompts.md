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

---

## Prompt 1 — FLOW-1 (Mostrar el usuario autenticado en la aplicación)

**Modelo:** Opus 5 (1M)
**Herramienta:** Claude Code

> **Este mismo prompt se utilizó en las dos ejecuciones: CON harness y SIN harness.**
> Se lanzó literalmente igual en ambas copias, sin corregir ni reescribir nada (se conservan las
> tildes que faltan y la única que sí lleva, en «básica»). La única variable entre las dos
> ejecuciones es el harness: mismo prompt, mismo modelo y misma herramienta.

```
Como usuario que ha iniciado sesion, quiero poder identificar facilmente que cuenta estoy utilizando mientras navego por la aplicacion.

La aplicacion debe mostrar la informacion básica del usuario de la sesion actual de forma clara y sin afectar al funcionamiento existente.

**Criterios de aceptacion:**

- Una vez autenticado, puedo ver mi nombre y correo electronico en la interfaz.
- La informacion mostrada corresponde al usuario de la sesion actual.
- Si no existe una sesion valida, no se muestra informacion perteneciente a un usuario anterior.
- El comportamiento existente de la aplicacion debe seguir funcionando.
- La funcionalidad debe poder ejecutarse y comprobarse en el entorno local del proyecto.
```

**Qué salió:**

- **CON harness:** implementado en el frontend sin instalar dependencias, respetando las
  convenciones del `CLAUDE.md`; `node scripts/check.mjs` en verde (7/7).
- **SIN harness:** implementado también solo en frontend, sin cambios funcionales en el
  backend: `fetch` nativo, `localStorage` y validación de la sesión contra
  `/account/profile`, más un formulario mínimo de login porque el frontend original no tenía
  forma de iniciar sesión. Modificó `frontend/src/App.tsx` y `frontend/.gitignore`, y creó
  `frontend/src/api.ts`, `frontend/src/useSession.ts`, `frontend/src/SessionBar.tsx`,
  `frontend/src/SessionBar.css` y `frontend/.env.example`. Verificado con `tsc -b`, `oxlint`,
  `vite build` y el flujo HTTP real login → profile → logout → 401. Sin tests automatizados
  (el frontend no tenía runner y se decidió no meter uno sin que se pidiera) y sin comprobar
  la interfaz renderizada en navegador, porque la extensión de Chrome no estaba instalada.
