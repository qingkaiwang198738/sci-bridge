import { generateSecret, hashSecret } from "@/src/lib/security/secrets";
import { createMessageSchema } from "@/src/lib/validation/schemas";
import { insertMessage } from "@/src/server/repositories/message.repository";
import { verifyTurnstile } from "@/src/server/services/turnstile.service";
import { scoreContent } from "@/src/server/services/risk.service";

export async function createMessage(raw: unknown, ip: string, ipHash: string) {
  const input = createMessageSchema.parse(raw);
  await verifyTurnstile(input.turnstileToken, ip);
  const secret = generateSecret();
  const ownerSecretHash = await hashSecret(secret);
  const message = await insertMessage({
    category: input.category,
    supply_type: input.supplyType,
    item_name: input.itemName,
    content: input.content,
    owner_secret_hash: ownerSecretHash,
    email_ciphertext: input.email || null,
    ip_hash: ipHash,
    status: "published",
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    resolved_at: null,
    republish_count: 0,
    last_republished_at: null,
    risk_score: scoreContent(input.itemName,input.content)
  });
  return { message, ownerSecret: secret };
}
