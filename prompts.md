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

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

/init

**Qué salió:** : Generó CLAUDE.md. No me sirve del todo porque se supone que el contenido tiene que estar en AGENTS.md para invocar su contenido desde CLAUDE.md

## Prompt 2

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

Mueve el contenido de CLAUDE.md a AGENTS.md (reemplazando el contenido de este fichero) e invoca desde CLAUDE.md el fichero AGENTS.md


**Qué salió:** : Hizo justo lo que quería que se hiciera

## Prompt 3

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

¿cómo monto una skill priority-ticket?

**Qué salió:** : Sugirió esquelo de directorio a usar y contenido para generar un skill que te conectara con Jira.

## Prompt 4

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

Genera tú el fichero skills.md

## Prompt 5

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

/reload-skills

## Prompt 6

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

Genera un skill /commit

## Prompt 7

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

Crea un subagente adversial-reviewer

## Prompt 8

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

Crea un hook que formatee el frontend con Prettier

## Prompt 9

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

/priority-ticket FLOW-1

**Qué salió:** : Había instalado la extensión de Atlassian en mi IDE de desarrollo (Visual Studio Code) pero desde Claude Code CLI se reporte el error "No hay herramientas de Atlassian/Jira disponibles"

## Prompt 10

**Modelo:** claude-opus-5
**Herramienta:** Claude Code

Genera el fichero comparación.md indicado en README.md comparando el plan flow-1-quiet-shannon.md contra el plan rosy-tinkering-clarke.md





