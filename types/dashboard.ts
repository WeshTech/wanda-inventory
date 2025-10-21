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

// Monthly comparison metrics
export type MonthlyComparison = {
  month: string;
  monthName: string;
  revenue: number;
  sales: number;
};

// Reusable API response pattern
export type MonthlyComparisonResponse = {
  success: boolean;
  message: string;
  data: MonthlyComparison[] | null;
};

//recent sales type
export type RecentSalesData = {
  invoiceNumber: number;
  customerName: string;
  sellingPrice: number;
  saleDate: string;
  productName: string;
  paymentMethod: string;
  status: string;
};

//recent sales response type
export type RecentSalesResponse = {
  success: boolean;
  message: string;
  data: RecentSalesData[] | null;
};
