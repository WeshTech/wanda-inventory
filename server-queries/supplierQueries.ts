import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { SupplierFormData } from "@/schemas/suppliers/createSupplierSchema";
import { CreateSupplierResponse } from "@/types/suppliers";
import { createSupplierApi } from "@/server/suppliers/create-supplier";

export interface CreateSupplierVariables {
  formData: SupplierFormData;
  businessId: string;
}

//create supplier
export const useCreateSupplier = (): UseMutationResult<
  CreateSupplierResponse,
  Error,
  CreateSupplierVariables
> => {
  return useMutation<CreateSupplierResponse, Error, CreateSupplierVariables>({
    mutationFn: ({ formData, businessId }) =>
      createSupplierApi(formData, businessId),
  });
};
