import { NextRequest } from "next/server";
import { errorResponse } from "@/src/lib/errors";
import { createResponse } from "@/src/server/services/response.service";
import { getClientIp, hashIp } from "@/src/lib/security/ip";
import { enforceRateLimit } from "@/src/server/services/rate-limit.service";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    await enforceRateLimit(hashIp(ip), "response_create", 20, 60 * 60 * 1000);
    return Response.json(await createResponse(await request.json(), ip, hashIp(ip)), { status: 201 });
  } catch (e) { return errorResponse(e); }
}
