import { getStoreSalesProductsApi } from "@/server/sales/get-sale-store-products";
import { searchStoreSalesProductsApi } from "@/server/sales/search-sale-products";
import {
  GetStoreSaleProductsResult,
  SearchStoreSaleProductsResponse,
} from "@/types/sales";
import { useQuery } from "@tanstack/react-query";

//get store sale products
export const useStoreSalesProducts = (
  businessId: string,
  storeId: string,
  userId: string
) => {
  return useQuery<GetStoreSaleProductsResult, Error>({
    queryKey: ["storesalesproducts", businessId, storeId, userId],
    queryFn: () => getStoreSalesProductsApi(businessId, storeId, userId),
    enabled: !!businessId && !!storeId && !!userId,
    staleTime: 1000,
  });
};

//search store sale products
export const useSearchStoreSalesProducts = (
  businessId: string,
  storeId: string,
  userId: string,
  searchTerm: string
) => {
  return useQuery<SearchStoreSaleProductsResponse, Error>({
    queryKey: [
      "searchStoreSalesProducts",
      businessId,
      storeId,
      userId,
      searchTerm,
    ],
    queryFn: () =>
      searchStoreSalesProductsApi(businessId, storeId, userId, searchTerm),
    enabled:
      !!businessId && !!storeId && !!userId && !!searchTerm && !!searchTerm,
    staleTime: 100,
  });
};
