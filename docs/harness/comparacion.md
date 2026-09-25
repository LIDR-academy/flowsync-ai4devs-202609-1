# Comparación

La comparación entre las dos aproximaciones para realizar el mismo encargo creado como ticket en el proyecto de jira: implementar formulario de login.

## con harness

### Qué archivos tocó

Modificados:
  - src/App.tsx
  - src/App.css

Creados:
  - frontend/.env.example
  - src/lib/env.ts
  - src/api/auth.ts
  - src/lib/session.ts
  - src/hooks/useAuth.ts
  - src/components/LoginPage.tsx
  - src/components/TasksPlaceholder.tsx

### Qué convenciones respetó y cuáles no

Todas las convenciones que agregué en CLAUDE.md fueron respetados en el plan mode:

  - When starting with a ticket, you must create a new branch with a name following this format: `feature/ABC-123-short-desc`: feature/FLOW-2-login-form.
  - Commit messages must include the ticket key: `ABC-123: add X`: Commits con prefijo FLOW-2:...
  - When finishing a ticket, you must add a comment with a summary of the work done: Al terminar: comentario en Jira (FLOW-2) resumiendo el trabajo.

### Cuántas veces tuviste que intervenir

  - Responder una pregunta para clarificar si usar username o email para login.
  - Responder una pregunta acerca de dónde ir cuando el login sea exitoso.
  - Aclarar si la sesión debe persistir entre recargas.


### Qué te tocaría arreglar a mano

Creo que nada.


## sin harness

### Qué archivos tocó

Creados:
  - backend/database/seeders/user_seeder.ts
  - frontend/.env.example
  - frontend/src/api/auth.ts
  - frontend/src/auth/AuthContext.tsx
  - frontend/src/pages/LoginPage.tsx
  - frontend/src/pages/TasksPage.tsx
  - frontend/src/auth/RequireAuth.tsx

Modificados:
  - frontend/src/App.tsx
  - frontend/src/main.tsx
  - frontend/src/index.css
  - frontend/src/App.css
  - frontend/index.html

### Qué convenciones respetó y cuáles no

Aquí no había convenciones.

### Cuántas veces tuviste que intervenir

- Responder una pregunta para clarificar si usar username o email para login.
- Responder una pregunta acerca de dónde ir cuando el login sea exitoso.
- Responder una pregunta acerca de cómo hacer que haya un usuario de prueba.
- Aclarar si la sesión debe persistir entre recargas.
- Aclarar Idioma de interfaz.
- Pregunta: frontend sin router, qué hacer.
- Pregunta: cómo configurar la url del API.
- Pregunta sobre mensajes de error.

### Qué te tocaría arreglar a mano

--

# Tres lineas

## Qué piezas montaste y cuál costó más de lo que esperabas

Fichero CLAUDE.md con ayuda de /init explicando arquitectura y ficheros de backend y frontend, así como la información sobre el MCP de Atlassian y los datos de mi proyecto de Jira. También agregué algunas convenciones y reglas para validar si las podía cumplir.

## La primera diferencia que viste entre las salidas y en qué te fijaste para verla

La versión sin harness realizó muchísimas más preguntas.

## Algo que dejaste escrito en el harness y el agente no cumplió