create or replace function public.aggregate_daily_metrics()
returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.metrics_daily(date,category,demand_count,supply_count,response_count,resolved_count)
  select current_date, category,
    count(*) filter (where supply_type='demand'),
    count(*) filter (where supply_type='supply'),
    0, count(*) filter (where status='resolved')
  from public.messages
  where created_at >= current_date and created_at < current_date + interval '1 day'
  group by category
  on conflict(date,category) do update set demand_count=excluded.demand_count,supply_count=excluded.supply_count,resolved_count=excluded.resolved_count;
  update public.metrics_daily m set response_count=s.cnt
  from (select m2.category,count(r.id) cnt from public.responses r join public.messages m2 on m2.id=r.message_id where r.created_at>=current_date and r.created_at<current_date+interval '1 day' group by m2.category) s
  where m.date=current_date and m.category=s.category;
end; $$;
