import z from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  phone: z
    .string()
    .regex(/^[\d\s\-+]+$/, "Invalid phone number format")
    .min(7, "Phone number must be at least 7 digits")
    .max(13, "Phone number must be less than 13 digits")
    .optional()
    .or(z.literal("")),
  email: z
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters")
    .optional()
    .or(z.literal("")),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
