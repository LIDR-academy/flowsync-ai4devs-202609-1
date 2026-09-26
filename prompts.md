# Prompt 1

"Actúa como un Product Manager. El requerimiento inicial del cliente es este:
«Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira.»

Antes de empezar a definir el MVP o el alcance, necesito que analices el código actual de este repositorio. Resúmeme en 3 a 5 líneas qué capabilities (funcionalidades) ya existen construidas y cómo es el modelo de datos actual. Escribe este resumen en el archivo docs/prd/alcance-mvp-tc.md bajo el título '1. El terreno que ya existe'."

# Promp 2

"Ahora necesitamos acotar el alcance del MVP. Escribe las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance.

Reglas estrictas para ti:

Acota a una sola ronda. No me hagas repreguntas.

Tienes PROHIBIDO preguntar sobre el modelo de datos, endpoints o arquitectura. Enfócate solo en producto y usuarios.

Para agilizar, aquí te entrego la ficha de hechos con las definiciones de producto ya decididas. Úsalas para responder a tus propias preguntas. Si alguna de tus preguntas no se responde con esta ficha, toma tú la decisión que consideres mejor, pero márcala explícitamente como un 'SUPUESTO' al final de tu respuesta.

Ficha de hechos:

Qué duele hoy: la daily de sincronización y el "¿en qué estás?" constante por Slack/chat. Nadie ve el estado del equipo sin interrumpir a alguien.

Quién cobra el valor: los pares, no un lead. No hay reporte hacia arriba y a un manager le daría igual. Duele a los dos devs que descubren tarde que iban a lo mismo, y al que interrumpe a otro para preguntar.

Episodio concreto: dos personas del equipo tocaron el mismo módulo la misma semana porque una empezó sin que la otra lo supiera. Dos días perdidos.

Qué reunión desaparece: la daily NO desaparece entera. Desaparece la ronda de "¿en qué estás?", que hoy se come la mitad de los 15 minutos. La parte de bloqueos sigue, y este MVP no la resuelve.

Usuarios / equipo: equipos remotos pequeños, 3–10 personas. Roles planos: en el MVP todos ven y editan lo mismo, sin jerarquía de permisos.

Primer usuario concreto: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada. Es un CASO DE ESTUDIO, no un cliente real.

Fronteras: un espacio único compartido, sin entidad "equipo". Varios equipos separados, o gente en más de uno, queda FUERA del MVP: se anota como supuesto en el PRD, no se construye.

"Tiempo real" = ver los cambios de estado de las tareas sin refrescar ni preguntar. NO es chat, NO es videollamada, NO es colaboración simultánea sobre el mismo documento.

Es frescura, no presencia: el estado es de la TAREA, no de la persona. Nada de "quién está conectado ahora" ni indicadores de actividad; eso es vigilancia y lo rechazamos a propósito.

Forma de la señal: resumen que espera, no aviso que interrumpe. El caso es "llego por la mañana o vuelvo de una reunión y veo qué se ha movido". Sin notificaciones push.

Qué decisión cambia: no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre.

De dónde sale el estado: lo teclea la persona que hace la tarea, en segundos. Derivarlo de señales externas (Git/PRs, CI, calendario) está FUERA del MVP.

Por qué se sostiene: porque son dos clics sobre una lista ya abierta, sin campos obligatorios, sin decidir sprint ni estimación. Y quien lo escribe cobra en el momento: esa misma lista es su cola de trabajo.

Si la información se queda vieja: el producto pierde el sentido, y lo asumo. Es el riesgo #1 a validar. La mitigación es que actualizar cueste dos clics, no obligar a nadie.

Es donde se hace el trabajo, no donde se cuenta: sustituye al gestor de tareas, no convive con él. FlowSync crea las tareas, no lee las de otro sitio.

Renuncia explícita a sprints, estimaciones, épicas, backlog priorizado e informes.

"Menos rollo que Jira" = crear una tarea y cambiarle el estado en segundos, sin flujos de configuración ni campos obligatorios.

Qué necesita una tarea en el MVP: título, responsable, estado y fecha de vencimiento.

Cómo se consume la lista: filtrando por estado, para centrarse en lo pendiente.

Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily.

Criterio a una semana de uso real: que el equipo cancele esa ronda y nadie pida que vuelva.

Cuánto construir: una vertical fina y usable de punta a punta.

Fuera del MVP: notificaciones push, integración con Slack, roles/permisos avanzados, analítica/reporting, comentarios en tareas."

# prompt 3

"Perfecto. Basándote en la ficha de hechos, tus preguntas y los supuestos declarados, redacta la propuesta del MVP.

Estructúrala estrictamente en estos 5 bloques:

Problema

Usuarios

Propuesta de valor

Alcance (Features que entran)

NO-alcance (Exclusiones justificadas)

Reglas críticas para esta redacción:

Sé extremadamente agresivo recortando el alcance. Si algo no es vital para validar la hipótesis de éxito en una semana, envíalo al NO-alcance.

En el bloque 'NO-alcance', debes justificar por qué excluyes cada cosa (basado en producto y validación, no en falta de tiempo).

TIENES ESTRICTAMENTE PROHIBIDO incluir tablas de base de datos, endpoints de API, diagramas de arquitectura, casos de uso extensos o requisitos técnicos numerados. Mantente en un nivel de producto y de experiencia de usuario.

Añade esto al archivo docs/prd/alcance-mvp-tc.md bajo el título '3. Alcance del MVP'."