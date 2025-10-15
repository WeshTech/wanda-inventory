import { getStoreSalesProductsApi } from "@/server/sales/get-sale-store-products";
import { useQuery } from "@tanstack/react-query";

//get store sale products
export const useStoreSalesProducts = (
  businessId: string,
  storeId: string,
  userId: string
) => {
  return useQuery({
    queryKey: ["storesalesproducts", businessId, storeId, userId],
    queryFn: () => getStoreSalesProductsApi(businessId, storeId, userId),
    enabled: !!businessId && !!storeId && !!userId,
    staleTime: 5 * 60 * 60 * 1000,
  });
};
