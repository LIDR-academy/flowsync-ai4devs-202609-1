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

**Modelo:** Sonnet 5, medium effort
**Herramienta:** Claude Code

```
Implementa el ticket FLOW-4 del tablero FlowSync en Jira.
```

**Qué salió:** descartado. Lanzado en la copia pelada a las 00:08. El agente leyó el `README.md`, vio que el ejercicio pide comparar planes sin implementar, y se paró a preguntar por el alcance. Tenía razón: el prompt pedía implementar cuando no tocaba. Se repitió con el encargo correcto.

---

## Prompt 2

**Modelo:** Sonnet 5, medium effort
**Herramienta:** Claude Code

```
Coge el ticket de mayor prioridad asignado a mí en el tablero FLOW de Jira, en estado «Por hacer», y prepara el plan de implementación.

Pregunta primero qué tipos de work item existen en el espacio; no supongas los nombres. Lee el ticket entero: resumen, descripción y criterios de aceptación.

Antes de planificar, ve a buscar al código las respuestas que el ticket no da, en vez de inventarlas: reglas de validación, rutas y formato de la API, qué se devuelve al cliente, y qué hay montado ya en el frontend. Anota cada hueco y de dónde sacaste la respuesta.

Presenta el plan con: los archivos que vas a tocar, contados y nombrados, con qué va en cada uno; las decisiones que tomaste por tu cuenta porque el ticket no las cubría, y en qué te apoyaste para cada una; y lo que sigue sin estar claro.

No escribas código. Termina con el plan presentado.
```

**Qué salió:** corrida de la copia pelada, 00:20–00:25. Es el texto que lleva dentro la skill `/priority-ticket`, escrito a mano porque esa copia no la tiene. Plan de 5 archivos.

---

## Prompt 3

**Modelo:** Sonnet 5, medium effort
**Herramienta:** Claude Code

```
Decídelo tú.
```

**Qué salió:** única intervención de la copia pelada, ~00:22. Paró a preguntar si instalar `react-router-dom` o resolverlo con estado local. Respuesta deliberadamente vacía: el `CLAUDE.md` del otro lado ya cubre ese punto, y orientarla habría sido entregarle a mano lo que se estaba midiendo.

---

## Prompt 4

**Modelo:** Sonnet 5, medium effort
**Herramienta:** Claude Code

```
/priority-ticket
```

**Qué salió:** corrida con harness, 00:26–00:28. Cero intervenciones. Plan de 4 archivos.