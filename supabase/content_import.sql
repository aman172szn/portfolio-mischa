-- Initial content import for supplied all_works media.
-- Run after migrations. This file inserts/upserts metadata only.
-- Upload media files to Supabase Storage separately using the paths referenced below.

insert into public.works (
  slug,
  title_de,
  title_en,
  year,
  category,
  instrumentation_de,
  instrumentation_en,
  duration,
  description_de,
  description_en,
  audio_path,
  score_pdf_path,
  featured,
  sort_order,
  status
)
values
  (
    'the-order-of-time',
    'the order of time',
    'the order of time',
    2024,
    'orchestra',
    'fur grosses Orchester und Solistengruppe mit traditionellen Instrumenten: Tonbak und Daf, Santoor, Duduk, Zurna, Kamanche',
    'for large orchestra and soloist group with traditional instruments: tonbak and daf, santoor, duduk, zurna, kamanche',
    'ca. 27 min.',
    'Auftragswerk der Staatsoper Stuttgart. Urauffuhrung im Beethovensaal der Liederhalle Stuttgart am 27.10.2024 durch Musiker des Babylon ORCHESTRA und das Staatsorchester Stuttgart, Dirigat Tianyi Lu.',
    'Commissioned by State Orchestra Stuttgart / State Opera Stuttgart. Premiered at Liederhalle Stuttgart on 2024-10-27 by musicians of Babylon ORCHESTRA and the orchestra of State Opera Stuttgart, conducted by Tianyi Lu.',
    'the-order-of-time/order-of-time-movement-1-live.mp3',
    'the-order-of-time/the-order-of-time-full-score-2024.pdf',
    true,
    10,
    'published'
  ),
  (
    'water',
    'WATER',
    'WATER',
    2022,
    'orchestra',
    'fur grosses Orchester',
    'for large orchestra',
    'ca. 14 min.',
    'WATER fur grosses Orchester. Full Score, 2020-22.',
    'WATER for large orchestra. Full score, 2020-22.',
    'water/water-first-part-rsb-berlin-ua-2022.mp3',
    'water/water-full-score-2022.pdf',
    false,
    20,
    'published'
  ),
  (
    'samurai-scenes',
    'Samurai Szenen',
    'Samurai scenes',
    null,
    'stage',
    'Besetzung folgt',
    'Instrumentation TBC',
    null,
    'Arbeitsfassung. Titel, Jahr, Besetzung und offentliche Beschreibung mussen noch freigegeben werden.',
    'Draft entry. Title, year, instrumentation, and public description still need approval.',
    'samurai-scenes/szene-4-5-storytelling-music-samurai-x-sketch-260816.wav',
    null,
    false,
    30,
    'draft'
  )
on conflict (slug) do update
set
  title_de = excluded.title_de,
  title_en = excluded.title_en,
  year = excluded.year,
  category = excluded.category,
  instrumentation_de = excluded.instrumentation_de,
  instrumentation_en = excluded.instrumentation_en,
  duration = excluded.duration,
  description_de = excluded.description_de,
  description_en = excluded.description_en,
  audio_path = excluded.audio_path,
  score_pdf_path = excluded.score_pdf_path,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  status = excluded.status;

with work_ids as (
  select id, slug
  from public.works
  where slug in ('the-order-of-time', 'water', 'samurai-scenes')
)
insert into public.work_media (
  work_id,
  media_type,
  title_de,
  title_en,
  storage_bucket,
  storage_path,
  duration,
  sort_order,
  is_primary,
  status
)
select
  work_ids.id,
  media.media_type,
  media.title_de,
  media.title_en,
  media.storage_bucket,
  media.storage_path,
  media.duration,
  media.sort_order,
  media.is_primary,
  media.status
from (
  values
    (
      'the-order-of-time',
      'score',
      'Full Score',
      'Full score',
      'scores',
      'the-order-of-time/the-order-of-time-full-score-2024.pdf',
      null,
      10,
      true,
      'published'
    ),
    (
      'the-order-of-time',
      'audio',
      'Movement 1 - live',
      'Movement 1 - live',
      'audio',
      'the-order-of-time/order-of-time-movement-1-live.mp3',
      '6:14',
      20,
      true,
      'published'
    ),
    (
      'the-order-of-time',
      'audio',
      'Movement 2 - live',
      'Movement 2 - live',
      'audio',
      'the-order-of-time/order-of-time-movement-2.mp3',
      '7:47',
      30,
      false,
      'published'
    ),
    (
      'the-order-of-time',
      'audio',
      'Movement 3 - live',
      'Movement 3 - live',
      'audio',
      'the-order-of-time/order-of-time-movement-3.mp3',
      '5:18',
      40,
      false,
      'published'
    ),
    (
      'the-order-of-time',
      'audio',
      'Movement 5 - live',
      'Movement 5 - live',
      'audio',
      'the-order-of-time/order-of-time-movement-5.mp3',
      '7:59',
      50,
      false,
      'published'
    ),
    (
      'water',
      'score',
      'Full Score',
      'Full score',
      'scores',
      'water/water-full-score-2022.pdf',
      null,
      10,
      true,
      'published'
    ),
    (
      'water',
      'audio',
      'First part - RSB Berlin UA 2022',
      'First part - RSB Berlin UA 2022',
      'audio',
      'water/water-first-part-rsb-berlin-ua-2022.mp3',
      null,
      20,
      true,
      'published'
    ),
    (
      'water',
      'audio',
      'Second part - RSB Berlin UA 2022',
      'Second part - RSB Berlin UA 2022',
      'audio',
      'water/water-second-part-rsb-berlin-ua-2022.mp3',
      null,
      30,
      false,
      'published'
    ),
    (
      'samurai-scenes',
      'audio',
      'Szene 4.5 Storytelling',
      'Scene 4.5 Storytelling',
      'audio',
      'samurai-scenes/szene-4-5-storytelling-music-samurai-x-sketch-260816.wav',
      '1:55',
      10,
      true,
      'draft'
    ),
    (
      'samurai-scenes',
      'audio',
      'Szene 5.2 Duel',
      'Scene 5.2 Duel',
      'audio',
      'samurai-scenes/szene-5-2-duel-streetguy-samurai.wav',
      '2:42',
      20,
      false,
      'draft'
    ),
    (
      'samurai-scenes',
      'audio',
      'Szene 12.5 Big Choreo',
      'Scene 12.5 Big Choreo',
      'audio',
      'samurai-scenes/szene-12-5-big-choreo-samurai-beat-2-new-dry-26-07-08.wav',
      '3:04',
      30,
      false,
      'draft'
    ),
    (
      'samurai-scenes',
      'audio',
      'Szene 14.0 Last Training Days',
      'Scene 14.0 Last Training Days',
      'audio',
      'samurai-scenes/szene-14-0-last-training-days-beats-samurai-x-2.wav',
      '3:36',
      40,
      false,
      'draft'
    )
) as media (
  work_slug,
  media_type,
  title_de,
  title_en,
  storage_bucket,
  storage_path,
  duration,
  sort_order,
  is_primary,
  status
)
join work_ids on work_ids.slug = media.work_slug
on conflict (storage_bucket, storage_path) do update
set
  work_id = excluded.work_id,
  media_type = excluded.media_type,
  title_de = excluded.title_de,
  title_en = excluded.title_en,
  duration = excluded.duration,
  sort_order = excluded.sort_order,
  is_primary = excluded.is_primary,
  status = excluded.status;
