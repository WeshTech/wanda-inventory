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

//purchase order summary item structure
export interface PurchaseOrderResponseItem {
  purchaseOrderId: string;
  supplierName: string | null;
  storeName: string | null;
  status: string;
  createdBy: string;
  dateCreated: Date;
  productCount: number;
}

//get purchase order response structure
export interface PurchaseOrderResponse {
  success: boolean;
  message: string;
  data: PurchaseOrderResponseItem[] | null;
}
