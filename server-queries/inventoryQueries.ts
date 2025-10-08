import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreateBusinessProductResponse,
  FindProductByBarcodeResponse,
  GetBusinessProductsResponse,
  GetInventoryStatsResponse,
  SearchBusinessProductResponse,
} from "@/types/inventory";
import { getProductApi } from "@/server/inventory/get-product";
import { InventoryFormData } from "@/schemas/inventory/add-inventory";
import { createBusinessProductApi } from "@/server/inventory/create-business-product";
import { getBusinessProductsApi } from "@/server/inventory/get-business-products";
import { getInventoryStatsApi } from "@/server/inventory/get-inventory-stats";
import { searchBusinessProductsApi } from "@/server/inventory/search-business-product";

interface CreateProductInput {
  formData: InventoryFormData;
  businessId: string;
}

// find product by barcode
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

// create business product + invalidate business products on success
export const useCreateBusinessProduct = (): UseMutationResult<
  CreateBusinessProductResponse,
  Error,
  CreateProductInput
> => {
  const queryClient = useQueryClient();

  return useMutation<CreateBusinessProductResponse, Error, CreateProductInput>({
    mutationFn: ({ formData, businessId }: CreateProductInput) =>
      createBusinessProductApi(formData, businessId),

    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getbusinessproducts", businessId],
      });
    },
  });
};

// get business products
export const useBusinessProducts = (businessId: string) => {
  return useQuery<GetBusinessProductsResponse, Error>({
    queryKey: ["getbusinessproducts", businessId],
    queryFn: () => getBusinessProductsApi(businessId),
    enabled: !!businessId,
    staleTime: 60 * 60 * 1000 * 10,
  });
};

// get inventory stats
export const useInventoryStats = (businessId: string) => {
  return useQuery<GetInventoryStatsResponse, Error>({
    queryKey: ["getinventoryStats", businessId],
    queryFn: () => getInventoryStatsApi(businessId),
    enabled: !!businessId,
    staleTime: 1000,
  });
};

//search business products
export const useSearchBusinessProducts = (
  businessId: string,
  searchTerm: string
) => {
  return useQuery<SearchBusinessProductResponse, Error>({
    queryKey: ["searchBusinessProducts", businessId, searchTerm],
    queryFn: () => searchBusinessProductsApi(businessId, searchTerm),
    enabled: !!businessId && !!searchTerm,
    retry: false,
  });
};
