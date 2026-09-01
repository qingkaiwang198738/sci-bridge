const optional = (value: string | undefined) => value;

export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supabaseUrl: optional(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: optional(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  supabaseServiceRoleKey: optional(process.env.SUPABASE_SERVICE_ROLE_KEY),
  cronSecret: optional(process.env.CRON_SECRET),
  ipHashSalt: process.env.IP_HASH_SALT ?? "change-this-salt-in-production",
  sessionSecret: process.env.SESSION_SECRET ?? "change-this-session-secret-in-production",
  turnstileEnabled: process.env.TURNSTILE_ENABLED === "true",
  turnstileSecretKey: optional(process.env.TURNSTILE_SECRET_KEY),
  aiEnabled: process.env.AI_ENABLED === "true",
  ragEnabled: process.env.RAG_ENABLED === "true",
  messagingEnabled: process.env.MESSAGING_ENABLED !== "false",
  uploadEnabled: process.env.UPLOAD_ENABLED === "true",
  registrationEnabled: process.env.REGISTRATION_ENABLED === "true",
  maintenanceMode: process.env.MAINTENANCE_MODE === "true"
} as const;

export function requireEnv(name: keyof typeof env): string {
  const value = env[name];
  if (typeof value !== "string" || !value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}
