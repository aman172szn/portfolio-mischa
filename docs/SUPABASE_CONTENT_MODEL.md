# Supabase Content Model Spike

Status: decision draft for `T0005`.

This document validates Supabase as the backend for the Mischa Tangian portfolio.

## Decision

Use Supabase for the first production backend:

- Supabase Postgres for structured content.
- Supabase Auth for Mischa's admin login.
- Supabase Storage for photographs, audio files, and score PDFs.
- A custom `/admin` dashboard in the site for day-to-day editing.

Do not add MongoDB, a custom API server, or a separate CMS unless a later ticket proves Supabase cannot satisfy the workflow.

## Content Types

### works

Purpose: catalogue entries and work detail pages.

Recommended columns:

```sql
create table public.works (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_de text not null,
  title_en text,
  year integer,
  category text,
  instrumentation_de text,
  instrumentation_en text,
  duration text,
  description_de text,
  description_en text,
  cover_image_path text,
  audio_path text,
  score_pdf_path text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

German fields are the source content. English fields are generated automatically from German content and stored after generation so the public site can render quickly and consistently.

### work_media

Purpose: ordered media assets for a work, including multiple audio tracks, score PDFs, and later photos.

The `works.audio_path` and `works.score_pdf_path` fields remain the primary media used by the current public catalogue/detail UI. `work_media` stores the complete ordered set for admin/media workflows and future richer public display.

Recommended columns:

```sql
create table public.work_media (
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
```

### events

Purpose: Dates page, homepage current dates, and performance archive.

Recommended columns:

```sql
create table public.events (
  id uuid primary key default gen_random_uuid(),
  work_id uuid references public.works(id) on delete set null,
  event_date date,
  city text,
  venue text,
  event_title_de text,
  event_title_en text,
  type_de text,
  type_en text,
  description_de text,
  description_en text,
  external_link text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### news

Purpose: homepage latest news, news archive, and article pages.

Recommended columns:

```sql
create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  publication_date date,
  title_de text not null,
  title_en text,
  excerpt_de text,
  excerpt_en text,
  content_de text,
  content_en text,
  image_path text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### site_settings

Purpose: global editable settings.

Recommended columns:

```sql
create table public.site_settings (
  id boolean primary key default true check (id),
  name text not null default 'Mischa Tangian',
  title_de text not null default 'Komponist',
  title_en text not null default 'Composer',
  email text,
  hero_image_path text,
  about_image_path text,
  social_links jsonb not null default '[]'::jsonb,
  default_language text not null default 'de' check (default_language in ('de', 'en')),
  updated_at timestamptz not null default now()
);
```

## Auth Model

Use Supabase Auth with a small allowlist table rather than open registration.

```sql
create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);
```

Only rows in `admin_users` can access admin insert/update/delete policies. The public site reads only `published` content.

## Storage Buckets

Use three buckets so file types and limits can be managed separately.

| Bucket | Access | File types | Initial content | Suggested limit |
| --- | --- | --- | --- | --- |
| `photos` | public read, admin write | `image/jpeg`, `image/png`, `image/webp` | 10 photographs | 15 MB per file |
| `audio` | public read, admin write | `audio/mpeg`, `audio/mp4`, `audio/wav`, `audio/ogg` | 10 audio files | 250 MB per file |
| `scores` | public read, admin write | `application/pdf` | 10 score PDFs | 100 MB per file |

Because visitors can view/download full scores and play music publicly, public-read buckets are acceptable for version 1. Upload, update, move, and delete operations stay restricted to authenticated admins through Storage RLS.

Supabase supports bucket-level file type and file size restrictions. Current official docs state Free projects have a 50 MB global file size ceiling, while Pro and higher can set up to 500 GB. That means the audio bucket may require Pro if individual uploaded audio files exceed 50 MB. Source: https://supabase.com/docs/guides/storage/uploads/file-limits

## Storage Policies

Recommended policy direction:

- Public read for objects in `photos`, `audio`, and `scores`.
- Authenticated admin insert/update/delete only.
- No anonymous uploads.
- No visitor delete/update/list management actions.

Policy sketch:

```sql
create policy "Public can read public media"
on storage.objects
for select
using (bucket_id in ('photos', 'audio', 'scores'));

create policy "Admins can upload media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id in ('photos', 'audio', 'scores')
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "Admins can update media"
on storage.objects
for update
to authenticated
using (
  bucket_id in ('photos', 'audio', 'scores')
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
)
with check (
  bucket_id in ('photos', 'audio', 'scores')
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "Admins can delete media"
on storage.objects
for delete
to authenticated
using (
  bucket_id in ('photos', 'audio', 'scores')
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = auth.uid()
  )
);
```

Supabase Storage uses Postgres RLS policies on `storage.objects`; uploads require an `INSERT` policy, and upserts require additional `SELECT` and `UPDATE` permissions. Source: https://supabase.com/docs/guides/storage/security/access-control

## Public Data Policies

Recommended table policy direction:

```sql
alter table public.works enable row level security;
alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;
```

For public tables:

- Anonymous users can select only rows where `status = 'published'`.
- Admin users can select drafts and published rows.
- Admin users can insert/update/delete content.
- Public users cannot write.

For `site_settings`:

- Anonymous users can select the single settings row.
- Admin users can update it.

## Admin Workflow

Recommended `/admin` sections:

1. Login
2. Works
3. Dates
4. News
5. Media library
6. Site settings

For each content item:

- Mischa enters German source content.
- The admin dashboard requests English translation.
- The generated English fields are stored in Supabase.
- Mischa can review/edit if a later ticket adds manual editing.
- Draft/published status controls public visibility.

The first implementation should avoid a complex CMS interface. Use plain forms, upload controls, preview links, and clear publish state.

## Cost and Upgrade Path

Current official Supabase pricing lists:

- Free: $0 per month, 500 MB database size per project.
- Pro: starts at $25 per month, includes 8 GB disk per project and 100 GB file storage, then usage-based overages.
- Pro includes enough compute credit to cover one Micro instance.

Source: https://supabase.com/pricing

Recommendation:

- Use Free during early development if files remain below the 50 MB upload ceiling.
- Move to Pro before production if audio uploads exceed 50 MB, if production backups/support are needed, or if storage exceeds free limits.
- Keep spend cap enabled at first.
- Review Supabase usage monthly after launch.

## Backup and Export

Recommended:

- Database: use Supabase dashboard backups on Pro and periodic `supabase db dump` exports for independent backups.
- Storage: keep original media files in a separate client-owned folder outside Supabase.
- Metadata: because storage backups do not restore deleted file objects, treat Supabase Storage as the serving layer, not the only archive.
- Before major content imports, export database and download/verify all production media.

Supabase docs state Pro projects can access 7 days of daily backups, Free projects should export data with `supabase db dump`, and database backups do not include Storage API objects. Source: https://supabase.com/docs/guides/platform/backups

## Local Proof of Concept

The file `src/content/supabaseWorkPreview.ts` models the `works` row shape and maps one example row to the public work-preview shape.

The public app now has a Supabase client integration in `src/lib/supabase.ts`. Configure these Vite variables locally:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

They are documented in `.env.example`; real `.env` files are ignored by git.

`src/content/works.ts` reads published rows from the Supabase `works` table when those variables are present. When they are absent, or when a public read fails, it falls back to clearly labelled local placeholder rows so development and builds still work without credentials.

Audio, photo, and score paths are mapped to public Supabase Storage URLs through the `audio`, `photos`, and `scores` buckets.

## Backend Files

The committed backend setup lives in:

```text
supabase/config.toml
supabase/migrations/
supabase/seed.sql
docs/SUPABASE_SETUP.md
```

The hosted project still needs to be created or linked by someone with Supabase account access.

## Open Implementation Decisions

- Exact translation provider and whether translation runs client-side, server-side, or through Supabase Edge Functions.
- Whether public media URLs are direct public bucket URLs or routed through a media helper.
- Whether deleted files should be soft-deleted first to avoid broken public links.
- Final per-bucket file size limits after sample audio/PDF files are available.
- Whether drafts need scheduled publishing later.
