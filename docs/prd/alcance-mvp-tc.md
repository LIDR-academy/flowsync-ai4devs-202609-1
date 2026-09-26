# 1. El terreno que ya existe

Hoy FlowSync solo tiene la capa de identidad: registro, login con token Bearer, logout y consulta del perfil autenticado (API `/api/v1` + pantallas de login, registro y perfil en el frontend). No hay equipos, tareas, actividad compartida ni nada en tiempo real; el producto aún no cubre el problema de sincronización remota que pide el cliente. El modelo de datos se limita a `users` (id, full_name, email, password, timestamps) y `auth_access_tokens` (token opaco ligado al usuario, con hash, abilities y caducidad). En la práctica, el “terreno” es un esqueleto de cuenta de usuario listo para construir encima el dominio colaborativo.

# 2. Preguntas que acotan el MVP (y respuestas)

## 1. ¿Quién siente el dolor y qué decisión concreta cambia si FlowSync existe?

Duele a los pares (devs/producto), no a un manager: el coste es redescubrimiento tardío de solapes y las interrupciones de «¿en qué estás?». La decisión que debe cambiar es no empezar algo que otra persona ya está tocando, y elegir lo siguiente sabiendo qué está libre. Episodio a evitar: dos personas del mismo módulo la misma semana porque una empezó sin que la otra lo supiera (dos días perdidos).

## 2. ¿Qué ritual desaparece y cómo medimos éxito a una semana?

No desaparece la daily entera: solo la ronda de «¿en qué estás?», que hoy se come ~mitad de los 15 minutos. La parte de bloqueos sigue y este MVP no la resuelve. Éxito de usuario = dejar de hacer esa ronda. Criterio a una semana de uso real: el equipo la cancela y nadie pide que vuelva.

## 3. ¿Qué significa «tiempo real» para este producto, y qué forma tiene la señal?

Tiempo real = ver cambios de estado de las **tareas** sin refrescar ni preguntar. No es chat, no es videollamada, no es coedición, no es presencia («quién está conectado»). Es frescura del estado de la tarea. La señal es un resumen que espera (llego por la mañana / vuelvo de una reunión y veo qué se ha movido), sin notificaciones push.

## 4. ¿De dónde sale el estado, por qué se mantiene fresco, y sustituye o convive con el gestor actual?

Lo teclea quien hace la tarea, en segundos (dos clics sobre una lista ya abierta, sin campos obligatorios pesados ni sprint/estimación). Derivarlo de Git/PRs/CI/calendario queda fuera. FlowSync es donde se hace el trabajo: crea las tareas y sustituye al gestor pesado; no lee las de otro sitio. Riesgo #1 asumido: si la info se queda vieja, el producto pierde sentido; la mitigación es que actualizar cueste dos clics, no obligar a nadie.

## 5. ¿Quiénes son los usuarios, qué necesita una tarea, cómo se consume la lista, y qué queda explícitamente fuera?

Usuarios: equipos remotos pequeños (3–10), roles planos — todos ven y editan lo mismo. Primer usuario: caso de estudio de 6 personas de producto SaaS en 3 husos, con gestor pesado + daily de 15 min. Frontera de espacio: un único espacio compartido, sin entidad «equipo»; varios equipos o pertenencia múltiple queda fuera. Una tarea necesita título, responsable, estado y fecha de vencimiento. La lista se consume filtrando por estado (centrarse en lo pendiente). Fuera del MVP: notificaciones push, Slack, roles/permisos avanzados, analítica/reporting, comentarios, sprints, estimaciones, épicas, backlog priorizado e informes. Alcance de construcción: una vertical fina usable de punta a punta. «Menos rollo que Jira» = crear tarea y cambiar estado en segundos, sin flujos de configuración.

## SUPUESTOS (decisiones tomadas donde la ficha no cierra)

- **Estados de tarea:** tres valores fijos — `pendiente`, `en curso`, `hecho`. Sin workflows configurables.
- **Responsable:** un único usuario asignado por tarea; debe ser alguien ya registrado en el espacio.
- **Fecha de vencimiento:** siempre presente al crear (el MVP la trata como dato necesario, no opcional).
- **Espacio único = todos los usuarios de la app** en este MVP (no hay invitaciones ni multi-tenant): quien se registra entra al mismo espacio compartido.
- **Sin archivo ni borrado duro en el primer corte:** las tareas hechas siguen visibles bajo el filtro `hecho`; no hay papelera.
- **Sin ordenación manual ni prioridades:** el filtro por estado es la única lente; dentro de cada estado, orden por actualización reciente (refuerza «qué se ha movido»).

# 3. Alcance del MVP

## Problema

En equipos remotos pequeños, nadie ve en qué está el resto sin interrumpir. La daily se come la mitad del tiempo en la ronda de «¿en qué estás?» y, entre dailies, Slack/chat tapa el mismo hueco con pings. El fallo concreto: dos personas tocan el mismo módulo la misma semana porque una empezó sin que la otra lo supiera — días perdidos que se habrían evitado con una señal compartida y fresca del trabajo en curso. FlowSync no pretenderá arreglar bloqueos ni coordinación profunda: solo el vacío de «quién está tocando qué» que hoy se resuelve hablando.

## Usuarios

Pares de equipos remotos de 3–10 personas, roles planos, varios husos. Quien cobra el valor es quien hace el trabajo (elige qué empezar, evita solapes e interrupciones), no un lead ni un manager. Primer usuario: caso de estudio de 6 personas de producto SaaS en 3 husos, hoy atadas a un gestor de tareas pesado y a una daily de 15 minutos. En el MVP todos ven y editan lo mismo, dentro de un único espacio compartido (sin entidad «equipo»).

## Propuesta de valor

Una lista compartida de tareas que es a la vez cola de trabajo personal y radar del equipo: abres FlowSync al llegar o al volver de una reunión, ves qué se ha movido, y decides sin preguntar. Actualizar cuesta dos clics; no hay notificaciones que interrumpan. Hipótesis a validar en una semana de uso real: el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. Si la lista se queda vieja, el producto falla — y eso es exactamente lo que este MVP debe poner a prueba.

## Alcance (Features que entran)

Vertical mínima de punta a punta, nada más:

- **Cuenta:** registro, acceso y salida (ya existe; es el suelo para saber quién es el responsable).
- **Lista compartida única:** todas las personas del espacio ven las mismas tareas.
- **Crear tarea en segundos:** título, un responsable, estado (`pendiente` / `en curso` / `hecho`) y fecha de vencimiento — sin más campos.
- **Cambiar estado en dos clics** (y corregir título, responsable o vencimiento si hace falta): es el gesto que mantiene la frescura y la cola de trabajo.
- **Filtrar por estado** para centrarse en lo pendiente / en curso / hecho.
- **Orden por lo más recientemente actualizado** dentro del filtro: la señal de «qué se ha movido» sin avisos.
- **Frescura sin refrescar a mano:** los cambios de estado de las tareas aparecen en la lista de quien mira, sin preguntar ni recargar.

Eso es todo lo necesario para que alguien, al llegar, sepa qué no tocar y qué está libre — y para medir si la ronda de la daily muere sola.

## NO-alcance (Exclusiones justificadas)

Excluido porque no valida (o distrae de) la hipótesis de una semana:

- **Ronda de bloqueos / resolución de impedimentos:** el dolor a validar es «¿en qué estás?», no la parte de la daily que el equipo quiere conservar.
- **Presencia, «quién está conectado», indicadores de actividad:** es vigilancia; la señal es el estado de la **tarea**, no de la persona. Lo rechazamos a propósito.
- **Notificaciones push (y cualquier aviso que interrumpa):** el caso de uso es un resumen que espera al abrir la lista; empujar atención rompe ese contrato y no hace falta para cancelar la ronda.
- **Integración con Slack (u otros chats):** el valor debe vivir en FlowSync como lugar de trabajo; si el equipo sigue preguntando por Slack, la hipótesis ya falló — no se mitiga enchufando otro canal.
- **Convive con Jira/otro gestor; importar o espejar tareas externas; derivar estado de Git/PRs/CI/calendario:** el MVP sustituye al gestor, no lo acompaña. Si el estado no lo escribe quien hace la tarea, no aprendemos si «dos clics» sostiene la frescura (riesgo #1).
- **Varios espacios / entidad «equipo» / pertenecer a más de un equipo:** multiplica configuración y permisos sin aportar a un caso de estudio de un solo equipo; queda anotado como supuesto, no se construye.
- **Roles, permisos, vistas de manager, informes y analítica:** el comprador del valor son los pares; reportar hacia arriba no cambia la decisión de «qué empiezo hoy» ni ayuda a matar la ronda.
- **Comentarios, hilos, chat o videollamada dentro del producto:** son coordinación rica; el MVP solo necesita una señal de estado, no un lugar para discutir.
- **Sprints, estimaciones, épicas, backlog priorizado, etiquetas, subtareas, descripciones largas, adjuntos:** es el «rollo Jira» que el cliente quiere evitar; ninguno es vital para ver solapes y elegir lo siguiente.
- **Prioridades y ordenación manual:** el filtro por estado + lo recién actualizado basta para la decisión; priorizar es un segundo problema.
- **Archivar, papelera, borrado:** las hechas viven bajo el filtro `hecho`; gestionar ciclo de vida no valida la hipótesis de la primera semana.
- **Recordatorios de vencimiento, búsquedas avanzadas, personalización de flujos/estados:** comodidades post-validación; el vencimiento en la tarjeta ya orienta sin sistemas de aviso ni workflows.


## Parte B: Decisiones y recortes

1. **Los números:** La IA propuso 7 funcionalidades dentro del alcance, y yo dejé 7 (el prompt fue lo bastante estricto para que no alucinara de más).
2. **Tres descartes clave:** 
   - *Notificaciones push:* Descartado porque rompe la premisa de "resumen que espera" y no es necesario para cancelar la ronda de la daily.
   - *Integración con Slack:* Descartado porque si el equipo lo sigue usando para preguntar estado, la hipótesis de la app ya falló.
   - *Roles/Vistas de manager:* Descartado porque el valor lo cobran los pares para no pisarse el trabajo, el manager no aporta a la validación de esta semana.
3. **Mi mayor duda:** *(Aquí escribe tú: ¿Qué exclusión te duele más o crees que los usuarios van a echar de menos el día 1? Por ejemplo, ¿no poder borrar tareas hechas? ¿no tener comentarios? Sé totalmente honesto).*