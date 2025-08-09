"use client";
// Import ChartConfig
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, DollarSign, Package } from "lucide-react";
import AppPieChart from "./app-pie-chart";

interface SalesOverviewProps {
  totalSalesValue: number;
  totalProductsSold: number;
  salesByCategory: { name: string; value: number; percentage: number }[];
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  allCategories: string[];
  onExport: () => void;
}

export function SalesOverview({
  totalSalesValue,
  totalProductsSold,
  timePeriod,
  onTimePeriodChange,
  selectedCategory,
  onCategoryChange,
  allCategories,
  onExport,
}: SalesOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Column 1: Total Sales Value & Total Products Sold */}
      <div className="grid gap-4">
        {/* Total Sales Value Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSalesValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total revenue across all sales.
            </p>
          </CardContent>
        </Card>

        {/* Total Products Sold Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products Sold
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProductsSold}</div>
            <p className="text-xs text-muted-foreground">
              Total individual products sold.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Column 2: Sales by Category Pie Chart */}
      <AppPieChart />

      {/* Column 3: Filters and Export */}
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Analyze Sales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={timePeriod === "today" ? "default" : "outline"}
              onClick={() => onTimePeriodChange("today")}
            >
              Today
            </Button>
            <Button
              variant={timePeriod === "last7days" ? "default" : "outline"}
              onClick={() => onTimePeriodChange("last7days")}
            >
              Last 7 Days
            </Button>
            <Button
              variant={timePeriod === "last30days" ? "default" : "outline"}
              onClick={() => onTimePeriodChange("last30days")}
            >
              Last 30 Days
            </Button>
            <Button
              variant={timePeriod === "all" ? "default" : "outline"}
              onClick={() => onTimePeriodChange("all")}
            >
              All Time
            </Button>
          </div>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onExport} className="w-full">
            <Download className="mr-2 h-4 w-4" /> Export Sales
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
