export type PermissionActions = {
  create: boolean;
  extract: boolean;
  update: boolean;
  delete: boolean;
};

export type PermissionModuleKeys =
  | "store"
  | "users"
  | "roles"
  | "products"
  | "storeInventory"
  | "categories"
  | "transfers"
  | "sales"
  | "invoices"
  | "suppliers"
  | "purchaseOrders";

export type Role = {
  id: string;
  title: string;
  description: string;
  activeUsers: number;
  dateCreated: string;
  permissions: {
    [key in PermissionModuleKeys]: PermissionActions;
  };
};

type CreatedRoleData = {
  roleName: string;
  description: string;
};

export type CreateBusinessRoleResponse = {
  success: boolean;
  message: string;
  data: CreatedRoleData | null;
};

// Represents a single role item
export type BusinessRoleItem = {
  roleName: string;
  description: string;
  activeUsers: number;
  createdAt: Date;
};

// Represents the data payload when roles are returned
export type BusinessRoleData = {
  roles: BusinessRoleItem[];
  count: number;
};

// Represents the full API response
export type BusinessRolesResponse = {
  success: boolean;
  message: string;
  data: BusinessRoleData | null;
};
