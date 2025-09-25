import { PermissionModuleKeys } from "@/types/roles";
import { z } from "zod";

export const PERMISSION_MODULES: {
  key: PermissionModuleKeys;
  label: string;
}[] = [
  { key: "store", label: "Store" },
  { key: "users", label: "Users" },
  { key: "roles", label: "Roles" },
  { key: "products", label: "Products" },
  { key: "storeInventory", label: "Store Inventory" },
  { key: "categories", label: "Categories" },
  { key: "transfers", label: "Transfers" },
  { key: "sales", label: "Sales" },
  { key: "invoices", label: "Invoices" },
  { key: "suppliers", label: "Suppliers" },
  { key: "purchaseOrders", label: "Purchase Orders" },
];

const permissionActionsSchema = z.object({
  create: z.boolean(),
  extract: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

export const createRoleSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Role name must be at least 2 characters.",
    })
    .max(50, {
      message: "Role name must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "Role description must be at least 5 characters.",
    })
    .max(200, {
      message: "Role description must not exceed 200 characters.",
    }),
  permissions: z
    .object({
      store: permissionActionsSchema,
      users: permissionActionsSchema,
      roles: permissionActionsSchema,
      products: permissionActionsSchema,
      storeInventory: permissionActionsSchema,
      categories: permissionActionsSchema,
      transfers: permissionActionsSchema,
      sales: permissionActionsSchema,
      invoices: permissionActionsSchema,
      suppliers: permissionActionsSchema,
      purchaseOrders: permissionActionsSchema,
    })
    .refine(
      (permissions) => {
        // Check if at least one permission is true across all modules
        return Object.values(permissions).some((module) =>
          Object.values(module).some((permission) => permission === true)
        );
      },
      {
        message: "At least one permission must be selected.",
      }
    ),
});

export type CreateRoleInput = z.infer<typeof createRoleSchema>;
export type PermissionActions = z.infer<typeof permissionActionsSchema>;
