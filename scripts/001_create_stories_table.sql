-- Create stories table
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  category text not null check (category in ('addiction', 'survivor', 'mental-health', 'recovery')),
  title text not null,
  excerpt text not null,
  full_story text not null,
  author_name text not null,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.stories enable row level security;

-- Allow anyone to view approved stories
create policy "stories_select_all"
  on public.stories for select
  using (true);

-- Allow authenticated users to insert their own stories
create policy "stories_insert_own"
  on public.stories for insert
  with check (auth.uid() = user_id);

-- Allow users to update their own stories
create policy "stories_update_own"
  on public.stories for update
  using (auth.uid() = user_id);

-- Allow users to delete their own stories
create policy "stories_delete_own"
  on public.stories for delete
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger stories_updated_at
  before update on public.stories
  for each row
  execute function public.handle_updated_at();
