import { z } from "zod";

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(1, "Store name is required")
    .min(2, "Store name must be at least 2 characters"),
  location: z
    .string()
    .min(1, "Location is required")
    .min(5, "Location must be at least 5 characters"),
  status: z.enum(["Open", "Closed"]).refine((val) => !!val, {
    message: "Please select a status",
  }),
});

export type CreateStoreFormData = z.infer<typeof createStoreSchema>;
