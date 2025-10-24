import { useQuery } from "@tanstack/react-query";
import { GlobalBusinessInfoResponse } from "@/types/settings";
import { getBusinessInfoApi } from "@/server/settings/get-business-info";

interface UseBusinessInfoProps {
  businessId: string;
  userId: string;
}

// get business infomation
export const useBusinessInfo = ({
  businessId,
  userId,
}: UseBusinessInfoProps) => {
  return useQuery<GlobalBusinessInfoResponse, Error>({
    queryKey: ["businessInfo", businessId, userId],
    queryFn: () => getBusinessInfoApi(businessId, userId),
    enabled: !!businessId && !!userId,
    staleTime: 5 * 60,
  });
};
