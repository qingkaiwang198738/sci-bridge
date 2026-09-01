import { generateSecret, hashSecret } from "@/src/lib/security/secrets";
import { createResponseSchema } from "@/src/lib/validation/schemas";
import { AppError } from "@/src/lib/errors";
import { findMessageById } from "@/src/server/repositories/message.repository";
import { insertResponse } from "@/src/server/repositories/response.repository";
import { verifyTurnstile } from "@/src/server/services/turnstile.service";

export async function createResponse(raw: unknown, ip: string, ipHash: string) {
  const input = createResponseSchema.parse(raw);
  await verifyTurnstile(input.turnstileToken, ip);
  const message = await findMessageById(input.messageId);
  if (!message) throw new AppError("需求不存在", 404, "MESSAGE_NOT_FOUND");
  if (message.status !== "published" || new Date(message.expires_at) <= new Date()) {
    throw new AppError("该需求已过期或关闭", 410, "MESSAGE_CLOSED");
  }
  const secret = generateSecret();
  const response = await insertResponse({
    message_id: input.messageId,
    responder_secret_hash: await hashSecret(secret),
    ip_hash: ipHash
  });
  return { response, responderSecret: secret };
}
