import * as z from "zod";

export const expenseSchema = z.object({
  purpose: z.string().min(1, "Purpose is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["RECURRET", "RANDOM"]).refine((val) => !!val, {
    message: "Please select a category",
  }),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  date: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "Invalid date format",
  }),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
