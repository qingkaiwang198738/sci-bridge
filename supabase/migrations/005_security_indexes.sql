create index if not exists messages_category_public_idx on public.messages(category,status,expires_at,created_at desc);
create index if not exists reports_pending_idx on public.reports(status,created_at desc);
create index if not exists responses_created_idx on public.responses(created_at desc);
