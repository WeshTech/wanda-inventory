"use client";

import { SalesDataTable } from "./sales-data-table";

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

        {/* Sales Data Table */}
        <SalesDataTable />
      </div>
    </div>
  );
}
