# Comparación

## Archivos modificados

*Con harness*
- Se agregaron 12 archivos, se modificaron 4 y se elimino 1. Le llevo 9m 24s y más de 40K tokens.

Agregados (12)
- frontend/.env.example
- frontend/src/vite-env.d.ts
- frontend/src/features/auth/authApi.ts
- frontend/src/features/auth/validation.ts
- frontend/src/features/auth/session.ts
- frontend/src/features/auth/AuthPage.tsx
- frontend/src/features/auth/AuthPage.css
- frontend/src/features/auth/LoginForm.tsx
- frontend/src/features/auth/RegisterForm.tsx
- frontend/src/pages/Home.tsx
- frontend/src/pages/Home.css
- docs/security-reports/20260922T004447Z.md

Modificados (4)
- backend/app/validators/user.ts
- frontend/.gitignore
- frontend/src/App.tsx
- frontend/src/index.css

Eliminados (1)
- frontend/src/App.css

*Sin harness*
- Se agregaron 8 archivos, se modificaron 4 y no se elimino ninguno. Le llevo 6m 58s y alrededor de 30k tokens.

Agregados (8):
- frontend/.env.example
- frontend/src/api/auth.ts
- frontend/src/auth/AuthContext.tsx
- frontend/src/auth/validation.ts
- frontend/src/pages/AuthPage.css
- frontend/src/pages/HomePage.tsx
- frontend/src/pages/LoginPage.tsx
- frontend/src/pages/RegisterPage.tsx

Modificados (4):
- backend/app/validators/user.ts
- frontend/src/App.css
- frontend/src/App.tsx
- frontend/src/main.tsx


## Convenciones respetadas

*Con harness*
- Se respeto la ubicación de los validators.
- Se utilizo SQLite con base de datos. 
- Se respeto un diseño más parecido a la pagina home.
- Corrió la verificación de los cambios antes de finalizar la tarea.

*Sin harness*
- Se respeto la ubicación de los validators.
- Se utilizo SQLite como base de datos.


## Intervenciones necesarias

*Con harness*
- 0, no intervine más que para aceptar la ejecución de algunos comandos por que corri en modo accept edits on.

*Sin harness*
- 0, se corrio en modo auto y solo sugirió instalar una extensión de chrome.

## Lo que tocaría arreglar a mano

*Con harness*
- De momento, nada. He podido verificar que cumple con los criterios de aceptación establecidos.

*Sin harness*
- Realmente nada, es cierto que agrego un campo adicional (nombre) al registro e igual cambio un poco el diseño del login/registro pero realmente no se ve mal.


## Pienzas montadas

*1.* Lo que se monto fue un archivo CLAUDE.md y AGENTS.md, reglas (hooks) para ejecutarse durante y después de los cambios. Realmente, el tema de los hooks fue lo más dificil porque todo esto es nuevo y no se tenía idea de como realizarlo (Se realizo mediante prompts y se tuvo retrabajo en alguno de ellos). Para el caso del los archivo .md se dio un prompt pero se acompaño de utilizar el comando /init el cual es la clave.

*2.* El tiempo y tokens, vi más rapida la ejecución en la versión sin harness. Pero en la versión con harness se pudo observar los pasos adicionales que le agregue (como la verificación final).

*3.* El tema de la convención de color no es que no lo haya realizado (si lo realizó) pero me costo saber que si lo hizo, tuve que verificar con el propio agente y se recibio la explicación de que se corrio de fondo y solo iba a verlo si existía algún error. Siento que esto igual es parte de mi inexperiencia. Pero respondiendo a la pregunta, no veo algo que no se hubiera respetado (Haciendo referencia a la instrucción, al parecer falle en este punto).

Nota: Siento que los resultados no son los esperados, quiza mi encargo fue muy especifico y no permitió ver la diferencia.