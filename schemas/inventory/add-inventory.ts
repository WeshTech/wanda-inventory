import z from "zod";

// Zod schema for form validation
export const inventorySchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  scanType: z.enum(["scan", "type"]),
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  unit: z.string().min(1, "Unit is required"),
  supplier: z.string().min(1, "Supplier is required"),
  store: z.string().min(1, "Store is required"),
  category: z.string().min(1, "Category is required"),
  buyingPrice: z.number().min(0, "Buying price must be positive"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  minStockLevel: z.number().min(0, "Min stock level must be positive"),
  image: z.string().optional(),
  description: z.string().optional(),
});

export type InventoryFormData = z.infer<typeof inventorySchema>;
