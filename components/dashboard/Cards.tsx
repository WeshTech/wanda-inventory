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
import { Skeleton } from "@/components/ui/skeleton"; // Make sure you have shadcn/ui Skeleton
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useDashboardMetrics } from "@/server-queries/dashboardQueries";
import { ToKenyanShillings } from "@/utils/toKenyanShillings";

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

// Metric Card Component (same as yours)
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

export default function DashboardCards() {
  const businessId = useAuthBusinessId() || "";

  const {
    data: metricsResponse,
    isLoading,
    error,
  } = useDashboardMetrics(businessId);

  // Auth loading state
  const { isLoading: authLoading } = useAuthStore();

  // Combined loading state
  const isLoadingState = authLoading || isLoading;

  // Format metrics data or use fallback
  const metrics = useMemo(() => {
    if (!metricsResponse?.success || !metricsResponse.data) {
      // Return fallback metrics if no data
      return [
        {
          title: "Total Revenue",
          value: "$0.00",
          description: "Revenue this month",
          icon: <DollarSign className="h-4 w-4 text-green-600" />,
          trend: { value: "0%", isPositive: false },
          gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
        },
        {
          title: "Total Sales",
          value: "0",
          description: "Sales this month",
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

    // Simple trend calculations (you can enhance this with actual historical data)
    return [
      {
        title: "Total Revenue",
        value: `${ToKenyanShillings(totalRevenue)}`,
        description: "Revenue this month",
        icon: <DollarSign className="h-4 w-4 text-green-600" />,
        trend: { value: "+12.5%", isPositive: true }, // Replace with real trend data
        gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      },
      {
        title: "Total Sales",
        value: ToKenyanShillings(totalSales),
        description: "Sales this month",
        icon: <ShoppingCart className="h-4 w-4 text-blue-600" />,
        trend: { value: "+8.3%", isPositive: true },
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
      },
      {
        title: "Total Products",
        value: totalProducts.toLocaleString(),
        description: "Products in inventory",
        icon: <Package className="h-4 w-4 text-purple-600" />,
        trend: { value: "+2.1%", isPositive: true },
        gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
      },
      {
        title: "Low Stock Products",
        value: lowStockProducts.toLocaleString(),
        description: "Items need restocking",
        icon: <Warehouse className="h-4 w-4 text-red-600" />,
        trend: { value: "-5.2%", isPositive: false },
        gradient: "bg-gradient-to-br from-red-500 to-pink-600",
      },
    ];
  }, [metricsResponse]);

  // Error state
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
        ? // Show skeletons while loading
          Array(4)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        : // Show actual metrics
          metrics.map((metric, index) => (
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
