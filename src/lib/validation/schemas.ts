import { z } from "zod";
import { LIMITS } from "@/src/config/limits";

export const supplyTypeSchema = z.enum(["demand", "supply", "cooperation"]);

export const createMessageSchema = z.object({
  category: z.string().trim().min(1).max(80),
  supplyType: supplyTypeSchema,
  itemName: z.string().trim().min(1).max(LIMITS.itemNameMax),
  content: z.string().trim().min(1).max(LIMITS.contentMax),
  email: z.string().trim().email().max(LIMITS.emailMax).optional().or(z.literal("")),
  turnstileToken: z.string().optional()
});

export const createResponseSchema = z.object({
  messageId: z.string().uuid(),
  content: z.string().trim().min(1).max(LIMITS.responseMax),
  turnstileToken: z.string().optional()
});

export const createChatSchema = z.object({
  responseId: z.string().uuid(),
  accessSecret: z.string().min(12).max(64),
  sender: z.enum(["publisher", "responder"]),
  content: z.string().trim().min(1).max(LIMITS.chatMax)
});

export const reportSchema = z.object({
  messageId: z.string().uuid(),
  reason: z.enum(["spam", "misinformation", "unsafe", "illegal", "privacy", "other"]),
  fingerprint: z.string().min(8).max(256)
});
