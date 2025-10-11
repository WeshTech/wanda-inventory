import { z } from "zod";

// Form schema for client-side validation
export const UpdateReceiptFormSchema = z.object({
  receiptName: z.string().min(1, "Receipt name is required"),
  store: z.string().min(1, "Store name is required"),
  supplier: z.string().min(1, "Supplier name is required"),
  purchaseOrderId: z.string().min(1, "Purchase order ID is required"),
  receiptNumber: z.number().min(0, "Receipt number is required"),
  products: z
    .array(
      z.object({
        businessProductId: z.string().min(1, "Business product ID is required"),
        productCode: z.string().min(1, "Product code is required"),
        productName: z.string().min(1, "Product name is required"),
        unitPrice: z.number().min(0, "Unit price must be non-negative"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .min(1, "At least one product is required"),
});

export type UpdateReceiptFormData = z.infer<typeof UpdateReceiptFormSchema>;
