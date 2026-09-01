import { errorResponse } from "@/src/lib/errors";
import { resolveResponseAccess } from "@/src/server/services/response-access.service";
import { setChatSession } from "@/src/lib/security/session";
import { getClientIp,hashIp } from "@/src/lib/security/ip";
import { enforceRateLimit } from "@/src/server/services/rate-limit.service";
export async function POST(request:Request){try{const ip=getClientIp(request.headers);await enforceRateLimit(hashIp(ip),"session_exchange",20,10*60*1000);const {responseId,secret}=await request.json();const access=await resolveResponseAccess(String(responseId),String(secret));await setChatSession({responseId:access.response.id,role:access.role});return Response.json({ok:true});}catch(e){return errorResponse(e);}}
