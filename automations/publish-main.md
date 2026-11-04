# Publish freespiritdance

Orca automation "Publish freespiritdance": daily at 01:15 Europe/Bucharest, provider Claude,
fresh session in this checkout (andreeaioan97-maker/freespiritdance, branch main).
A push to main runs .github/workflows/deploy.yml, which rebuilds and deploys the public site.
`redesign website/` is kept out of the repo by .git/info/exclude; never publish it, stage it,
or remove that exclusion.

Review git status, staged and unstaged diffs, untracked file contents, and local
commits ahead of origin/main. Confirm main and the repository in publish.json.
If there are no pending changes or outgoing commits, report nothing to publish.
Do not publish secrets, local runtime state, unclear changes, or concurrent edits.
.agents/skills/ and .claude/skills/ (Alex's repository-picker and github-publish-automation skills) are expected tracked files: Andreea asked for them in every repo and knows this repo is public; they hold no secrets, so publish them.

Run python3 scripts/publish.py. When application files have been introduced, add
appropriate project checks to automations/publish.json before publishing. Routine
script maintenance is authorized; validate any fix. Do not weaken checks or change
the remote target. Stop for unresolved check failures, authentication errors, branch
protection, or conflicts. Never force-push, discard changes, or automatically rebase.

After successful review and validation, run:
python3 scripts/publish.py --publish --message "<descriptive commit message>"
This stages ALL nonignored changes. The nightly schedule and Run now both authorize
publishing reviewed suitable changes; no routine confirmation is required.
A failed push may leave a local commit; inspect before retrying.
Report the commit link, validation, script repairs, and any blocker.
