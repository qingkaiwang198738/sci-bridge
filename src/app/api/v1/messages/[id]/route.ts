import { errorResponse } from "@/src/lib/errors";
import { findMessageById, markResolved } from "@/src/server/repositories/message.repository";
import { assertMessageOwner } from "@/src/server/policies/message.policy";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const message = await findMessageById(id);
    if (!message || message.status === "hidden" || new Date(message.expires_at) <= new Date()) {
      return Response.json({ error: { code: "NOT_FOUND", message: "需求不存在" } }, { status: 404 });
    }
    return Response.json({ data: message });
  } catch (e) { return errorResponse(e); }
}
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const message = await findMessageById(id);
    if (!message) return Response.json({ error: { code: "NOT_FOUND", message: "需求不存在" } }, { status: 404 });
    await assertMessageOwner(message, String(body.secret ?? ""));
    return Response.json({ data: await markResolved(id) });
  } catch (e) { return errorResponse(e); }
}
