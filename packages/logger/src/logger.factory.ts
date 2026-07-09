// ============================================================
// Factory central do Logger
//
// Decide automaticamente:
// - DEV -> Console/Pino Pretty
// - PROD -> Pino JSON
// ============================================================

import { ConsoleLogger, PinoLogger } from "./adapters";
import { BaseLogger } from "./base-logger";

export class LoggerFactory {
  static create(context?: string): BaseLogger {
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
      return new PinoLogger({
        context,
      });
    }

    return new ConsoleLogger({
      context,
    });
  }
}
