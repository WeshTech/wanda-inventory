"use client"; // This component needs client-side interactivity for potential future updates

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Info, Package } from "lucide-react";

interface InventorySummaryProps {
  totalAssetsValue: number;
  inStockPercentage: number;
  lowStockPercentage: number;
  outOfStockPercentage: number;
}

export default function InventorySummary({
  totalAssetsValue,
  inStockPercentage,
  lowStockPercentage,
  outOfStockPercentage,
}: InventorySummaryProps) {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <Card className="hover:shadow-sm transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between px-4 py-1">
          <CardTitle className="text-[0.7rem] sm:text-xs font-medium text-gray-600 dark:text-gray-400">
            TOTAL ASSETS VALUE
          </CardTitle>
          <div className="p-1 rounded-md bg-primary/10">
            <DollarSign className="w-3 h-3 text-primary" />
          </div>
        </CardHeader>

        <CardContent className="px-4 py-2">
          {/* Main value row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <div className="text-xl sm:text-2xl font-bold tracking-tight">
              $
              {totalAssetsValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            <Badge
              variant="outline"
              className="text-[0.65rem] sm:text-xs py-0 px-1.5 h-5 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30"
            >
              +2.3% from last month
            </Badge>
          </div>

          {/* Info text */}
          <div className="mt-1 flex items-center gap-1 text-[0.7rem] sm:text-xs text-muted-foreground">
            <Info className="w-2.5 h-2.5 flex-shrink-0" />
            <span>Current valuation based on stock and purchase prices</span>
          </div>

          {/* Progress bar */}
          <div className="mt-1.5 h-1 bg-gray-100 dark:bg-gray-800 rounded-full">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: "75%" }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
          <CardTitle className="text-sm sm:text-base font-medium">
            Summary of Products in Stock
          </CardTitle>
          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Bars in a row - Only show on desktop */}
            <div className="hidden sm:flex gap-2 h-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${inStockPercentage}%` }}
                />
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${lowStockPercentage}%` }}
                />
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${outOfStockPercentage}%` }}
                />
              </div>
            </div>

            {/* Mobile: Vertical stacked bars with labels */}
            <div className="sm:hidden space-y-3">
              {/* In Stock */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">In Stock</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {inStockPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${inStockPercentage}%` }}
                  />
                </div>
              </div>

              {/* Low Stock */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Low Stock</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {lowStockPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${lowStockPercentage}%` }}
                  />
                </div>
              </div>

              {/* Out of Stock */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Out of Stock</span>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {outOfStockPercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${outOfStockPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop: Numbers and labels */}
            <div className="hidden sm:block">
              {/* Numbers row */}
              <div className="flex gap-2 justify-between text-base text-muted-foreground">
                <div className="flex-1 text-center font-medium">
                  {inStockPercentage.toFixed(0)}%
                </div>
                <div className="flex-1 text-center font-medium">
                  {lowStockPercentage.toFixed(0)}%
                </div>
                <div className="flex-1 text-center font-medium">
                  {outOfStockPercentage.toFixed(0)}%
                </div>
              </div>

              {/* Labels row */}
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
        </CardContent>
      </Card>
    </div>
  );
}
