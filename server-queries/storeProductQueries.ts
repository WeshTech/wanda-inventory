import { useQuery } from "@tanstack/react-query";
import { SearchStoreProductResponse } from "@/types/storeProducts";
import { searchStoreProductApi } from "@/server/storeProducts/search-strore-product";

interface SearchStoreProductsParams {
  businessId: string;
  businessUserId: string;
  storeId: string;
  searchTerm: string;
}

export const useSearchStoreProducts = ({
  businessId,
  businessUserId,
  storeId,
  searchTerm,
}: SearchStoreProductsParams) => {
  return useQuery<SearchStoreProductResponse, Error>({
    queryKey: [
      "storeProducts",
      businessId,
      businessUserId,
      storeId,
      searchTerm,
    ],
    queryFn: () =>
      searchStoreProductApi(businessId, businessUserId, storeId, searchTerm),
    enabled: !!businessId && !!businessUserId && !!storeId && !!searchTerm,
    staleTime: 20 * 60 * 1000,
  });
};
