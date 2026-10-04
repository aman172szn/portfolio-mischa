import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Tables = Database['public']['Tables'];

export type AdminWork = Tables['works']['Row'];
export type AdminEvent = Tables['events']['Row'];
export type AdminWorkMedia = Tables['work_media']['Row'];
export type AdminWorkStatus = AdminWork['status'];
export type AdminEventStatus = AdminEvent['status'];
export type AdminMediaType = AdminWorkMedia['media_type'];
export type AdminMediaBucket = AdminWorkMedia['storage_bucket'];
export type AdminWorkInput = Pick<AdminWork,
  'slug' | 'title_de' | 'title_en' | 'year' | 'category' | 'instrumentation_de' | 'instrumentation_en'
  | 'duration' | 'description_de' | 'description_en' | 'featured' | 'sort_order' | 'status'>;
export type AdminMediaInput = Pick<AdminWorkMedia,
  'title_de' | 'title_en' | 'duration' | 'sort_order' | 'status'>;
export type AdminEventInput = Pick<AdminEvent,
  'event_date' | 'city' | 'venue' | 'event_title_de' | 'event_title_en' | 'type_de' | 'type_en'
  | 'description_de' | 'description_en' | 'external_link' | 'featured' | 'status' | 'work_id'>;

export type AdminWorkDetail = AdminWork & {
  media: AdminWorkMedia[];
};

const mediaBuckets = {
  audio: 'audio',
  score: 'scores',
  photo: 'photos',
} satisfies Record<AdminMediaType, AdminMediaBucket>;

function assertSupabase() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function safeFileName(fileName: string) {
  const parts = fileName.split('.');
  const extension = parts.length > 1 ? `.${parts.pop()?.toLowerCase()}` : '';
  const base = slugify(parts.join('.') || fileName) || 'media';
  return `${base}${extension}`;
}

export function makeWorkSlug(title: string) {
  return slugify(title) || `work-${Date.now()}`;
}

export function mediaBucketForType(mediaType: AdminMediaType): AdminMediaBucket {
  return mediaBuckets[mediaType];
}

export async function readAdminWorks(): Promise<AdminWork[] | null> {
  const client = assertSupabase();

  const { data: user, error: userError } = await client.auth.getUser();
  if (userError || !user.user) throw new Error('Session could not be verified');

  const { data: allowed, error: accessError } = await client.rpc('is_admin');
  if (accessError) throw new Error('Admin access could not be verified');
  if (!allowed) return null;

  const { data, error } = await client.from('works')
    .select('*')
    .order('sort_order').order('year', { ascending: false, nullsFirst: false });
  if (error) throw new Error('Works could not be loaded');
  return data;
}

export async function readAdminWorkOptions(): Promise<Pick<AdminWork, 'id' | 'title_de' | 'title_en' | 'year'>[]> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('works')
    .select('id, title_de, title_en, year')
    .order('sort_order')
    .order('year', { ascending: false, nullsFirst: false });
  if (error) throw new Error('Work options could not be loaded');
  return data;
}

export async function readAdminEvents(): Promise<AdminEvent[] | null> {
  const client = assertSupabase();

  const { data: user, error: userError } = await client.auth.getUser();
  if (userError || !user.user) throw new Error('Session could not be verified');

  const { data: allowed, error: accessError } = await client.rpc('is_admin');
  if (accessError) throw new Error('Admin access could not be verified');
  if (!allowed) return null;

  const { data, error } = await client
    .from('events')
    .select('*')
    .order('event_date', { ascending: false, nullsFirst: false })
    .order('updated_at', { ascending: false });
  if (error) throw new Error('Events could not be loaded');
  return data;
}

export async function createAdminEvent(input: AdminEventInput): Promise<AdminEvent> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('events')
    .insert(input)
    .select('*')
    .single();
  if (error || !data) throw new Error('Event could not be created');
  return data;
}

export async function updateAdminEvent(eventId: string, input: AdminEventInput): Promise<AdminEvent> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('events')
    .update(input)
    .eq('id', eventId)
    .select('*')
    .single();
  if (error || !data) throw new Error('Event could not be saved');
  return data;
}

export async function updateAdminEventStatus(eventId: string, status: AdminEventStatus): Promise<AdminEvent> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('events')
    .update({ status })
    .eq('id', eventId)
    .select('*')
    .single();
  if (error || !data) throw new Error('Event status could not be saved');
  return data;
}

export async function readAdminWorkDetail(workId: string): Promise<AdminWorkDetail> {
  const client = assertSupabase();
  const { data: work, error: workError } = await client
    .from('works')
    .select('*')
    .eq('id', workId)
    .single();
  if (workError || !work) throw new Error('Work could not be loaded');

  const { data: media, error: mediaError } = await client
    .from('work_media')
    .select('*')
    .eq('work_id', workId)
    .order('media_type', { ascending: true })
    .order('sort_order', { ascending: true });
  if (mediaError) throw new Error('Work media could not be loaded');

  return { ...work, media: media ?? [] };
}

export async function createAdminWork(input: AdminWorkInput): Promise<AdminWork> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('works')
    .insert(input)
    .select('*')
    .single();
  if (error || !data) throw new Error('Work could not be created');
  return data;
}

export async function updateAdminWork(workId: string, input: AdminWorkInput): Promise<AdminWork> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('works')
    .update(input)
    .eq('id', workId)
    .select('*')
    .single();
  if (error || !data) throw new Error('Work could not be saved');
  return data;
}

export async function updateAdminWorkStatus(workId: string, status: AdminWorkStatus): Promise<AdminWork> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('works')
    .update({ status })
    .eq('id', workId)
    .select('*')
    .single();
  if (error || !data) throw new Error('Work status could not be saved');
  return data;
}

export async function updateAdminMedia(mediaId: string, input: AdminMediaInput): Promise<AdminWorkMedia> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('work_media')
    .update(input)
    .eq('id', mediaId)
    .select('*')
    .single();
  if (error || !data) throw new Error('Media could not be saved');
  return data;
}

export async function setPrimaryAdminMedia(workId: string, media: AdminWorkMedia): Promise<void> {
  const client = assertSupabase();
  const { error: clearError } = await client
    .from('work_media')
    .update({ is_primary: false })
    .eq('work_id', workId)
    .eq('media_type', media.media_type);
  if (clearError) throw new Error('Primary media could not be cleared');

  const { error: mediaError } = await client
    .from('work_media')
    .update({ is_primary: true })
    .eq('id', media.id);
  if (mediaError) throw new Error('Primary media could not be saved');

  const workUpdate: Tables['works']['Update'] = {};
  if (media.media_type === 'audio') workUpdate.audio_path = media.storage_path;
  if (media.media_type === 'score') workUpdate.score_pdf_path = media.storage_path;
  if (media.media_type === 'photo') workUpdate.cover_image_path = media.storage_path;

  if (Object.keys(workUpdate).length > 0) {
    const { error: workError } = await client.from('works').update(workUpdate).eq('id', workId);
    if (workError) throw new Error('Primary work media path could not be saved');
  }
}

export async function deleteAdminMedia(workId: string, media: AdminWorkMedia): Promise<void> {
  const client = assertSupabase();
  const { error: storageError } = await client.storage.from(media.storage_bucket).remove([media.storage_path]);
  if (storageError) throw new Error('Stored file could not be deleted');

  const { error: rowError } = await client.from('work_media').delete().eq('id', media.id);
  if (rowError) throw new Error('Media row could not be deleted');

  if (media.is_primary) {
    const workUpdate: Tables['works']['Update'] = {};
    if (media.media_type === 'audio') workUpdate.audio_path = null;
    if (media.media_type === 'score') workUpdate.score_pdf_path = null;
    if (media.media_type === 'photo') workUpdate.cover_image_path = null;
    if (Object.keys(workUpdate).length > 0) {
      await client.from('works').update(workUpdate).eq('id', workId);
    }
  }
}

export async function uploadAdminMedia(params: {
  work: Pick<AdminWork, 'id' | 'slug'>;
  mediaType: AdminMediaType;
  file: File;
  titleDe: string;
  titleEn: string;
  duration: string;
  sortOrder: number;
  status: AdminWorkStatus;
  makePrimary: boolean;
}): Promise<AdminWorkMedia> {
  const client = assertSupabase();
  const bucket = mediaBucketForType(params.mediaType);
  const path = `${params.work.slug}/${Date.now()}-${safeFileName(params.file.name)}`;
  const { error: uploadError } = await client.storage
    .from(bucket)
    .upload(path, params.file, { cacheControl: '3600', upsert: false });
  if (uploadError) throw new Error('File could not be uploaded');

  const { data, error: insertError } = await client
    .from('work_media')
    .insert({
      work_id: params.work.id,
      media_type: params.mediaType,
      storage_bucket: bucket,
      storage_path: path,
      title_de: params.titleDe.trim() || params.file.name,
      title_en: params.titleEn.trim() || null,
      duration: params.duration.trim() || null,
      sort_order: params.sortOrder,
      status: params.status,
      is_primary: false,
    })
    .select('*')
    .single();

  if (insertError || !data) {
    await client.storage.from(bucket).remove([path]);
    throw new Error('Media metadata could not be saved');
  }

  if (params.makePrimary) {
    await setPrimaryAdminMedia(params.work.id, data);
    return { ...data, is_primary: true };
  }

  return data;
}
