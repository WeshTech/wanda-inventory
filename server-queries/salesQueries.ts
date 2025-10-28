import { createSaleApi } from "@/server/sales/create-sale";
import { getAllSalesApi } from "@/server/sales/get-all-sales";
import { getSaleByIdApi } from "@/server/sales/get-sale-by-id";
import { getStoreSalesProductsApi } from "@/server/sales/get-sale-store-products";
import { searchStoreSalesProductsApi } from "@/server/sales/search-sale-products";
import {
  CreateSaleFormData,
  CreateSaleResponse,
  GetSaleByIdResponse,
  GetSalesResponse,
  GetStoreSaleProductsResult,
  SearchStoreSaleProductsResponse,
} from "@/types/sales";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";

//get store sale products
export const useStoreSalesProducts = (
  businessId: string,
  storeId: string,
  userId: string,
  page: number,
  limit: number
) => {
  const queryClient = useQueryClient();

  const query = useQuery<GetStoreSaleProductsResult, Error>({
    queryKey: ["storesalesproducts", businessId, storeId, userId, page, limit],
    queryFn: () =>
      getStoreSalesProductsApi(businessId, storeId, userId, page, limit),
    placeholderData: keepPreviousData,
    enabled: !!businessId && !!storeId && !!userId,
    staleTime: 1000, // 1 second
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
  });

  // Prefetch next and previous pages
  useEffect(() => {
    if (!query.isSuccess || !query.data?.success) return;

    const hasMore = query.data?.data?.length === limit;

    // Prefetch next page if there might be more data
    if (hasMore) {
      queryClient.prefetchQuery({
        queryKey: [
          "storesalesproducts",
          businessId,
          storeId,
          userId,
          page + 1,
          limit,
        ],
        queryFn: () =>
          getStoreSalesProductsApi(
            businessId,
            storeId,
            userId,
            page + 1,
            limit
          ),
        staleTime: 1000,
      });
    }

    // Prefetch previous page
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "storesalesproducts",
          businessId,
          storeId,
          userId,
          page - 1,
          limit,
        ],
        queryFn: () =>
          getStoreSalesProductsApi(
            businessId,
            storeId,
            userId,
            page - 1,
            limit
          ),
        staleTime: 1000,
      });
    }
  }, [
    query.isSuccess,
    query.data,
    businessId,
    storeId,
    userId,
    page,
    limit,
    queryClient,
  ]);

  return query;
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

//create sale hook
export function useCreateSale() {
  return useMutation<CreateSaleResponse, Error, CreateSaleFormData>({
    mutationFn: createSaleApi,
  });
}

//get sales
export const useGetAllSales = (
  businessId: string,
  storeId: string,
  userId: string
) => {
  return useQuery<GetSalesResponse, Error>({
    queryKey: ["getstoresales", businessId, storeId, userId],
    queryFn: () => getAllSalesApi(businessId, storeId, userId),
    enabled: !!(businessId && storeId && userId),
    staleTime: 5 * 60 * 1000,
  });
};

//get sale by id
export const useGetSaleById = (
  businessId: string,
  userId: string,
  saleId: string
) => {
  return useQuery<GetSaleByIdResponse, Error>({
    queryKey: ["getsalebyid", businessId, userId, saleId],
    queryFn: () => getSaleByIdApi(businessId, userId, saleId),
    enabled: !!(businessId && userId && saleId),
    staleTime: 5 * 60 * 1000,
  });
};
