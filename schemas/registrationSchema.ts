import z from "zod";

export const RegisterSchema = z
  .object({
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(50, "Business name must be less than 50 characters")
      .default(""),
    businessType: z
      .string()
      .min(2, "Business type must be at least 2 characters")
      .max(50, "Business type must be less than 50 characters")
      .default(""),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Phone number must be exactly 10 digits")
      .refine((val) => val.startsWith("07") || val.startsWith("01"), {
        message: "Phone number must start with 07 or 01",
      })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits",
      })
      .default(""),

    businessEmail: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required")
      .default(""),
    country: z.string().min(1, "Please select a country").default(""),
    county: z
      .string()
      .min(1, {
        message: "Please select your county.",
      })
      .default(""),
    constituency: z
      .string()
      .min(1, {
        message: "Please select your constituency.",
      })
      .default(""),
    code: z.string().optional(),
    subscriptionPackage: z.string().optional(),
    ward: z
      .string()
      .min(1, {
        message: "Please select your ward.",
      })
      .default(""),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .default(""),
    confirmPassword: z
      .string()
      .min(8, "Please confirm your password")
      .default(""),
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the terms and conditions",
      })
      .default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof RegisterSchema>;
