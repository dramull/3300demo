-- Prism Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Decisions table
create table if not exists public.decisions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text not null default '',
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Lens conversations table
create table if not exists public.lens_conversations (
  id uuid default uuid_generate_v4() primary key,
  decision_id uuid references public.decisions(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  lens_id text not null,
  messages jsonb not null default '[]'::jsonb,
  is_completed boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(decision_id, lens_id)
);

-- Reports table
create table if not exists public.reports (
  id uuid default uuid_generate_v4() primary key,
  decision_id uuid references public.decisions(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now() not null,
  unique(decision_id)
);

-- Indexes
create index if not exists idx_decisions_user on public.decisions(user_id);
create index if not exists idx_lens_conversations_decision on public.lens_conversations(decision_id);
create index if not exists idx_reports_decision on public.reports(decision_id);

-- Row Level Security
alter table public.decisions enable row level security;
alter table public.lens_conversations enable row level security;
alter table public.reports enable row level security;

-- Policies: users can only access their own data
create policy "Users can view own decisions" on public.decisions
  for select using (auth.uid() = user_id);
create policy "Users can create own decisions" on public.decisions
  for insert with check (auth.uid() = user_id);
create policy "Users can update own decisions" on public.decisions
  for update using (auth.uid() = user_id);
create policy "Users can delete own decisions" on public.decisions
  for delete using (auth.uid() = user_id);

create policy "Users can view own conversations" on public.lens_conversations
  for select using (auth.uid() = user_id);
create policy "Users can create own conversations" on public.lens_conversations
  for insert with check (auth.uid() = user_id);
create policy "Users can update own conversations" on public.lens_conversations
  for update using (auth.uid() = user_id);

create policy "Users can view own reports" on public.reports
  for select using (auth.uid() = user_id);
create policy "Users can create own reports" on public.reports
  for insert with check (auth.uid() = user_id);
