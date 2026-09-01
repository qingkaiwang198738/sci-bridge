import { NextRequest } from "next/server";
import { createMessage } from "@/src/server/services/message.service";
import { findPublicMessages } from "@/src/server/repositories/message.repository";
import { errorResponse } from "@/src/lib/errors";
import { getClientIp, hashIp } from "@/src/lib/security/ip";
import { enforceRateLimit } from "@/src/server/services/rate-limit.service";

export async function GET() {
  try { return Response.json({ data: await findPublicMessages() }); }
  catch (e) { return errorResponse(e); }
}
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    await enforceRateLimit(hashIp(ip), "message_create", 5, 60 * 60 * 1000);
    return Response.json(await createMessage(await request.json(), ip, hashIp(ip)), { status: 201 });
  } catch (e) { return errorResponse(e); }
}
