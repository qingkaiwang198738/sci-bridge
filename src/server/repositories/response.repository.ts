import { createAdminClient } from "@/src/lib/supabase/admin";

export async function insertResponse(input: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("responses").insert(input).select("id,message_id,created_at").single();
  if (error) throw error;
  return data;
}
export async function findResponseById(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("responses").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
export async function findResponsesForMessage(messageId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("responses")
    .select("id,message_id,created_at")
    .eq("message_id", messageId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
