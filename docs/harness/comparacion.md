# Comparación con y sin harness — FLOW-2

## Alcance de la comparación

Se lanzó el mismo encargo sobre las dos copias del proyecto y ambas ejecuciones se detuvieron al
terminar el plan, sin implementar la tarea. Por tanto, cuando este documento habla de archivos
«tocados» se refiere a los archivos que cada agente **propuso crear, modificar o eliminar**, no a
cambios aplicados realmente en el repositorio.

Fuentes utilizadas:

- `plan-con-harness.md`
- `plan-sin-harness.md`
- `CLAUDE.md`, únicamente para contrastar las convenciones escritas en la copia con harness

## Resumen

| Aspecto | Con harness | Sin harness |
|---|---:|---:|
| Archivos propuestos | 26 obligatorios, 27 con el README opcional | 20 |
| Archivos nuevos | 15 | 11 |
| Archivos modificados | 6 | 5 |
| Archivos eliminados | 5 | 4 |
| Intervenciones necesarias | 3 | 0 |
| Pruebas frontend propuestas | Sí, con Vitest y Testing Library | No |
| Cambios en backend | 0 | 0, salvo un test opcional mencionado |

## 1. Archivos que propuso tocar

### Con harness

**Total: 26 archivos obligatorios**: 15 nuevos, 6 modificados y 5 eliminados. El total subiría a
27 si se aplicase también la modificación opcional del README.

### Sin harness

**Total: 20 archivos**: 11 nuevos, 5 modificados y 4 eliminados.

## 2. Convenciones del proyecto

La comparación solo puede comprobar si los planes **reconocen y se proponen respetar** las
convenciones. Como no hubo implementación, todavía no se puede verificar el código resultante.

### Con harness

La copia disponía de convenciones explícitas en `CLAUDE.md`.

#### Respetadas en el plan

1. **Componentes funcionales con hooks y TypeScript estricto.** Propone componentes funcionales,
   un contexto de autenticación y hooks; no introduce componentes de clase.
2. **Comillas simples y ausencia de punto y coma.** Reconoce expresamente el estilo y deja el
   formateo en manos de Prettier y del hook.
3. **Uso de oxlint sin excepciones.** Separa contexto, provider y hook para respetar
   `react/only-export-components`, y mantiene `rules-of-hooks`.
4. **No tocar el backend en una tarea de frontend.** Determina que la API ya cubre el caso y
   propone cero cambios de backend.
5. **No añadir dependencias sin preguntar.** Las dependencias de Vitest y Testing Library se
   incluyen después de una decisión explícita del usuario.
6. **Variables de entorno en los archivos previstos.** Propone `frontend/.env.example` para
   documentar `VITE_API_URL`, sin commitear un `.env` real.
7. **Conventional commits en inglés.** Propone mensajes como
   `feat(frontend): add login flow for FLOW-2`.
8. **No commitear secretos ni bases de datos.** Identifica `backend/tmp/db.sqlite3` y los `.env`
   como elementos que no deben entrar en el cambio.
9. **No saltarse los hooks.** Indica expresamente que no debe usarse `--no-verify` ni desactivarse
   la configuración cuando un check falle.
10. **Revisión con `adversarial-reviewer`.** La incluye antes de dar por terminada una futura
    implementación.
11. **Respetar el scaffold existente.** Revisa primero qué ofrece el backend y reutiliza el
    contrato de autenticación en lugar de reconstruirlo.
12. **Convenciones del backend.** Reconoce que `snake_case` aplica al backend y no lo traslada
    incorrectamente a los componentes del frontend.

#### No respetadas

No se observa en el plan un incumplimiento demostrable de una convención escrita en `CLAUDE.md`.
Las reglas sobre revisión del diff, ejecución de hooks y cierre de una implementación todavía no
eran comprobables porque el ejercicio se detuvo antes de modificar archivos.

### Sin harness

Esta copia no tenía `CLAUDE.md`, `AGENTS.md` ni otra guía equivalente con las convenciones de
proceso. Sí contenía configuración técnica y código existente, de los que el agente dedujo varias
reglas.

#### Respetadas o deducidas del repositorio

1. **TypeScript estricto.** Lee `tsconfig.app.json` y contempla `verbatimModuleSyntax`,
   `erasableSyntaxOnly` y las reglas de elementos no utilizados.
2. **Reglas de oxlint.** Identifica `rules-of-hooks` y `react/only-export-components` y organiza
   los archivos para cumplirlas.
3. **Estilo existente del frontend.** Deduce comillas simples, ausencia de punto y coma,
   indentación a dos espacios y componentes en `PascalCase`.
4. **Componentes funcionales.** Mantiene el patrón de función y `export default` de `App`.
5. **Separación frontend/backend.** Concluye correctamente que el backend ya ofrece login,
   perfil y logout, y plantea implementar la historia en el frontend.
6. **Sin dependencias innecesarias.** Evita React Router, librerías de formularios, de estado y de
   interfaz.
7. **Reutilización del CSS existente.** Conserva las variables y el modo oscuro presentes en
   `index.css`.
8. **Variables de entorno.** Propone documentar `VITE_API_URL` en `.env.example` y usar
   `.env.local` para la configuración local.
9. **Contrato real de la API.** Respeta el envoltorio `{ data }`, los errores y el token Bearer
   obtenidos al inspeccionar el backend.

#### No respetadas o no garantizadas

1. **No había convenciones escritas de proceso.** La copia no disponía de instrucciones sobre
   conventional commits, prohibiciones de Git, hooks, revisión adversarial o tratamiento del
   árbol de trabajo sucio; por tanto, no podía garantizar su cumplimiento aunque dedujese alguna.
2. **Pruebas de frontend.** El plan decide no incorporarlas porque el proyecto no tiene runner.
   Sustituye esa cobertura por comprobaciones manuales, por lo que la regresión del login no queda
   automatizada.
3. **Límite frontend/backend.** Aunque su decisión principal es no tocar backend, propone como
   alternativa un test funcional de backend. Antes de presentar el plan al equipo habría que
   eliminar esa contradicción o justificarla.
4. **Revisión adversarial y hooks del harness.** No los menciona porque no existían en esta copia;
   no es un fallo del agente, sino una diferencia del entorno disponible.

## 3. Intervenciones necesarias

### Con harness — 3

El agente pidió aclarar tres decisiones antes de cerrar el plan y fue necesario responderlas:

1. Si debía incluirse un botón mínimo de «Cerrar sesión».
2. Si podía añadir Vitest y Testing Library como dependencias de desarrollo.
3. Si el token debía conservarse en `localStorage`.

### Sin harness — 0

El agente generó el plan sin solicitar aclaraciones. Algunas decisiones quedaron como propuestas
pendientes de confirmación —por ejemplo, incluir el cierre de sesión—, pero no fue necesario
intervenir para que entregase el plan.

## 4. Qué habría que arreglar a mano antes de enseñarlo al equipo

### Con harness

1. **Reducir o justificar el alcance.** El plan llega a 26 archivos para una pantalla de acceso.
   Habría que confirmar que la infraestructura de tests, la eliminación de todos los assets y la
   separación en tantos módulos compensan el tamaño del cambio.
2. **Cerrar la compatibilidad de herramientas.** El propio plan deja pendiente comprobar Vitest
   con Vite 8 y TypeScript 6. No presentaría la propuesta como ejecutable hasta resolverlo.
3. **Eliminar la opción ambigua del README.** Decidir si forma parte del ticket o de otro cambio,
   en vez de mantenerla como modificación opcional.
4. **Revisar el mensaje de sesión.** El token no tiene caducidad temporal; «Tu sesión ha caducado»
   puede ser inexacto para una revocación, un usuario eliminado o una base de datos reiniciada.
5. **Confirmar el contrato ejecutándolo.** El plan lo ha inferido del código y deja correctamente
   un paso 0 con `curl`; falta realizarlo antes de enseñar la solución como cerrada.
6. **Separar el ruido previo del cambio.** Habría que asegurar que los lockfiles y archivos ya
   modificados antes de FLOW-2 no se mezclen en el futuro diff.

### Sin harness

1. **Corregir el recuento.** Indica «~13» archivos nuevos o modificados, pero enumera 16; el total
   completo, incluyendo eliminaciones, es 20.
2. **Resolver la estrategia de pruebas.** El plan deja el login sin tests automatizados de
   frontend y sugiere opcionalmente un test de backend que no valida la interfaz nueva.
3. **Eliminar la contradicción sobre el backend.** Si la tarea es frontend y el plan afirma que no
   se tocará backend, el test funcional opcional debería descartarse o justificarse aparte.
4. **Cerrar las decisiones pendientes.** El botón de logout queda sujeto a confirmación del PO,
   mientras que en el otro plan esa decisión ya está resuelta.
5. **Añadir salvaguardas de proceso.** Antes de compartirlo habría que incorporar una revisión del
   diff, la ejecución obligatoria de checks y las precauciones sobre archivos ya modificados; la
   copia pelada no tenía esas reglas escritas.
6. **Confirmar el contrato ejecutándolo.** Igual que en el otro plan, la forma de las respuestas de
   la API está inferida y debe probarse antes de implementar los tipos.

---

# Las tres líneas del ejercicio

## 1. Qué piezas monté y cuál me costó más

Monté, en este orden, el `CLAUDE.md` generado con `/init`, el MCP de Atlassian, la skill
`/priority-ticket`, la skill `/commit`, el subagente `adversarial-reviewer`, el hook de Prettier para
el frontend, las reglas de proceso añadidas al final de `CLAUDE.md` y `AGENTS.md` como enlace.

Ninguna pieza me costó claramente más que las demás porque pedí a Claude que me ayudase a generar
el harness del proyecto. No hubo un bloqueo concreto al que pueda atribuir la mayor parte del
tiempo; el trabajo consistió principalmente en guiar y revisar ese montaje asistido.

## 2. Primera diferencia observada y dónde la vi

La primera diferencia concreta apareció en la sección **«Archivos»** de los dos planes. Al poner
ambos Markdown uno al lado del otro, vi que el plan con harness añadía Vitest, Testing Library, tres
archivos de tests, la configuración de pruebas y cambios en `package.json` y su lockfile. El plan
sin harness, en cambio, decía expresamente que no introduciría un runner y dejaba la comprobación
en lint, build y pruebas manuales. La diferencia estaba en el alcance y en la lista de archivos,
antes de valorar cuál de las dos propuestas era mejor.

## 3. Algo escrito en el harness que el agente no cumplió

No pude identificar un incumplimiento demostrable en esta ejecución. El plan reconoce las reglas
aplicables de `CLAUDE.md`: no tocar backend, preguntar antes de añadir dependencias, respetar
Prettier y oxlint, usar conventional commits y recurrir a `adversarial-reviewer` antes de terminar
una implementación. Las reglas sobre el diff, los hooks y la revisión final aún no llegaron a
activarse porque el ejercicio se detuvo antes de implementar.

Por tanto, en esta prueba no tengo un ejemplo honesto de «lo dejé escrito y aun así no lo hizo».
Ese resultado también forma parte de la observación: el harness no mostró un incumplimiento visible
durante la fase de planificación. Inventar uno para rellenar la casilla falsearía la comparación.
