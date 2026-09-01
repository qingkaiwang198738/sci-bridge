create or replace function public.republish_message(p_message_id uuid,p_owner_secret_hash text,p_new_secret_hash text)
returns jsonb language plpgsql security definer set search_path=public as $$
declare old public.messages; new_id uuid; result jsonb;
begin
  select * into old from public.messages where id=p_message_id for update;
  if not found then raise exception 'MESSAGE_NOT_FOUND'; end if;
  if old.owner_secret_hash<>p_owner_secret_hash then raise exception 'INVALID_OWNER'; end if;
  if old.status<>'published' or old.created_at>now()-interval '24 hours' or old.republish_count>=5 then raise exception 'REPUBLISH_NOT_ALLOWED'; end if;
  new_id:=gen_random_uuid();
  insert into public.messages(id,category,supply_type,item_name,content,owner_secret_hash,email_ciphertext,ip_hash,status,expires_at,republish_count,last_republished_at,risk_score)
  values(new_id,old.category,old.supply_type,old.item_name,old.content,p_new_secret_hash,old.email_ciphertext,old.ip_hash,'published',now()+interval '48 hours',old.republish_count+1,now(),old.risk_score);
  update public.messages set status='hidden' where id=old.id;
  delete from public.responses where message_id=old.id;
  select to_jsonb(m) into result from public.messages m where m.id=new_id;
  return result;
end; $$;
