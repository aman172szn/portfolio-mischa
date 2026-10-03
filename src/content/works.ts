import {
  mapWorkRowToPreview,
  type Locale,
  type SupabaseWorkRow,
  type WorkPreview,
} from './supabaseWorkPreview';
import type { Database } from '../lib/database.types';
import { getPublicMediaUrl, isSupabaseConfigured, supabase } from '../lib/supabase';

type SupabaseWorkTableRow = Database['public']['Tables']['works']['Row'];
type SupabaseWorkMediaTableRow = Database['public']['Tables']['work_media']['Row'];

export type WorkMediaItem = {
  id: string;
  type: 'audio' | 'score' | 'photo';
  title: string;
  duration: string | null;
  source: string | null;
  sortOrder: number;
};

export type WorkDetail = WorkPreview & {
  category: string | null;
  audioPath: string | null;
  scorePdfPath: string | null;
  media: WorkMediaItem[];
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

function mapWorkWithPublicMedia(row: SupabaseWorkRow, locale: Locale): WorkPreview {
  const preview = mapWorkRowToPreview(row, locale);

  return {
    ...preview,
    audioPath: getPublicMediaUrl('audio', preview.audioPath),
    coverImagePath: getPublicMediaUrl('photos', preview.coverImagePath),
    scorePdfPath: getPublicMediaUrl('scores', preview.scorePdfPath),
  };
}

function mapFallbackWorkPreview(row: SupabaseWorkRow, locale: Locale): WorkPreview {
  const preview = mapWorkRowToPreview(row, locale);

  return {
    ...preview,
    audioPath: null,
    coverImagePath: null,
    scorePdfPath: null,
  };
}

function mapFallbackWorkDetail(row: SupabaseWorkRow, locale: Locale): WorkDetail {
  const preview = mapFallbackWorkPreview(row, locale);
  const media: WorkMediaItem[] = [];

  if (row.audio_path) {
    media.push({
      id: `${row.id}-audio`,
      type: 'audio',
      title: preview.title,
      duration: row.duration,
      source: null,
      sortOrder: 10,
    });
  }

  if (row.score_pdf_path) {
    media.push({
      id: `${row.id}-score`,
      type: 'score',
      title: preview.title,
      duration: null,
      source: null,
      sortOrder: 20,
    });
  }

  return {
    ...preview,
    category: row.category,
    audioPath: null,
    scorePdfPath: null,
    media,
  };
}

function mapWorkMediaWithPublicUrl(row: SupabaseWorkMediaTableRow, locale: Locale): WorkMediaItem {
  const title = locale === 'en' && row.title_en ? row.title_en : row.title_de;

  return {
    id: row.id,
    type: row.media_type,
    title: title ?? row.storage_path,
    duration: row.duration,
    source: getPublicMediaUrl(row.storage_bucket, row.storage_path),
    sortOrder: row.sort_order,
  };
}

function mapWorkDetailWithPublicMedia(
  row: SupabaseWorkRow,
  mediaRows: SupabaseWorkMediaTableRow[],
  locale: Locale,
): WorkDetail {
  const preview = mapWorkWithPublicMedia(row, locale);

  return {
    ...preview,
    category: row.category,
    audioPath: preview.audioPath,
    scorePdfPath: preview.scorePdfPath,
    media: mediaRows
      .map((mediaRow) => mapWorkMediaWithPublicUrl(mediaRow, locale))
      .sort((first, second) => first.sortOrder - second.sortOrder),
  };
}

export function getFallbackPublishedWorkPreviews(locale: Locale): WorkPreview[] {
  return workRows
    .filter((work) => work.status === 'published')
    .sort((first, second) => first.sort_order - second.sort_order)
    .map((work) => mapFallbackWorkPreview(work, locale));
}

export async function getPublishedWorkPreviews(locale: Locale): Promise<WorkPreview[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getFallbackPublishedWorkPreviews(locale);
  }

  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  if (error || !data || data.length === 0) {
    return getFallbackPublishedWorkPreviews(locale);
  }

  return (data as SupabaseWorkTableRow[]).map((work) => mapWorkWithPublicMedia(work, locale));
}

export function getFallbackPublishedWorkBySlug(
  slug: string | undefined,
  locale: Locale,
): WorkDetail | null {
  const row = workRows.find((work) => work.slug === slug && work.status === 'published');

  if (!row) {
    return null;
  }

  return mapFallbackWorkDetail(row, locale);
}

export async function getPublishedWorkBySlug(
  slug: string | undefined,
  locale: Locale,
): Promise<WorkDetail | null> {
  if (!slug) {
    return null;
  }

  if (!isSupabaseConfigured || !supabase) {
    return getFallbackPublishedWorkBySlug(slug, locale);
  }

  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return getFallbackPublishedWorkBySlug(slug, locale);
  }

  const { data: mediaData, error: mediaError } = await supabase
    .from('work_media')
    .select('*')
    .eq('work_id', data.id)
    .eq('status', 'published')
    .order('sort_order', { ascending: true });

  return mapWorkDetailWithPublicMedia(
    data as SupabaseWorkTableRow,
    mediaError || !mediaData ? [] : (mediaData as SupabaseWorkMediaTableRow[]),
    locale,
  );
}
