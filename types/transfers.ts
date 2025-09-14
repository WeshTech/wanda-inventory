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
