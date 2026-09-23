# Comparación: con harness vs sin harness

## Encargo

FLOW-1 — Implementar login en el frontend

---

## Comparación

## Comparación

| Aspecto | Con harness | Sin harness |
|---|---|---|
| Resultado | Generó un plan completo de implementación para FLOW-1 | No pudo generar el plan porque no tenía acceso al MCP de Atlassian |
| Archivos propuestos | 13 archivos explícitos + 1 posible (`frontend/src/index.css`) | 0 |
| Convenciones respetadas | Detectó que frontend y backend son proyectos separados; reutilizó la API existente; evitó proponer cambios en archivos generados; tuvo en cuenta el formato de respuesta de la API, lint/build y la ausencia de test runner en frontend | No llegó a analizar el repositorio ni sus convenciones |
| Intervenciones manuales | 0 | 0 |
| Arreglos manuales necesarios | Revisar decisiones abiertas sobre almacenamiento del token, router, formato real de errores y diseño visual; comprobar cambios previos en `package.json` antes de mezclar cambios | Proporcionar acceso a Jira/MCP o el contexto del ticket para que pueda siquiera generar el plan |

## Observaciones

### Con harness
- Accedió a Jira mediante MCP.
- Localizó FLOW-1.
- Leyó descripción y criterios de aceptación.
- Analizó el repositorio.
- Generó un plan con pasos, pruebas, riesgos y archivos concretos.

### Sin harness
- No pudo acceder a Jira.
- Se detuvo sin inventar el ticket.
- No se le proporcionó ayuda adicional.

### Archivos propuestos — con harness

1. `frontend/vite.config.ts`
2. `frontend/package.json`
3. `frontend/package-lock.json`
4. `frontend/src/api/client.ts`
5. `frontend/src/api/auth.ts`
6. `frontend/src/auth/AuthContext.tsx`
7. `frontend/src/auth/useAuth.ts`
8. `frontend/src/auth/RequireAuth.tsx`
9. `frontend/src/pages/LoginPage.tsx`
10. `frontend/src/pages/LoginPage.css`
11. `frontend/src/pages/HomePage.tsx`
12. `frontend/src/main.tsx`
13. `frontend/src/App.css`

Posible ajuste adicional:
- `frontend/src/index.css`

### Archivos propuestos — sin harness

Ninguno. La ejecución se detuvo antes de generar el plan porque no tenía acceso al MCP de Atlassian.

## Parte B — Las tres líneas

1. Monté `CLAUDE.md`, el MCP de Atlassian, las skills `/priority-ticket` y `/commit`, el subagente `adversarial-reviewer`, un hook de Prettier para el frontend, reglas de proceso en `CLAUDE.md` y `AGENTS.md`. La pieza que más trabajo me llevó fue `/priority-ticket`, porque tuve que definir con detalle cómo localizar el ticket, analizar el repositorio y estructurar el plan.

2. La primera diferencia apareció al consultar Jira: la copia con harness pudo acceder a `FLOW-1`, leer sus criterios y generar un plan completo; la copia sin harness se detuvo porque no tenía disponible el MCP de Atlassian.

3. En `CLAUDE.md` dejé escrito que los planes o cambios importantes debían revisarse con el subagente `adversarial-reviewer`, pero `/priority-ticket` generó el plan y finalizó sin ejecutar esa revisión.