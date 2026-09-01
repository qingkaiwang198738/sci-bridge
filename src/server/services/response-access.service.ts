import { AppError } from "@/src/lib/errors";
import { verifySecret } from "@/src/lib/security/secrets";
import { findMessageById } from "@/src/server/repositories/message.repository";
import { findResponseById } from "@/src/server/repositories/response.repository";

export async function resolveResponseAccess(responseId: string, secret: string) {
  const response = await findResponseById(responseId);
  if (!response) throw new AppError("响应不存在", 404, "RESPONSE_NOT_FOUND");
  const message = await findMessageById(response.message_id);
  if (!message) throw new AppError("需求不存在", 404, "MESSAGE_NOT_FOUND");
  if (new Date(message.expires_at) <= new Date()) throw new AppError("该会话已过期", 410, "EXPIRED");
  const responder = await verifySecret(secret, response.responder_secret_hash);
  const owner = await verifySecret(secret, message.owner_secret_hash);
  if (!responder && !owner) throw new AppError("访问凭证无效", 403, "INVALID_CREDENTIAL");
  return { response, message, role: responder ? "responder" as const : "publisher" as const };
}
