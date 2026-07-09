import z from "zod";
import { RefreshSessionSchema } from "../../infrastructure/http/schemas/refresh-sessions.chema";

export type RefreshSessionDto = z.infer<typeof RefreshSessionSchema>;
