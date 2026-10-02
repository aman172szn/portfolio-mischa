# Known Issues & Follow-ups

This file tracks questions that should not be guessed in code.

## Client decisions needed

### 1. Professional title

Confirm the exact title displayed on the website.

Possible examples are not decisions:
- Composer
- Conductor
- Composer / Conductor
- another title supplied by Mischa

Do not choose based on third-party profiles.

### 2. German/English content workflow

Confirm whether Mischa wants to:

- write German and English himself
- provide German and have English translated manually
- use a machine translation as a draft and manually edit it

The production source of truth should remain reviewed content.

### 3. Audio ownership

For every track determine:

- direct upload to the site
- external source
- both

Confirm rights and hosting preference.

### 4. Score access

For every score determine:

- public preview
- public download
- request-only access

Confirm whether full scores or excerpts should be shown.

### 5. CMS workflow

Confirm which is more comfortable:

- simple editor/CMS
- structured admin dashboard
- Git-based editing
- another existing tool

The chosen solution should minimize recurring cost and client effort.

### 6. Media storage

Confirm expected volume of:

- photographs
- audio files
- score PDFs

This affects storage/CDN choices.

### 7. Homepage priority

Ask Mischa to confirm the relative prominence of:

- current performance dates
- featured works
- latest news
- portrait/biography

Do not infer the final hierarchy from the AI prototype.

### 8. Photography

Need:

- profile/portrait image
- hero image
- supporting performance/concert-hall images
- instrument/orchestral imagery if desired

Confirm which images are owned/licensed.

## Technical follow-ups

- [ ] Choose frontend framework structure
- [ ] Choose CMS/content layer
- [ ] Choose media storage
- [ ] Decide PDF rendering library
- [ ] Decide waveform generation approach
- [ ] Decide deployment strategy
- [ ] Decide analytics, if any
- [ ] Decide backup/export strategy for CMS content

## Design follow-ups

- [ ] Compare dark and light palettes
- [ ] Approve serif font
- [ ] Approve sans font
- [ ] Finalize header behavior
- [ ] Finalize homepage hero composition
- [ ] Finalize works catalogue layout
- [ ] Finalize score-reader controls
- [ ] Finalize audio-player proportions

## Known limitation

The old prototype contained AI-generated placeholder information.

That content is not authoritative and should be replaced rather than migrated blindly.
