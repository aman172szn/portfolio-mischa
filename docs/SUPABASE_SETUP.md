# Supabase Setup

This document describes how to create and connect the production Supabase backend.

## 1. Create the Supabase project

Create a new Supabase project in the client's Supabase organization.

Recommended starting settings:

- Name: `portfolio-mischa`
- Region: closest practical region for Berlin/EU visitors
- Plan: Free during development, Pro before production if audio files exceed Free limits or production backups are required

Do not commit project passwords, service-role keys, or access tokens.

## 2. Configure local environment

Copy `.env.example` to `.env.local`:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Use the public project URL and anon public key from Supabase project settings.

The site deliberately uses only public Vite variables in browser code.

## 3. Apply database migrations

The backend schema lives in:

```text
supabase/migrations/
```

Apply the migrations to the linked Supabase project:

```powershell
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

If the Supabase CLI is not installed, apply each migration in order through the Supabase SQL editor.

Migration order:

1. `202610030001_initial_content_schema.sql`
2. `202610030002_rls_policies.sql`
3. `202610030003_storage_buckets.sql`
4. `202610030004_work_media.sql`

## 4. Optional local seed and content import

The seed file contains clearly marked placeholder content only:

```text
supabase/seed.sql
```

Do not treat seed content as verified client material.

The supplied `all_works` folder is inventoried in:

```text
docs/CONTENT_INVENTORY.md
```

After `202610030004_work_media.sql` is applied, run the metadata import if you want the initial real content rows:

```text
supabase/content_import.sql
```

This creates `works` rows and ordered `work_media` rows only. It does not upload the actual files to Storage.

## 5. Storage buckets

The migration creates:

- `photos`
- `audio`
- `scores`

All three are public-read buckets because version 1 requires public photography, direct music playback, and downloadable full scores.

Admin uploads/updates/deletes are restricted by Storage RLS policies.

## 6. Bootstrap first admin

After the first admin user signs in through Supabase Auth, add them to `public.admin_users`.

Use the Supabase SQL editor or another trusted admin-only channel:

```sql
insert into public.admin_users (user_id, role)
values ('AUTH_USER_UUID', 'owner')
on conflict (user_id) do update
set role = excluded.role;
```

Do not expose service-role keys in the frontend.

## 7. Verify public reads

After migrations are applied and `.env.local` is configured:

```powershell
npm run dev -- --host 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/de/works
```

Expected behavior:

- published `works` rows appear
- draft and archived rows do not appear to anonymous visitors
- audio and score paths resolve through public Storage URLs
- if Supabase credentials are removed, local fallback placeholders still render

## 8. Current backend status

Implemented:

- public content tables
- admin allowlist table
- RLS policies
- public Storage buckets
- Storage RLS policies
- typed Supabase browser client
- Works catalogue/detail reads from Supabase with local fallback

Not implemented yet:

- admin dashboard UI
- Auth login UI
- content editing forms
- automatic translation function
- Dates and News Supabase read services
- Storage upload of inventoried production media
