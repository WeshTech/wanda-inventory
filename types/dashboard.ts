// Dashboard specific metrics
export type DashboardMetrics = {
  totalRevenue: number;
  totalSales: number;
  totalProducts: number;
  lowStockProducts: number;
};

// Reusable API response pattern
export type DashboardMetricsResponse = {
  success: boolean;
  message: string;
  data: DashboardMetrics | null;
};
