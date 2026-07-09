import { UserProjectionSchema } from "@/modules/user/infrastructure/http/schemas/user.schema";
import { EmailSchema, PasswordSchema } from "@repo/common";
import { z } from "zod";

/**
 * Schema de entrada do login.
 *
 * Por que usar Zod?
 * - Valida entrada antes do controller executar.
 * - Gera tipos inferidos.
 * - Evita dados inválidos chegando no use case.
 */
export const RegisterSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

// Payload de criação: sem campos gerados pelo servidor
export const RegisterResponseSchema = RegisterSchema.omit({
  password: true,
});

export const RegisterProjectionSchema = {
  user: UserProjectionSchema,
};
