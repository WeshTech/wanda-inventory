"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import RegionalRecommendationsPage from "./recommendations/recommendations_chart";
import RestockRecommendationsPage from "./restock-recommendation-page";
import WeekendHotSalesPage from "./weekend-hot-sales-page";
import SeasonalProductsPage from "./seasonal-products-page";
import FastMovingGoodsPage from "./fast-moving-goods-page";
import StoreIntelligencePage from "./product-store-analysis";
import StoreIntelligenceDashboard from "./store-intelligence-cards";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

function DashboardContent() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Recommendations Section */}
        <StoreIntelligenceDashboard />

        {/* Recommendations Section */}
        <StoreIntelligencePage />

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
