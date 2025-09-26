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
  roleId: string;
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

// updated role
export type UpdateBusinessRole = {
  id: string;
  roleName: string;
  description: string;
  updatedAt: string;
};

// updated role response
export type UpdateBusinessRoleResponse = {
  success: boolean;
  message: string;
  data: UpdateBusinessRole | null;
};

export type BusinessRole = {
  id: string;
  roleName: string;
  description: string;

  // --- Store ---
  createStore: boolean;
  extractStore: boolean;
  updateStore: boolean;
  deleteStore: boolean;

  // --- Users ---
  createUsers: boolean;
  extractUsers: boolean;
  updateUsers: boolean;
  deleteUsers: boolean;

  // --- Roles ---
  createRoles: boolean;
  extractRoles: boolean;
  updateRoles: boolean;
  deleteRoles: boolean;

  // --- Products ---
  createProducts: boolean;
  extractProducts: boolean;
  updateProducts: boolean;
  deleteProducts: boolean;

  // --- Store Inventory ---
  createStoreInventory: boolean;
  extractStoreInventory: boolean;
  updateStoreInventory: boolean;
  deleteStoreInventory: boolean;

  // --- Categories ---
  createCategories: boolean;
  extractCategories: boolean;
  updateCategories: boolean;
  deleteCategories: boolean;

  // --- Transfers ---
  createTransfers: boolean;
  extractTransfers: boolean;
  updateTransfers: boolean;
  deleteTransfers: boolean;

  // --- Sales ---
  createSales: boolean;
  extractSales: boolean;
  updateSales: boolean;
  deleteSales: boolean;

  // --- Invoices ---
  createInvoices: boolean;
  extractInvoices: boolean;
  updateInvoices: boolean;
  deleteInvoices: boolean;

  // --- Suppliers ---
  createSuppliers: boolean;
  extractSuppliers: boolean;
  updateSuppliers: boolean;
  deleteSuppliers: boolean;

  // --- Purchase Orders ---
  createPurchaseOrders: boolean;
  extractPurchaseOrders: boolean;
  updatePurchaseOrders: boolean;
  deletePurchaseOrders: boolean;
};

//extracted role
export type SingleRoleResponse = {
  success: boolean;
  message: string;
  data: BusinessRole | null;
};
