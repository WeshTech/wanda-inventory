import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { SupplierFormData } from "@/schemas/suppliers/createSupplierSchema";
import {
  CreateSupplierResponse,
  GetSuppliersResponse,
} from "@/types/suppliers";
import { createSupplierApi } from "@/server/suppliers/create-supplier";
import { getBusinessSuppliersApi } from "@/server/suppliers/get-all-suppliers";

export interface CreateSupplierVariables {
  formData: SupplierFormData;
  businessId: string;
}

// create supplier
export const useCreateSupplier = (): UseMutationResult<
  CreateSupplierResponse,
  Error,
  CreateSupplierVariables
> => {
  const queryClient = useQueryClient();

  return useMutation<CreateSupplierResponse, Error, CreateSupplierVariables>({
    mutationFn: ({ formData, businessId }) =>
      createSupplierApi(formData, businessId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getBusinessSuppliers", variables.businessId],
      });
    },
  });
};

// get business suppliers
export const useBusinessSuppliersQuery = (businessId: string) => {
  return useQuery<GetSuppliersResponse, Error>({
    queryKey: ["getBusinessSuppliers", businessId],
    queryFn: async () => {
      if (!businessId) throw new Error("Business ID is required");
      return await getBusinessSuppliersApi(businessId);
    },
    enabled: !!businessId,
    staleTime: 10 * 60 * 60 * 1000,
  });
};
