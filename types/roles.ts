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
