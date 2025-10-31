// @/schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  rememberMe: z.boolean().optional(),
  twoFactorCode: z
    .string()
    .length(6, "2FA code must be 6 digits")
    .regex(/^\d+$/, "2FA code must contain only digits")
    .nullable()
    .optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// import z from "zod";

// export const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("Please enter a valid email address"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters long"),
//   rememberMe: z.boolean().optional(),
// });

// export type LoginFormValues = z.infer<typeof loginSchema>;
