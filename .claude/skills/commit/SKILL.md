---
name: commit
description: Create a git commit in this repo (FlowSync) following its existing Conventional Commits style (type(scope): summary, e.g. "feat: add X", "docs(s1): ...", "fix(backend): ..."). Use this whenever the user asks to commit, "haz un commit", "crea un commit", "guarda los cambios", or otherwise wants the current changes committed — not for pushing, opening PRs, or amending history unless explicitly asked.
---

# Commit

Creates a commit for the current changes in this repo, matching the style
already used in its history rather than inventing a new convention.

## Message format

This repo's commits follow **Conventional Commits**:

```
<type>(<scope>): <summary>
```

- `type` is always in English: `feat`, `fix`, `docs`, `chore`, `refactor`,
  `test`, or similar — pick whichever matches the log's existing usage
  (`git log --oneline` shows real examples).
- `(<scope>)` is optional. Use it when the change is clearly scoped to one
  area, e.g. `(backend)`, `(s1)`, `(slides)`. Omit it for repo-wide or
  miscellaneous changes.
- `summary`: this repo mixes Spanish and English summaries (e.g. "add
  PriorityIssues component", "repo utilizable tras clone en limpio") — match
  whatever language the surrounding recent commits and the changed files use,
  don't force a switch.
- Focus the summary on **why**, not a mechanical listing of every file
  touched — one line is usually enough; only add a body for a non-obvious
  rationale.

## Steps

1. **Check state first.** Run `git status` and `git diff` (staged and
   unstaged) to see exactly what would be committed, and `git log --oneline
   -10` to confirm the current style/scope conventions still hold.
2. **Stage deliberately.** Add specific files by name — never `git add -A`
   or `git add .` — so an unrelated or sensitive file (`.env`, credentials,
   stray build output) can't slip in unnoticed.
3. **Look before you commit.** After staging, re-run `git status` and skim
   the diff of anything unfamiliar. This repo has `backend/.env` and similar
   secrets-adjacent files — if a staged file looks like it could hold a
   secret, open it and check before continuing.
4. **Write the message** following the format above, using a heredoc so
   multi-line messages keep their formatting:
   ```bash
   git commit -m "$(cat <<'EOF'
   feat(frontend): add priority ticket refresh flow
   EOF
   )"
   ```
   End the message with the attribution trailer given in the conversation's
   system reminder, when one is present (do not invent one yourself, and
   don't add it if the system reminder doesn't specify it).
5. **Never**: use `--no-verify`, `--no-gpg-sign`, `--amend` (unless the user
   explicitly asks), or force anything. If a pre-commit hook fails, fix the
   underlying issue, re-stage, and make a new commit rather than bypassing
   the hook.
6. **Confirm** with `git status` after committing, and report what was
   committed (files + one-line summary) back to the user.

## What NOT to do

- Don't commit unless the user actually asked for a commit — staging or
  drafting a message for review is fine, but don't call `git commit` on your
  own initiative.
- Don't bundle unrelated changes into one commit just because they're both
  sitting in the working tree — if the diff clearly mixes two unrelated
  concerns, ask the user whether they want separate commits.
- Don't push. This skill only creates the local commit; pushing is a
  separate, explicit action.
