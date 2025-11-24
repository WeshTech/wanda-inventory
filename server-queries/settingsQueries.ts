import { useMutation, useQuery } from "@tanstack/react-query";
import { GlobalBusinessInfoResponse, TopUpResponse } from "@/types/settings";
import { getBusinessInfoApi } from "@/server/settings/get-business-info";
import { TopUpFormValues } from "@/schemas/settings/topUpSchema";
import { topUpWalletApi } from "@/server/settings/topup-wallet";

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

//initiate payment mutation
export const useTopUpWalletMutation = () => {
  return useMutation<
    TopUpResponse,
    Error,
    { businessId: string; formData: TopUpFormValues }
  >({
    mutationFn: ({ businessId, formData }) =>
      topUpWalletApi(businessId, formData),
  });
};
