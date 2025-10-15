// A single store entity
export type Store = {
  id: string;
  name: string;
  ward: string;
  status: "OPENED" | "CLOSED";
  products: number;
  categories: number;
  sales: number;
  staff: number;
};

// The business data returned in "data"
export interface BusinessStoresData {
  businessId: string;
  businessName: string;
  totalStores: number;
  totalProducts: number;
  totalSales: number;
  totalStaff: number;
  stores: Store[];
}

// Successful response from backend
export type GetBusinessStoresResponse = {
  success: boolean;
  message: string;
  data: BusinessStoresData | null;
};

// Union type for queries
export type GetStoresResult = GetBusinessStoresResponse;

// Response when creating a new store
export interface CreateStoreResponse {
  success: boolean;
  message: string;
  data?: {
    name: string;
    status: string;
    county: string;
    constituency: string;
    ward: string;
    createdAt: string;
  };
}

//store info
export type StoreInfo = {
  storeId: string;
  storeName: string;
  ward: string;
};

//store respone
export type StoresInfoResponse = {
  success: boolean;
  message: string;
  data: StoreInfo | StoreInfo[] | null;
};
