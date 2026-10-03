alter table public.works enable row level security;
alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  );
$$;

drop policy if exists "Public can read published works" on public.works;
create policy "Public can read published works"
on public.works
for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can insert works" on public.works;
create policy "Admins can insert works"
on public.works
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update works" on public.works;
create policy "Admins can update works"
on public.works
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete works" on public.works;
create policy "Admins can delete works"
on public.works
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
on public.events
for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can insert events" on public.events;
create policy "Admins can insert events"
on public.events
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update events" on public.events;
create policy "Admins can update events"
on public.events
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete events" on public.events;
create policy "Admins can delete events"
on public.events
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Public can read published news" on public.news;
create policy "Public can read published news"
on public.news
for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can insert news" on public.news;
create policy "Admins can insert news"
on public.news
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update news" on public.news;
create policy "Admins can update news"
on public.news
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete news" on public.news;
create policy "Admins can delete news"
on public.news
for delete
to authenticated
using (public.is_admin());

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can update site settings" on public.site_settings;
create policy "Admins can update site settings"
on public.site_settings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());
