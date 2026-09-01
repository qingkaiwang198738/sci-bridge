import { createAdminClient } from "@/src/lib/supabase/admin";
export async function getHeatmap(limit=100) {
  const {data,error}=await createAdminClient().from("metrics_daily").select("date,category,demand_count,supply_count,response_count,resolved_count").order("date",{ascending:false}).limit(limit);
  if(error) throw error; return data??[];
}
export async function aggregateDailyMetrics() {
  const db=createAdminClient();
  const {error}=await db.rpc("aggregate_daily_metrics");
  if(error) throw error;
}
