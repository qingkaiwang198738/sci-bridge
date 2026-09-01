import { createAdminClient } from "@/src/lib/supabase/admin";

export async function listChats(responseId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("chats")
    .select("id,response_id,sender,content,created_at")
    .eq("response_id", responseId)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
export async function insertChat(input: Record<string, unknown>) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("chats").insert(input).select("*").single();
  if (error) throw error;
  return data;
}
