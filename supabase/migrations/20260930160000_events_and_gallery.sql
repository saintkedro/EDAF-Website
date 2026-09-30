-- Events and Gallery for the Edet Amana Foundation website.
-- Run once in the Supabase SQL editor (or with `supabase db push`).

-- Admins -------------------------------------------------------------------

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Events -------------------------------------------------------------------

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  series text not null check (series in ('public-lecture', 'christmas-carol')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 200),
  starts_on date not null,
  start_time text check (char_length(start_time) <= 40),
  venue text check (char_length(venue) <= 300),
  theme text check (char_length(theme) <= 300),
  speaker text check (char_length(speaker) <= 300),
  summary text check (char_length(summary) <= 600),
  body text check (char_length(body) <= 20000),
  cover_path text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (series, slug)
);

create index if not exists events_series_starts_on_idx on public.events (series, starts_on desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_touch_updated_at on public.events;
create trigger events_touch_updated_at
  before update on public.events
  for each row execute function public.touch_updated_at();

-- Christmas Carol winners ---------------------------------------------------

create table if not exists public.event_winners (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  position smallint not null check (position between 1 and 50),
  choir text not null check (char_length(choir) between 1 and 200),
  denomination text check (char_length(denomination) <= 200),
  prize text check (char_length(prize) <= 300),
  created_at timestamptz not null default now()
);

create index if not exists event_winners_event_idx on public.event_winners (event_id, position);

-- Media: photos, video links and documents ---------------------------------
-- A row with no event_id belongs to the general gallery.

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events (id) on delete cascade,
  kind text not null check (kind in ('photo', 'video', 'document')),
  storage_path text,
  video_url text check (char_length(video_url) <= 500),
  caption text check (char_length(caption) <= 300),
  width integer,
  height integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  check (
    (kind = 'video' and video_url is not null)
    or (kind <> 'video' and storage_path is not null)
  )
);

create index if not exists media_event_idx on public.media (event_id, sort_order, created_at);

-- Row level security ---------------------------------------------------------

alter table public.events enable row level security;
alter table public.event_winners enable row level security;
alter table public.media enable row level security;

drop policy if exists "Published events are public" on public.events;
create policy "Published events are public" on public.events
  for select to anon, authenticated
  using (published or (select public.is_admin()));

drop policy if exists "Admins manage events" on public.events;
create policy "Admins manage events" on public.events
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Winners of published events are public" on public.event_winners;
create policy "Winners of published events are public" on public.event_winners
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.events e
      where e.id = event_id and (e.published or (select public.is_admin()))
    )
  );

drop policy if exists "Admins manage winners" on public.event_winners;
create policy "Admins manage winners" on public.event_winners
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Gallery and published event media are public" on public.media;
create policy "Gallery and published event media are public" on public.media
  for select to anon, authenticated
  using (
    event_id is null
    or exists (
      select 1 from public.events e
      where e.id = event_id and (e.published or (select public.is_admin()))
    )
  );

drop policy if exists "Admins manage media" on public.media;
create policy "Admins manage media" on public.media
  for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

grant select on public.events, public.event_winners, public.media to anon, authenticated;
grant insert, update, delete on public.events, public.event_winners, public.media to authenticated;

-- Storage ------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-media',
  'event-media',
  true,
  20971520,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do nothing;

drop policy if exists "Admins read event media" on storage.objects;
create policy "Admins read event media" on storage.objects
  for select to authenticated
  using (bucket_id = 'event-media' and (select public.is_admin()));

drop policy if exists "Admins upload event media" on storage.objects;
create policy "Admins upload event media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'event-media' and (select public.is_admin()));

drop policy if exists "Admins update event media" on storage.objects;
create policy "Admins update event media" on storage.objects
  for update to authenticated
  using (bucket_id = 'event-media' and (select public.is_admin()));

drop policy if exists "Admins delete event media" on storage.objects;
create policy "Admins delete event media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'event-media' and (select public.is_admin()));
