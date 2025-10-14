export type ContextPermissions = {
  // Store
  createStore: boolean | null;
  extractStore: boolean | null;
  updateStore: boolean | null;
  deleteStore: boolean | null;

  // Users
  createUsers: boolean | null;
  extractUsers: boolean | null;
  updateUsers: boolean | null;
  deleteUsers: boolean | null;

  // Roles
  createRoles: boolean | null;
  extractRoles: boolean | null;
  updateRoles: boolean | null;
  deleteRoles: boolean | null;

  // Products
  createProducts: boolean | null;
  extractProducts: boolean | null;
  updateProducts: boolean | null;
  deleteProducts: boolean | null;

  // Store Inventory
  createStoreInventory: boolean | null;
  extractStoreInventory: boolean | null;
  updateStoreInventory: boolean | null;
  deleteStoreInventory: boolean | null;

  // Categories
  createCategories: boolean | null;
  extractCategories: boolean | null;
  updateCategories: boolean | null;
  deleteCategories: boolean | null;

  // Transfers
  createTransfers: boolean | null;
  extractTransfers: boolean | null;
  updateTransfers: boolean | null;
  deleteTransfers: boolean | null;

  // Sales
  createSales: boolean | null;
  extractSales: boolean | null;
  updateSales: boolean | null;
  deleteSales: boolean | null;

  // Invoices
  createInvoices: boolean | null;
  extractInvoices: boolean | null;
  updateInvoices: boolean | null;
  deleteInvoices: boolean | null;

  // Suppliers
  createSuppliers: boolean | null;
  extractSuppliers: boolean | null;
  updateSuppliers: boolean | null;
  deleteSuppliers: boolean | null;

  // Purchase Orders
  createPurchaseOrders: boolean | null;
  extractPurchaseOrders: boolean | null;
  updatePurchaseOrders: boolean | null;
  deletePurchaseOrders: boolean | null;
};

//single staff context
export type ContextData = {
  user: { email: string; role: string };
  permissions: ContextPermissions;
  storeAccess: string[];
  businessId: string;
};

//staff context response
export type ContextResponse = {
  success: boolean;
  message: string;
  data: ContextData | null;
};
