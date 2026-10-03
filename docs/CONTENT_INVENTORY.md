# Content Inventory

Status: working inventory for the supplied `all_works` folder.

The media source folder is intentionally ignored by git. Keep original audio, score, and reference files in `all_works/` or another client-owned archive; Supabase Storage is the serving layer, not the only copy.

## Confirmed Works

### the order of time

- Source files:
  - `The order of time_FS 2024.pdf`
  - `SCORE Order of time.zip` containing `The order of time_FS 2024.pdf`
  - `ORDER of time - Movement 1 - live.wav`
  - `ORDER of time - Movement 2 - live.wav`
  - `ORDER of time - Movement 3 - live.wav`
  - `ORDER of time - Movement 5 - live.wav`
- Ignore:
  - `ORDER of time - Movement 3 - live.wav.asd` appears to be a DAW/project sidecar file, not public media.
- Extracted score metadata:
  - Title: `the order of time`
  - Year: `2024`
  - Instrumentation: large orchestra and soloist group with traditional instruments: tonbak and daf, santoor, duduk, zurna, kamanche
  - Commission/premiere note: commissioned by State Orchestra Stuttgart / State Opera Stuttgart; premiered at Liederhalle Stuttgart on 2024-10-27 by musicians of Babylon ORCHESTRA and the orchestra of State Opera Stuttgart, conducted by Tianyi Lu.
- Audio durations:
  - Movement 1 live: `6:14`
  - Movement 2 live: `7:47`
  - Movement 3 live: `5:18`
  - Movement 5 live: `7:59`
- Supabase draft paths:
  - Score: `the-order-of-time/the-order-of-time-full-score-2024.pdf`
  - Audio:
    - `the-order-of-time/order-of-time-movement-1-live.wav`
    - `the-order-of-time/order-of-time-movement-2-live.wav`
    - `the-order-of-time/order-of-time-movement-3-live.wav`
    - `the-order-of-time/order-of-time-movement-5-live.wav`
- Storage warning:
  - All four WAV files are larger than 50 MB. Supabase Free projects may reject these unless the project is upgraded or the files are compressed before upload.

### WATER

- Source files:
  - `WATER new score 2022x - Full Score.pdf`
  - `WATER first part RSB Berlin UA 2022.mp3`
  - `WATER second part RSB Berlin UA 2022.mp3`
- Extracted score metadata:
  - Title: `WATER`
  - Year: `2020-22`
  - Instrumentation: large orchestra
  - Duration: ca. 14 min.
- Supabase draft paths:
  - Score: `water/water-full-score-2022.pdf`
  - Audio:
    - `water/water-first-part-rsb-berlin-ua-2022.mp3`
    - `water/water-second-part-rsb-berlin-ua-2022.mp3`
- Storage warning:
  - Both MP3 files are below 50 MB.

## Needs Confirmation

### Samurai scene audio

The following WAV files appear to belong to one stage or film/theatre-related work, but the public catalogue title, year, instrumentation, and score file are not confirmed yet.

- `Szene_4.5 STORYTELLING Music Samurai X sketch 260816.wav` - `1:55`
- `Szene_5.2 DUEL Streetguy Samurai.wav` - `2:42`
- `Szene_12.5 BIG CHOREO Samurai Beat 2 NEW Dry 26_07-08.wav` - `3:04`
- `Szene_14.0 Last TRAINING DAYS Beats SAMURAI X 2.wav` - `3:36`

Recommended handling:

- Keep these as draft content until Mischa confirms the public work title and metadata.
- If uploaded, use an `audio` folder such as `samurai-scenes/`.

### Babylon ORCHESTRA portfolio PDF

- Source file: `Babylon ORCHESTRA Portfolio 2024 repertoire and links.pdf`
- This appears to be a repertoire/reference document, not a score for one Mischa work.
- Do not publish it as a score unless Mischa explicitly approves it as public site content.

## Current Import Decision

Create initial Supabase `works` rows for:

1. `the-order-of-time`
2. `water`
3. `samurai-scenes` as a draft placeholder only

Do not publish `samurai-scenes` until the title and metadata are confirmed.

