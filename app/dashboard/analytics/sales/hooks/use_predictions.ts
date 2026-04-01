import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  StoreSalesForecastData,
  ApiResponse,
  ProductSalesForecastData,
  BusinessProfitForecastData,
  StoreSalesHistoryData,
  FastMovingGoodsData,
  WeekendHotSalesData,
  SeasonalProductsData,
  RestockData,
  RegionalRecommendationsData,
  ForecastFilters,
  ProductForecastFilters,
  BusinessForecastFilters,
  AnalyticsFilters,
  RecommendationFilters,
} from "../lib/api_types";
import client from "../lib/axios_client";

// ==================== Forecast Hooks ====================

export const useStoreSalesForecast = (
  filters: ForecastFilters,
  enabled = true,
): UseQueryResult<StoreSalesForecastData, Error> => {
  return useQuery({
    queryKey: ["store-sales-forecast", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<StoreSalesForecastData>>(
        "/forecast/store-sales",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductSalesForecast = (
  filters: ProductForecastFilters,
  enabled = true,
): UseQueryResult<ProductSalesForecastData, Error> => {
  return useQuery({
    queryKey: ["product-sales-forecast", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<ProductSalesForecastData>>(
        "/forecast/product-sales",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useBusinessProfitForecast = (
  filters: BusinessForecastFilters,
  enabled = true,
): UseQueryResult<BusinessProfitForecastData, Error> => {
  return useQuery({
    queryKey: ["business-profit-forecast", filters],
    queryFn: async () => {
      const response = await client.get<
        ApiResponse<BusinessProfitForecastData>
      >("/forecast/business-profit", { params: filters });
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

// ==================== Analytics Hooks ====================

export const useStoreSalesHistory = (
  filters: AnalyticsFilters,
  enabled = true,
): UseQueryResult<StoreSalesHistoryData, Error> => {
  return useQuery({
    queryKey: ["store-sales-history", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<StoreSalesHistoryData>>(
        "/analytics/store-sales",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

// ==================== Recommendations Hooks ====================

export const useFastMovingGoods = (
  filters: RecommendationFilters,
  enabled = true,
): UseQueryResult<FastMovingGoodsData, Error> => {
  return useQuery({
    queryKey: ["fast-moving-goods", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<FastMovingGoodsData>>(
        "/recommendations/fast-moving",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
};

export const useWeekendHotSales = (
  filters: RecommendationFilters,
  enabled = true,
): UseQueryResult<WeekendHotSalesData, Error> => {
  return useQuery({
    queryKey: ["weekend-hot-sales", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<WeekendHotSalesData>>(
        "/recommendations/weekend-hot-sales",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
};

export const useSeasonalProducts = (
  filters: RecommendationFilters,
  enabled = true,
): UseQueryResult<SeasonalProductsData, Error> => {
  return useQuery({
    queryKey: ["seasonal-products", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<SeasonalProductsData>>(
        "/recommendations/seasonal-products",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
};

export const useRestock = (
  filters: RecommendationFilters,
  enabled = true,
): UseQueryResult<RestockData, Error> => {
  return useQuery({
    queryKey: ["restock", filters],
    queryFn: async () => {
      const response = await client.get<ApiResponse<RestockData>>(
        "/recommendations/restock",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
};

export const useRegionalRecommendations = (
  filters: RecommendationFilters,
  enabled = true,
): UseQueryResult<RegionalRecommendationsData, Error> => {
  return useQuery({
    queryKey: ["regional-recommendations", filters],
    queryFn: async () => {
      const response = await client.get<
        ApiResponse<RegionalRecommendationsData>
      >("/recommendations/regional", { params: filters });
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
};
