import { z } from "zod";

// Zod schema for validating the "Add New Product" form
export const AddProductSchema = z.object({
  serialNumber: z.string().min(1, "Serial Number is required"),
  name: z.string().min(1, "Product Name is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.string().regex(/^\d+$/, "Quantity must be a valid number"),
  buyingPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Buying Price must be a valid number with up to two decimal places"
    ),
  sellingPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Selling Price must be a valid number with up to two decimal places"
    ),
  description: z.string().optional(),
  // Image is optional and can be an empty string or a valid URL
  image: z
    .string()
    .url("Must be a valid image URL")
    .optional()
    .or(z.literal("")),
});

// Infers the TypeScript type from the Zod schema
export type AddProductFormValues = z.infer<typeof AddProductSchema>;
