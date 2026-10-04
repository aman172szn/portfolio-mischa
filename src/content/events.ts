import type { Database } from '../lib/database.types';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { Locale } from './supabaseWorkPreview';

type EventRow = Database['public']['Tables']['events']['Row'];

export type PublicEvent = {
  id: string;
  date: string | null;
  title: string;
  type: string | null;
  city: string | null;
  venue: string | null;
  description: string | null;
  externalLink: string | null;
  featured: boolean;
};

const fallbackEvents: EventRow[] = [
  {
    id: '00000000-0000-4000-8000-000000000101',
    city: null,
    created_at: '2026-10-03T00:00:00.000Z',
    description_de: 'Stadt, Ort, Programm und Werkbezug werden noch geliefert.',
    description_en: 'City, venue, programme and work reference to be supplied.',
    event_date: null,
    event_title_de: 'Kommender Auftritt Platzhalter',
    event_title_en: 'Upcoming performance placeholder',
    external_link: null,
    featured: true,
    status: 'published',
    type_de: null,
    type_en: null,
    updated_at: '2026-10-03T00:00:00.000Z',
    venue: null,
    work_id: null,
  },
  {
    id: '00000000-0000-4000-8000-000000000102',
    city: null,
    created_at: '2026-10-03T00:00:00.000Z',
    description_de: 'Historische Konzertdetails werden dasselbe Terminmodell nutzen.',
    description_en: 'Historical concert details will use the same event model.',
    event_date: '2024-01-01',
    event_title_de: 'Archiv-Eintrag Platzhalter',
    event_title_en: 'Archive entry placeholder',
    external_link: null,
    featured: false,
    status: 'published',
    type_de: null,
    type_en: null,
    updated_at: '2026-10-03T00:00:00.000Z',
    venue: null,
    work_id: null,
  },
];

function localized(primary: string | null, fallback: string | null) {
  return primary?.trim() || fallback?.trim() || null;
}

function mapEvent(row: EventRow, locale: Locale): PublicEvent {
  const title = locale === 'en'
    ? localized(row.event_title_en, row.event_title_de)
    : localized(row.event_title_de, row.event_title_en);
  const type = locale === 'en'
    ? localized(row.type_en, row.type_de)
    : localized(row.type_de, row.type_en);
  const description = locale === 'en'
    ? localized(row.description_en, row.description_de)
    : localized(row.description_de, row.description_en);

  return {
    id: row.id,
    date: row.event_date,
    title: title ?? (locale === 'de' ? 'Termin ohne Titel' : 'Untitled event'),
    type,
    city: row.city,
    venue: row.venue,
    description,
    externalLink: row.external_link,
    featured: row.featured,
  };
}

function splitEvents(events: PublicEvent[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter((event) => !event.date || new Date(event.date) >= today)
    .sort((first, second) => {
      if (!first.date && !second.date) return 0;
      if (!first.date) return 1;
      if (!second.date) return -1;
      return new Date(first.date).getTime() - new Date(second.date).getTime();
    });

  const archive = events
    .filter((event) => event.date && new Date(event.date) < today)
    .sort((first, second) => new Date(second.date ?? 0).getTime() - new Date(first.date ?? 0).getTime());

  return { upcoming, archive };
}

export function getFallbackPublishedEvents(locale: Locale) {
  return splitEvents(fallbackEvents.map((event) => mapEvent(event, locale)));
}

export async function getPublishedEvents(locale: Locale): Promise<{ upcoming: PublicEvent[]; archive: PublicEvent[] }> {
  if (!isSupabaseConfigured || !supabase) {
    return getFallbackPublishedEvents(locale);
  }

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('event_date', { ascending: true, nullsFirst: false });

  if (error || !data || data.length === 0) {
    return getFallbackPublishedEvents(locale);
  }

  return splitEvents(data.map((event) => mapEvent(event, locale)));
}

export async function getHomepageEvents(locale: Locale): Promise<PublicEvent[]> {
  const { upcoming } = await getPublishedEvents(locale);
  const featured = upcoming.filter((event) => event.featured).slice(0, 2);
  return featured.length > 0 ? featured : upcoming.slice(0, 2);
}
