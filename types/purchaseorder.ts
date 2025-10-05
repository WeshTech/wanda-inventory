//purchase order data structure
export interface GeneratePurchaseOrderData {
  purchaseOrderNumber: number;
  totalProducts: number;
}

//purchase order response structure
export interface GeneratePurchaseOrderResponse {
  success: boolean;
  message: string;
  data?: GeneratePurchaseOrderData | null;
}

//product item structure in purchase order
export interface PurchaseOrderProduct {
  barcode: string | null;
  productName: string | null;
  quantity: number;
  price: number;
}

//purchase order structure
export interface PurchaseOrderResponseItem {
  purchaseOrderId: string;
  supplierName: string | null;
  storeName: string | null;
  status: string;
  createdBy: string;
  dateCreated: Date;
  dateExpected: Date | null;
  productCount: number;
  products: PurchaseOrderProduct[];
}

//get purchase order response structure
export interface PurchaseOrderResponse {
  success: boolean;
  message: string;
  data: PurchaseOrderResponseItem[] | null;
}
