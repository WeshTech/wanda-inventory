import { z } from "zod";

export const purchaseOrderSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  store: z.string().min(1, "Store is required"),
  status: z.enum(["pending", "approved", "shipped", "delivered", "cancelled"]),
});

export const productSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});

export const addProductSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
  scanType: z.enum(["scan", "manual"]), // Add scanType to the schema
});

export type PurchaseOrderFormData = z.infer<typeof purchaseOrderSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type AddProductFormData = z.infer<typeof addProductSchema>;
