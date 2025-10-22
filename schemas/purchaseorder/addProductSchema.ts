import { z } from "zod";

export const AddProductSchema = z
  .object({
    businessProductId: z
      .string()
      .min(1, { message: "Business product ID is required" }),

    productBarcode: z
      .string()
      .min(1, { message: "Product code is required" })
      .max(50, { message: "Product code must be under 50 characters" }),

    productName: z
      .string()
      .min(1, { message: "Product name is required" })
      .max(100, { message: "Product name must be under 100 characters" }),

    price: z.number().positive({ message: "Price must be greater than zero" }),

    quantity: z
      .number()
      .int()
      .positive({ message: "Quantity must be greater than zero" }),

    total: z.number().nonnegative(),
  })
  .refine((data) => data.price !== undefined && data.price !== null, {
    message: "Price is required",
    path: ["price"],
  });

export type AddProductFormData = z.infer<typeof AddProductSchema>;
