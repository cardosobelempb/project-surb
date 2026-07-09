// src/lib/site-url.ts

import { envFrontend } from "@/app/config/env-frontend";

export function getSiteUrl() {
  return envFrontend.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

/**
 * Exemplo de subdomínios:
 */
