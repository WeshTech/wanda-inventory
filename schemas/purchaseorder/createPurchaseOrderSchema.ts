import z from "zod";

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

export type CreatePurchaseOrderFormData = z.infer<
  typeof createPurchaseOrderSchema
>;
