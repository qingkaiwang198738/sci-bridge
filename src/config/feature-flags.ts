import { env } from "./environment";

export const features = {
  ai: env.aiEnabled,
  rag: env.ragEnabled,
  messaging: env.messagingEnabled,
  upload: env.uploadEnabled,
  registration: env.registrationEnabled
} as const;

export type FeatureName = keyof typeof features;
export const isFeatureEnabled = (name: FeatureName) => features[name];
