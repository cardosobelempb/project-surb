import {
  createEnv,
  loadProjectEnv,
  logLevelSchema,
  nodeEnvSchema,
} from "@repo/env-config";
import { z } from "zod";

loadProjectEnv();

export const envMobileSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  LOG_LEVEL: logLevelSchema,
  EXPO_PUBLIC_APP_NAME: z.string().default("Hotspot Mobile"),
  EXPO_PUBLIC_API_URL: z.string().url().default("http://localhost:4949"),
});

export const envMobile = createEnv(envMobileSchema, { context: "mobile" });
export type EnvMobile = z.infer<typeof envMobileSchema>;
