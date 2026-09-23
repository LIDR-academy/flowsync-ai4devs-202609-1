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

## Prompts para crear el harness

## Prompt 1

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Analiza el contexto de los dos proyectos dentro de este repositorio con la funcionalidad /init para identificar tecnologías utilizadas, arquitecturas y convenciones en código y diseño. Adicionalmente, copia la información al archivo AGENTS.md y en CLAUDE.md agrega la referencia necesaria hacia el archivo AGENTS.md
```

**Qué salió:** Se generaron los archivos CLAUDE.md y AGENTS.md sin repetir el código, CLAUDE.md lee AGENTS.md, en el archivo AGENTS.md se especifica los puntos relevantes de ambos proyectos.

## Prompt 2

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Genera una regla especifica para el frontend en donde se siga una convención de colores basados en la pagina raiz actual.
```

**Qué salió:** Se generó la regla especifica en AGENTS.md, como observación se pretendía poner la regla en un archivo separado para evitar que AGENTS.md crezca por todas las reglas que puedan crearse.

## Prompt 3

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Mueve la regla para la convención de colores del frontend a un archivo separado con el objetivo que se utilice como parte una skill o instrucción y no como parte de todo el contexto del repositorio. Puedes generar un directorio ".agents/rules/frontend" en donde se colocará el archivo, importante agregar la referencia a estas carpetas/archivos en el AGENTS.md para indicar que se accede a ellos cuando la instrucción hace referencia a convenciones.
```

**Qué salió:** Se realiza el cambio de la información al nuevo archivo y se agrego la referencia en AGENTS.md


## Prompt 4

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Genera un hook antes de crear un nuevo componente visual en el frontend para verificar que se cumpla con la convencion de colores.
```

**Qué salió:** Me solicito la aprobación para user el skill update-config, me realizo otras solicitudes por permisos para acceso y creación de los archivos necesarios. Finalmente, se genero el archivo .js que valida la convención y un archivo settings.json que se encarga de la implementación de los hooks.


## Prompt 5

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Genera un hook para verificar la correcta conexión entre el frontend y backend al realizar algún cambio (modelos, servicios) en cualquiera de los dos proyectos.
```

**Qué salió:** Como respuesta se indicó que aun no existe conexión entre ambos proyectos, se presentaron opciones sobre lo que se podría aplicar en base a la instrucción pero no me convencieron debido a los posibles resultados y el consumo de tokens que se podría tener. Decidí abortar esta solicitud.


## Prompt 6

**Modelo:** Sonnet 5
**Herramienta:** Claude Code

```
Genera una regla/hook que después de la generación del código se encargue de realizar un testing sobre los cambios realizados y genera un informe sobre vulnerabilidades o problemas encontrados.
```

**Qué salió:** Me mostro un preview del cambio a settings.json (para hooks) y la solicitud de confirmación del ajuste. Tuve varios solicitudes por permisos. Finalmente, genero un nuevo archivo de reglas post-change-review.md e igual se explico el proceso de estas revisiones (resultado de problemas encontrados en archivo .md). 


## Encargo

Generar una pagina de inicio de sesión que contenga las opciones básicas: Registro y logueo.

**Criterios de aceptación:** 
- El usuario se puede registrar con una cuenta de correo y una contraseña.
- Si el correo ya está registrado, se debe mostrar un mensaje indicando que la cuenta ya existe.
- La contraseña debe tener mínimo 8 caracteres e incluir al menos una letra mayúscula, un número y un carácter especial.
- El usuario se puede loguear con su correo y contraseña, si es correcto es redirigido al home (base raíz actual).
- Si existe un error en las credenciales del usuario mostrar un mensaje de error.
- Tanto en el registro como en el logueo se debe verificar el formato del correo electrónico.
- Se debe validar que no existan campo nulos o vacíos en los formularios de registro e inicio de sesión.


## Prompts para el proyecto con harness (Después de ejecutar la petición)



## Prompts para el proyecto sin harness (Después de ejecutar la petición)

