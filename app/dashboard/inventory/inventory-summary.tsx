"use client";
import { useInventoryStats } from "@/server-queries/inventoryQueries";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { DollarSign, Info, Package, Box } from "lucide-react";
import { useEffect, useState } from "react";

function InventoryCardSkeleton() {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse"
        >
          <div className="flex flex-row items-center justify-between px-4 py-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="px-4 pb-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3" />
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InventorySummary() {
  const { isAuthenticated } = useAuthStore();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const businessId = useAuthBusinessId() || "";

  const { data, isLoading, isError, error } = useInventoryStats(businessId);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthenticating(false);
    }
  }, [isAuthenticated]);

  if (isAuthenticating || isLoading) {
    return <InventoryCardSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error?.message || "Failed to load inventory stats"}
        <InventoryCardSkeleton />
      </div>
    );
  }

  if (!data?.success || !data.data) {
    return <InventoryCardSkeleton />;
  }

  const {
    totalAssetValue,
    totalProducts,
    totalInStock,
    totalLowStock,
    totalOutOfStock,
  } = data.data;

  return (
    <div className="grid gap-2 md:grid-cols-3">
      {/* Total Assets Value Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-row items-center justify-between px-4 py-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
            Total Assets Value
          </h3>
          <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <div className="text-xl sm:text-3xl font-bold tracking-tight">
              KES{" "}
              {totalAssetValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Based on stock and purchase prices</span>
          </div>
          <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>

      {/* Total Products Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex flex-row items-center justify-between px-4 py-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
            Total Products
          </h3>
          <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50">
            <Box className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="text-xl sm:text-3xl font-bold tracking-tight">
            {totalProducts.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            Total product commodities
          </div>
          <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              style={{ width: "60%" }}
            />
          </div>
        </div>
      </div>

      {/* Stock Summary Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-row items-center justify-between px-4 py-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
            Summary of Products in Stock
          </h3>
          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="px-4 pb-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Desktop View */}
            <div className="hidden sm:flex gap-2 h-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${totalInStock}%` }}
                />
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${totalLowStock}%` }}
                />
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${totalOutOfStock}%` }}
                />
              </div>
            </div>

            {/* Mobile View */}
            <div className="sm:hidden space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">In Stock</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {totalInStock.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${totalInStock}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Low Stock</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {totalLowStock.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${totalLowStock}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Out of Stock</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {totalOutOfStock.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${totalOutOfStock}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Labels */}
            <div className="hidden sm:block">
              <div className="flex gap-2 justify-between text-base text-gray-500 dark:text-gray-400">
                <div className="flex-1 text-center font-medium">
                  {totalInStock.toFixed(0)}%
                </div>
                <div className="flex-1 text-center font-medium">
                  {totalLowStock.toFixed(0)}%
                </div>
                <div className="flex-1 text-center font-medium">
                  {totalOutOfStock.toFixed(0)}%
                </div>
              </div>
              <div className="flex gap-4 justify-between text-base mt-2">
                <div className="flex-1 flex items-center justify-start gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span>In Stock</span>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span>Low Stock</span>
                </div>
                <div className="flex-1 flex items-center justify-end gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span>Out of Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
