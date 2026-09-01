create or replace function public.can_republish_message(p_message_id uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(
    select 1 from public.messages
    where id=p_message_id and status='published'
      and created_at<=now()-interval '24 hours'
      and republish_count<5
  );
$$;
