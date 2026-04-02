"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { DashboardFilters, DashboardFilterValues } from "./filters";
import {
  useFastMovingGoods,
  useRegionalRecommendations,
  useRestock,
  useSeasonalProducts,
  useStoreSalesForecast,
  useStoreSalesHistory,
  useWeekendHotSales,
} from "./hooks/use_predictions";
import { Spinner } from "./spinner";
import { StoreSalesForecastChart } from "./charts/sales-forecast-chart";
import { SalesHistoryChart } from "./charts/sales-history-chart";
import { RecommendationsSection } from "./recommendations/recommendation_section";

import { useAuthBusinessId, useAuthStoreAccess } from "@/stores/authStore";
import RegionalRecommendationsPage from "./recommendations/recommendations_chart";
import RestockRecommendationsPage from "./restock-recommendation-page";
import WeekendHotSalesPage from "./weekend-hot-sales-page";
import SeasonalProductsPage from "./seasonal-products-page";
import FastMovingGoodsPage from "./fast-moving-goods-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

function DashboardContent() {
  const businessId = useAuthBusinessId() || "";
  const storeIds = useAuthStoreAccess();
  const [filters, setFilters] = useState<DashboardFilterValues>({
    storeId: storeIds[0],
    businessId: businessId,
    businessType: "retail",
    days: 360,
    historyDays: 360,
    forecastDays: 30,
    county: "muranga",
    constituency: "",
    ward: "",
    limit: 10,
  });

  // Forecast queries
  const forecastQuery = useStoreSalesForecast(
    {
      store_id: filters.storeId,
      history_days: filters.historyDays,
      forecast_days: filters.forecastDays,
    },
    !!filters.storeId,
  );

  // Recommendation queries
  const fastMovingQuery = useFastMovingGoods(
    {
      store_id: filters.storeId,
      days: filters.days,
      limit: filters.limit,
    },
    !!filters.storeId,
  );

  const handleFilterChange = (newFilters: DashboardFilterValues) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor sales forecasts, analyze historical data, and discover
            product recommendations.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <DashboardFilters
            onFilterChange={handleFilterChange}
            defaultValues={filters}
          />
        </div>

        {/* Forecast Section */}
        <section className="space-y-6 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Forecasting</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {forecastQuery.isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="w-8 h-8" />
                  <p className="text-sm text-muted-foreground">
                    Loading forecast...
                  </p>
                </div>
              </div>
            ) : forecastQuery.isError ? (
              <div className="h-80 flex items-center justify-center text-red-600">
                <p>Failed to load forecast data. Please try again.</p>
              </div>
            ) : forecastQuery.data ? (
              <StoreSalesForecastChart
                data={forecastQuery.data}
                title="Store Sales Forecast"
              />
            ) : null}
          </div>
        </section>

        {/* Analytics Section */}
        <section className="space-y-6 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="">
          {/* Fast Moving Goods */}
          <FastMovingGoodsPage />

          {/* Weekend Hot Sales */}
          <WeekendHotSalesPage />

          {/* Seasonal Products */}
          <SeasonalProductsPage />

          {/* Restock Items */}
          <RestockRecommendationsPage />

          {/* Regional Recommendations */}
          <RegionalRecommendationsPage />
        </section>
      </div>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}
