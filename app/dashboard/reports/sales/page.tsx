"use client";

import { RevenueAreaChart } from "./revenue-line-chart";
import { SalesBarChart } from "./sales-bar-chart";
import { SalesCategoriesChart } from "./sales-category-chart";
import { SalesDataTable } from "./sales-data-table";
import { SalesStatsCards } from "./sales-stats-cards";

export default function SalesReportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4 sm:p-6">
      <div className="space-y-6 mb-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">
            Sales Report
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Comprehensive overview of your sales performance and analytics
          </p>
        </div>

        {/* Statistics Cards */}
        <SalesStatsCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <SalesBarChart />
          </div>
          <div className="lg:col-span-1">
            <RevenueAreaChart />
          </div>
          <div className="lg:col-span-1">
            <SalesCategoriesChart />
          </div>
        </div>

        {/* Sales Data Table */}
        <SalesDataTable />
      </div>
    </div>
  );
}
