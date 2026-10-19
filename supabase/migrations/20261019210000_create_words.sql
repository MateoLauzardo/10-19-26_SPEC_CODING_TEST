-- Flat list of drawable words. Phase 5 adds categories and difficulty.
create table public.words (
  id bigint generated always as identity primary key,
  word text not null unique,
  created_at timestamptz not null default now()
);

alter table public.words enable row level security;

-- Signed-in sessions (including anonymous ones) can read words.
-- There are no insert, update or delete policies, so clients cannot write.
create policy "Authenticated users can read words"
  on public.words
  for select
  to authenticated
  using (true);

-- Defence in depth: only grant what the policy above needs.
revoke all on table public.words from anon, authenticated;
grant select on table public.words to authenticated;
