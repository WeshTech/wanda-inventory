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

//single supplier
export type SupplierData = {
  supplierId: string;
  name: string;
  suppllies: string | null;
  contact?: string | null;
  email?: string | null;
  phone?: string | null;
};

//get suppliers response
export type GetSuppliersResponse = {
  success: boolean;
  message: string;
  data: SupplierData[] | null;
};

//singe update supplier
export type UpdateSupplierResponseData = {
  supplierId: string;
  name: string;
  updatedAt: string;
};

//update supplier response
export type UpdateSupplierResponse = {
  success: boolean;
  message: string;
  data: UpdateSupplierResponseData | null;
};
