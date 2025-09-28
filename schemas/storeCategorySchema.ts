import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  store: z.string().min(1, "Store is required"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description cannot exceed 300 characters"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
