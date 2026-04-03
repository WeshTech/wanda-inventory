import client from "@/app/dashboard/analytics/sales/lib/axios_client";
import { getBusinessAnalysisTimeApi } from "@/server/analysis/get-analysis-time";
import {
  AnalysisTimeResponse,
  FastMovingFilters,
  FastMovingGoodsData,
  FastMovingGoodsResponse,
  RegionalRecommendationsData,
  RegionalRecommendationsFilters,
  RegionalRecommendationsResponse,
  RestockRecommendationsData,
  RestockRecommendationsFilters,
  RestockRecommendationsResponse,
  SeasonalFilters,
  SeasonalProductsData,
  SeasonalProductsResponse,
  StoreIntelligenceData,
  StoreIntelligenceFilters,
  StoreIntelligenceResponse,
  WeekendHotSalesData,
  WeekendHotSalesFilters,
  WeekendHotSalesResponse,
} from "@/types/analysis";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//get business analysis tyme
export const useGetBusinessAnalysisTime = (businessId: string) => {
  return useQuery<AnalysisTimeResponse, Error>({
    queryKey: ["getbusinessAnalysisTime", businessId],
    queryFn: () => getBusinessAnalysisTimeApi(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 3600 * 13,
  });
};

//regional recommendation query
export const useRegionalRecommendations = (
  filters: RegionalRecommendationsFilters,
  enabled = true,
  isAuthready = true,
): UseQueryResult<RegionalRecommendationsData, Error> => {
  return useQuery({
    queryKey: ["regional-recommendations", filters],
    queryFn: async () => {
      const response = await client.get<RegionalRecommendationsResponse>(
        "/recommendations/regional",
        { params: filters },
      );
      return response.data.data;
    },
    enabled: enabled && isAuthready,
    staleTime: 1000 * 60 * 10,
  });
};

//restock recommendation
export const useRestock = (
  filters: RestockRecommendationsFilters,
  enabled = true,
  isAuthready = true,
): UseQueryResult<RestockRecommendationsData, Error> => {
  return useQuery({
    queryKey: ["restock-recommendations", filters],
    queryFn: async () => {
      const response = await client.get<RestockRecommendationsResponse>(
        "/recommendations/restock",
        { params: filters },
      );
      return response.data.data;
    },
    enabled: enabled && isAuthready,
    staleTime: 1000 * 60 * 10,
  });
};

//Weekend hot sales
export const useWeekendHotSales = (
  filters: WeekendHotSalesFilters,
  enabled = true,
  isAuthready = true,
): UseQueryResult<WeekendHotSalesData, Error> => {
  return useQuery({
    queryKey: ["weekend-hot-sales", filters],
    queryFn: async () => {
      const response = await client.get<WeekendHotSalesResponse>(
        "/recommendations/weekend-hot-sales",
        { params: filters },
      );
      return response.data.data;
    },
    enabled: enabled && isAuthready,
    staleTime: 1000 * 60 * 10,
  });
};

//seasonal products query
export const useSeasonalProducts = (
  filters: SeasonalFilters,
  enabled = true,
  isAuthready = true,
): UseQueryResult<SeasonalProductsData, Error> => {
  return useQuery({
    queryKey: ["seasonal-products", filters],
    queryFn: async () => {
      const response = await client.get<SeasonalProductsResponse>(
        "/recommendations/seasonal-products",
        { params: filters },
      );
      return response.data.data;
    },
    enabled: enabled && isAuthready,
    staleTime: 1000 * 60 * 10,
  });
};

//fast moving goods
export const useFastMovingGoods = (
  filters: FastMovingFilters,
  enabled = true,
  isAuthready = true,
): UseQueryResult<FastMovingGoodsData, Error> => {
  return useQuery({
    queryKey: ["fast-moving-goods", filters],
    queryFn: async () => {
      const response = await client.get<FastMovingGoodsResponse>(
        "/recommendations/fast-moving",
        { params: filters },
      );
      return response.data.data;
    },
    enabled: enabled && isAuthready,
    staleTime: 1000 * 60 * 10,
  });
};

//store Intelligence
export const useStoreIntelligence = (
  filters: StoreIntelligenceFilters,
  enabled = true,
  isAuthready = true,
): UseQueryResult<StoreIntelligenceData, Error> => {
  return useQuery({
    queryKey: ["store-intelligence-analytics", filters],
    queryFn: async () => {
      console.log(filters);
      const response = await client.get<StoreIntelligenceResponse>(
        "/intelligence/store",
        { params: filters },
      );
      return response.data.data;
    },
    enabled: enabled && isAuthready,
    staleTime: 1000 * 60 * 10,
  });
};
