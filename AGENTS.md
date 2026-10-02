# Project Instructions

## General

- Implement one ticket at a time.
- Do not implement future-ticket functionality.
- Do not refactor unrelated code.
- Do not introduce dependencies unless necessary.
- Prefer simple, maintainable solutions.
- Preserve existing architecture unless the ticket requires a change.
- Use strict TypeScript where applicable.
- Run relevant tests/build commands after changes.
- Keep secrets out of source control.

## Git

- Work only on the current feature branch.
- Do not modify main directly.
- Do not rewrite Git history.
- Do not force push.
- Keep commits focused.

## Architecture

- Follow docs/PROJECT_DESIGN.md.
- Project JSON/data models are the source of truth where applicable.
- Keep infrastructure-specific code isolated from core domain logic.

## Completion report

After implementation, report:

1. Summary
2. Files changed
3. Commands run
4. Tests/build results
5. Manual verification
6. Risks
7. Follow-up issues