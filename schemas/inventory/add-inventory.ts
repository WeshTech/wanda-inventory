import z from "zod";

// Zod schema for form validation
export const inventorySchema = z
  .object({
    barcode: z
      .string()
      .nonempty("Barcode is required")
      .regex(/^[\w-]+$/, "Barcode must be alphanumeric"), // letters, numbers, dashes
    scanType: z.enum(["scan", "type"]),
    name: z.string().trim().min(1, "Product name is required"),
    brand: z.string().trim().min(1, "Brand is required"),
    unit: z.string().trim().min(1, "Unit is required"),
    supplier: z.string().trim().min(1, "Supplier is required"),
    store: z.string().trim().min(1, "Store is required"),
    category: z.string().trim().min(1, "Category is required"),
    buyingPrice: z.number().min(0, "Buying price must be 0 or greater"),
    sellingPrice: z.number().min(0, "Selling price must be 0 or greater"),
    minStockLevel: z.number().min(0, "Min stock level must be 0 or greater"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    image: z.string().optional(),
    description: z.string().trim().max(500, "Description too long").optional(),
    id: z.string().optional(),
    foundAt: z.string().optional(),
  })
  .refine((data) => data.sellingPrice >= data.buyingPrice, {
    message: "Selling price cannot be lower than buying price",
    path: ["sellingPrice"],
  });

export type InventoryFormData = z.infer<typeof inventorySchema>;
