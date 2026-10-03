insert into public.works (
  slug,
  title_de,
  title_en,
  instrumentation_de,
  instrumentation_en,
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
    'work-title-placeholder',
    'Werktitel Platzhalter',
    'Work title placeholder',
    'Besetzung folgt',
    'Instrumentation TBC',
    'Platzhalterbeschreibung. Dieser Text wird ersetzt, sobald Mischa die freigegebene Werkbeschreibung liefert.',
    'Placeholder description. This text will be replaced after Mischa supplies the approved work description.',
    null,
    null,
    true,
    10,
    'published'
  )
on conflict (slug) do nothing;
