import { z } from "zod";

// Schema for individual product in the table
export const productItemSchema = z.object({
  id: z.string().optional(),
  productCode: z.string().min(1, "Product code is required"),
  productName: z.string().min(1, "Product name is required"),
  accepted: z.number().min(0, "Accepted quantity must be at least 0"),
  rejected: z.number().min(0, "Rejected quantity must be at least 0"),
  unitPrice: z.number().min(0, "Unit price must be at least 0"),
  total: z.number().min(0),
});

// Schema for the entire purchase receipt form
export const purchaseReceiptSchema = z.object({
  purchaseOrderId: z.string().optional(),
  receiptName: z.string().min(1, "Receipt name is required"),
  supplier: z.string().min(1, "Supplier is required"),
  store: z.string().min(1, "Store is required"),
  status: z.enum(["received", "partial", "rejected"], {
    message: "Status is required",
  }),
  totalAmount: z.number().min(0),
  products: z
    .array(productItemSchema)
    .min(1, "At least one product is required"),
});

export type ProductItem = z.infer<typeof productItemSchema>;
export type PurchaseReceipt = z.infer<typeof purchaseReceiptSchema>;
