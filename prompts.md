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

## Prompt 1

**Modelo:** High Fast
**Herramienta:** Cursor (copia con harness)

```
Implementa el ticket FLOW-2
```

**Qué salió:** leyó Jira y montó el registro solo en el frontend, contra la API que ya existía.

---

## Prompt 2

**Modelo:** High Fast
**Herramienta:** Cursor (copia sin harness)

```
Como visitante quiero crear una cuenta en FlowSync para empezar a usar la herramienta con mi equipo. Ahora mismo no hay forma de registrarse desde la web.

Criterios de aceptación:

Hay un flujo para crear cuenta con email y contraseña.

Si el registro va bien, quedo en condiciones de usar la app (o al menos veo que la cuenta se creó).

Si falta un dato o el email no vale, me lo explican sin jerga técnica.

No pedimos datos de más: con lo mínimo para tener cuenta es suficiente.
```

**Qué salió:** también sacó un flujo de registro, pero tocó backend (validador y mensajes) y creó muchos archivos en `frontend/src/auth/`. El servidor de Vite en 5174 se abortó al final.
