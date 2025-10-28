//found at
export type FoundAtType = "catalogue" | "business";

//single product
export type FoundProductData = {
  name: string;
  id: string;
  description: string;
  brand: string;
  imageUrl: string;
  unit: string;
};

//product response
export interface FindProductByBarcodeResponse {
  success: boolean;
  foundAt: FoundAtType | null;
  data: FoundProductData | null;
}

// single product object
export type ProductData = {
  productId: string;
  createdAt: string | null;
};

// product creation response
export type CreateBusinessProductResponse = {
  success: boolean;
  message: string;
  data: ProductData | null;
};

//single product structure
export type BusinessProductStoreRow = {
  businessProductId: string;
  productId?: string | null;
  imageUrl?: string | null;
  barcode?: string | null;
  productName?: string | null;
  categoryName?: string | null;
  quantity: number;
  sellingPrice: number | null;
  totalQuantity: number;
  totalMinStock: number;
  status: "InStock" | "lowStock" | "out of stock";
};

//total products response
export type GetBusinessProductsResponse = {
  success: boolean;
  message: string;
  data: BusinessProductStoreRow[] | null;
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
};

//stats data structure
export type InventoryStats = {
  totalAssetValue: number;
  totalProducts: number;
  totalInStock: number;
  totalLowStock: number;
  totalOutOfStock: number;
};

//stats response structure
export type GetInventoryStatsResponse = {
  success: boolean;
  message: string;
  data: InventoryStats | null;
};

// Response item for each matched product
export type BusinessProductResult = {
  businessProductId: string;
  productName: string | null;
  productBarcode: string | null;
};

// Generic API response wrapper
export type SearchBusinessProductResponse = {
  success: boolean;
  message: string;
  data: BusinessProductResult[] | null;
};
