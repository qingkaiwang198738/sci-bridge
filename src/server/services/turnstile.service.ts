import { env } from "@/src/config/environment";
import { AppError } from "@/src/lib/errors";

export async function verifyTurnstile(token: string | undefined, ip?: string) {
  if (!env.turnstileEnabled) return;
  if (!token || !env.turnstileSecretKey) throw new AppError("请完成安全验证", 400, "TURNSTILE_REQUIRED");
  const body = new URLSearchParams({ secret: env.turnstileSecretKey, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body, cache: "no-store"
  });
  const result = await response.json() as { success?: boolean };
  if (!result.success) throw new AppError("安全验证失败", 403, "TURNSTILE_FAILED");
}
