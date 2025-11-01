// utils/permissions.ts
import type { ContextPermissions } from "@/types/context";

export type PermissionCheck =
  | "all" // All permissions for a resource
  | "any" // Any permission for a resource
  | "read" // Only read/extract permission
  | "create" // Create or update permissions
  | "update"
  | "delete"
  | "owner"
  | "none"; // No permission check needed

export interface PermissionRule {
  resource?: keyof PermissionResourceMap;
  check?: PermissionCheck;
  custom?: (permissions: ContextPermissions | null) => boolean;
}

// Map resources to their permission keys
type PermissionResourceMap = {
  store: ["createStore", "extractStore", "updateStore", "deleteStore"];
  users: ["createUsers", "extractUsers", "updateUsers", "deleteUsers"];
  roles: ["createRoles", "extractRoles", "updateRoles", "deleteRoles"];
  products: [
    "createProducts",
    "extractProducts",
    "updateProducts",
    "deleteProducts"
  ];
  storeInventory: [
    "createStoreInventory",
    "extractStoreInventory",
    "updateStoreInventory",
    "deleteStoreInventory"
  ];
  categories: [
    "createCategories",
    "extractCategories",
    "updateCategories",
    "deleteCategories"
  ];
  transfers: [
    "createTransfers",
    "extractTransfers",
    "updateTransfers",
    "deleteTransfers"
  ];
  sales: ["createSales", "extractSales", "updateSales", "deleteSales"];
  invoices: [
    "createInvoices",
    "extractInvoices",
    "updateInvoices",
    "deleteInvoices"
  ];
  suppliers: [
    "createSuppliers",
    "extractSuppliers",
    "updateSuppliers",
    "deleteSuppliers"
  ];
  purchaseOrders: [
    "createPurchaseOrders",
    "extractPurchaseOrders",
    "updatePurchaseOrders",
    "deletePurchaseOrders"
  ];
};

const permissionMap: PermissionResourceMap = {
  store: ["createStore", "extractStore", "updateStore", "deleteStore"],
  users: ["createUsers", "extractUsers", "updateUsers", "deleteUsers"],
  roles: ["createRoles", "extractRoles", "updateRoles", "deleteRoles"],
  products: [
    "createProducts",
    "extractProducts",
    "updateProducts",
    "deleteProducts",
  ],
  storeInventory: [
    "createStoreInventory",
    "extractStoreInventory",
    "updateStoreInventory",
    "deleteStoreInventory",
  ],
  categories: [
    "createCategories",
    "extractCategories",
    "updateCategories",
    "deleteCategories",
  ],
  transfers: [
    "createTransfers",
    "extractTransfers",
    "updateTransfers",
    "deleteTransfers",
  ],
  sales: ["createSales", "extractSales", "updateSales", "deleteSales"],
  invoices: [
    "createInvoices",
    "extractInvoices",
    "updateInvoices",
    "deleteInvoices",
  ],
  suppliers: [
    "createSuppliers",
    "extractSuppliers",
    "updateSuppliers",
    "deleteSuppliers",
  ],
  purchaseOrders: [
    "createPurchaseOrders",
    "extractPurchaseOrders",
    "updatePurchaseOrders",
    "deletePurchaseOrders",
  ],
};

/**
 * Check if user has permission based on the rule
 */
export function hasPermission(
  permissions: ContextPermissions | null,
  rule: PermissionRule
): boolean {
  // If no permissions object, deny access
  if (!permissions) return false;

  // If custom check is provided, use it
  if (rule.custom) {
    return rule.custom(permissions);
  }

  // If no resource specified, allow by default
  if (!rule.resource) return true;

  const resourcePermissions = permissionMap[rule.resource];
  const check = rule.check || "any";

  switch (check) {
    case "all":
      // User must have ALL permissions for this resource
      return resourcePermissions.every((perm) => permissions[perm] === true);

    case "any":
      // User must have AT LEAST ONE permission for this resource
      return resourcePermissions.some((perm) => permissions[perm] === true);

    case "read":
      // User must have extract/read permission
      const readPerm = resourcePermissions.find((p) => p.includes("extract"));
      return readPerm ? permissions[readPerm] === true : false;

    case "create":
      // User must have create OR update permission
      const createPerm = resourcePermissions.find((p) => p.includes("create"));
      return createPerm ? permissions[createPerm] === true : false;

    case "update":
      // User must have create OR update permission
      const updatePerm = resourcePermissions.find((p) => p.includes("update"));
      return updatePerm ? permissions[updatePerm] === true : false;

    case "none":
      // No permission check needed
      return true;

    default:
      return false;
  }
}

/**
 * Filter items based on user permissions
 */
export function filterByPermissions<T extends { permission?: PermissionRule }>(
  items: T[],
  permissions: ContextPermissions | null
): T[] {
  return items.filter((item) => {
    // If no permission rule defined, show the item
    if (!item.permission) return true;

    // Check permission
    return hasPermission(permissions, item.permission);
  });
}
