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
  supplies: string | null;
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