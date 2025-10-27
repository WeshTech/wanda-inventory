import { getBusinessAnalysisTimeApi } from "@/server/analysis/get-analysis-time";
import { AnalysisTimeResponse } from "@/types/analysis";
import { useQuery } from "@tanstack/react-query";

//get business analysis tyme
export const useGetBusinessAnalysisTime = (businessId: string) => {
  return useQuery<AnalysisTimeResponse, Error>({
    queryKey: ["getbusinessAnalysisTime", businessId],
    queryFn: () => getBusinessAnalysisTimeApi(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 3600 * 13,
  });
};
