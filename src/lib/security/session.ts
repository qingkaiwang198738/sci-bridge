import { createHmac,timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { env } from "@/src/config/environment";
const TTL=30*60;
type Session={responseId:string;role:"publisher"|"responder";exp:number};
const b64=(v:string)=>Buffer.from(v).toString("base64url");const unb64=(v:string)=>Buffer.from(v,"base64url").toString("utf8");
const sign=(v:string)=>createHmac("sha256",env.sessionSecret).update(v).digest("base64url");
export function createSessionValue(s:Session){const body=b64(JSON.stringify(s));return `${body}.${sign(body)}`;}
export function verifySessionValue(value:string|undefined):Session|null{if(!value)return null;const [body,sig]=value.split(".");if(!body||!sig)return null;const expected=sign(body);if(expected.length!==sig.length||!timingSafeEqual(Buffer.from(expected),Buffer.from(sig)))return null;try{const s=JSON.parse(unb64(body)) as Session;if(!s.responseId||!["publisher","responder"].includes(s.role)||s.exp<Math.floor(Date.now()/1000))return null;return s;}catch{return null;}}
const cookieName=(id:string)=>`sb_chat_${id.replace(/[^a-zA-Z0-9_-]/g,"")}`;
export async function setChatSession(s:Omit<Session,"exp">){const jar=await cookies();jar.set(cookieName(s.responseId),createSessionValue({...s,exp:Math.floor(Date.now()/1000)+TTL}),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:TTL});}
export async function getChatSession(responseId:string){return verifySessionValue((await cookies()).get(cookieName(responseId))?.value);}
export async function clearChatSession(responseId:string){(await cookies()).delete(cookieName(responseId));}
