# Mischa Tangian Portfolio — Codex Project Instructions

## 1. Project purpose

This repository contains the personal portfolio and digital archive for Mischa Tangian, a composer/conductor based in Berlin.

The website should feel like a contemporary European editorial publication rather than a generic portfolio template.

Primary goals:

- Present Mischa's works clearly.
- Present performances and upcoming dates.
- Present news and an archive.
- Support German and English.
- Provide native-feeling audio playback.
- Provide score/PDF viewing.
- Use photography deliberately.
- Keep the site fast on mobile and desktop.
- Allow Mischa to maintain approximately 95% of the content without editing application code.

## 2. Working method

Use a ticket-driven workflow.

- Implement one ticket at a time.
- Read `docs/PROJECT_DESIGN.md`, `docs/TICKETS.md`, and `docs/REPO_STATE.md` before implementation.
- Do not implement future-ticket functionality.
- Do not redesign architecture because of a small ticket.
- Do not refactor unrelated code.
- Prefer the smallest maintainable change that satisfies the ticket.
- Do not introduce a new dependency without a reason.
- Do not add a backend/database/CMS only because it is technically possible.
- Keep content separate from presentation.
- Preserve existing working behavior unless the ticket explicitly changes it.
- Ask for clarification when a requirement conflicts with the documented architecture.

## 3. Design rules

The visual direction is:

"Quiet interface, strong typography, warm photography, precise information, and music always one interaction away."

Priorities:

1. Content hierarchy.
2. Readability.
3. Performance.
4. Accessibility.
5. Subtle motion.
6. Decorative effects.

Do not add:

- WebGL
- 3D scenes
- large animated backgrounds
- continuous particle effects
- unnecessary parallax
- heavy page-transition libraries
- autoplay audio
- embedded YouTube/SoundCloud widgets as the primary media experience
- dashboard-like UI
- decorative animation that competes with the work

## 4. Responsive behavior

Desktop target:

- viewport width > 1200px
- generous margins
- editorial 12-column grid where appropriate
- asymmetric compositions are encouraged

Mobile target:

- viewport width < 768px
- single-column layouts by default
- touch-friendly controls
- no horizontal overflow
- persistent player collapses to a compact bar
- score reader becomes full-screen or near-full-screen
- catalogue rows become stacked cards

Intermediate/tablet layouts must remain usable and must not simply inherit desktop dimensions.

## 5. Performance

Use browser-native and CSS mechanisms before JavaScript animation.

Prefer:

- `transform`
- `opacity`
- `will-change` only when justified
- lazy-loaded images
- responsive image sizes
- compressed modern image formats
- code splitting where useful
- static rendering/caching where appropriate
- precomputed waveform data rather than real-time visualizers

Avoid:

- layout-heavy animations
- large JavaScript bundles for simple effects
- loading all audio/PDF assets on page load
- rendering all archive content unnecessarily

No page should depend on a large media asset before the primary content can render.

## 6. Accessibility

All interactive features must support:

- keyboard navigation
- visible focus states
- semantic HTML
- accessible labels for icon buttons
- reduced motion preferences
- readable contrast
- touch targets appropriate for mobile

The language selector, player, score reader, navigation menu, and modal controls are all interactive systems and must be accessible.

## 7. Internationalization

German is the default language.

English is available through a persistent DE/EN switcher.

Do not depend on browser translation as the source of truth.

Localized content should remain structured and explicit.

Examples:

- `title_de`
- `title_en`
- `description_de`
- `description_en`

Do not duplicate entire components only because their text differs.

URLs should have stable language-aware routing when the chosen framework supports it.

## 8. Content ownership

The client should eventually be able to edit content without changing React/TypeScript source files.

Content to keep outside presentation code includes:

- works
- descriptions
- events
- news
- photographs
- audio files
- score/PDF files
- biography
- contact information
- social links
- featured items
- navigation labels where practical

The exact CMS/storage choice is an architectural decision and must be documented before implementation.

## 9. Architecture boundaries

Keep these concerns separate:

- UI/presentation
- content/data
- media handling
- internationalization
- routing
- reusable components
- site configuration

Avoid putting large content objects directly inside components.

Avoid mixing browser media state with unrelated page state.

## 10. Git rules

- Work on a feature branch, not directly on `main`.
- One ticket per branch.
- Keep commits focused.
- Do not rewrite history.
- Do not force-push.
- Never commit secrets.
- Check `git diff` before committing.
- Do not commit generated build output unless the repository explicitly requires it.

Preferred branch format:

`feature/T0001-project-foundation`

Preferred commit format:

`feat: <short description>`

## 11. Validation

Before marking a ticket complete:

1. Run the relevant type checks.
2. Run the relevant lint checks.
3. Run the relevant tests.
4. Run a production build when applicable.
5. Manually verify the acceptance criteria.
6. Check mobile behavior for UI tickets.
7. Check keyboard behavior for interactive UI.
8. Record the result in the completion report.

## 12. Completion report

Every Codex implementation response must contain:

### Summary
What was implemented.

### Files changed
Exact files added/modified.

### Commands run
Commands used for validation.

### Validation
Pass/fail result and any warnings.

### Manual verification
What was checked in a browser/device.

### Risks
Anything that could affect future work.

### Follow-ups
Anything intentionally deferred.

## 13. Stop conditions

Stop and ask before implementing when:

- a ticket requires choosing a CMS not covered by the design document
- a requirement conflicts with client requirements
- a requested feature requires a significant architectural change
- a third-party service is needed but credentials/pricing/ownership are unclear
- content appears factual but has not been supplied by the client
- a legal/licensing decision is required for media
