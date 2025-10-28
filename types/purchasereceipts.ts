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

//PR response structure with pagination
export type GetPurchaseReceiptsResponse = {
  success: boolean;
  message: string;
  data: PurchaseReceiptData[] | null;
  pagination?: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
  };
};

// single product line
export type PurchaseReceiptProduct = {
  businessProductId: string;
  productId: string | null;
  imageUrl: string | null;
  productCode: string | null;
  productName: string | null;
  quantity: number;
  unitPrice: number;
};

// purchase receipt data structure
export type IndividualPurchaseReceiptData = {
  purchaseReceiptId: string;
  purchaseOrderId: string;
  receiptNumber: number;
  receiptName: string;
  supplierName: string;
  storeName: string;
  dateReceived: string;
  status: "RECEIVED" | "REJECTED";
  products: PurchaseReceiptProduct[];
};

// single PR response
export type GetPurchaseReceiptResponse = {
  success: boolean;
  message: string;
  data: IndividualPurchaseReceiptData | null;
};

//update purchase receipt data
export type updatePurchaseReceiptData = {
  purchaseReceiptId: string;
  updatedAt: string;
};
// --- Response Type ---
export type updatePurchaseReceiptResponse = {
  success: boolean;
  message: string;
  data: updatePurchaseReceiptData | null;
};

export type UpdateReceiptSubmissionData = {
  receiptName: string;
  purchaseReceiptId: string | undefined;
  store: string;
  supplier: string;
  purchaseOrderId: string;
  receiptNumber: number;
  totalAmount: number;
  products: Array<{
    businessProductId: string;
    productCode: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    imageUrl?: string | null | undefined;
  }>;
};
