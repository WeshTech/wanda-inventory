import { z } from "zod";

export const transferFormSchema = z
  .object({
    searchTerm: z.string().max(50, "Search term must be 50 characters or less"),
    productCode: z.string().min(1, "Product code is required"),
    productName: z.string().min(1, "Product name is required"),
    storeProductId: z.string().min(1, "Product selection is required"),
    fromStore: z.string().min(1, "From store is required"),
    toStore: z.string().min(1, "To store is required"),
    quantity: z
      .string()
      .min(1, "Quantity is required")
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num > 0;
        },
        { message: "Quantity must be a positive number" }
      ),
    notes: z.string().nullable(),
  })
  .refine((data) => data.fromStore !== data.toStore || !data.fromStore, {
    message: "From and To stores must be different",
    path: ["toStore"],
  });

export type TransferFormValues = z.infer<typeof transferFormSchema>;
