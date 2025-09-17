import z from "zod";

export const RegisterSchema = z
  .object({
    businessName: z
      .string()
      .min(2, "Business name must be at least 2 characters")
      .max(50, "Business name must be less than 50 characters"),
    businessType: z
      .string()
      .min(2, "Business type must be at least 2 characters")
      .max(50, "Business type must be less than 50 characters"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be exactly 10 digits")
      .max(10, "Phone number must be exactly 10 digits")
      .refine((val) => val.startsWith("07") || val.startsWith("01"), {
        message: "Phone number must start with 07 or 01",
      })
      .refine((val) => /^\d+$/.test(val), {
        message: "Phone number must contain only digits",
      }),
    businessEmail: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required"),
    country: z.string().min(1, "Please select a country"),
    county: z.string().min(1, {
      message: "Please select your county.",
    }),
    constituency: z.string().min(1, {
      message: "Please select your constituency.",
    }),
    code: z.string().optional(),
    subscriptionPackage: z.string().optional(),
    ward: z.string().min(1, {
      message: "Please select your ward.",
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(8, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type FormData = z.infer<typeof RegisterSchema>;
