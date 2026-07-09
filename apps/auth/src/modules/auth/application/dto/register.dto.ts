// ─── Tipos inferidos ──────────────────────────────────────────────────────────
//
// Nunca escreva tipos manualmente — inferidos diretamente dos schemas.
// Se o schema mudar, o tipo muda junto automaticamente.

import z from "zod";
import { LoginSchema } from "../../infrastructure/http/schemas/login.schema";
import { LogoutSchema } from "../../infrastructure/http/schemas/logout.schema";
import {
  RegisterProjectionSchema,
  RegisterResponseSchema,
  RegisterSchema,
} from "../../infrastructure/http/schemas/register.schema";
import { TokenSchema } from "../../infrastructure/http/schemas/token.schema";

export type RegisterDto = z.infer<typeof RegisterSchema>;

export type RegisterProjectionDto = z.infer<typeof RegisterProjectionSchema>;
export type RegisterResponseDto = z.infer<typeof RegisterResponseSchema>;

export type LoginDto = z.infer<typeof LoginSchema>;
export type RefreshTokenDto = z.infer<typeof TokenSchema>;
export type LogoutDto = z.infer<typeof LogoutSchema>;
