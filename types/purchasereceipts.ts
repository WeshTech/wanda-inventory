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
