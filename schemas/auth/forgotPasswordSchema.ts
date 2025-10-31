import z from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .pipe(z.email("Please enter a valid email address")),
    code: z
      .string()
      .length(6, "Code must be 6 digits")
      .regex(/^\d+$/, "Code must contain only digits")
      .nullable()
      .optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[^A-Za-z0-9]/, "Must include at least one special character")
      .nullable()
      .optional(),
    confirmPassword: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      // Only validate password match when both password fields are filled
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
