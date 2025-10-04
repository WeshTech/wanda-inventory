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
