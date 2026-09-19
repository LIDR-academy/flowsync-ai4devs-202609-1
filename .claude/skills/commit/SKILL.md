---
name: commit
description: Stage and commit the current changes in this repo with a well-formed conventional-style commit message. Use when the user asks to commit, or to "save this as a commit". Never pushes.
---

# commit

Create a single, well-formed commit for the current working tree changes.

## Steps

1. **Look before touching anything.**
   - `git status` — see what's modified, staged, and untracked.
   - `git diff` and `git diff --staged` — read the actual changes, not just filenames.
   - `git log --oneline -10` — match this repo's existing message style (this repo mixes
     `type(scope): summary` conventional-commit style and plain `type: summary` — follow whichever
     pattern the recent history on the current branch is using).

2. **Flag anything suspicious before staging.** If `git status` shows files that look unrelated
   to the task at hand, or anything that could hold secrets (`.env`, credentials, keys — note this
   repo's `.gitignore` already excludes `.env`), stop and ask before adding them.

3. **Stage specific files by name** — never `git add -A` / `git add .`. Only stage what's relevant
   to the change being committed.

4. **Write the message around why, not what.** One to two sentences. The diff already shows what
   changed; the message should carry the reasoning a diff can't (e.g. why this approach, what
   prompted the change) when that context exists. Do not pad it with a bulleted restatement of the
   diff.

5. **Commit via heredoc** so multi-line messages keep correct formatting:
   ```bash
   git commit -m "$(cat <<'EOF'
   <summary line>

   <optional body>
   EOF
   )"
   ```

6. **Verify with `git status`** after committing. If a pre-commit hook fails, fix the underlying
   issue and create a **new** commit — never `--amend` a commit that a failed hook prevented from
   being created, and never pass `--no-verify` to skip the hook.

7. **Never push.** This skill stops at the local commit; pushing is a separate, explicit request.
