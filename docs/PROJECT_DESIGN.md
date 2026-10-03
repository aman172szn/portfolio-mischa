# Mischa Tangian Portfolio — Project Design

## 1. Product definition

A lightweight bilingual digital archive and professional portfolio for Mischa Tangian.

The site combines:

- personal identity
- works catalogue
- music playback
- score access
- performances/dates
- news/archive
- biography
- contact

The website must feel professional and artistic without relying on heavy visual effects.

## 2. Design statement

Quiet interface, strong typography, warm photography, precise information, and music always one interaction away.

The site should feel closer to:

- a contemporary concert programme
- an editorial archive
- a high-end artist publication

than to:

- a SaaS dashboard
- a photography template
- a flashy WebGL portfolio

## 3. Known client requirements

These requirements come directly from the client conversation.

### Confirmed / strongly indicated

- Website is for Mischa Tangian.
- Berlin-based.
- Professional title should be "Composer".
- German should be the default language.
- English should be available with a button and generated automatically from German content.
- Client wants a first version quickly.
- Client wants to upload scores as PDFs.
- Client prefers scores to open on the website.
- Full scores should be viewable and downloadable by visitors.
- Client wants music playable from the website.
- Every track should be uploaded directly to the site by Mischa through an admin panel.
- External media can exist as a fallback/secondary source.
- A primary menu item should exist for dates/calendar.
- Client wants news.
- Homepage may show the latest 1–2 news items with a link to an archive.
- Photography is important.
- Client wants one strong image per page/section.
- A photograph of Mischa should appear somewhere on the site.
- Client expects to maintain most of the site themselves.
- Client wants a structured admin dashboard.
- Initial media volume target is 10 photographs, 10 audio files, and 10 score PDFs, with provision to upgrade storage later.
- Supabase should be used as the backend: Postgres for structured data, Auth for admin access, and Storage for photographs, audio files, and score PDFs.
- Future menus/submenus should be possible.
- Client prefers speed over excessive visual effects.

### Not yet confirmed

- Final biography.
- Exact works catalogue and classifications.
- Whether external audio links need to be supported.
- Exact Supabase schema and admin-dashboard screens.
- Exact Supabase storage bucket policy, limits, and upgrade path.
- Exact domain/hosting arrangement.
- Final visual palette.
- Final typography.

Do not invent these details.

## 4. Information architecture

Primary navigation:

- Home
- Works
- Dates
- News
- About
- Contact

Language:

- DE
- EN

Potential future sub-navigation:

Works
- Composition categories as supplied by the client

News
- Archive by year where useful

Dates
- Upcoming
- Archive

Avoid creating category names until the actual catalogue is available.

## 5. Sitemap

```text
/
├── /de
│   ├── /works
│   │   └── /works/:slug
│   ├── /dates
│   ├── /news
│   │   └── /news/:slug
│   ├── /about
│   └── /contact
│
└── /en
    ├── /works
    │   └── /works/:slug
    ├── /dates
    ├── /news
    │   └── /news/:slug
    ├── /about
    └── /contact
```

The exact routing syntax is framework-dependent.

## 6. Homepage architecture

Order:

1. Header
2. Hero / identity
3. Current / upcoming dates
4. Featured work
5. Latest news
6. About preview
7. Contact/footer

### Hero

Desktop:

- large photograph
- strong display type
- short professional descriptor
- Berlin/location only if client confirms it should be shown
- restrained motion

Mobile:

- image first
- identity text below
- no video background

### Current section

Show a small selection of upcoming performances.

Each item can expose:

- date
- city
- venue
- type
- work

The same underlying event record should power the Dates page.

### Featured work

Display one strong work with:

- title
- year
- instrumentation
- short description
- Listen
- Score

### News preview

Show latest 1–2 items and a clear archive link.

### About preview

Short biography excerpt + portrait.

## 7. Works catalogue

Primary layout: editorial list rather than a dense card grid.

Suggested desktop columns:

- year
- title
- instrumentation
- actions

Actions:

- Listen
- View score
- Download score

Optional feature cards can be used for selected works.

### Work detail page

Suggested structure:

- title
- year
- instrumentation
- duration when supplied
- image
- description
- audio
- score
- score download
- performances
- related news when relevant

Do not invent duration, premiere, instrumentation, or descriptions.

## 8. Dates page

Use a chronological archive rather than a generic calendar dashboard.

Recommended structure:

- Upcoming
- Archive

Each entry:

- date
- city
- venue
- event title
- type
- work
- details link when necessary

German labels can use "Termine" while the route/navigation architecture remains stable.

## 9. News

Homepage:

- latest 1–2 news items

Archive:

- chronological list
- optional year grouping

Article:

- title
- publication date
- image
- localized content
- optional related work/event

## 10. About

Suggested content blocks:

- portrait
- short introduction
- biography
- professional roles
- collaborations/activities when supplied
- press/CV downloads if requested later

Do not fabricate awards, appointments, premieres, organizations, or education.

## 11. Contact

Simple editorial contact page.

Primary action:

- email

Secondary:

- social links
- other contact methods supplied by client

## 12. Global components

### Header

Desktop:

- wordmark/name left
- navigation center/right
- DE/EN switcher
- restrained sticky behavior

Mobile:

- name
- language switcher
- menu button

### Persistent audio player

Desktop:

- fixed bottom
- track title
- instrumentation or metadata
- waveform/progress
- play/pause
- elapsed time
- duration

Mobile:

- compact bar
- tap to expand
- no obstruction of important content

Rules:

- no autoplay
- audio state persists across route changes when technically appropriate
- one active track at a time
- keyboard accessible
- waveform is lightweight

### Score reader

Use a modal/drawer/full-screen reader depending on viewport.

Desktop:

- score centered
- page navigation
- fullscreen
- close
- download score

Mobile:

- near/fullscreen
- large page area
- simple controls
- download action accessible

The surrounding interface should feel native to this website even if the PDF rendering engine is third-party.

## 13. Responsive specifications

### Desktop >1200px

- content max-width around 1440px
- page horizontal padding approximately 48–72px
- 12-column layout where asymmetry improves hierarchy
- large type and image compositions
- persistent player full width within viewport
- score reader centered with generous margins

### Mobile <768px

- horizontal padding approximately 20–24px
- single-column layout by default
- stacked work entries
- stacked events
- compact header
- compact audio player
- full-screen score reader
- no horizontal scrolling
- images sized for the actual viewport

### Tablet 768–1200px

Use an intermediate layout.

Do not simply scale desktop down.

## 14. Typography

Starting direction:

Display serif:
- Instrument Serif, or another editorial serif selected during the design spike

UI/body sans:
- Manrope, or another geometric/humanist sans selected during the design spike

Suggested hierarchy:

Desktop:
- Hero: 72–96px
- H2: 48–64px
- H3: 30–40px
- Work titles: 28–36px
- Body: 17–19px
- Metadata: 12–14px
- Micro labels: 10–11px

Mobile:
- Hero: 48–60px
- H2: 36–44px
- H3: 26–32px
- Work titles: 24–28px
- Body: 16–18px
- Metadata: 11–13px

## 15. Color system

### Dark / Warm Onyx

```text
Onyx 950       #0F1012
Onyx 900       #17191D
Slate 700      #666A70
Slate 500      #8D9197
Paper 100      #F2EFE8
Paper 200      #D9D4CA
Champagne 500  #C5A880
Champagne 400  #D2BA94
Line Dark      #2A2D31
```

### Light / Warm Editorial

```text
Paper 50       #F7F5F0
Paper 100      #EFEBE2
Ink 950        #151619
Ink 700        #4D5055
Ink 500        #74777C
Brass 600      #9F8159
Line Light     #D8D2C7
White          #FFFFFF
```

Champagne/brass is an accent, not a dominant background color.

Use it for:

- active states
- dates
- small rules
- selected controls
- audio active state
- understated hover details

## 16. Motion

Principle:

Motion communicates structure, not decoration.

Preferred:

- opacity
- translateY
- small scale changes
- CSS transitions
- lightweight Framer Motion only where it adds clear value

Suggested timing:

- input acknowledgement: <100ms target
- micro interaction: 120–180ms
- image hover/reveal: 200–300ms
- page transition: 180–250ms

Use `prefers-reduced-motion`.

Avoid large blur effects, layout animation, and continuous animation.

## 17. Performance targets

These are engineering targets, not guarantees.

- render useful primary content quickly on mobile
- keep initial JavaScript small
- lazy-load below-the-fold images
- avoid loading every audio file at once
- avoid loading all PDF pages at once
- use responsive images
- avoid autoplay
- keep animation on compositor-friendly properties
- test on a mid-range mobile device, not only a development laptop

Performance verification should eventually include Lighthouse and real-device checks.

## 18. Suggested content model

### Work

```text
id
slug
title_de
title_en
year
category
instrumentation_de
instrumentation_en
duration
description_de
description_en
audio
score
cover_image
featured
sort_order
```

### Event

```text
id
date
city
venue
event_title_de
event_title_en
type_de
type_en
work_reference
description_de
description_en
external_link
featured
```

### News

```text
id
slug
date
title_de
title_en
excerpt_de
excerpt_en
content_de
content_en
image
featured
```

### Site settings

```text
name
title_de
title_en
email
hero_image
about_image
social_links
default_language
```

The field list is a starting model, not a final schema. Validate it against the client's actual workflow before locking the Supabase schema.

## 19. Technology direction

Initial direction from the client discussion:

- React
- TypeScript
- modern CSS/Tailwind
- client-side audio controls
- browser-native PDF capabilities or a lightweight PDF viewer
- Supabase Postgres for structured content
- Supabase Auth for admin access
- Supabase Storage for images, audio, and PDFs
- structured admin dashboard for client uploads and content maintenance
- automatic English translation from German source content

The project does not require a traditional MERN stack merely because React was chosen.

Do not introduce MongoDB or a custom API/database unless the actual content-management design requires it.

The technical spike must validate the Supabase schema, bucket structure, access policies, backup/export approach, and storage upgrade path.

## 20. Things explicitly out of scope for version 1

- user accounts
- comments
- booking system
- custom social media feeds
- WebGL/3D
- complex animations
- custom video streaming infrastructure
- large analytics dashboard
- community features
- elaborate calendar dashboards

## 21. Client content rule

When real content is unavailable:

- use clearly marked placeholder content
- do not present AI-generated biography/facts as real
- do not invent awards, venues, commissions, premieres, organizations, dates, works, or collaborators

The previous prototype contained invented information; that content must not silently become production content.
