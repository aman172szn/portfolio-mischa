insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'photos',
    'photos',
    true,
    15728640,
    array['image/jpeg', 'image/png', 'image/webp']
  ),
  (
    'audio',
    'audio',
    true,
    262144000,
    array['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/ogg']
  ),
  (
    'scores',
    'scores',
    true,
    104857600,
    array['application/pdf']
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read portfolio media" on storage.objects;
create policy "Public can read portfolio media"
on storage.objects
for select
to anon, authenticated
using (bucket_id in ('photos', 'audio', 'scores'));

drop policy if exists "Admins can upload portfolio media" on storage.objects;
create policy "Admins can upload portfolio media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('photos', 'audio', 'scores')
  and public.is_admin()
);

drop policy if exists "Admins can update portfolio media" on storage.objects;
create policy "Admins can update portfolio media"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('photos', 'audio', 'scores')
  and public.is_admin()
)
with check (
  bucket_id in ('photos', 'audio', 'scores')
  and public.is_admin()
);

drop policy if exists "Admins can delete portfolio media" on storage.objects;
create policy "Admins can delete portfolio media"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('photos', 'audio', 'scores')
  and public.is_admin()
);
