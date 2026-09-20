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

## Prompt Template

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Este es el ejemplo. Bórralo.

El prompt va aquí dentro, entero y con sus saltos de línea,
para que se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

## Prompt 1

**Modelo:** Sonnet 5 High
**Herramienta:** Claude Code

```
ayudame a montar un harness para este proyecto con 2 piezas: 
* Una que oriente antes de que el agente actúe: un archivo de instrucciones en la raíz que el agente lee siempre sin que se lo pidas (CLAUDE.md), con las convenciones con las que se trabaja en este proyecto y con lo que está prohibido hacer. 
* Una que compruebe después: algo que se dispare solo cuando el agente termina de editar (formatear, pasar el linter, correr los tests), o un revisor al que le encargues leer con lupa lo que se acaba de escribir.
```

**Qué salió:** funcionó a la primera

## Prompt 1

**Modelo:** Sonnet 5 High - Modo Plan 
**Herramienta:** Claude Code

```
Entra en JIRA jblancodigital.atlassian.net, tablero FlowSync. 
Trabaja sobre el ticket de Jira FLOW-2. 

Consulta el ticket, analiza el proyecto y prepara un plan de implementación detallado y accionable. Identifica los cambios que serían necesarios, los archivos que prevés crear o modificar, las convenciones del proyecto que deben respetarse y cómo comprobarías que la tarea está correctamente resuelta. 

No implementes el plan ni modifiques ningún archivo. Si encuentras ambigüedades, dependencias o decisiones no resueltas en el ticket o en el proyecto, señálalas y explica cómo propones abordarlas.
```

**Qué salió:** creo el plan detallado y accionable