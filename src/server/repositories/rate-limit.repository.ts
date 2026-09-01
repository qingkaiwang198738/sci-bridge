import { createAdminClient } from "@/src/lib/supabase/admin";

export async function countRecentEvents(keyHash: string, action: string, since: Date) {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from("rate_limit_events")
    .select("id", { count: "exact", head: true })
    .eq("key_hash", keyHash)
    .eq("action", action)
    .gte("created_at", since.toISOString());
  if (error) throw error;
  return count ?? 0;
}

export async function recordRateLimitEvent(keyHash: string, action: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("rate_limit_events").insert({ key_hash: keyHash, action });
  if (error) throw error;
}
