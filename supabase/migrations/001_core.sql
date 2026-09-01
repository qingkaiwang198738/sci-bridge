create extension if not exists pgcrypto;

create type public.supply_type as enum ('demand','supply','cooperation');
create type public.message_status as enum ('published','resolved','expired','hidden');
create type public.report_status as enum ('pending','rejected','actioned');

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  supply_type public.supply_type not null,
  item_name text not null,
  content text not null,
  owner_secret_hash text not null,
  email_ciphertext text,
  ip_hash text,
  status public.message_status not null default 'published',
  expires_at timestamptz not null default (now()+interval '48 hours'),
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  republish_count integer not null default 0,
  last_republished_at timestamptz
);
create index messages_public_idx on public.messages(status,expires_at,created_at desc);

create table public.responses (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  responder_secret_hash text not null,
  ip_hash text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);
create index responses_message_idx on public.responses(message_id,created_at desc);

create table public.chats (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.responses(id) on delete cascade,
  sender text not null check(sender in ('publisher','responder')),
  content text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index chats_response_idx on public.chats(response_id,created_at);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  reason text not null,
  reporter_hash text not null,
  created_at timestamptz not null default now(),
  status public.report_status not null default 'pending',
  unique(message_id,reporter_hash)
);

create table public.metrics_daily (
  date date not null,
  category text not null,
  demand_count integer not null default 0,
  supply_count integer not null default 0,
  response_count integer not null default 0,
  resolved_count integer not null default 0,
  primary key(date,category)
);

alter table public.messages enable row level security;
alter table public.responses enable row level security;
alter table public.chats enable row level security;
alter table public.reports enable row level security;
alter table public.metrics_daily enable row level security;
