import { errorResponse } from "@/src/lib/errors";
import { findMessageById } from "@/src/server/repositories/message.repository";
import { findResponsesForMessage } from "@/src/server/repositories/response.repository";
import { assertMessageOwner } from "@/src/server/policies/message.policy";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const secret = new URL(request.url).searchParams.get("secret") ?? "";
    const message = await findMessageById(id);
    if (!message) return Response.json({ error: { code: "NOT_FOUND", message: "需求不存在" } }, { status: 404 });
    await assertMessageOwner(message, secret);
    return Response.json({ data: await findResponsesForMessage(id) });
  } catch (e) { return errorResponse(e); }
}
