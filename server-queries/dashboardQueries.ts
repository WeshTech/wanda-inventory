import { getChartDataAPI } from "@/server/dashboard/get-chart-data";
import { getDashboardMetricsApi } from "@/server/dashboard/get-dashboard-metrics";
import { getRecentSalesAPI } from "@/server/dashboard/get-recent-sales";
import {
  DashboardMetricsResponse,
  MonthlyComparisonResponse,
  RecentSalesResponse,
} from "@/types/dashboard";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Dashboard Metrics Query */
export const useDashboardMetrics = (
  businessId: string,
  storeId?: string | undefined,
  monthsBack?: number | undefined
): UseQueryResult<DashboardMetricsResponse, Error> => {
  return useQuery({
    queryKey: ["dashboardMetrics", businessId, storeId, monthsBack],
    queryFn: () => getDashboardMetricsApi(businessId, storeId, monthsBack),
    enabled: !!businessId,
    staleTime: 3600 * 1000 * 60 * 2,
  });
};

//* Chart Data Query */
export const useGetChartData = (businessId: string, userId: string) => {
  return useQuery<MonthlyComparisonResponse>({
    queryKey: ["getdashboardchartdata", businessId, userId],
    queryFn: () => getChartDataAPI(businessId, userId),
    enabled: !!businessId && !!userId,
    staleTime: 10 * 3600 * 60 * 1000,
  });
};

//* Recent Sales Data Query */
export const useGetRecentSalesData = (businessId: string, userId: string) => {
  return useQuery<RecentSalesResponse>({
    queryKey: ["getdashboardrecentsales", businessId, userId],
    queryFn: () => getRecentSalesAPI(businessId, userId),
    enabled: !!businessId && !!userId,
    staleTime: 2,
  });
};
