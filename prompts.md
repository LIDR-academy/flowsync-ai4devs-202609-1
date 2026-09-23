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

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
cd back into the working clone
```

---

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
help me build the harness in this working clone.  it must have memory (claude.md and agents.md) skills, hooks, subagents, MCPs and a Plan mode with permissions. Go step by step, respecting what's in the working clone because there might be already templates.
```

---

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/reload-plugins
```

---

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
I created the Jira ticket manually,check whether it is correct
```

---

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
I just created a new Jira ticket (FLOW-19) for this purpose, check
```

---

## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
I set the assignee to myself and added a description. continue
```

---

## Prompt 7

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
yes
```

---

## Prompt 8

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
cd /Users/menchule/programming_projects/flowsync-ai4devs-202609-1
```

---

## Prompt 9

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
/priority-ticket FLOW-19
```

**Qué salió:** leyó el ticket FLOW-19 por el MCP de Atlassian (solo una línea de descripción, sin criterios de aceptación) y devolvió un plan con archivos, convenciones, preguntas abiertas y riesgos, sin escribir código.

---

## Prompt 10

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
1. login, session restore and logout only. 2.plain fetch.
```

**Qué salió:** respondió a las preguntas abiertas 1 y 2 del plan; lanzó el subagente `adversarial-reviewer` sobre el plan, sin implementar todavía.

---

## Prompt 11

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Go ahead. UI language is Spanish
```

**Qué salió:** implementó el login en `frontend/` con las correcciones del revisor; `npm run build`, `npm run lint` y `prettier --check src` pasan. No lo probé contra el backend.

---

## Prompt 12

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
fill out the file prompts.md according to the instructions provided
```

**Qué salió:** rellenó este archivo, pero solo con los prompts de esa sesión; le faltaban los anteriores.

---

## Prompt 13

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
is there no way you can recover the prompts from the previous session?
```

**Qué salió:** los recuperó de `~/.claude/history.jsonl` y reconstruyó este archivo con ellos.

---

## Prompt 14

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
fill in the file prompts.md only with prompts typed today
```

**Qué salió:** limitó este archivo a los prompts de hoy (19 sep).
