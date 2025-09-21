export type StoreSummary = {
  id: string;
  name: string;
  ward: string;
  status: "OPENED" | "CLOSED";
  products: number;
  categories: number;
  sales: number;
  staff: number;
};

export type BusinessStoresData = {
  businessId: string;
  businessName: string;
  totalStores: number;
  totalProducts: number;
  totalSales: number;
  totalStaff: number;
  stores: StoreSummary[];
};

export type GetBusinessStoresResponse = {
  success: true;
  message: string;
  data: BusinessStoresData;
};

export type GetBusinessStoresError = {
  success: false;
  message: string;
};

export type GetStoresResult =
  | GetBusinessStoresResponse
  | GetBusinessStoresError;
