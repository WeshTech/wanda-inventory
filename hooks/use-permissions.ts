// hooks/use-permission.ts
import { useMemo } from "react";
import type { ContextPermissions } from "@/types/context";
import { useAuthPermissions } from "@/stores/authStore";
import { hasPermission, PermissionRule } from "@/utils/permissions";

/**
 * Hook to check if user has a specific permission
 */
export function usePermission(rule: PermissionRule): boolean {
  const permissions = useAuthPermissions();

  return useMemo(() => {
    return hasPermission(permissions, rule);
  }, [permissions, rule]);
}

/**
 * Hook to get multiple permission checks at once
 */
export function usePermissions() {
  const permissions = useAuthPermissions();

  return useMemo(() => {
    if (!permissions) {
      return {
        can: () => false,
        canAll: () => false,
        canAny: () => false,
      };
    }

    return {
      // Check a single permission rule
      can: (rule: PermissionRule) => hasPermission(permissions, rule),

      // Check if user has ALL specified permissions
      canAll: (...rules: PermissionRule[]) =>
        rules.every((rule) => hasPermission(permissions, rule)),

      // Check if user has ANY of the specified permissions
      canAny: (...rules: PermissionRule[]) =>
        rules.some((rule) => hasPermission(permissions, rule)),
    };
  }, [permissions]);
}

/**
 * Hook for checking specific resource permissions
 */
export function useResourcePermissions<T extends keyof PermissionResourceMap>(
  resource: T
) {
  const permissions = useAuthPermissions();

  return useMemo(() => {
    return {
      canCreate: hasPermission(permissions, {
        resource,
        custom: (p) =>
          p?.[`create${capitalize(resource)}` as keyof ContextPermissions] ===
          true,
      }),
      canRead: hasPermission(permissions, {
        resource,
        custom: (p) =>
          p?.[`extract${capitalize(resource)}` as keyof ContextPermissions] ===
          true,
      }),
      canUpdate: hasPermission(permissions, {
        resource,
        custom: (p) =>
          p?.[`update${capitalize(resource)}` as keyof ContextPermissions] ===
          true,
      }),
      canDelete: hasPermission(permissions, {
        resource,
        custom: (p) =>
          p?.[`delete${capitalize(resource)}` as keyof ContextPermissions] ===
          true,
      }),
      hasAny: hasPermission(permissions, { resource, check: "any" }),
      hasAll: hasPermission(permissions, { resource, check: "all" }),
    };
  }, [permissions, resource]);
}

// Helper function
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type PermissionResourceMap = {
  store: string[];
  users: string[];
  roles: string[];
  products: string[];
  storeInventory: string[];
  categories: string[];
  transfers: string[];
  sales: string[];
  invoices: string[];
  suppliers: string[];
  purchaseOrders: string[];
};

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Example 1: Simple permission check
function MyComponent() {
  const canViewStores = usePermission({ 
    resource: "store", 
    check: "read" 
  });

  if (!canViewStores) {
    return <div>Access denied</div>;
  }

  return <div>Store content...</div>;
}

// Example 2: Multiple permission checks
function MyComponent() {
  const { can, canAny, canAll } = usePermissions();

  const canManageUsers = can({ resource: "users", check: "all" });
  const canAccessSales = canAny(
    { resource: "sales", check: "any" },
    { resource: "invoices", check: "any" }
  );

  return (
    <div>
      {canManageUsers && <button>Manage Users</button>}
      {canAccessSales && <button>View Sales</button>}
    </div>
  );
}

// Example 3: Resource-specific permissions
function StoreComponent() {
  const storePerms = useResourcePermissions("store");

  return (
    <div>
      {storePerms.canCreate && <button>Create Store</button>}
      {storePerms.canUpdate && <button>Edit Store</button>}
      {storePerms.canDelete && <button>Delete Store</button>}
      {!storePerms.hasAny && <div>No store access</div>}
    </div>
  );
}

// Example 4: Conditional rendering in JSX
function ProductsList() {
  const { can } = usePermissions();

  return (
    <div>
      <h1>Products</h1>
      {can({ resource: "products", check: "write" }) && (
        <button>Add Product</button>
      )}
      <ProductTable />
    </div>
  );
}

// Example 5: Complex custom logic
function AdminPanel() {
  const canAccess = usePermission({
    custom: (permissions) => {
      // Admin panel requires both user management AND store management
      return (
        permissions?.createUsers === true &&
        permissions?.extractUsers === true &&
        permissions?.createStore === true
      );
    },
  });

  if (!canAccess) {
    return <Navigate to="/dashboard" />;
  }

  return <div>Admin Panel Content</div>;
}
*/
