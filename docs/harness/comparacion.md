# Comparación: con harness vs. sin harness

**Encargo:** FLOW-4 — "Quien ya tiene cuenta puede entrar a FlowSync" (Historia, prioridad High)
**Qué se compara:** los dos **planes**, no el código. No se implementa en ninguna copia.
**Cómo se lanzó:** con harness, `/priority-ticket`; sin harness, la misma instrucción escrita a mano.
**Modelo y herramienta:** Sonnet 5, medium effort · Claude Code
**Fecha:** 2026-09-22

**Harness montado (solo en la copia con harness), las ocho piezas en orden:**
1. `CLAUDE.md` en la raíz
2. MCP de Atlassian (conector de claude.ai)
3. Skill `/priority-ticket`
4. Skill `/commit`
5. Subagente `adversarial-reviewer`
6. Hook `PostToolUse` → `.claude/hooks/format-frontend.sh` (Prettier sobre el frontend)
7. Reglas de proceso al final del `CLAUDE.md`
8. `AGENTS.md` como symlink a `CLAUDE.md`

**Nota sobre la primera corrida descartada:** a las 00:08 se lanzó la pelada con otro prompt
(«Implementa el ticket FLOW-4…»). El agente leyó el `README.md`, vio que el ejercicio pide
comparar planes y no implementar, y preguntó por el alcance. Se paró a las 00:12 y se repitió
con el encargo correcto.

| | Con harness | Sin harness |
|---|---|---|
| Hora de inicio | 00:26 | 00:20 |
| Duración | 2 min | 5 min |
| Hora de parada | 00:28 | 00:25 |

---

## 1. Archivos que tocó, contados

**Con harness: 4 archivos**, todos en `frontend/`.

1. `frontend/.env` (nuevo) — `VITE_API_URL=http://localhost:3333`
2. `frontend/src/lib/api.ts` (nuevo) — cliente único: `login`, `logout`, `getProfile`; lee
   `VITE_API_URL`; lee y escribe el token en `localStorage['flowsync.token']`
3. `frontend/src/components/LoginForm.tsx` (nuevo) — `<form>` nativo con `required`, estado
   de envío, error sin perder lo escrito
4. `frontend/src/App.tsx` (modificado) — sesión o formulario; con token, `getProfile()` al
   montar para sobrevivir al F5

**Sin harness: 5 archivos.**

1. `frontend/src/lib/api.ts` (nuevo) — `login`, `logout`, `getProfile` sobre `fetch`,
   apuntando a `http://localhost:3333/api/v1` **escrito a pelo**, con la decisión explícita de
   no usar variable de entorno «porque el proyecto no tiene ninguna configurada en frontend»
2. `frontend/src/lib/auth.ts` (nuevo) — helpers para el token en `localStorage`, en un archivo
   aparte
3. `frontend/src/components/LoginForm.tsx` (nuevo) — formulario **controlado**, botón
   deshabilitado mientras la petición corre
4. `frontend/src/components/AccountScreen.tsx` (nuevo) — pantalla post-login con botón de
   salir
5. `frontend/src/App.tsx` (reescribe el boilerplate) — raíz con revalidación por `getProfile`

**La diferencia de uno no es "uno de más":** son repartos distintos. La pelada separó el token
en `auth.ts` y la pantalla de cuenta en `AccountScreen.tsx`; la copia con harness metió el
token dentro de `api.ts` y la pantalla dentro de `App.tsx`, y gastó su cuarto archivo en un
`.env` que la otra decidió no crear.

---

## 2. Convenciones respetadas y no respetadas

Una a una. Si en un lado no había ninguna escrita, esa es la respuesta y vale.

### Con harness

| Convención escrita en el CLAUDE.md | ¿La cumplió? | Nota |
|---|---|---|
| No tocar `backend/` | Sí | Los 4 archivos están en `frontend/` |
| No añadir dependencias sin justificar | Sí | Ninguna dependencia nueva en el plan |
| Nada de `any` / `@ts-ignore` | — | No se puede saber de un plan; queda para el código |
| No crear documentación no pedida | Sí | No propone ningún `.md` |
| **Leer `backend/app/validators/` y replicar las reglas exactas (8–32)** | **No** | Fue a leer el validador, pero **el plan no menciona el 8–32 ni ningún límite**. Ver Parte B punto 3 |
| Usar lo que trae el stack (form nativo, `useState`, `fetch`) | Sí | `<form>` nativo con `required`, sin librería de formularios |
| Llamadas a la API solo desde `src/lib/api.ts` | Sí | Cliente único, con ese nombre exacto |
| URL base desde `import.meta.env.VITE_API_URL` | Sí | Y además crea el `.env` que no existía |
| Token en `localStorage` bajo `flowsync.token` | Sí | La clave literal, sin inventarse otra |
| Un componente por archivo en `src/components/`, PascalCase | Sí | `LoginForm.tsx` |
| Textos de interfaz en español | — | El plan no cita textos concretos |
| `npm run lint` y `npm run build` pasan | — | No aplica: no se implementó |

**Diez de doce comprobables. Una incumplida, y es justo la que más importaba.**

### Sin harness

| Mismo punto | Qué hizo por su cuenta |
|---|---|
| Reglas de validación del password | Tampoco las menciona. **Igual que la copia con harness** |
| Dependencias | Ninguna nueva, pero **solo después de preguntar** por `react-router-dom` y recibir «Decídelo tú» |
| Dónde puso las llamadas a la API | `src/lib/api.ts`, **el mismo sitio y el mismo nombre**, sin que nadie se lo dijera |
| URL base | `http://localhost:3333/api/v1` **escrito a pelo**, con la decisión razonada de no usar variable de entorno |
| Dónde guardó la sesión | `localStorage`, en un `src/lib/auth.ts` aparte; **sin clave concreta declarada** |
| Estructura y nombres de archivos | `src/components/` en PascalCase, **igual que la convención escrita**, por su cuenta |
| Idioma de los textos | El plan tampoco lo cita |

**Lo que más sorprende de esta columna no es lo que hizo distinto, sino cuánto coincidió.**
`src/lib/api.ts`, `src/components/`, PascalCase y `localStorage` salieron iguales sin tener ni
una línea escrita. Esas cuatro convenciones no separaron nada: son lo que el modelo hace por
defecto, y tenerlas escritas no cambió el resultado.

Las dos que sí separaron: **la URL base** (variable de entorno contra literal a pelo) y **la
clave del token** (`flowsync.token` exacta contra sin declarar).

---

## 3. Veces que tuve que intervenir

Corregir, aclarar, repetir el encargo o pararlo en seco.

**Con harness: 0.** Corrió de principio a fin sin que hiciera falta meterse.

**Sin harness: 1.** A las `~00:22` paró a preguntar si instalar `react-router-dom` o resolver
la navegación con estado local. Respuesta dada: «Decídelo tú.», deliberadamente sin orientar,
porque el `CLAUDE.md` del otro lado ya cubre ese punto y contestarlo habría sido entregarle a
mano justo lo que se estaba midiendo.

> La copia con harness **no preguntó nada durante la ejecución** en ese mismo punto: decidió
> sola y siguió. Esa es la diferencia en bruto: una se paró a esperarme, la otra no.

---

## 3-bis. Lo que cada plan dejó sin cerrar

No son intervenciones — son resultado del agente, y se leen del plan final.

| | Con harness | Sin harness |
|---|---|---|
| Preguntas abiertas que deja el plan | 2 | 3 |
| Decisiones tomadas por su cuenta | 3 | 6 |

La copia pelada **decidió sola el doble de cosas** y aun así **dejó más preguntas abiertas**.
No es que una fuera más prudente: es que tenía más huecos que rellenar, porque el `CLAUDE.md`
del otro lado ya había cerrado varios antes de empezar.

---

## 4. Qué me tocaría arreglar a mano antes de enseñárselo a alguien del equipo

**Con harness:**

- **Meter las reglas de validación.** El plan no dice nada de longitudes de contraseña. Hay
  que añadir el 8–32 del validador antes de que nadie escriba código, o saldrá un formulario
  que acepta lo que el backend va a rechazar.
- **Sacar la pantalla de cuenta de `App.tsx`.** El plan la resuelve dentro del componente
  raíz; la convención dice un componente por archivo en `src/components/`.
- **Añadir un `.env.example`.** Crea `frontend/.env`, que no se commitea, así que el
  siguiente que clone el repo se encuentra la variable sin definir y sin pista de que existe.

**Sin harness:**

- **Todo lo anterior sobre validaciones**, exactamente igual: tampoco las menciona.
- **Sacar la URL de dentro del código.** `http://localhost:3333/api/v1` escrito a pelo no
  sobrevive a un despliegue. Lo razonó bien, pero la conclusión no sirve.
- **Fijar la clave del token.** Guarda en `localStorage` sin declarar bajo qué nombre, que es
  justo el detalle que luego nadie encuentra.
- **Decidir si `auth.ts` y `api.ts` separados compensan**, o son dos archivos donde cabía uno.

---

# Parte B

## 1. Qué piezas monté y cuál costó más de lo esperado

Llegué a las **ocho**: `CLAUDE.md`, MCP de Atlassian, skill `/priority-ticket`, skill
`/commit`, subagente `adversarial-reviewer`, hook de Prettier sobre el frontend, reglas de
proceso al final del `CLAUDE.md`, y `AGENTS.md` como symlink.

Pero el rato no se fue en ninguna de las ocho. Se fue en dos sitios que no esperaba:

**El entorno.** `npm install` del backend falló cuatro veces seguidas por restricciones del
sandbox, no del proyecto: caché de npm, caché de node-gyp, `xcrun` sin poder escribir su
caché, y de ahí un `'climits' file not found` que parecía un problema de compilador y no lo
era. Diagnosticar que todos eran la misma causa costó más que montar cualquier pieza.

**Descubrir que el harness que había montado no era el que pedía el ejercicio.** Monté dos
piezas de mi cosecha (un `CLAUDE.md` y un hook de lint + typecheck) antes de leer el
`README.md` del propio repo, que especifica las ocho piezas concretas y su orden. Lo
descubrió el agente de la copia pelada, no yo: leyó el README, vio que el ejercicio pide
comparar planes sin implementar, y se paró a preguntar. Hubo que rehacer el harness y repetir
la corrida.

## 2. La primera diferencia que vi, y en qué me fijé para verla

La copia con harness **fue contra `backend/app/validators/`**. Lo vi en la traza, mientras
corría, en la línea que nombra el archivo que estaba leyendo — no hizo falta abrir nada ni
esperar al plan final.

Lo que salió distinto no fue que preguntara menos, sino **de dónde sacó las respuestas**. Las
dos se encontraron con los mismos huecos del ticket; la copia con harness los resolvió yendo
al código, y esa es la diferencia concreta.

El matiz que hace esto interesante: **a la copia pelada el prompt también le pedía ir a buscar
las respuestas al código**, con esas palabras, porque el texto era el mismo que lleva la skill.
Aun así fue la que se paró a preguntarme por el router. Tener la instrucción en el prompt y
tenerla en el entorno no produjeron el mismo comportamiento.


## 3. Algo que dejé escrito en el harness y el agente no cumplió igualmente

El `CLAUDE.md` dice, en su propia sección: *«El backend ya define las reglas reales en
`backend/app/validators/`. Léelas y replícalas exactamente en el frontend; no inventes
mínimos ni máximos "razonables".»* El validador define `password` entre **8 y 32**
caracteres.

El agente con harness **sí fue a leer el validador** — se veía en la traza mientras corría —
pero **su plan no menciona el 8–32 por ninguna parte**. Ni ese ni ningún otro límite. Leyó la
fuente y no trasladó la regla al plan.

Y no es que la regla estuviera escrita de forma ambigua: nombra el directorio exacto y dice
"replícalas exactamente". Aun así se perdió entre la lectura y el entregable.


