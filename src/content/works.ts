import {
  mapWorkRowToPreview,
  type Locale,
  type SupabaseWorkRow,
  type WorkPreview,
} from './supabaseWorkPreview';

export type WorkDetail = WorkPreview & {
  category: string | null;
  audioPath: string | null;
  scorePdfPath: string | null;
};

const placeholderDescription = {
  de: 'Platzhalterbeschreibung. Dieser Text wird ersetzt, sobald Mischa die freigegebene Werkbeschreibung liefert.',
  en: 'Placeholder description. This text will be replaced after Mischa supplies the approved work description.',
};

export const workRows = [
  {
    id: '00000000-0000-4000-8000-000000000001',
    slug: 'work-title-placeholder',
    title_de: 'Werktitel Platzhalter',
    title_en: 'Work title placeholder',
    year: null,
    category: null,
    instrumentation_de: 'Besetzung folgt',
    instrumentation_en: 'Instrumentation TBC',
    duration: null,
    description_de: placeholderDescription.de,
    description_en: placeholderDescription.en,
    cover_image_path: null,
    audio_path: 'audio/work-placeholder.mp3',
    score_pdf_path: 'scores/work-placeholder.pdf',
    featured: true,
    sort_order: 10,
    status: 'published',
    created_at: '2026-10-03T00:00:00.000Z',
    updated_at: '2026-10-03T00:00:00.000Z',
  },
  {
    id: '00000000-0000-4000-8000-000000000002',
    slug: 'second-work-placeholder',
    title_de: 'Zweiter Werkplatzhalter',
    title_en: 'Second work placeholder',
    year: null,
    category: null,
    instrumentation_de: 'Besetzung folgt',
    instrumentation_en: 'Instrumentation TBC',
    duration: null,
    description_de: placeholderDescription.de,
    description_en: placeholderDescription.en,
    cover_image_path: null,
    audio_path: null,
    score_pdf_path: 'scores/second-work-placeholder.pdf',
    featured: false,
    sort_order: 20,
    status: 'published',
    created_at: '2026-10-03T00:00:00.000Z',
    updated_at: '2026-10-03T00:00:00.000Z',
  },
  {
    id: '00000000-0000-4000-8000-000000000003',
    slug: 'archive-work-placeholder',
    title_de: 'Archivwerk Platzhalter',
    title_en: 'Archive work placeholder',
    year: null,
    category: null,
    instrumentation_de: 'Besetzung folgt',
    instrumentation_en: 'Instrumentation TBC',
    duration: null,
    description_de: placeholderDescription.de,
    description_en: placeholderDescription.en,
    cover_image_path: null,
    audio_path: 'audio/archive-work-placeholder.mp3',
    score_pdf_path: null,
    featured: false,
    sort_order: 30,
    status: 'published',
    created_at: '2026-10-03T00:00:00.000Z',
    updated_at: '2026-10-03T00:00:00.000Z',
  },
] satisfies SupabaseWorkRow[];

export function getPublishedWorkPreviews(locale: Locale): WorkPreview[] {
  return workRows
    .filter((work) => work.status === 'published')
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((work) => mapWorkRowToPreview(work, locale));
}

export function getPublishedWorkBySlug(
  slug: string | undefined,
  locale: Locale,
): WorkDetail | null {
  const row = workRows.find((work) => work.slug === slug && work.status === 'published');

  if (!row) {
    return null;
  }

  return {
    ...mapWorkRowToPreview(row, locale),
    category: row.category,
    audioPath: row.audio_path,
    scorePdfPath: row.score_pdf_path,
  };
}
