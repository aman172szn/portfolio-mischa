# Mischa Tangian Portfolio

A lightweight bilingual portfolio and digital archive for Mischa Tangian.

## Product goals

The site should:

- present works
- play music directly
- display scores
- show dates/performances
- publish news
- provide biography/contact information
- support German and English
- allow the client to manage most content without editing source code
- remain fast and visually restrained

## Design principle

> Quiet interface, strong typography, warm photography, precise information, and music always one interaction away.

## Repository structure

```text
portfolio-mischa/
├── AGENTS.md
├── README.md
├── docs/
│   ├── FOLLOWUPS.md
│   ├── PROJECT_DESIGN.md
│   ├── REPO_STATE.md
│   ├── SUPABASE_CONTENT_MODEL.md
│   ├── TICKETS.md
│   └── VERIFICATION.md
├── src/
└── tests/
```

## Development workflow

1. Read project documentation.
2. Choose one ticket from `docs/TICKETS.md`.
3. Create a feature branch.
4. Implement only that ticket.
5. Run validation.
6. Perform manual verification.
7. Review the diff.
8. Commit.
9. Open/merge the PR according to the project's Git workflow.
10. Update `docs/REPO_STATE.md`.
11. Move to the next ticket.

## Supabase configuration

Copy `.env.example` to `.env.local` and fill in:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Without those values, the app uses local placeholder content for development.

Backend schema, RLS policies, Storage buckets, and setup steps are documented in `docs/SUPABASE_SETUP.md`.

## Admin dashboard

Start `npm run dev` and open `/admin`. The dashboard uses Supabase email/password
sign-in and the existing admin allowlist. Create the first account using section 6
of `docs/SUPABASE_SETUP.md`.

The dashboard can create and edit works, switch draft/published/archived status,
upload audio, score, and photo files to Supabase Storage, order media rows, and set
the primary audio/score/photo used by the public site.

Run `node scripts/verify-admin.cjs` with Playwright available and the dev server on
port 5173 to check the Auth/access and dashboard flows using mocked responses.
For a bundled Playwright package, pass its package directory as the first argument.
Set `PLAYWRIGHT_CHANNEL=chrome` to use installed Chrome instead of Playwright Chromium.

## First task

Start with:

`T0001 — Project Foundation`

Do not build the complete website in the first ticket.

## Content rule

The previous prototype used invented/AI-generated information.

Do not reuse those facts as production content unless Mischa explicitly confirms them.

## Current status

The project is being restarted from a clean foundation.
