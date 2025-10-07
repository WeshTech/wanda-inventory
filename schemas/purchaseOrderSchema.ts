import { z } from "zod";

export const updatePurchaseOrderProductSchema = z.object({
  businessProductId: z.uuid({
    message: "businessProductId must be a valid UUID",
    version: "v4",
  }),
  barcode: z.string().optional(),
  productName: z.string().optional(),
  quantity: z.number().min(0, { message: "Quantity cannot be negative" }),
  price: z.number().min(0, { message: "Price cannot be negative" }),
});

export const updatePurchaseOrderSchema = z.object({
  purchaseOrderId: z.string(),
  status: z
    .enum([
      "DRAFT",
      "SUBMITTED",
      "APPROVED",
      "REJECTED",
      "RECEIVED",
      "PARTIAL",
      "CANCELLED",
      "CLOSED",
    ])
    .optional(),

  products: z.array(updatePurchaseOrderProductSchema).optional(),
});

export type UpdatePurchaseOrderFormData = z.infer<
  typeof updatePurchaseOrderSchema
>;

export const productSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});

export const addProductSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  scanType: z.enum(["scan", "manual"]).default("scan"),
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0, "Price must be positive"),
});

export const createPurchaseOrderSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  store: z.string().min(1, "Store is required"),
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
  dateExpected: z.string().min(1, "Expected date is required"),
  createdBy: z.string().min(1, "Created by is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type AddProductFormData = z.infer<typeof addProductSchema>;
export type CreatePurchaseOrderFormData = z.infer<
  typeof createPurchaseOrderSchema
>;
