-- AI Drug Discovery Workstation: shared editor backend
-- Run once in Supabase Dashboard → SQL Editor.

create table if not exists public.editor_allowlist (
  email text primary key check (email = lower(email)),
  added_at timestamptz not null default now()
);

create table if not exists public.company_edits (
  id bigint generated always as identity primary key,
  company_name text not null,
  field text not null check (field in ('focus','pipeline','products','models','valuation','fund','rel','thesis')),
  content_en text not null default '',
  content_zh text not null default '',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null,
  unique (company_name, field)
);

alter table public.editor_allowlist enable row level security;
alter table public.company_edits enable row level security;

create or replace function public.is_workspace_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.editor_allowlist
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_workspace_editor() to anon, authenticated;

create policy "Published company edits are readable by everyone"
on public.company_edits for select
to anon, authenticated
using (true);

create policy "Allowlisted editors can create company edits"
on public.company_edits for insert
to authenticated
with check (public.is_workspace_editor());

create policy "Allowlisted editors can update company edits"
on public.company_edits for update
to authenticated
using (public.is_workspace_editor())
with check (public.is_workspace_editor());

create policy "Allowlisted editors can remove company edits"
on public.company_edits for delete
to authenticated
using (public.is_workspace_editor());

-- After each collaborator has signed in once with a magic link, add them here.
-- Replace both examples with real emails, then run this statement:
-- insert into public.editor_allowlist (email) values
--   ('you@example.com'),
--   ('mentor@example.com')
-- on conflict (email) do nothing;

alter publication supabase_realtime add table public.company_edits;
