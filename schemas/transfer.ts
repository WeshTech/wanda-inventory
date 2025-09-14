import { z } from "zod";

export const editTransferSchema = z
  .object({
    from: z.string().min(1, "From store is required"),
    to: z.string().min(1, "To store is required"),
    status: z
      .enum(["pending", "in-transit", "completed", "failed"])
      .refine((val) => !!val, { message: "Status is required" }),

    quantity: z.number().min(1, "Quantity must be at least 1"),
    receivedBy: z.string().min(1, "Receiver name is required"),
  })
  .refine((data) => data.from !== data.to, {
    message: "From and To stores must be different",
    path: ["to"],
  });

export type EditTransferFormData = z.infer<typeof editTransferSchema>;
