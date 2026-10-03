export type PublishStatus = 'draft' | 'published' | 'archived';

export type SupabaseWorkRow = {
  id: string;
  slug: string;
  title_de: string;
  title_en: string | null;
  year: number | null;
  category: string | null;
  instrumentation_de: string | null;
  instrumentation_en: string | null;
  duration: string | null;
  description_de: string | null;
  description_en: string | null;
  cover_image_path: string | null;
  audio_path: string | null;
  score_pdf_path: string | null;
  featured: boolean;
  sort_order: number;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
};

export type Locale = 'de' | 'en';

export type WorkPreview = {
  id: string;
  slug: string;
  title: string;
  year: number | null;
  instrumentation: string | null;
  description: string | null;
  duration: string | null;
  coverImagePath: string | null;
  scorePdfPath: string | null;
  hasAudio: boolean;
  hasScore: boolean;
  featured: boolean;
};

export function mapWorkRowToPreview(
  row: SupabaseWorkRow,
  locale: Locale,
): WorkPreview {
  const title = locale === 'en' && row.title_en ? row.title_en : row.title_de;
  const instrumentation =
    locale === 'en' && row.instrumentation_en
      ? row.instrumentation_en
      : row.instrumentation_de;
  const description =
    locale === 'en' && row.description_en ? row.description_en : row.description_de;

  return {
    id: row.id,
    slug: row.slug,
    title,
    year: row.year,
    instrumentation,
    description,
    duration: row.duration,
    coverImagePath: row.cover_image_path,
    scorePdfPath: row.score_pdf_path,
    hasAudio: Boolean(row.audio_path),
    hasScore: Boolean(row.score_pdf_path),
    featured: row.featured,
  };
}

export const sampleWorkRow = {
  id: '00000000-0000-4000-8000-000000000001',
  slug: 'work-title-placeholder',
  title_de: 'Werktitel Platzhalter',
  title_en: 'Work title placeholder',
  year: null,
  category: null,
  instrumentation_de: null,
  instrumentation_en: null,
  duration: null,
  description_de: null,
  description_en: null,
  cover_image_path: 'photos/work-placeholder.webp',
  audio_path: 'audio/work-placeholder.mp3',
  score_pdf_path: 'scores/work-placeholder.pdf',
  featured: true,
  sort_order: 0,
  status: 'published',
  created_at: '2026-10-03T00:00:00.000Z',
  updated_at: '2026-10-03T00:00:00.000Z',
} satisfies SupabaseWorkRow;

export const sampleWorkPreview = mapWorkRowToPreview(sampleWorkRow, 'en');
