# freespiritdance

Copy and redesign of freespiritdance.ro. A push to main deploys the public site (`.github/workflows/deploy.yml`).

## Instruction files need Andreea's approval
Never write rules or add anything to this file (or any agent instruction file) without telling Andreea and getting her approval first. Keep this file small: important decisions only.

## Rules
- `redesign website/` is unpublished (excluded by `.git/info/exclude`): never publish, stage or un-exclude it.
- Only the Orca automation "Publish freespiritdance" (daily 01:15 Romania time) commits and pushes, following `automations/publish-main.md`. Agents never commit or push by hand.
- Keep the checks in `automations/publish.json` (both site builds); never weaken them. Allowed repairs: the publishing script only.
