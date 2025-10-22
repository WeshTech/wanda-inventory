import { z } from "zod";

export const purchaseOrderProductSchema = z.object({
  businessProductId: z
    .string()
    .uuid()
    .or(z.literal("00000000-0000-0000-0000-000000000000")),
  barcode: z.string().nullable().optional(),
  productName: z.string().nullable().optional(),
  quantity: z
    .number()
    .min(1, { message: "Quantity must be at least 1" })
    .refine((val) => !isNaN(val), { message: "Quantity must be a number" }),
  price: z
    .number()
    .nonnegative({ message: "Price cannot be negative" })
    .refine((val) => !isNaN(val), { message: "Price must be a number" }),
});

export const updatePurchaseOrderSchema = z.object({
  purchaseOrderId: z.string().uuid({ message: "Invalid purchase order ID" }),
  status: z.enum([
    "DRAFT",
    "SUBMITTED",
    "APPROVED",
    "REJECTED",
    "RECEIVED",
    "PARTIAL",
    "CANCELLED",
    "CLOSED",
  ]),
  products: z
    .array(purchaseOrderProductSchema)
    .min(1, { message: "At least one product is required" }),
});

export type UpdatePurchaseOrderFormData = z.infer<
  typeof updatePurchaseOrderSchema
>;
