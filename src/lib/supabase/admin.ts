import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "@/src/config/environment";

export function createAdminClient() {
  const supabaseUrl = requireEnv("supabaseUrl");
  const serviceRoleKey = requireEnv("supabaseServiceRoleKey");

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}