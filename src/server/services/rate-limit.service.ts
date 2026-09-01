import { AppError } from "@/src/lib/errors";
import { countRecentEvents,recordRateLimitEvent } from "@/src/server/repositories/rate-limit.repository";
export async function enforceRateLimit(keyHash:string,action:string,max:number,windowMs:number){const count=await countRecentEvents(keyHash,action,new Date(Date.now()-windowMs));if(count>=max)throw new AppError("操作过于频繁，请稍后再试",429,"RATE_LIMITED");await recordRateLimitEvent(keyHash,action);}
