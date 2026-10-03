# Ticket Board

Tickets are intentionally small.

Status values:

- `TODO`
- `IN PROGRESS`
- `BLOCKED`
- `DONE`

Only one implementation ticket should normally be active at a time.

---

## T0001 — Project Foundation

Status: DONE

### Goal

Create the clean application foundation without implementing portfolio features.

### Dependencies

None.

### Allowed areas

- project configuration
- source folder structure
- global styles
- routing foundation if required
- development tooling

### Do not touch

- real client content
- final visual design decisions
- production media
- CMS integration unless required to boot the selected architecture

### Requirements

- application starts locally
- TypeScript works
- styling system works
- basic routing structure is possible
- production build works
- no secrets committed
- root documentation remains intact

### Non-goals

- homepage implementation
- audio player
- PDF reader
- CMS
- final animations

### Acceptance criteria

- `npm install` succeeds
- development server starts
- production build succeeds
- application renders without console errors
- repository structure is clean

### Manual verification

Open the local URL in a desktop browser and a mobile-sized viewport.

---

## T0002 — Global Design Tokens

Status: DONE

### Goal

Implement the agreed typography, spacing, color, border, shadow, and motion tokens.

### Dependencies

T0001.

### Allowed areas

- global CSS
- Tailwind theme/configuration
- font loading
- CSS variables

### Do not touch

- page-specific layouts
- CMS
- content data

### Requirements

Implement the approved design tokens from `PROJECT_DESIGN.md`.

### Non-goals

- complete homepage
- animation-heavy components
- dark/light theme switching unless explicitly requested by the client

### Acceptance criteria

- tokens are reusable
- no arbitrary duplicated color values in components where a token exists
- typography renders consistently
- reduced-motion behavior is supported

### Manual verification

Check headings, body, metadata, borders and focus states at desktop and mobile widths.

---

## T0003 — Site Shell + Header

Status: DONE

### Goal

Build the shared site chrome.

### Dependencies

T0002.

### Requirements

- desktop navigation
- mobile navigation
- DE/EN control placeholder
- responsive header
- footer
- consistent page container

### Non-goals

- real bilingual routing logic
- CMS
- audio player

### Acceptance criteria

- no horizontal overflow
- mobile menu is usable
- keyboard navigation works
- header is visually consistent with the design system

---

## T0004 — Homepage Editorial Layout

Status: DONE

### Goal

Create the homepage structure with placeholder content only.

### Dependencies

T0003.

### Requirements

Sections:

- hero
- current dates
- featured work
- latest news
- about preview
- contact/footer

### Non-goals

- final client content
- CMS integration
- audio backend

### Acceptance criteria

- responsive desktop/mobile layouts
- correct visual hierarchy
- no invented facts presented as real
- sections have clear routes/actions

---

## T0005 — Supabase Content Model Spike

Status: DONE

### Goal

Validate the Supabase content-management architecture that allows the client to maintain the site.

### Dependencies

T0001.

### Requirements

Evaluate:

- required content types
- Supabase Postgres schema
- Supabase Auth admin access model
- Supabase Storage bucket structure
- Supabase Storage access policies
- bilingual fields
- automatic English translation from German source content
- image uploads
- audio uploads
- PDF uploads
- structured admin dashboard workflow
- initial capacity for 10 photographs, 10 audio files, and 10 score PDFs
- storage upgrade path
- draft/publish workflow
- ease of use for a non-developer
- cost
- hosting complexity
- backup/export options

### Non-goals

- migrating all content
- building every admin screen
- replacing Supabase with another backend

### Acceptance criteria

- Supabase schema decision documented
- Supabase bucket/policy decision documented
- estimated recurring cost documented
- local proof of concept works for one content type
- proposed storage upgrade path documented

---

## T0006 — Internationalization

Status: DONE

### Goal

Implement DE/EN language switching.

### Dependencies

T0003, T0005.

### Requirements

- German default
- English switch
- no layout shift caused by the selector
- localized content fields
- automatic English translation workflow
- stable URL strategy

### Non-goals

- manual translation editing interface beyond the selected content-management workflow

### Acceptance criteria

- switching language preserves the current page where practical
- browser refresh preserves the selected locale
- keyboard access works

---

## T0007 — Works Catalogue

Status: DONE

### Goal

Build the works archive and work detail route.

### Dependencies

T0004, T0005, T0006.

### Requirements

Catalogue fields:

- title
- year
- instrumentation
- actions

Work detail supports:

- description
- image
- audio placeholder
- score placeholder
- performances

### Acceptance criteria

- works are content-driven
- filtering/search is only added when justified by actual catalogue size
- mobile layout is clear

---

## T0008 — Audio Player

Status: DONE

### Goal

Build the persistent bespoke audio player.

### Dependencies

T0007.

### Requirements

- play/pause
- progress
- seek
- elapsed time
- duration
- track title
- metadata
- lightweight waveform
- desktop fixed bar
- mobile compact/expanded state
- keyboard support
- one active track

### Non-goals

- equalizer
- real-time visualizer
- autoplay

### Acceptance criteria

- audio starts promptly after user interaction
- progress remains synchronized
- player does not block navigation
- reduced-motion mode disables unnecessary animated feedback

---

## T0009 — Score Reader

Status: DONE

### Goal

Provide on-site viewing for supplied score PDFs.

### Dependencies

T0007.

### Requirements

- open/close
- page navigation
- fullscreen
- download score action
- mobile usability

### Non-goals

- building a PDF engine from scratch

### Acceptance criteria

- PDF opens without leaving the site
- full score can be downloaded
- large pages are navigable
- modal can be closed with keyboard
- page controls are accessible

---

## T0009A — Supabase Client Integration

Status: DONE

### Goal

Connect the public site to Supabase for published content reads before building more placeholder-only sections.

### Dependencies

T0005, T0007, T0008, T0009.

### Requirements

- install the Supabase JavaScript client
- define public Vite environment variables
- create a shared Supabase browser client
- keep secrets out of source control
- read published works from Supabase when configured
- keep local placeholder fallback when Supabase environment variables are missing
- map public Storage paths for audio and score files
- preserve the current Works catalogue, audio player, and score reader behavior

### Non-goals

- admin dashboard
- authentication UI
- database migrations
- content migration
- Dates/News/About Supabase reads

### Acceptance criteria

- production build succeeds without Supabase credentials
- `.env.example` documents required public variables
- Works catalogue can use Supabase `works` rows when credentials are configured
- local fallback remains available for development without credentials

---

## T0009B — Supabase Backend Provisioning

Status: BLOCKED

### Goal

Create the hosted Supabase backend and apply the production-ready schema, policies, and storage setup.

### Dependencies

T0005, T0009A.

### Requirements

- create or select the hosted Supabase project
- apply committed database migrations
- create public media buckets
- enable RLS policies
- configure frontend environment variables
- bootstrap the first admin user
- verify public reads against the hosted project
- support ordered media metadata for works with multiple audio tracks

### Non-goals

- building the admin dashboard UI
- migrating final client content
- storing service-role keys in source control

### Acceptance criteria

- hosted Supabase project exists
- migrations are applied
- `.env.local` points to the project
- Works page reads from hosted Supabase
- anonymous visitors can read only published content
- admin allowlist is ready for future dashboard work
- ordered work media metadata can be imported separately from binary file uploads

### Blocker

Requires Supabase account access, or a Supabase project reference plus credentials from the project owner. Local backend migrations and setup documentation are committed, but the hosted project cannot be created from this repository alone.

---

## T0010 — Dates / Concert Archive

Status: TODO

### Goal

Build the chronological performance archive.

### Dependencies

T0005, T0006.

### Requirements

- upcoming dates
- historical dates
- chronological order
- location/venue
- work reference

### Acceptance criteria

- one event record can appear on the homepage and Dates page
- mobile scanability is good

---

## T0011 — News + Archive

Status: TODO

### Goal

Build latest-news homepage preview and complete news archive.

### Dependencies

T0005, T0006.

### Requirements

- latest 1–2 items on homepage
- chronological archive
- individual article route
- bilingual content

---

## T0012 — About + Contact

Status: TODO

### Goal

Build the professional information pages using supplied client material.

### Dependencies

T0006.

### Requirements

- portrait
- biography
- contact
- social links
- optional CV/press downloads if supplied

---

## T0013 — Media Optimization

Status: TODO

### Goal

Make images, audio, and PDFs efficient for real-world users.

### Dependencies

T0007, T0008, T0009, T0010, T0011.

### Requirements

- responsive images
- lazy loading
- sensible audio loading
- PDF loading only when opened
- caching strategy
- compression review

---

## T0014 — Accessibility Pass

Status: TODO

### Goal

Perform a dedicated accessibility pass.

### Dependencies

T0012.

### Requirements

- keyboard navigation
- focus states
- labels
- contrast
- reduced motion
- semantic headings
- mobile touch targets

---

## T0015 — Performance Pass

Status: TODO

### Goal

Verify the final site on realistic hardware.

### Dependencies

T0013, T0014.

### Requirements

- production build
- Lighthouse review
- desktop test
- mobile test
- throttled network test
- identify and remove unnecessary client-side work

---

## T0016 — Client Content Migration

Status: TODO

### Goal

Replace all placeholders with verified client content.

### Dependencies

T0007, T0010, T0011, T0012.

### Requirements

Only use content supplied/approved by Mischa.

### Acceptance criteria

No AI-generated placeholder facts remain in production pages.
