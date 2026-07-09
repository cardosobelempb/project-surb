import { RefreshTokenSchema } from "@repo/common";
import z from "zod";

export const RefreshSessionSchema = z.object({
  sessionToken: RefreshTokenSchema,
});
