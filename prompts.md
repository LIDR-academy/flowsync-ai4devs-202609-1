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

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Cada vez que te pida un prompt rellena correctamente el fichero prompts.md
```

**Qué salió:** registró la instrucción y empezó a anotar cada prompt en este fichero.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
¿qué capabilities hay construidas?
```

**Qué salió:** inventario del terreno existente: solo cuentas y autenticación (signup, login, perfil, logout); modelo de datos con `users` + `auth_access_tokens`, sin nada de tareas ni equipos.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
¿cómo es el modelo de datos actual?
```

**Qué salió:** detalle de las dos tablas (`users`, `auth_access_tokens`), su relación 1-N y cómo se mapean a modelos vía `database/schema.ts` generado.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
escribe el resumen del terreno en el documento de alcance
```

**Qué salió:** escribió el tramo 1 ("El terreno que ya existe") en `docs/prd/alcance-mvp-LF.md`, en 4 líneas.

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Pregunta antes de proponer las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance en una sola ronda. Tienes prohibido bajar al modelo de datos o a los endpoints.
```

**Qué salió:** devolvió 5 preguntas (dolor concreto, quién cobra el valor, qué significa "tiempo real", de dónde sale el estado y cómo se sostiene, y qué queda fuera / criterio de éxito) sin proponer nada ni bajar a datos o endpoints.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Estas son las respuestas; lo que no cubran, decídelo tú como supuesto: - Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.
- Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.
- Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.
- Qué reunión desaparece (respuesta honesta, no la vendas de más): la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.
- Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.
- Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.
- Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.
- "Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.
- Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.
- Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.
- Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Si la única respuesta fuera "sentirse informado", el tiempo real no valdría lo que cuesta.
- De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP: es otro producto, con integraciones y OAuth de terceros.
- Por qué se sostiene: no porque sea más agradable, sino porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo, la mira para decidir qué coge, y de paso deja de recibir interrupciones preguntándole cómo va. Si el beneficio fuera solo para los demás, no lo escribiría.
- Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar, no un detalle. La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio. Convivir exigiría doble actualización, que es como muere esta categoría.
- Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Un equipo que necesite eso no es nuestro usuario.
- "Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios. Lo mínimo para saber quién está en qué.
- Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento. La fecha, para ver de un vistazo qué se ha pasado de plazo.
- Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.
- Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo.
- Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva. Si la siguen haciendo igual, no funcionó.
- Cuánto construir: una vertical fina y usable de punta a punta, no el andamiaje amplio de un producto. Prefiero una capability terminada a tres a medias.
```

**Qué salió:** escribió el tramo 2 en el documento de alcance (las 5 preguntas con su respuesta condensada) y declaró 7 supuestos para lo que la ficha no cubre, señalando la tensión entre "sin campos obligatorios" y "una tarea necesita título, responsable, estado y fecha".

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Fuera del MVP deja: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas.
```

**Qué salió:** añadió la lista de exclusiones ya decididas al tramo 2 del documento de alcance, junto a las respuestas de la ficha.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Propón el alcance en cinco bloques, recortando agresivamente y justificando cada exclusión
```

**Qué salió:** escribió el tramo 3 (problema, usuarios, propuesta de valor, alcance y NO-alcance): 8 cosas dentro y 16 exclusiones, cada una con el porqué ligado a una hipótesis. Pendiente mi recorte.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quita el punto 8. Recorta el punto 4 de forma que las tareas las tenga que recoger uno mismo. Y quita el punto 7 también.
```

**Qué salió:** alcance de 8 a 6 cosas; los puntos 7 y 8 y la asignación a otros pasan al NO-alcance con su porqué. Señaló una incoherencia: quitar el punto 7 contradice la definición de "tiempo real" de la ficha y la propuesta de valor del propio documento.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Incluye nuevamente en el alcance el punto 7.
```

**Qué salió:** volvió a meter "ver los cambios sin refrescar" en el alcance (queda en 7 cosas) y lo quitó del NO-alcance; el documento vuelve a ser coherente con la definición de "tiempo real" y la propuesta de valor.

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
escribe las tres líneas de la Parte B en el documento
```

**Qué salió:** escribió las tres líneas (8 → 7; asignar a otros, marca de bloqueada y comentarios como exclusiones; "hace cuánto cambió" como la menos segura) y la nota 📌 sobre la incoherencia del punto 7.
