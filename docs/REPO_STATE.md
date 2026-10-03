# Repository Current State

Last updated: 2026-10-03

## Project

Mischa Tangian Portfolio

## Current Phase

Score reader complete / Dates archive next

The project has been restarted from a clean foundation.

The previous prototype is considered discarded implementation work. It may be referenced for ideas only and must not dictate the new architecture or provide unverified production content.

---

## Current Objective

Build a clean, maintainable, high-performance bilingual portfolio and digital archive for Mischa Tangian using incremental ticket-based development.

Current focus:

`T0010 - Dates / Concert Archive`

---

## Completed Tickets

- `T0001 - Project Foundation`
- `T0002 - Global Design Tokens`
- `T0003 - Site Shell + Header`
- `T0004 - Homepage Editorial Layout`
- `T0005 - Supabase Content Model Spike`
- `T0006 - Internationalization`
- `T0007 - Works Catalogue`
- `T0008 - Audio Player`
- `T0009 - Score Reader`

## Current Implementation Status

- React + TypeScript foundation is in place.
- Global design tokens are available through CSS variables.
- Shared site shell is implemented with header, desktop navigation, mobile navigation, DE/EN placeholder, page frame, and footer.
- Homepage sections are implemented with clearly marked placeholder content.
- Minimal route placeholders exist for Works, Dates, News, About, and Contact.
- Locale-prefixed routing is implemented for `/de` and `/en`, with `/` redirecting to German by default.
- The header language switch preserves the current page where practical.
- Navigation, route placeholders, homepage placeholder content, and footer copy render in the active locale.
- Works archive and work detail routes are implemented under the locale-prefixed route tree.
- Works are driven from a local structured content module shaped like the Supabase `works` table, with placeholder content clearly labelled until verified catalogue data is supplied.
- Work detail pages include description, image, audio placeholder, score placeholder, and performances placeholder sections.
- A persistent audio player is mounted in the site shell with play/pause, progress, seeking, elapsed/duration display, lightweight waveform bars, mobile compact/expanded states, and one active track at a time.
- Works with audio expose Listen controls that load the selected work into the persistent player.
- A site-native score reader overlay is mounted in the site shell with open/close, page controls, fullscreen action, download action, Escape close, and mobile full-height layout.
- Works with score PDFs expose Score controls that open the selected work in the reader.
- Supabase has been selected for the backend: Postgres for structured content, Auth for admin access, and Storage for photographs, audio files, and score PDFs.
- A structured admin dashboard has been selected as the client content-management direction.
- The Supabase content model spike is documented in `docs/SUPABASE_CONTENT_MODEL.md`, including schema, auth model, storage buckets, RLS policy direction, admin workflow, costs, backup/export approach, and upgrade path.
- A local TypeScript proof of concept for the `works` content shape exists in `src/content/supabaseWorkPreview.ts`.
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
