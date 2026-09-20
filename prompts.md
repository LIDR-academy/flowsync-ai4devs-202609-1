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

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** (opcional, una línea) funcionó a la primera y creó un fichero CLAUDE.md en la raíz con info sobre la estructura y ficheros que ya existen.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Implementa el ticket FLOW-2 consultándolo en el jira del proyecto. Debes preguntarme cualquier duda que tengas en lugar de presuponer nada. Utiliza las convenciones del CLAUDE.md.
```

**Qué salió:** (opcional, una línea) tras responder 3 o 4 preguntas para clarificar cosas y que no se las inventase, un plan de trabajo que incluía ficheros modificados, ficheros creados, interacciones con git y validaciones posteriores.

## Prompt 3 (a partir de este, en la copia sin harness)

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Implementa este login de acceso a la lista de tareas:
El producto debe tener una página inicial de acceso que pida al usuario hacer un login antes de darle acceso a las tareas del equipo. El login debe tener dos campos de texto para introducir un username y una password, así como un botón de login para confirmar y pedir el acceso. Cuando el usuario confirme con el botón, el producto debe validar el usuario y la contraseña introducidos contra la información de los usuarios permitidos almacenada en la base de datos. Si se encuentra un usuario con el mismo username y password, el usuario es conducido al resto de páginas con información sobre las tareas del equipo. En caso contrario, aparecerá un mensaje de error en la misma página de login y se borrarán los textos que haya en los dos campos de texto, para que el usuario lo intente de nuevo.

Debes preguntarme cualquier duda que tengas en lugar de presuponer nada.
```

**Qué salió:** (opcional, una línea) Bastantes preguntas, tras las cuales salió un plan de implementación similar a la versión con harness.
