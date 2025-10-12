import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetTransfersResponse,
  SingleTransferFormData,
  SingleTransferResponse,
} from "@/types/transfers";
import { createSingleTransferApi } from "@/server/transfers/create-single-transfer";
import { getBusinessTransfersApi } from "@/server/transfers/get-all-transfers";

//create single transfer
export const useCreateSingleTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SingleTransferResponse,
    Error,
    {
      formData: SingleTransferFormData;
      businessId: string;
      businessUserId: string;
    }
  >({
    mutationFn: ({ formData, businessId, businessUserId }) =>
      createSingleTransferApi(formData, businessId, businessUserId),
    onSuccess: (data, variables) => {
      // Invalidate and refetch the transfers list for this business
      queryClient.invalidateQueries({
        queryKey: ["businessTransfers", variables.businessId],
      });
    },
  });
};

//get all business Transfers
export const useBusinessTransfers = (businessId: string) => {
  return useQuery<GetTransfersResponse, Error>({
    queryKey: ["businessTransfers", businessId],
    queryFn: () => getBusinessTransfersApi(businessId),
    enabled: !!businessId,
    staleTime: 10 * 60 * 60 * 1000,
  });
};
