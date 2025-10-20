import { getDashboardMetricsApi } from "@/server/dashboard/get-dashboard-metrics";
import { useQuery } from "@tanstack/react-query";

export const useDashboardMetrics = (
  businessId: string,
  storeId?: string | undefined,
  monthsBack?: number | undefined
) => {
  return useQuery({
    queryKey: ["dashboardMetrics", businessId, storeId, monthsBack],
    queryFn: () => getDashboardMetricsApi(businessId, storeId, monthsBack),
    enabled: !!businessId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
