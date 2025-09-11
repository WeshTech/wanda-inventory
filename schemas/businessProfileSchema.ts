import { z } from "zod";

export const businessProfileSchema = z
  .object({
    businessName: z.string().min(1, "Business name is required"),
    email: z.string().email("Invalid email address"),
    ownerName: z.string().min(1, "Owner name is required"),
    category: z.string().min(1, "Category is required"),
    oldPassword: z
      .string()
      .min(1, "Old password is required")
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => !data.newPassword || data.newPassword === data.confirmPassword,
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) =>
      (!data.newPassword && !data.confirmPassword && !data.oldPassword) ||
      (data.newPassword && data.confirmPassword && data.oldPassword),
    {
      message: "All password fields are required if updating password",
      path: ["oldPassword"],
    }
  );

export type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;
