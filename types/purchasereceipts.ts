// Interface for CreatePRDto to ensure type safety
export type ProductDto = {
  businessProductId: string;
  acceptedQuantity: number;
  rejectedQuantity: number;
  unitPrice: number;
};

export type CreatePRDto = {
  businessId: string;
  purchaseOrderId?: string;
  receiptName: string;
  supplierId: string;
  storeId: string;
  createdBy: string;
  products: ProductDto[];
};

//create PR data
export type PurchaseReceiptResponseData = {
  receiptId: string;
  createdAt: string;
};

// create PR response Structure
export type CreatePRResponse = {
  success: boolean;
  message: string;
  data: PurchaseReceiptResponseData | null;
};

//PR data structure
export type PurchaseReceiptData = {
  purchaseReceiptId: string;
  receiptNumber: number;
  receiptName: string;
  supplier: string;
  store: string;
  totalAmount: number;
  status: "RECEIVED" | "REJECTED";
  dateCreated: string;
  createdBy: string | null;
};

//PR response structure
export type GetPurchaseReceiptsResponse = {
  success: boolean;
  message: string;
  data: PurchaseReceiptData[] | null;
};
