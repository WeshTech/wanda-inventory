"use client";

import { useMemo } from "react";
import {
  StoreIntelligenceFilters,
  StockoutRiskLevel,
  DeadStockRiskLevel,
} from "@/types/analysis";
import { useStoreIntelligence } from "@/server-queries/analysisQueries";
import { useAuthStore, useAuthStoreAccess } from "@/stores/authStore";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/components/ui/loading-spiner";
import {
  MapPin,
  Store,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Calendar,
  Droplets,
  Shield,
  Trophy,
  Award,
  Package,
  Activity,
} from "lucide-react";

// Helper to format stockout risk label and color
const getStockoutRiskConfig = (level: StockoutRiskLevel) => {
  switch (level) {
    case "low":
      return {
        label: "Low Risk",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        icon: Shield,
      };
    case "medium":
      return {
        label: "Medium Risk",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: AlertTriangle,
      };
    case "high":
      return {
        label: "High Risk",
        className:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
        icon: AlertTriangle,
      };
    case "critical":
      return {
        label: "Critical Risk",
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        icon: AlertTriangle,
      };
    default:
      return {
        label: "Unknown",
        className: "",
        icon: AlertTriangle,
      };
  }
};

const getDeadStockRiskConfig = (level: DeadStockRiskLevel) => {
  switch (level) {
    case "low":
      return {
        label: "Low Risk",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        icon: Droplets,
      };
    case "medium":
      return {
        label: "Medium Risk",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        icon: Droplets,
      };
    case "high":
      return {
        label: "High Risk",
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        icon: Droplets,
      };
    default:
      return {
        label: "Unknown",
        className: "",
        icon: Droplets,
      };
  }
};

const getDaysOfInventoryConfig = (days: number) => {
  if (days <= 7)
    return {
      label: "Critical",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      color: "red",
    };
  if (days <= 14)
    return {
      label: "Low",
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      color: "orange",
    };
  if (days <= 30)
    return {
      label: "Moderate",
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      color: "yellow",
    };
  if (days <= 60)
    return {
      label: "Good",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      color: "blue",
    };
  return {
    label: "Excess",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    color: "green",
  };
};

const calculateDeadStockRisk = (
  stockHealthScore: number,
  stockoutRiskAverage: number,
): { score: number; level: DeadStockRiskLevel; label: string } => {
  const rawScore = (100 - stockHealthScore) * (1 - stockoutRiskAverage / 100);
  const score = Math.min(100, Math.max(0, rawScore));

  let level: DeadStockRiskLevel;
  let label: string;

  if (score < 30) {
    level = "low";
    label = "Low Risk";
  } else if (score < 60) {
    level = "medium";
    label = "Medium Risk";
  } else {
    level = "high";
    label = "High Risk";
  }

  return { score, level, label };
};

export default function StoreIntelligenceDashboard() {
  const storeIds = useAuthStoreAccess();
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const filters: StoreIntelligenceFilters = {
    store_id: storeIds?.[0],
    county: "Muranga",
    constituency: "Kiharu",
    ward: "Township",
    lookback_days: 30,
  };

  const {
    data: response,
    isLoading: isFetching,
    isError,
  } = useStoreIntelligence(filters, true, !isAuthLoading);

  const isLoading = isAuthLoading || isFetching;

  const storeRank = useMemo(() => response?.store_rank, [response]);

  const deadStockRisk = useMemo(() => {
    if (!storeRank) return null;
    return calculateDeadStockRisk(
      storeRank.stock_health_score,
      storeRank.stockout_risk_average,
    );
  }, [storeRank]);

  const displayStoreId = useMemo(() => {
    const storeId = storeRank?.store_id || filters.store_id;
    if (!storeId) return "N/A";
    return `...${storeId.slice(-6).toUpperCase()}`;
  }, [storeRank, filters.store_id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <Loader text="Loading store intelligence data..." />
          <p className="text-muted-foreground">Fetching your store insights</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !storeRank) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 flex items-center justify-center">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800">
          <Avatar className="h-24 w-24 mx-auto mb-4">
            <AvatarImage src="/images/nostorefound.jpg" alt="Error" />
            <AvatarFallback className="bg-red-100 text-red-800">
              ERR
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
            Unable to Load Data
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Failed to load store intelligence data. Please check your connection
            and try again.
          </p>
        </div>
      </div>
    );
  }

  const stockoutConfig = getStockoutRiskConfig(
    storeRank.stockout_risk_average >= 70
      ? "critical"
      : storeRank.stockout_risk_average >= 50
        ? "high"
        : storeRank.stockout_risk_average >= 30
          ? "medium"
          : "low",
  );

  const daysInventoryConfig = getDaysOfInventoryConfig(
    storeRank.days_of_inventory_average,
  );

  const StockoutIcon = stockoutConfig.icon;
  const DeadStockIcon = deadStockRisk
    ? getDeadStockRiskConfig(deadStockRisk.level).icon
    : Droplets;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Store Intelligence Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive analytics and insights for your store
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last {filters.lookback_days} days
          </Badge>
        </div>

        {/* Store Identity Card */}
        <div className="overflow-hidden rounded-2xl shadow-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 dark:border-primary/20">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Store ID</p>
                  <p className="text-xl font-mono font-bold">
                    {displayStoreId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-lg font-semibold">
                    {storeRank.county}, {storeRank.constituency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {storeRank.ward}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rank Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ward Rank Card */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/40 dark:border-blue-800/40 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                Ward Ranking
              </Badge>
            </div>
            <div className="text-xl font-bold">
              #{storeRank.ward_rank}{" "}
              <span className="text-lg font-normal text-muted-foreground">
                / {storeRank.total_stores_in_ward}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Out of {storeRank.total_stores_in_ward} stores in {storeRank.ward}
            </p>
          </div>

          {/* Composite Score Card */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/40 dark:border-purple-800/40 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                Composite Score
              </Badge>
            </div>
            <div className="text-xl font-bold">
              {storeRank.composite_score.toFixed(1)}
            </div>
            <div className="mt-2 h-2 bg-purple-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{
                  width: `${Math.min(100, storeRank.composite_score)}%`,
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Overall store performance metric
            </p>
          </div>

          {/* Performance Card */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-200/40 dark:border-amber-800/40 p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                Performance
              </Badge>
            </div>
            <div className="text-xl font-bold">
              {storeRank.composite_score >= 80
                ? "Excellent"
                : storeRank.composite_score >= 60
                  ? "Good"
                  : storeRank.composite_score >= 40
                    ? "Average"
                    : "Needs Improvement"}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on composite score
            </p>
          </div>
        </div>

        {/* Sales & Transactions Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sale Volume */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-200/40 dark:border-emerald-800/40 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sale Volume</p>
                <p className="text-xl font-bold">
                  {storeRank.sale_volume_average.toLocaleString()} units
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Average daily sales volume
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200/40 dark:border-green-800/40 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-xl font-bold">
                  KES {storeRank.revenue_gain_average.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Average daily revenue
            </p>
          </div>

          {/* Transactions */}
          <div className="rounded-2xl shadow-lg bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-200/40 dark:border-teal-800/40 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30">
                <ShoppingBag className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-xl font-bold">
                  {storeRank.total_transactions.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Total transactions in period
            </p>
          </div>
        </div>

        {/* Risk & Inventory Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stockout Risk */}
          <div className="rounded-2xl shadow-lg overflow-hidden border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
            <div
              className={`h-1 w-full ${stockoutConfig.className.split(" ")[0]}`}
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StockoutIcon className="h-5 w-5" />
                  <p className="font-semibold">Stockout Risk</p>
                </div>
                <Badge className={stockoutConfig.className}>
                  {stockoutConfig.label}
                </Badge>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Risk Score</span>
                  <span className="font-mono">
                    {storeRank.stockout_risk_average.toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      storeRank.stockout_risk_average >= 70
                        ? "bg-red-500"
                        : storeRank.stockout_risk_average >= 50
                          ? "bg-orange-500"
                          : storeRank.stockout_risk_average >= 30
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                    style={{ width: `${storeRank.stockout_risk_average}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Out of Stock</p>
                  <p className="font-semibold">
                    {storeRank.out_of_stock_count}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Low Stock</p>
                  <p className="font-semibold">{storeRank.low_stock_count}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Days of Inventory */}
          <div className="rounded-2xl shadow-lg overflow-hidden border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
            <div
              className={`h-1 w-full ${
                daysInventoryConfig.color === "red"
                  ? "bg-red-500"
                  : daysInventoryConfig.color === "orange"
                    ? "bg-orange-500"
                    : daysInventoryConfig.color === "yellow"
                      ? "bg-yellow-500"
                      : daysInventoryConfig.color === "blue"
                        ? "bg-blue-500"
                        : "bg-green-500"
              }`}
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <p className="font-semibold">Days of Inventory</p>
                </div>
                <Badge className={daysInventoryConfig.className}>
                  {daysInventoryConfig.label}
                </Badge>
              </div>
              <div className="text-xl font-bold mb-2">
                {storeRank.days_of_inventory_average.toFixed(1)}{" "}
                <span className="text-lg font-normal text-muted-foreground">
                  days
                </span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    daysInventoryConfig.color === "red"
                      ? "bg-red-500"
                      : daysInventoryConfig.color === "orange"
                        ? "bg-orange-500"
                        : daysInventoryConfig.color === "yellow"
                          ? "bg-yellow-500"
                          : daysInventoryConfig.color === "blue"
                            ? "bg-blue-500"
                            : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(100, (storeRank.days_of_inventory_average / 90) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Average inventory coverage days
              </p>
            </div>
          </div>

          {/* Dead Stock Risk */}
          <div className="rounded-2xl shadow-lg overflow-hidden border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
            <div
              className={`h-1 w-full ${
                deadStockRisk?.level === "high"
                  ? "bg-red-500"
                  : deadStockRisk?.level === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <DeadStockIcon className="h-5 w-5" />
                  <p className="font-semibold">Dead Stock Risk</p>
                </div>
                {deadStockRisk && (
                  <Badge
                    className={
                      deadStockRisk.level === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : deadStockRisk.level === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    }
                  >
                    {deadStockRisk.label}
                  </Badge>
                )}
              </div>
              {deadStockRisk && (
                <>
                  <div className="text-xl font-bold mb-2">
                    {deadStockRisk.score.toFixed(1)}{" "}
                    <span className="text-lg font-normal text-muted-foreground">
                      score
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        deadStockRisk.level === "high"
                          ? "bg-red-500"
                          : deadStockRisk.level === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${deadStockRisk.score}%` }}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Stock Health</p>
                      <p className="font-semibold">
                        {storeRank.stock_health_score.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Unique Products</p>
                      <p className="font-semibold">
                        {storeRank.unique_products_sold}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Active Sale Days</p>
            </div>
            <p className="text-xl font-bold mt-1">
              {storeRank.active_sale_days}
            </p>
          </div>

          <div className="rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Unique Suppliers</p>
            </div>
            <p className="text-xl font-bold mt-1">
              {storeRank.unique_suppliers}
            </p>
          </div>

          <div className="rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                PO Fulfilment Rate
              </p>
            </div>
            <p className="text-xl font-bold mt-1">
              {storeRank.po_fulfilment_rate.toFixed(1)}%
            </p>
          </div>

          <div className="rounded-xl shadow-md border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Avg Transaction</p>
            </div>
            <p className="text-xl font-bold mt-1">
              KES {storeRank.avg_transaction_value.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
