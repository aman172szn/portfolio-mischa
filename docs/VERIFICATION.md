# Verification Checklist

This file is the manual QA checklist for the Mischa Tangian portfolio.

## 1. Local startup

- [ ] Fresh install works
- [ ] Development server starts
- [ ] No startup errors
- [ ] Production build succeeds

## 2. Desktop layout

Target: >1200px

- [ ] Header is balanced
- [ ] Navigation is readable
- [ ] Hero has clear hierarchy
- [ ] Editorial grid aligns correctly
- [ ] No excessive whitespace
- [ ] No horizontal overflow
- [ ] Audio player does not cover important content
- [ ] Score reader is centered and usable

## 3. Mobile layout

Target: <768px

- [ ] No horizontal scrolling
- [ ] Header works with touch
- [ ] Menu opens/closes cleanly
- [ ] Typography remains readable
- [ ] Images do not cause layout jumps
- [ ] Works are easy to scan
- [ ] Dates are easy to scan
- [ ] News cards/articles are readable
- [ ] Audio player remains usable
- [ ] Score reader is usable full-screen
- [ ] Buttons have sufficiently large touch targets

## 4. Accessibility

- [ ] All interactive controls reachable by keyboard
- [ ] Focus state visible
- [ ] Icon-only controls have accessible labels
- [ ] Headings follow logical order
- [ ] Images have appropriate alt text
- [ ] Contrast is acceptable
- [ ] Modal can close with Escape
- [ ] Player controls work from keyboard
- [ ] Reduced-motion preference is respected

## 5. Language switching

- [ ] Default language is German
- [ ] English switch works
- [ ] Current route remains sensible after switching
- [ ] No visible layout jump from language control
- [ ] Localized titles/descriptions render correctly
- [ ] Missing translation behavior is intentional and documented

## 6. Audio

- [ ] Audio does not autoplay
- [ ] Play/pause works
- [ ] Seek works
- [ ] Elapsed time works
- [ ] Duration works
- [ ] Only the intended track is active
- [ ] Player survives normal navigation where intended
- [ ] Player does not block mobile content

## 7. Scores

- [ ] PDF opens inside site
- [ ] Page navigation works
- [ ] Fullscreen works where supported
- [ ] Close works
- [ ] Request-score action works
- [ ] Large files are not downloaded before opening
- [ ] Mobile reading is practical

## 8. Dates

- [ ] Upcoming dates sorted correctly
- [ ] Historical dates sorted correctly
- [ ] Dates show correct timezone behavior
- [ ] Event and work data are consistent
- [ ] Homepage event previews use the same source data

## 9. News

- [ ] Homepage shows intended latest items
- [ ] Archive is chronological
- [ ] Individual articles open
- [ ] German content is correct
- [ ] English content is correct

## 10. Content editing

A client workflow test must eventually be performed.

- [ ] Add a work without developer help
- [ ] Edit a work without developer help
- [ ] Upload/replace an image
- [ ] Upload/replace audio
- [ ] Upload/replace a score
- [ ] Add an event
- [ ] Edit an event
- [ ] Add news
- [ ] Edit news
- [ ] Change profile/contact information
- [ ] Preview before publish, if supported
- [ ] Publish/update without touching source code

## 11. Performance

Test a production build.

- [ ] Images are responsive
- [ ] Below-the-fold images lazy-load
- [ ] Audio is not preloaded unnecessarily
- [ ] PDF pages are not all rendered up front
- [ ] Main content appears before non-critical media
- [ ] No expensive JS animation runs continuously
- [ ] Lighthouse review completed
- [ ] Real mobile device check completed

## 12. Content accuracy

Before launch:

- [ ] No invented biography details
- [ ] No invented awards
- [ ] No invented performances
- [ ] No invented works
- [ ] No invented venues
- [ ] No placeholder AI-generated claims
- [ ] All images have usage permission
- [ ] All audio has usage permission
- [ ] All scores are approved for the chosen display/download method
