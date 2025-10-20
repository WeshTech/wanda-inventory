import { getDashboardMetricsApi } from "@/server/dashboard/get-dashboard-metrics";
import { DashboardMetricsResponse } from "@/types/dashboard";
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
