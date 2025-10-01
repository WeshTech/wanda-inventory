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

//single customer data
export type BusinessCustomerData = {
  id: string;
  customerNumber: number;
  customerName: string;
  email?: string | null;
  phone?: string | null;
};

//get customers response
export type GetBusinessCustomersResponse = {
  success: boolean;
  message: string;
  data: BusinessCustomerData[] | null;
};
