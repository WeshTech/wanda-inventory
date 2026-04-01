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
import {
  RecommendationCard,
  RestockCard,
} from "./recommendations/recommendations_chart";
import { useAuthBusinessId, useAuthStoreAccess } from "@/stores/authStore";

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
    days: 30,
    historyDays: 30,
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
        <section className="space-y-12">
          {/* Fast Moving Goods */}
          <RecommendationsSection
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
          </RecommendationsSection>

          {/* Weekend Hot Sales */}
          <RecommendationsSection
            title="Weekend Hot Sales"
            description="Products performing well on weekends"
            isLoading={weekendQuery.isLoading}
            isEmpty={!weekendQuery.data?.products?.length}
            emptyMessage="No weekend hot sales data found"
          >
            {weekendQuery.data?.products?.map((product) => (
              <RecommendationCard
                key={product.business_product_id}
                productName={product.product_name}
                value={`${product.weekend_sales.toLocaleString()} sales`}
                insight={product.insight}
                valueLabel="Weekend Sales"
                variant="default"
              />
            ))}
          </RecommendationsSection>

          {/* Seasonal Products */}
          <RecommendationsSection
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
          </RecommendationsSection>

          {/* Restock Items */}
          <RecommendationsSection
            title="Restock Recommendations"
            description="Products that need attention for restocking"
            isLoading={restockQuery.isLoading}
            isEmpty={!restockQuery.data?.products?.length}
            emptyMessage="No restock items recommended"
          >
            {restockQuery.data?.products?.map((product) => (
              <RestockCard
                key={product.business_product_id}
                productName={product.product_name}
                signal={product.restock_signal}
                insight={product.insight}
              />
            ))}
          </RecommendationsSection>

          {/* Regional Recommendations */}
          <RecommendationsSection
            title="Regional Recommendations"
            description="Location-based product recommendations"
            isLoading={regionalQuery.isLoading}
            isEmpty={!regionalQuery.data?.products?.length}
            emptyMessage="No regional recommendations found"
          >
            {regionalQuery.data?.products?.map((product) => (
              <RecommendationCard
                key={product.business_product_id}
                productName={product.product_name}
                value={product.regional_demand}
                insight={product.insight}
                valueLabel="Regional Demand"
                variant="default"
              />
            ))}
          </RecommendationsSection>
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

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { ChevronRight } from "lucide-react";
// import { SearchFilters } from "./search-filters";
// import { BusinessAnalysisTable } from "./business-analysis-table";
// import { AreaAnalysisTable } from "./area-analysis-table";
// import { SalesPredictionSection } from "./sale-prediction-section";

// export default function SalesAnalysisPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPeriod, setSelectedPeriod] = useState("1");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 bg-fixed p-6">
//       <div className="container mx-auto space-y-6">
//         {/* Page Header */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold text-foreground">Sales Analysis</h1>

//           {/* Breadcrumbs */}
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink
//                   href="/dashboard"
//                   className="text-muted-foreground hover:text-foreground"
//                 >
//                   Dashboard
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator>
//                 <ChevronRight className="h-4 w-4" />
//               </BreadcrumbSeparator>
//               <BreadcrumbItem>
//                 <BreadcrumbPage className="text-foreground font-medium">
//                   Sales Analysis
//                 </BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         {/* Search and Filters */}
//         <SearchFilters
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           selectedPeriod={selectedPeriod}
//           setSelectedPeriod={setSelectedPeriod}
//         />

//         {/* Sales Analysis Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold">
//               Sales Analysis
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="business" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="business">Business</TabsTrigger>
//                 <TabsTrigger value="area">Area</TabsTrigger>
//               </TabsList>
//               <TabsContent value="business" className="mt-6">
//                 <BusinessAnalysisTable
//                   searchQuery={searchQuery}
//                   period={selectedPeriod}
//                 />
//               </TabsContent>
//               <TabsContent value="area" className="mt-6">
//                 <AreaAnalysisTable
//                   searchQuery={searchQuery}
//                   period={selectedPeriod}
//                 />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>

//         {/* Sales Prediction Section */}
//         <SalesPredictionSection
//           searchQuery={searchQuery}
//           period={selectedPeriod}
//         />
//       </div>
//     </div>
//   );
// }
