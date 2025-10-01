import z from "zod";

export const supplierSchema = z.object({
  name: z.string().trim().min(1, "Supplier name is required"),

  description: z.string().trim().optional(),

  contact: z
    .string()
    .trim()
    .max(50, "Contact must be less than 50 characters")
    .optional()
    .or(z.literal("")),

  email: z.union([z.email("Invalid email format"), z.literal("")]).optional(),

  phone: z
    .union([
      z
        .string()
        .trim()
        .regex(/^(07|01)\d{11}$/, {
          message: "Please provide a valid phone number",
        }),
      z.literal(""),
    ])
    .optional(),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;
