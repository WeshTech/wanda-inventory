import { getStoreSalesProductsApi } from "@/server/sales/get-sale-store-products";
import { GetStoreSaleProductsResult } from "@/types/sales";
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
