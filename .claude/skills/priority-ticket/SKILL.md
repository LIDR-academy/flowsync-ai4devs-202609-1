---
name: priority-ticket
description: Refresh frontend/src/data/priority-issues.json with the current priority tickets from the Jira project FLOW (guaitel.atlassian.net), used by the PriorityIssues React component. Use this whenever the user asks to update, refresh, or sync priority tickets/tickets prioritarios, re-run the FLOW Jira query, or otherwise wants priority-issues.json to reflect the latest state of Jira. Do not invent ticket data — always pull it from a real Jira source or ask the user for it.
---

# Priority Ticket Sync

Keeps `frontend/src/data/priority-issues.json` in sync with the priority
tickets in the Jira project **FLOW** (`https://guaitel.atlassian.net`), which
the `PriorityIssues` component (`frontend/src/PriorityIssues.tsx`) renders.

## JQL

```
project = FLOW AND statusCategory != Done ORDER BY priority DESC, created ASC
```

Always use this exact JQL unless the user explicitly asks for a different
filter — it's also recorded in the `jql` field of the JSON file, so keep both
in sync if it ever changes.

## Steps

1. **Find a working Jira/Atlassian tool.** Look for MCP tools named
   `mcp__atlassian__*` (e.g. a "search issues" or "JQL search" tool). If the
   atlassian MCP server is not connected or errors out, do not fall back to
   guessing — treat this as a hard stop (see "No Jira access" below).
2. **Run the JQL above** against the FLOW project and get back the matching
   issues.
3. **Map each issue** into this shape:
   ```json
   {
     "key": "FLOW-1",
     "summary": "...",
     "status": "...",
     "priority": "High" | null,
     "type": "...",
     "assignee": "Full Name" | null
   }
   ```
   - `priority`: use the priority name as Jira reports it (e.g. `High`,
     `Medium`, `Low`). If the issue has no priority set, use `null` — the
     component already renders `null` as "Sin prioridad".
   - `assignee`: use the assignee's display name. If unassigned, use `null`
     — the component renders that as "Sin asignar".
   - `status`: use Jira's status name as-is (e.g. "Tareas por hacer", "En
     curso"), don't translate or normalize it.
   - `type`: use Jira's issue type name (e.g. "Tarea", "Historia", "Subtask").
4. **Update `frontend/src/data/priority-issues.json`**:
   - `source`: keep as `"https://guaitel.atlassian.net (proyecto FLOW)"`.
   - `jql`: the JQL used above.
   - `fetchedAt`: today's date, `YYYY-MM-DD`.
   - `issues`: the mapped array, in the order Jira returned them (the JQL
     already sorts by priority then creation date, so don't re-sort).
5. **Leave the component untouched.** `PriorityIssues.tsx` and
   `PriorityIssues.css` read this JSON generically — don't edit them unless
   the JSON's shape needs to change (e.g. a new field the user asks to
   display), since that's a separate, deliberate change.

## No Jira access

If there's no working Atlassian/Jira tool available (e.g. the MCP server is
misconfigured or fails to connect), don't fabricate tickets or reuse stale
data as if it were fresh. Instead:

- Tell the user plainly that Jira access isn't available right now (and why,
  if you know — e.g. a bad MCP server URL).
- Ask them to either fix the Jira connection, or paste/export the current
  FLOW ticket list (a CSV/JSON export from Jira, or just a pasted list of
  key/summary/status/priority/assignee).
- Once they provide real data, map it using the same rules above and update
  the JSON the same way.
