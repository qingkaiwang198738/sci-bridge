import { NextRequest } from "next/server";
import { errorResponse } from "@/src/lib/errors";
import { createReport } from "@/src/server/services/report.service";
import { getClientIp, hashIp } from "@/src/lib/security/ip";
import { enforceRateLimit } from "@/src/server/services/rate-limit.service";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    await enforceRateLimit(hashIp(ip), "report_create", 5, 10 * 60 * 1000);
    return Response.json(await createReport(await request.json()), { status: 201 });
  } catch (e) { return errorResponse(e); }
}
