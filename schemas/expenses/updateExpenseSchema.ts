import * as z from "zod";

// Update schema
export const updateExpenseSchema = z.object({
  purpose: z.string().min(1, "Purpose is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  category: z.enum(["RECURRENT", "RANDOM"]).optional(),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    })
    .optional(),
  date: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid date format",
    })
    .optional(),
});

export type UpdateExpenseFormData = z.infer<typeof updateExpenseSchema>;
