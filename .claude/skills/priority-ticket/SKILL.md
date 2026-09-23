---
name: priority-ticket
description: Pull a Jira ticket (by key or by "highest priority in To Do") via the Atlassian MCP and produce an implementation plan grounded in this repo's conventions. Use when the user names a Jira ticket, says "next priority ticket", or asks to plan work from the board. Never applies the plan — planning only.
---

# priority-ticket

Turn a Jira ticket into a concrete, repo-aware implementation plan — without writing any code.

## Steps

1. **Resolve the ticket.**
   - If the user gave a ticket key (e.g. `FLOW-12`), fetch it directly with
     `getJiraIssue`.
   - If they asked for "the priority ticket" / "next ticket" with no key, find the project with
     `getVisibleJiraProjects`, then run `searchJiraIssuesUsingJql` for that project filtered to
     status `"To Do"` (or the equivalent open status), ordered by priority descending, and take
     the top result. If several tickets tie on priority, list them and ask which one before
     proceeding.
   - Read the full ticket: summary, description, acceptance criteria, labels, and any linked
     issues (`getJiraIssueRemoteIssueLinks`).

2. **Read this repo's own conventions before planning anything.**
   - Read `CLAUDE.md` at the repo root for architecture and command conventions.
   - Read the actual files most relevant to the ticket (controllers, routes, models, frontend
     components) rather than guessing from naming alone — the plan must match what the code
     really does, not what a similar project would typically do.

3. **Produce a plan, not code.** The plan must state:
   - **Files to touch**, each with the concrete reason ("add `login` route to
     `backend/start/routes.ts`", not "update routing").
   - **Conventions this ticket must respect** — e.g. subpath imports, the `serialize()` response
     envelope, transformers for any new exposed field, VineJS validators for new input, token-based
     auth via `middleware.auth()`.
   - **Open questions or assumptions** — anything the ticket doesn't specify (error messages,
     redirect targets, validation limits) that a reviewer should confirm before implementation.
   - **Out-of-scope risks** — adjacent code the change could break, called out explicitly.

4. **Do not implement.** Stop after presenting the plan. If the user then asks to proceed, that is
   a new, separate request — implementing is out of scope for this skill.

5. **If Jira access fails** (no matching project, permission error, ticket not found), say so
   plainly and show what you tried — do not fabricate a ticket or plan around assumed content.
