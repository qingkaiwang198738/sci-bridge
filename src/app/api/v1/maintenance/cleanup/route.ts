import { env } from "@/src/config/environment";
import { createAdminClient } from "@/src/lib/supabase/admin";

export async function POST(request: Request) {
  const auth = request.headers.get("authorization");
  if (!env.cronSecret || auth !== `Bearer ${env.cronSecret}`) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = createAdminClient();
  const { error } = await supabase.rpc("cleanup_expired_content");
  if (error) return Response.json({ error: "Cleanup failed" }, { status: 500 });
  return Response.json({ ok: true });
}
