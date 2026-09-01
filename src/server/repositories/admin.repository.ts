import { createAdminClient } from "@/src/lib/supabase/admin";
export async function listPendingReports(limit=100) {
  const {data,error}=await createAdminClient().from("reports").select("id,message_id,reason,reporter_hash,created_at,status").eq("status","pending").order("created_at",{ascending:false}).limit(limit);
  if(error) throw error; return data??[];
}
export async function setReportStatus(id:string,status:"actioned"|"rejected") {
  const {data,error}=await createAdminClient().from("reports").update({status}).eq("id",id).select("*").single();
  if(error) throw error; return data;
}
