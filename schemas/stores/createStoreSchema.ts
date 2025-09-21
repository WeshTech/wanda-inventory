import { z } from "zod";

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(1, "Store name is required")
    .min(2, "Store name must be at least 2 characters"),
  county: z.string().min(1, "County is required"),
  constituency: z.string().min(1, "Constituency is required"),
  ward: z.string().min(1, "Ward is required"),
  storeStatus: z.enum(["OPENED", "CLOSED"]).refine((val) => !!val, {
    message: "Please select a status",
  }),
});

export type CreateStoreFormData = z.infer<typeof createStoreSchema>;
