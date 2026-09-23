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
Necesitamos trabajar con el front-end de la aplicacion que esta implementado con: React 19 + Tailwind + shadcn/ui.
La primera tarea es implementar el flujo de sing-up y login. El backend de auth ya se encuentra implementado.
Sabes si haz tenido existo si:
 - Si un usuario es nuevo llama a sign-up al POST /api/v1/auth/signup para crear su perfil.
 - Si un usuario hace login llama al POST /api/v1/auth/login
 - Tras el login, el sistema carga el profile usando llamada a /api/v1/account/profile .
 - tras un logout el sistema llama a /api/v1/account/logout .
 - La página debe mostrar una barra de estado en la parte superior. Si el usuario está logueado debe mostrar el su nombre.
 - La página debe mostrar una barra de estado en la parte superior. Si un usuario no está logueado debe mostrar un botón para hacer login.
 - Si un usuario intenta interactuar con el contador y no está logueado debe aparecer el modal para logear o sign up.

 No hay que cambiar el backend el auth ya existe. Trata de usar componentes que ya existen en shadcn en ves de crear algo nuevo y justifica la necesidad de instalarlos.
 Revisa los validadores de backend y las schemas antes de asumir como crear un formulario para sign-up
```

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
Necesitamor realizar un code review de un nivel staff engineer. 
Realiza un git diff y analiza los cambios realizados, se critico y sigue las mejores practicas de codigo y realiza un code review tratando de mejorar y encontrar errores que necesitan ser corregidos.
La tarea que estamos revisando necesitba implementar un flujo de sing up y login. Los cambios solo deben ser realizados en el front-end.
Tu respuesta tiene que ser un markdown que pueda ser utilizado como prompt para la implementacion de los fix. Justifica tus comentarios.
```

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
Escribe el markdow de review en un archivo que pueda ser utilizado para leer y aplicar los cambios a nivel raiz, nombralo code-review-hardening.md
```

## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
Hemos trabajado en los cambios que puedes encontrar con el git diff y a la ves recibido el code review que puedes encontrar en el archivo  '/Users/emmanuel/Documents/lidr/flowsync-ai4devs-202609-1/code-review-hardening.md'.
Lee los cambios y sus prioridades y si el cambio es necesario analizandolo como otro staff engineer aplica los cambios necesrios para cubrirlos.
Sabremos que hemos terminando cuando los cambios aplicados cubran las mejores practicas, errores y problemas de seguridad y los criterios de aceptacion de la story orignal no se rompan.
No debemos de quebrar los aceptance criteria que nos fueron otorgados orignalmente
```

## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code
```
escribe el archivo en raiz code-review-skiped.md con lo descartado de el code review, aquello que rechazaste para poder tener esa informacion en ese archivo para analizarlo                                                           
```
**Qué salió:** El prompt inicial obtuvo el resultado funcional, pero una vez que se le pidio realizar un analisis jugando el rol de un staff architect si encontro al menos 10 cosas por mejorar de las cuales si encontro cambio que eran bloqueantes y mejoras en el codigo.
