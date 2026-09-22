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

**Qué salió:** Funcionó sin problemas y se generó archivo CLAUDE.md

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Implementa el story FLOW-1 Inicio de sesion que está en la pizarra de Jira (Realizado con Harness).
```

**Qué salió:** Creó el plan correspondiente al ticket tomando en cuenta las convenciones del archivo CLAUDE.md y AGENTS.md

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Implementa el story FLOW-1 Inicio de sesion que está en la pizarra de Jira (Realizado sin Harness).
```

**Qué salió:** Encontró error en la conexión al MCP de jira por lo que se le tuvo que indicar el contenido del story manualmente.