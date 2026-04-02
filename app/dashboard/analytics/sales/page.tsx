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

  // Analytics queries
  const historyQuery = useStoreSalesHistory(
    {
      store_id: filters.storeId,
      days: filters.days,
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

  const weekendQuery = useWeekendHotSales(
    {
      store_id: filters.storeId,
      days: filters.days,
      limit: filters.limit,
    },
    !!filters.storeId,
  );

  const seasonalQuery = useSeasonalProducts(
    {
      store_id: filters.storeId,
      days: filters.days,
      limit: filters.limit,
    },
    !!filters.storeId,
  );

  const restockQuery = useRestock(
    {
      business_type: filters.businessType,
      county: filters.county,
      constituency: filters.constituency,
      ward: filters.ward,
      days: filters.days,
      limit: filters.limit,
    },
    !!filters.businessType,
  );

  const regionalQuery = useRegionalRecommendations(
    {
      county: filters.county,
      constituency: filters.constituency,
      ward: filters.ward,
      days: filters.days,
      limit: filters.limit,
    },
    !!(filters.county || filters.constituency || filters.ward),
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

          <div className="grid grid-cols-1 gap-6">
            {historyQuery.isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="w-8 h-8" />
                  <p className="text-sm text-muted-foreground">
                    Loading sales history...
                  </p>
                </div>
              </div>
            ) : historyQuery.isError ? (
              <div className="h-80 flex items-center justify-center text-red-600">
                <p>Failed to load sales history. Please try again.</p>
              </div>
            ) : historyQuery.data ? (
              <SalesHistoryChart
                data={historyQuery.data}
                title="Daily Sales History"
              />
            ) : null}
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="">
          {/* Fast Moving Goods */}
          {/* <RecommendationsSection
            title="Fast Moving Goods"
            description="Top products with the highest sales velocity"
            isLoading={fastMovingQuery.isLoading}
            isEmpty={!fastMovingQuery.data?.products?.length}
            emptyMessage="No fast-moving products found"
          >
            {fastMovingQuery.data?.products?.map((product) => (
              <RecommendationCard
                key={product.business_product_id}
                productName={product.product_name}
                value={`$${product.total_revenue.toLocaleString()}`}
                insight={product.insight}
                valueLabel="Total Revenue"
                variant="success"
              />
            ))}
          </RecommendationsSection> */}

          {/* Weekend Hot Sales */}
          <WeekendHotSalesPage />

          {/* Seasonal Products */}
          {/* <RecommendationsSection
            title="Seasonal Products"
            description="Products with seasonal demand patterns"
            isLoading={seasonalQuery.isLoading}
            isEmpty={!seasonalQuery.data?.products?.length}
            emptyMessage="No seasonal products found"
          >
            {seasonalQuery.data?.products?.map((product) => (
              <RecommendationCard
                key={product.business_product_id}
                productName={product.product_name}
                value={product.seasonal_trend}
                insight={product.insight}
                valueLabel="Seasonal Trend"
                variant="default"
              />
            ))}
          </RecommendationsSection> */}

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
