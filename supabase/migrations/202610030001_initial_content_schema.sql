create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.works (
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

create table if not exists public.events (
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

create table if not exists public.news (
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

create table if not exists public.site_settings (
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

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('owner', 'editor')),
  created_at timestamptz not null default now()
);

create index if not exists works_status_sort_order_idx on public.works (status, sort_order);
create index if not exists works_slug_status_idx on public.works (slug, status);
create index if not exists events_status_date_idx on public.events (status, event_date);
create index if not exists news_status_publication_date_idx on public.news (status, publication_date desc);

drop trigger if exists set_works_updated_at on public.works;
create trigger set_works_updated_at
before update on public.works
for each row execute function public.set_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists set_news_updated_at on public.news;
create trigger set_news_updated_at
before update on public.news
for each row execute function public.set_updated_at();

drop trigger if exists set_site_settings_updated_at on public.site_settings;
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

insert into public.site_settings (id, name, title_de, title_en, default_language)
values (true, 'Mischa Tangian', 'Komponist', 'Composer', 'de')
on conflict (id) do nothing;
