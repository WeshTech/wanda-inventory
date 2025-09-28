import { z } from "zod";

export const updateUserSchema = z.object({
  email: z.string().email("Please enter a valid email address").optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .optional(),
  role: z.string().min(1, "Please select a role").optional(),
  store: z.string().min(1, "Please select a store").optional(),
});

export type UpdateUserForm = z.infer<typeof updateUserSchema>;
