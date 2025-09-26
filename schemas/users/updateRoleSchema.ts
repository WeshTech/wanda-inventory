import { z } from "zod";
import { PERMISSION_MODULES } from "./createRole.Schema";
import { PermissionModuleKeys } from "@/types/roles";

const permissionObjectSchema = z.object({
  create: z.boolean(),
  extract: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export const updateRoleSchema = z.object({
  roleId: z.string().min(1, "Role ID is required"),
  title: z.string().min(2, "Role title must be at least 2 characters").max(50),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200),
  permissions: z.object(
    PERMISSION_MODULES.reduce(
      (acc, module) => {
        acc[module.key] = permissionObjectSchema;
        return acc;
      },
      {} as Record<
        PermissionModuleKeys,
        z.ZodObject<{
          create: z.ZodBoolean;
          extract: z.ZodBoolean;
          update: z.ZodBoolean;
          delete: z.ZodBoolean;
        }>
      >
    )
  ),
});

export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
