import { createHash } from "node:crypto";
import { env } from "@/src/config/environment";
export function getClientIp(headers: Headers){const forwarded=headers.get("x-forwarded-for")?.split(",")[0]?.trim();const real=headers.get("x-real-ip")?.trim();return forwarded||real||"unknown";}
export function hashIp(ip:string){return createHash("sha256").update(`${env.ipHashSalt}:${ip}`).digest("hex");}
