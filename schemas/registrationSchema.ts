import z from "zod";

export const RegisterSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(50, "Business name must be less than 50 characters"),
  businessType: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(50, "Business name must be less than 50 characters"),
  businessEmail: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
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
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type FormData = z.infer<typeof RegisterSchema>;
