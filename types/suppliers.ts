//create supplier
export type CreateSupplierResponseData = {
  supplierId: string;
  name: string;
  createdAt: string;
};

//create supplier response
export type CreateSupplierResponse = {
  success: boolean;
  message: string;
  data: CreateSupplierResponseData | null;
};
