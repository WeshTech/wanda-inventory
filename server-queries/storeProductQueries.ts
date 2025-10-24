import { useQuery } from "@tanstack/react-query";
import { SearchStoreProductResponse } from "@/types/storeProducts";
import { searchStoreProductApi } from "@/server/storeProducts/search-strore-product";

interface SearchStoreProductsParams {
  isLoading: boolean;
  businessId: string;
  businessUserId: string;
  storeId: string;
  searchTerm: string;
}

export const useSearchStoreProducts = ({
  isLoading,
  businessId,
  businessUserId,
  storeId,
  searchTerm,
}: SearchStoreProductsParams) => {
  return useQuery<SearchStoreProductResponse, Error>({
    queryKey: [
      "searchstoreProducts",
      businessId,
      businessUserId,
      storeId,
      searchTerm,
    ],
    queryFn: () =>
      searchStoreProductApi(businessId, businessUserId, storeId, searchTerm),
    enabled:
      !isLoading &&
      !!businessId &&
      !!businessUserId &&
      !!storeId &&
      !!searchTerm,
    staleTime: 20 * 60 * 1000,
  });
};
