import z from "zod";

export const GeneratePurchaseOrderSchema = z.object({
  supplier: z.string().min(1, "Please select a supplier"),
  store: z.string().min(1, "Please select a store"),
  expectedDate: z
    .string()
    .min(1, "Please enter an expected date")
    .refine(
      (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      {
        message: "Expected date must be today or in the future",
      }
    ),
});

export type GeneratePurchaseOrderFormData = z.infer<
  typeof GeneratePurchaseOrderSchema
>;
