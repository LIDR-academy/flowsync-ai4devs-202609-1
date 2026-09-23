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
**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

❯ muestra el tiquet de jira con còdigo FLOW-1

todo correcto , a la primera muestra detalle:
FLOW-1: Implementar login en el fronted
https://guaitel.atlassian.net/browse/FLOW-1
...


## Prompt 2

**Modelo:** Claude Sonnet 5
**Herramienta:** Claude Code

```
en la pagina principal, debemos tener una sección los tiquets prioritarios en jira
```

funcionó a la primera, me preguntó si queria obtener los tickets via la api de Jira, 
le indiqué que los obtubiera via el MCP d claude clode, los bajó y los guardó en un json.


## PRompt 3
**Modelo:** Claude Sonnet 5 Medium
**Herramienta:** Claude Code
```
crea una skill priority-ticket
```
crea skill.md dentro de \skills\priority-ticket

`
## PRompt 4
**Modelo:** Claude Sonnet 5 Medium
**Herramienta:** Claude Code
```
crea una skill commit
```
crea skill.md dentro de \skills\commit

## Prompt 5

un hook que formatea el frontend con Prettier

ha aplicado diferents cambios en el codigo, pero o visualizo nada diferente en el front a nivel de UI