import { AppError } from "@/src/lib/errors";
import { createChatSchema } from "@/src/lib/validation/schemas";
import { resolveResponseAccess } from "@/src/server/services/response-access.service";
import { insertChat, listChats } from "@/src/server/repositories/chat.repository";

export async function getChats(responseId: string, secret: string) {
  await resolveResponseAccess(responseId, secret);
  return listChats(responseId);
}

export async function sendChat(raw: unknown) {
  const input = createChatSchema.parse(raw);
  const access = await resolveResponseAccess(input.responseId, input.accessSecret);
  if (input.sender !== access.role) throw new AppError("会话角色无效", 403, "ROLE_MISMATCH");
  return insertChat({
    response_id: input.responseId,
    sender: access.role,
    content: input.content,
    expires_at: access.message.expires_at
  });
}
