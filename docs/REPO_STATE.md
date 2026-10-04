# Repository Current State

Last updated: 2026-10-05

## Project

Mischa Tangian Portfolio

## Current Phase

Supabase backend connected / Gallery and optimized photography complete

The project has been restarted from a clean foundation.

The previous prototype is considered discarded implementation work. It may be referenced for ideas only and must not dictate the new architecture or provide unverified production content.

---

## Current Objective

Build a clean, maintainable, high-performance bilingual portfolio and digital archive for Mischa Tangian using incremental ticket-based development.

Current focus:

`T0011A - Gallery and Browser-Ready Photography` completed; dates do not need a calendar-grid overview at this stage.

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
- `T0009A - Supabase Client Integration`
- `T0009C - Admin Dashboard Foundation`
- `T0009D - Admin Works Editing and Media Uploads`
- `T0010A - Public Dates Data and Page`
- `T0010B - Admin Dates Foundation`
- `T0011 - News + Archive`
- `T0011A - Gallery and Browser-Ready Photography`

## Current Implementation Status

- React + TypeScript foundation is in place.
- Global design tokens are available through CSS variables.
- Shared site shell is implemented with header, desktop navigation, mobile navigation, DE/EN placeholder, page frame, and footer.
- Homepage sections are implemented with clearly marked placeholder content.
- Minimal route placeholders exist for About and Contact.
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
- The Supabase JavaScript client is installed and wrapped in `src/lib/supabase.ts`.
- Public Supabase environment variables are documented in `.env.example`.
- Works catalogue/detail reads use Supabase `works` rows when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured.
- Local placeholder works remain as a fallback when Supabase is not configured or a public read fails.
- Supabase Storage public URLs are mapped for audio, photos, and scores.
- Supabase migrations are committed under `supabase/migrations`, covering public content tables, admin allowlist, RLS policies, Storage buckets, and Storage policies.
- Supabase setup instructions are documented in `docs/SUPABASE_SETUP.md`.
- The hosted Supabase project exists and the first three migrations were applied manually through the Supabase SQL Editor.
- `.env.local` points to the hosted Supabase project and public reads have been verified with the anon key.
- An ordered `work_media` migration has been added so works can have multiple audio tracks, scores, and later photos.
- The supplied `all_works` media folder has been inventoried in `docs/CONTENT_INVENTORY.md`.
- `supabase/content_import.sql` drafts the initial real content metadata for `the order of time`, `WATER`, and a draft-only Samurai scenes entry.
- A structured admin dashboard has been selected as the client content-management direction.
- The Supabase content model spike is documented in `docs/SUPABASE_CONTENT_MODEL.md`, including schema, auth model, storage buckets, RLS policy direction, admin workflow, costs, backup/export approach, and upgrade path.
- A local TypeScript proof of concept for the `works` content shape exists in `src/content/supabaseWorkPreview.ts`.
- Content metadata has been imported into the hosted database.
- WATER and The Order of Time MP3 recordings and scores have been uploaded and verified by the project owner.
- `/admin` provides DE/EN email/password login, session restoration, sign-out, and an allowlist-protected works list including drafts and archived works.
- `/admin` now supports work creation/editing, draft/publish/archive status changes, direct media uploads to Supabase Storage, ordered media metadata, and primary audio/score/photo selection.
- `/admin` now includes a Dates section for event listing/filtering, create/edit forms, draft/publish/archive status changes, related work selection, external links, and homepage featured toggles.
- Browser regression checks use mocked Auth/data responses; real upload and edit verification should be performed with the allowlisted admin account.
- `/dates` now reads published Supabase events with local fallback placeholders, separates upcoming and archive entries, and the homepage dates preview uses the same event data source.
- Public Dates uses an editorial chronological list for visitors; a calendar-grid admin overview is not currently planned.
- `/news` now renders a curated bilingual archive from supplied `news.txt` press material, with individual article routes at `/news/:slug`.
- Homepage news preview now surfaces supplied press/news material instead of placeholder cards.
- News is not admin-managed at this stage by project-owner decision.
- Supplied `pictures-sent` images have been inspected and optimized into browser-ready public gallery variants under `public/images/gallery`.
- Raw supplied photography is about 171 MB; optimized thumbnail + large gallery variants are about 11.9 MB total.
- Homepage now uses a supplied conducting image as the main visual and a supplied portrait in the about preview.
- `/gallery` provides a lazy/progressive-loading image archive using optimized files, keeping Supabase bandwidth out of the static gallery path.

## Current Blocker

No current implementation blocker. Hosted backend/public media are connected, and the first admin account has been verified by the project owner. Real-world admin upload/edit flows still need a manual smoke test using actual media files.

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
- News should use supplied Mischa press material and does not currently need admin add/remove tools.
- Static gallery photography should use optimized public assets; works-specific media remains admin/Supabase-managed.
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
