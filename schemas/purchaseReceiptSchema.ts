import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  productCode: z.string().min(1, "Product code is required"),
  productName: z.string().min(1, "Product name is required"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  total: z.number().min(0, "Total must be positive"),
});

export const receiptUpdateSchema = z.object({
  receiptName: z.string().min(1, "Receipt name is required"),
  store: z.string().min(1, "Store is required"),
  supplier: z.string().min(1, "Supplier is required"),
  status: z.enum(["received", "rejected"]).refine((val) => !!val, {
    message: "Status is required",
  }),

  totalAmount: z.number().min(0, "Total amount must be positive"),
  purchaseOrderId: z.string().min(1, "Purchase order ID is required"),
});

export type Product = z.infer<typeof productSchema>;
export type ReceiptUpdate = z.infer<typeof receiptUpdateSchema>;
