import z from "zod";

export const topUpSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^0[71]\d{8}$/, "Phone number must start with (07... or 01...)"),

  amount: z
    .string()
    .regex(/^\d+$/, "Amount must contain numbers only")
    .refine((val) => {
      const num = Number(val);
      return num >= 1;
    }, "Minimum top-up is KSh 1")
    .refine((val) => {
      const num = Number(val);
      return num <= 250000;
    }, "Maximum top-up is KSh 250,000"),
});

export type TopUpFormValues = z.infer<typeof topUpSchema>;
