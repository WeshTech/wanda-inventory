import { z } from "zod";

export const inviteUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  role: z.enum(["Admin", "Member", "Viewer"]).refine((val) => !!val, {
    message: "Please select a role",
  }),
  store: z.string().min(1, "Please select a store"),
});

export type InviteUserForm = z.infer<typeof inviteUserSchema>;
