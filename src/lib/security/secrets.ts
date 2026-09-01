import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import { LIMITS } from "@/src/config/limits";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

export function generateSecret(length = LIMITS.secretLength) {
  const bytes = randomBytes(length);
  return Array.from(bytes, b => ALPHABET[b % ALPHABET.length]).join("");
}
export async function hashSecret(secret: string) { return bcrypt.hash(secret, 12); }
export async function verifySecret(secret: string, hash: string) { return bcrypt.compare(secret, hash); }
export function hashReporter(value: string) { return createHash("sha256").update(value).digest("hex"); }
