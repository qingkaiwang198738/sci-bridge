import { errorResponse } from "@/src/lib/errors";
import { republish } from "@/src/server/services/republish.service";
export async function POST(request:Request,context:{params:Promise<{id:string}>}){try{const {id}=await context.params;const {secret}=await request.json();return Response.json(await republish(id,String(secret)));}catch(e){return errorResponse(e);}}
