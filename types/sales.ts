// single sale product
export type StoreSaleProduct = {
  productId: string;
  imgUrl: string | null;
  productCode: string | null;
  productName: string | null;
  category: string | null;
  quantity: number;
  price: number;
};

// sale product response
export type GetStoreSaleProductsResult = {
  success: boolean;
  message: string;
  data: StoreSaleProduct[] | null;
  total: number;
  page: number;
  limit: number;
  pages: number;
};

// search sale product
export type SearchStoreSaleProduct = {
  productId: string;
  imgUrl: string | null;
  productCode: string | null;
  productName: string | null;
  category: string | null;
  quantity: number;
  price: number;
};

// search sale product response
export type SearchStoreSaleProductsResponse = {
  success: boolean;
  message: string;
  data: SearchStoreSaleProduct[] | null;
};

// create sale response types
export type CreateSaleResponseData = {
  saleId: string;
  totalAmount: number;
  createdAt: string;
};

// create sale response
export type CreateSaleResponse = {
  success: boolean;
  message: string;
  data: CreateSaleResponseData | null;
};

export type productData = {
  productId: string;
  serialNumber?: string;
  quantity: number;
  price: number;
};

export type CreateSaleFormData = {
  businessId: string;
  storeId: string;
  userId: string;
  customerName: string;
  totalAmount: number;
  products: productData[];
};

// sale data type
export type SaleData = {
  saleId: string;
  invoiceNumber: number;
  store: string;
  CustomerName: string;
  servedBy: string;
  totalAmount: number;
  createdAt: string;
};

// get sales response type
export type GetSalesResponse = {
  success: boolean;
  message: string;
  data: SaleData[] | null;
};

//sale item type
export type SaleItem = {
  productCode: string;
  productName: string | null;
  quantity: number;
  price: number;
  total: number;
};

// sale detail data type
export type SaleDetailData = {
  invoiceNumber: number;
  store: string;
  customerName: string;
  servedBy: string;
  totalAmount: number;
  createdAt: string;
  items: SaleItem[];
};

// get sale by id response type
export type GetSaleByIdResponse = {
  success: boolean;
  message: string;
  data: SaleDetailData | null;
};
