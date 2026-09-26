# Alcance MVP — FlowSync

## 1. El terreno que ya existe

- **Capabilities construidas:** solo cuentas y autenticación, de punta a punta (API AdonisJS + React): registro, login con token de acceso, ver el propio perfil y logout. Rutas protegidas y públicas en el frontend, sesión persistida en `localStorage`.
- **Modelo de datos:** dos tablas. `users` (`id`, `full_name` opcional, `email` único, `password` hasheado, timestamps) y `auth_access_tokens` (N por usuario, borrado en cascada). No hay tareas, equipos, estados, membresías ni roles.
- **Implicación para el alcance:** el "responsable" de una tarea puede ser un `User` existente, y el registro/login no hay que especificarlo. Todo lo de tareas (entidad, estados, lista, filtros, frescura) está por construir.
- **Huecos del terreno:** no hay tests (ni en backend ni runner en frontend) ni edición de perfil; nada de eso entra por defecto.

## 2. El interrogatorio

**P1. ¿Qué duele hoy?** La ronda de "¿en qué estás?" de la daily (la mitad de sus 15 min) y las preguntas constantes por chat: nadie ve el estado del equipo sin interrumpir a alguien. Episodio: dos personas tocaron el mismo módulo la misma semana sin saberlo, dos días perdidos. La daily no desaparece entera: la parte de bloqueos sigue y este MVP no la resuelve.

**P2. ¿Quién es el usuario y quién cobra el valor?** Los pares de un equipo remoto pequeño (3–10 personas), no un lead: no hay reporte hacia arriba. Roles planos: todos ven y editan lo mismo. Caso de estudio: equipo SaaS de 6 personas en 3 husos horarios, con gestor pesado y daily por videollamada. Un único espacio compartido, sin entidad "equipo".

**P3. ¿Qué es "tiempo real"?** Ver los cambios de estado de las tareas sin refrescar ni preguntar. Frescura de la tarea, no presencia de la persona: nada de "quién está conectado" (es vigilancia). Resumen que espera, no aviso que interrumpe: "llego o vuelvo de una reunión y veo qué se ha movido". Decisión que cambia: no empezar algo que otro ya toca y elegir lo siguiente sabiendo qué está libre.

**P4. ¿De dónde sale el estado y por qué se mantiene?** Lo teclea quien hace la tarea, en dos clics sobre una lista ya abierta. Quien lo escribe cobra en el momento: la lista es su cola de trabajo y deja de recibir interrupciones. Que se quede vieja es el riesgo #1 a validar; la mitigación es el coste mínimo, no la obligación.

**P5. ¿Frontera y éxito?** Sustituye al gestor de tareas, no convive con él (crea las tareas, no las lee de otro sitio). Una tarea tiene título, responsable, estado y fecha de vencimiento; la lista se filtra por estado. Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes. Éxito a una semana: el equipo cancela la ronda de "¿en qué estás?" y nadie pide que vuelva.

**Fuera del MVP, ya decidido:** notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting y comentarios en tareas.

### Supuestos (decididos por la IA donde la ficha no llega)

- **S1. Solo el título es obligatorio.** Responsable, fecha y estado admiten vacío o valor por defecto, para no chocar con "sin campos obligatorios". *Tensión a revisar:* la ficha pide los cuatro campos y a la vez ninguno obligatorio.
- **S2. Una tarea sin responsable es una tarea libre.** Es la forma más barata de responder a "qué está libre".
- **S3. Un solo responsable por tarea.** Nada de co-asignación.
- **S4. Estados fijos y pocos** (por hacer / en curso / hecha), no configurables: configurar flujos es justo el "rollo de Jira".
- **S5. "Qué se ha movido" se ve en la propia lista**, que refleja los cambios al momento y deja ver qué cambió hace poco; no hay histórico ni registro de actividad.
- **S6. Entrar al espacio es registrarse.** Todo usuario registrado pertenece al espacio único; sin invitaciones ni aprobación.
- **S7. Multi-equipo y pertenencia a varios equipos quedan fuera**, anotados como supuesto y no construidos.

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve en qué está cada uno sin preguntarlo. Se paga en la ronda de "¿en qué estás?" de la daily (la mitad de sus 15 min), en interrupciones por chat y en trabajo duplicado: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días.

### Usuarios

Los pares de un equipo remoto de 3–10 personas, con roles planos y sin reporte hacia arriba. Caso de estudio: equipo SaaS de 6 personas en 3 husos horarios. Quien actualiza el estado y quien lo consulta son las mismas personas.

### Propuesta de valor

Una lista de tareas compartida que es a la vez la cola de trabajo de cada uno: actualizar el estado cuesta dos clics y los demás lo ven sin refrescar ni preguntar. Antes de empezar algo, sabes si otro ya lo está tocando y qué queda libre.

### Alcance (propuesta de la IA: 8 cosas · tras mi recorte: 7)

1. **Una lista única de tareas** del espacio compartido, visible y editable por cualquier usuario registrado.
2. **Crear una tarea escribiendo solo el título**, desde la propia lista.
3. **Cambiar el estado en dos clics como máximo**, entre tres estados fijos: por hacer, en curso y hecha.
4. **Coger una tarea uno mismo** (y soltarla) desde la lista. Nadie asigna tareas a otros; una tarea sin responsable es una tarea libre.
5. **Fecha de vencimiento opcional**; las vencidas y no hechas se distinguen a simple vista.
6. **Filtrar la lista por estado.**
7. **Ver los cambios de los demás sin refrescar** mientras la lista está abierta.

### NO-alcance (y por qué cada exclusión)

- **Asignar tareas a otra persona.** Cada uno coge lo suyo: el responsable es quien de verdad está en la tarea, no a quien se la endosaron. Asignar a otros reintroduce un reparto desde arriba que este equipo de pares no tiene.
- **"Hace cuánto cambió" cada tarea.** Recorte mío. Es una ayuda para leer lo que se ha movido, no para decidir qué coger; el estado y el responsable ya responden a eso.
- **Feed de actividad, histórico o resumen "desde tu última visita".** La hipótesis es que una lista fresca basta para no pisarse; el punto 8 lo cubre por lo barato. Un feed valida otra cosa: que la gente lee lo que pasó.
- **Presencia, "quién está conectado" e indicadores de actividad.** Rechazados a propósito: el estado es de la tarea, no de la persona, y esto es vigilancia.
- **Notificaciones push, emails, resúmenes diarios por correo y recordatorios de vencimiento.** La señal es un resumen que espera, no un aviso que interrumpe; cualquier aviso contradice la propuesta de valor.
- **Integración con Slack.** La lista tiene que ser el sitio donde se mira; llevar el estado a Slack prueba que se mira en otro sitio.
- **Estado derivado de Git/PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. La hipótesis es que teclearlo a mano es sostenible si cuesta dos clics.
- **Importar tareas de otro gestor.** Facilita la migración, pero no valida que el estado se mantenga fresco. El equipo de estudio puede empezar con sus tareas en curso tecleadas a mano.
- **Roles y permisos, invitaciones, varios equipos o espacios.** Son roles planos y un espacio único; ninguna de estas cosas dice nada sobre si se deja de preguntar "¿en qué estás?".
- **Comentarios, descripción larga, adjuntos y subtareas.** La tarea es una señal de estado, no el sitio de la conversación. Cada campo más sube el coste de crear y actualizar.
- **Marcar una tarea como bloqueada.** La parte de bloqueos de la daily sigue existiendo y este MVP no la resuelve (ficha). Meterla a medias difumina el criterio de éxito.
- **Etiquetas, prioridades, proyectos, sprints, estimaciones, épicas, backlog priorizado.** Es el rollo de Jira del que huimos. Un equipo que lo necesite no es nuestro usuario.
- **Estados configurables y flujos de trabajo.** Configurar es justo el coste que la propuesta promete quitar.
- **Varios responsables por tarea.** Complica la pregunta "¿quién está en esto?", que es la que hay que responder de un vistazo.
- **Filtrar por persona, buscar y ordenar a medida.** Con 3–10 personas y el filtro por estado, la lista cabe en una pantalla. Si no cabe, es la primera candidata a entrar.
- **Borrar tareas y papelera.** Una tarea que sobra se marca como hecha; borrar no ayuda a validar la frescura del estado.
- **Informes, analítica y métricas del equipo.** No hay reporte hacia arriba y a ningún manager le importa.
- **Editar el perfil, recuperar contraseña, app móvil y modo sin conexión.** Son andamiaje de producto, no parte de la vertical que valida la hipótesis.

---

## Parte B: las tres líneas

1. **Los dos números:** la IA propuso 8 cosas dentro del alcance; tras mi recorte quedaron 7.
2. **Tres cosas que dejé fuera:**
   - *Asignar tareas a otra persona*: no ayuda a validar que el estado lo mantiene quien hace el trabajo. Si otro me asigna, el responsable deja de ser una señal de "quién está de verdad en esto".
   - *Marcar una tarea como bloqueada*: no ayuda a validar la hipótesis de éxito, que es cancelar la ronda de "¿en qué estás?". Los bloqueos siguen en la daily, y mezclarlos no deja ver si lo que funcionó fue la visibilidad.
   - *Comentarios en tareas*: no ayudan a validar que actualizar cuesta dos clics. Convierten la tarea en conversación, suben el coste de mantenerla y compiten con el chat en vez de quitar interrupciones.
3. **La exclusión de la que menos segura estoy:** "hace cuánto cambió cada tarea". Chocan dos cosas: la ficha pide "llego por la mañana o vuelvo de una reunión y veo qué se ha movido", y lo que queda en el alcance (ver cambios sin refrescar) solo sirve con la lista abierta. Al volver veo el estado actual, pero no qué se ha movido. Entraría si en la semana de uso la gente sigue preguntando "¿qué ha cambiado desde ayer?" aunque la lista esté al día.

📌 **La IA me señaló una incoherencia y tenía razón.** Recorté "ver los cambios sin refrescar", pero el propio documento define "tiempo real" así y lo promete en la propuesta de valor: prometía algo que su alcance impedía cumplir. Lo volví a meter.
