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

In Supabase, open **Authentication > Users > Add user > Create new user**.
Create the client's email/password account and mark the email confirmed. There is no public registration form.
Copy that Auth user's UUID, then add them to `public.admin_users` once:

Use the Supabase SQL editor or another trusted admin-only channel:

```sql
insert into public.admin_users (user_id, role)
values ('AUTH_USER_UUID', 'owner')
on conflict (user_id) do update
set role = excluded.role;
```

Do not expose service-role keys in the frontend.

Open `http://127.0.0.1:5173/admin` and sign in with that email and password.
The dashboard checks the authenticated user and `is_admin()` before reading works.
It lists published, draft, and archived works and provides the everyday editing workflow.
SQL is needed only for this initial allowlist setup.

## 7. Admin works workflow

After signing in at `/admin`, use the works dashboard for normal content maintenance:

- create and edit work metadata in German and English fields
- switch works between draft, published, and archived
- upload audio files to `audio`, score PDFs to `scores`, and photographs to `photos`
- edit media titles, status, duration, and sort order
- set the primary audio, score, or photo for the public work page
- remove uploaded media when needed

The dashboard uses the authenticated browser session and the existing RLS policies.
Do not paste service-role keys into the app or browser.

## 8. Verify public reads

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

## 9. Current backend status

Implemented:

- public content tables
- admin allowlist table
- RLS policies
- public Storage buckets
- Storage RLS policies
- typed Supabase browser client
- Works catalogue/detail reads from Supabase with local fallback
- admin works editing and media upload dashboard

Not implemented yet:

- automatic translation function
- Dates and News Supabase read services
- remaining inventoried production media uploads beyond WATER and The Order of Time

Implemented in T0009C: admin sign-in/sign-out, session restoration, protected works list,
German/English controls, and recovery states. WATER and The Order of Time uploads
and playback/score checks have been completed by the project owner.

Browser regression checks can be run with `node scripts/verify-admin.cjs` when Playwright
is available. An optional first argument supplies a package resolution directory for a
bundled Playwright installation. Start the dev server on port 5173 first.
The test uses mocked Auth/data responses and makes no changes to Supabase.

Implemented in T0009D: works create/edit forms, draft/publish/archive controls,
direct Storage uploads for audio/scores/photos, ordered media metadata, primary media
selection, and recoverable save/upload feedback.
