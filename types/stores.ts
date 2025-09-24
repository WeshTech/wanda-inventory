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

export interface BusinessStoresData {
  success: boolean;
  message: string;
  data: {
    businessId: string;
    businessName: string;
    totalStores: number;
    totalProducts: number;
    totalSales: number;
    totalStaff: number;
    stores: Store[];
  };
}

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
