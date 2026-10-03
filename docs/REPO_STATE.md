# Repository Current State

Last updated: 2026-10-03

## Project

Mischa Tangian Portfolio

## Current Phase

Site shell complete / homepage layout next

The project has been restarted from a clean foundation.

The previous prototype is considered discarded implementation work. It may be referenced for ideas only and must not dictate the new architecture or provide unverified production content.

---

## Current Objective

Build a clean, maintainable, high-performance bilingual portfolio and digital archive for Mischa Tangian using incremental ticket-based development.

Current focus:

`T0004 - Homepage Editorial Layout`

---

## Completed Tickets

- `T0001 - Project Foundation`
- `T0002 - Global Design Tokens`
- `T0003 - Site Shell + Header`

## Current Implementation Status

- React + TypeScript foundation is in place.
- Global design tokens are available through CSS variables.
- Shared site shell is implemented with header, desktop navigation, mobile navigation, DE/EN placeholder, page frame, and footer.
- Minimal route placeholders exist for Home, Works, Dates, News, About, and Contact.
- No homepage sections have been implemented yet.
- No real bilingual routing/content logic has been implemented yet.
- Supabase has been selected for the backend: Postgres for structured content, Auth for admin access, and Storage for photographs, audio files, and score PDFs.
- A structured admin dashboard has been selected as the client content-management direction, but the exact schema, screens, bucket policies, and backup/export approach have not been implemented.
- No audio player or score reader has been implemented.
- No real client content has been migrated.

---

## Confirmed Client Requirements

- German is the default language.
- English is available through a DE/EN language switcher.
- English content should be translated automatically from German source content.
- Mischa's professional title should be shown as "Composer".
- Works catalogue is required.
- Dates / Calendar / Termine section is required.
- News section and news archive are required.
- Homepage should surface recent news.
- Direct music playback on the website is preferred.
- Every track should be uploaded directly to the site by Mischa through an admin panel.
- Music should not rely primarily on visually embedded third-party players.
- PDF music scores should be viewable from the website.
- Full scores should be downloadable by visitors.
- Initial media capacity should cover 10 photographs, 10 audio files, and 10 score PDFs, with a path to upgrade storage later.
- Supabase is the backend and storage system.
- Photography is important.
- A photograph of Mischa should appear on the website.
- Supporting photographs may include instruments, orchestras, stages, and concert halls.
- Client wants to maintain approximately 95% of normal site content without developer assistance.
- Additional menus/submenus should remain possible later.
- Performance is a priority.
- Effects and transitions should remain lightweight.
- Mobile usability is a priority.

---

## Design Direction

Design principle:

> Quiet interface, strong typography, warm photography, precise information, and music always one interaction away.

Visual direction:

- editorial
- modern European
- minimal
- warm
- professional
- contemporary classical
- restrained champagne/brass accent
- editorial serif typography
- clean sans-serif UI typography
- deliberate photography
- subtle motion
- controlled whitespace
- thin editorial borders/dividers

Avoid:

- excessive animation
- WebGL / 3D effects
- large animated backgrounds
- unnecessary parallax
- generic SaaS/dashboard styling
- visually dominant third-party media widgets
- unnecessary dependencies

---

## Development Workflow

Development follows one ticket at a time.

```text
Plan / review
      |
Select one ticket
      |
Create feature branch
      |
Codex implements ticket
      |
Review Git diff
      |
Build / test
      |
Manual verification
      |
Commit
      |
Update REPO_STATE.md
      |
Next ticket
```
