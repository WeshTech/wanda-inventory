export interface Transfer {
  id: number;
  productName: string;
  productImage: string;
  from: string;
  to: string;
  status: "completed" | "pending" | "in-transit" | "failed";
  time: string;
  receivedBy: string;
  quantity: number;
}

export type TransferStatus = Transfer["status"];

//single transfer form data
export interface SingleTransferFormData {
  searchTerm: string;
  productCode: string;
  productName: string;
  storeProductId: string;
  fromStore: string;
  toStore: string;
  quantity: number;
  notes: string | null;
}

//create transfer type
export type TransferCreatedDto = {
  transferId: string;
  createdAt: string;
};

//create transfer response type
export type SingleTransferResponse = {
  success: boolean;
  message: string;
  data: TransferCreatedDto | null;
};

//single transfer
export type TransferLineDto = {
  productName: string;
  from: string;
  to: string;
  status: string;
  createdBy: string | null;
  transferedAt: string;
};

// transfers response
export type GetTransfersResponse = {
  success: boolean;
  message: string;
  data: TransferLineDto[] | null;
};
