import { errorResponse } from "@/src/lib/errors";
import { getChatSession,clearChatSession } from "@/src/lib/security/session";
export async function GET(request:Request){try{const id=new URL(request.url).searchParams.get("responseId");if(!id)return Response.json({error:{code:"BAD_REQUEST",message:"缺少 responseId"}},{status:400});const s=await getChatSession(id);return Response.json({authenticated:Boolean(s),session:s?{responseId:s.responseId,role:s.role}:null});}catch(e){return errorResponse(e);}}
export async function DELETE(request:Request){try{const id=new URL(request.url).searchParams.get("responseId");if(id)await clearChatSession(id);return Response.json({ok:true});}catch(e){return errorResponse(e);}}
