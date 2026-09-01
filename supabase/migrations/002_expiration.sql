create index if not exists messages_expiration_idx on public.messages(expires_at);
create index if not exists chats_expiration_idx on public.chats(expires_at);

create or replace function public.cleanup_expired_content()
returns void language plpgsql security definer set search_path=public as $$
begin
  update public.messages set status='expired'
  where status='published' and expires_at<=now();
  delete from public.chats where expires_at<=now();
  delete from public.responses r using public.messages m
  where r.message_id=m.id and m.expires_at<=now();
  delete from public.messages
  where expires_at<=now() and status in ('expired','hidden');
  delete from public.rate_limit_events where created_at < now()-interval '2 days';
end; $$;
