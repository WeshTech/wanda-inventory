import client from "@/app/dashboard/analytics/sales/lib/axios_client";
import { getBusinessAnalysisTimeApi } from "@/server/analysis/get-analysis-time";
import {
  AnalysisTimeResponse,
  RegionalRecommendationsData,
  RegionalRecommendationsFilters,
  RegionalRecommendationsResponse,
} from "@/types/analysis";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//get business analysis tyme
export const useGetBusinessAnalysisTime = (businessId: string) => {
  return useQuery<AnalysisTimeResponse, Error>({
    queryKey: ["getbusinessAnalysisTime", businessId],
    queryFn: () => getBusinessAnalysisTimeApi(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 3600 * 13,
  });
};

//regional recommendation query
export const useRegionalRecommendations = (
  filters: RegionalRecommendationsFilters,
  enabled = true,
): UseQueryResult<RegionalRecommendationsData, Error> => {
  return useQuery({
    queryKey: ["regional-recommendations", filters],
    queryFn: async () => {
      const response = await client.get<RegionalRecommendationsResponse>(
        "/recommendations/regional",
        { params: filters },
      );
      return response.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 10,
  });
};
