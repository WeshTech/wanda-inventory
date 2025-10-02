import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import {
  CreateBusinessProductResponse,
  FindProductByBarcodeResponse,
} from "@/types/inventory";
import { getProductApi } from "@/server/inventory/get-product";
import { InventoryFormData } from "@/schemas/inventory/add-inventory";
import { createBusinessProductApi } from "@/server/inventory/create-business-product";

interface CreateProductInput {
  formData: InventoryFormData;
  businessId: string;
}

//find product by barcode
export function useFindProductByBarcode(
  businessId: string,
  barcode: string,
  qEnabled: boolean
) {
  return useQuery<FindProductByBarcodeResponse, Error>({
    queryKey: ["findProductByBarcode", businessId, barcode],
    queryFn: () => getProductApi(businessId, barcode),
    enabled: qEnabled,
    staleTime: 1000 * 60 * 5,
  });
}

// Custom hook for creating a business product
export const useCreateBusinessProduct = (): UseMutationResult<
  CreateBusinessProductResponse,
  Error,
  CreateProductInput
> => {
  return useMutation<CreateBusinessProductResponse, Error, CreateProductInput>({
    mutationFn: ({ formData, businessId }: CreateProductInput) =>
      createBusinessProductApi(formData, businessId),
  });
};
