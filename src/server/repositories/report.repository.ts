import { createAdminClient } from "@/src/lib/supabase/admin";

export async function reportExists(messageId: string, reporterHash: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("reports").select("id")
    .eq("message_id", messageId).eq("reporter_hash", reporterHash).maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
export async function insertReport(input: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("reports").insert(input).select("*").single();
  if (error) throw error;
  return data;
}
