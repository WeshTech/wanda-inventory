"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Warehouse } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useDashboardMetrics } from "@/server-queries/dashboardQueries";
import { ToKenyanShillings } from "@/utils/toKenyanShillings";

// Props interface - optional props
interface DashboardCardsProps {
  selectedStore?: string | null;
  selectedPeriod?: number | null;
}

// Skeleton Card Component
function SkeletonCard() {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20 mb-2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-12 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
  gradient: string;
}

function MetricCard({
  title,
  value,
  description,
  icon,
  gradient,
}: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div
        className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradient} bg-opacity-10`}>{icon}</div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardCards({
  selectedStore,
  selectedPeriod,
}: DashboardCardsProps) {
  const businessId = useAuthBusinessId() || "";

  // Pass null if undefined
  const storeIdForQuery = selectedStore ?? undefined;
  const periodForQuery = selectedPeriod ?? undefined;

  const {
    data: metricsResponse,
    isLoading,
    error,
  } = useDashboardMetrics(businessId, storeIdForQuery, periodForQuery);

  // Auth loading state
  const { isLoading: authLoading } = useAuthStore();

  // Combined loading state
  const isLoadingState = authLoading || isLoading;

  const metrics = useMemo(() => {
    if (!metricsResponse?.data || !metricsResponse.success) {
      return [
        {
          title: "Total Revenue",
          value: "KSh 0",
          description: getPeriodDescription(selectedPeriod),
          icon: <DollarSign className="h-4 w-4 text-green-600" />,
          trend: { value: "0%", isPositive: false },
          gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
        },
        {
          title: "Total Sales",
          value: "0",
          description: getPeriodDescription(selectedPeriod),
          icon: <ShoppingCart className="h-4 w-4 text-blue-600" />,
          trend: { value: "0%", isPositive: false },
          gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
          title: "Total Products",
          value: "0",
          description: "Products in inventory",
          icon: <Package className="h-4 w-4 text-purple-600" />,
          trend: { value: "0%", isPositive: false },
          gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
        },
        {
          title: "Low Stock Products",
          value: "0",
          description: "Items need restocking",
          icon: <Warehouse className="h-4 w-4 text-red-600" />,
          trend: { value: "0%", isPositive: false },
          gradient: "bg-gradient-to-br from-red-500 to-pink-600",
        },
      ];
    }

    const { totalRevenue, totalSales, totalProducts, lowStockProducts } =
      metricsResponse.data;

    const safeRevenue = totalRevenue ?? 0;
    const safeSales = totalSales ?? 0;
    const safeProducts = totalProducts ?? 0;
    const safeLowStock = lowStockProducts ?? 0;

    return [
      {
        title: "Total Revenue",
        value: `${ToKenyanShillings(safeRevenue)}`,
        description: getPeriodDescription(selectedPeriod),
        icon: <DollarSign className="h-4 w-4 text-green-600" />,
        trend: { value: "+12.5%", isPositive: true },
        gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      },
      {
        title: "Total Sales",
        value: ToKenyanShillings(safeSales),
        description: getPeriodDescription(selectedPeriod),
        icon: <ShoppingCart className="h-4 w-4 text-blue-600" />,
        trend: { value: "+8.3%", isPositive: true },
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
      },
      {
        title: "Total Products",
        value: safeProducts.toLocaleString(),
        description: "Products in inventory",
        icon: <Package className="h-4 w-4 text-purple-600" />,
        trend: { value: "+2.1%", isPositive: true },
        gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
      },
      {
        title: "Low Stock Products",
        value: safeLowStock.toLocaleString(),
        description: "Items need restocking",
        icon: <Warehouse className="h-4 w-4 text-red-600" />,
        trend: { value: "-5.2%", isPositive: false },
        gradient: "bg-gradient-to-br from-red-500 to-pink-600",
      },
    ];
  }, [metricsResponse, selectedPeriod]);

  function getPeriodDescription(period: number | undefined | null): string {
    if (!period) return "Revenue this month";
    return `Revenue last ${period} month${period !== 1 ? "s" : ""}`;
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-destructive mb-2">
                    Error loading data
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Please refresh the page
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
      {isLoadingState
        ? Array(4)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        : metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
              trend={metric.trend}
              gradient={metric.gradient}
            />
          ))}
    </div>
  );
}
