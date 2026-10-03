# Known Issues & Follow-ups

This file tracks questions that should not be guessed in code.

## Client decisions

### 1. Professional title

Decision: display Mischa's professional title as "Composer".

### 2. German/English content workflow

Decision: Mischa will provide German content. The website should automatically provide the English translation.

### 3. Audio ownership

Decision: every track should be uploaded directly to the site through an admin panel by Mischa.

### 4. Score access

Decision: full scores should be viewable and downloadable by visitors.

### 5. CMS workflow

Decision: use a structured admin dashboard.

### 6. Media storage

Decision: start with 10 photographs, 10 audio files, and 10 score PDFs, with provision to upgrade to more storage later.

### 7. Backend and storage

Decision: use Supabase as the backend, including Postgres for structured data, Auth for the admin login, and Storage for photographs, audio files, and score PDFs.

### 8. Homepage priority

Ask Mischa to confirm the relative prominence of:

- current performance dates
- featured works
- latest news
- portrait/biography

Do not infer the final hierarchy from the AI prototype.

### 9. Photography

Need:

- profile/portrait image
- hero image
- supporting performance/concert-hall images
- instrument/orchestral imagery if desired

Confirm which images are owned/licensed.

## Technical follow-ups

- [ ] Choose frontend framework structure
- [ ] Define Supabase schema/content layer
- [ ] Configure Supabase Storage buckets
- [ ] Decide PDF rendering library
- [ ] Decide waveform generation approach
- [ ] Decide deployment strategy
- [ ] Decide analytics, if any
- [ ] Decide backup/export strategy for Supabase content and files

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
