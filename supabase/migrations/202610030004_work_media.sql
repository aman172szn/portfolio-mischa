create table if not exists public.work_media (
  id uuid primary key default gen_random_uuid(),
  work_id uuid not null references public.works(id) on delete cascade,
  media_type text not null check (media_type in ('audio', 'score', 'photo')),
  title_de text,
  title_en text,
  storage_bucket text not null check (storage_bucket in ('audio', 'scores', 'photos')),
  storage_path text not null,
  duration text,
  sort_order integer not null default 0,
  is_primary boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (storage_bucket, storage_path)
);

create index if not exists work_media_work_id_sort_order_idx on public.work_media (work_id, sort_order);
create index if not exists work_media_status_type_idx on public.work_media (status, media_type);

drop trigger if exists set_work_media_updated_at on public.work_media;
create trigger set_work_media_updated_at
before update on public.work_media
for each row execute function public.set_updated_at();

alter table public.work_media enable row level security;

drop policy if exists "Public can read published work media" on public.work_media;
create policy "Public can read published work media"
on public.work_media
for select
to anon, authenticated
using (
  public.is_admin()
  or (
    status = 'published'
    and exists (
      select 1
      from public.works
      where works.id = work_media.work_id
        and works.status = 'published'
    )
  )
);

drop policy if exists "Admins can insert work media" on public.work_media;
create policy "Admins can insert work media"
on public.work_media
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update work media" on public.work_media;
create policy "Admins can update work media"
on public.work_media
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete work media" on public.work_media;
create policy "Admins can delete work media"
on public.work_media
for delete
to authenticated
using (public.is_admin());

