import { generateSecret,hashSecret,verifySecret } from "@/src/lib/security/secrets";
import { findMessageById,republishMessage } from "@/src/server/repositories/message.repository";
import { AppError } from "@/src/lib/errors";
export async function republish(messageId:string,secret:string){const m=await findMessageById(messageId);if(!m)throw new AppError("需求不存在",404,"MESSAGE_NOT_FOUND");if(!(await verifySecret(secret,m.owner_secret_hash)))throw new AppError("凭证无效",403,"INVALID_CREDENTIAL");const newSecret=generateSecret(); const newHash=await hashSecret(newSecret); const row=await republishMessage(messageId,m.owner_secret_hash,newHash);if(!row)throw new AppError("暂时无法重新发布",409,"REPUBLISH_FAILED");return {message:row,ownerSecret:newSecret};}
