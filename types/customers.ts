//single customer
export type CustomerResponseData = {
  customerNumber: number;
  customerName: string;
  createdAt: Date;
};

//create customer response
export type CreateCustomerResponse = {
  success: boolean;
  message: string;
  data: CustomerResponseData | null;
};
