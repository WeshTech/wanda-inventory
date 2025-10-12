import { useMutation } from "@tanstack/react-query";
import {
  SingleTransferFormData,
  SingleTransferResponse,
} from "@/types/transfers";
import { createSingleTransferApi } from "@/server/transfers/create-single-transfer";

//create single transfer
export const useCreateSingleTransfer = () => {
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
  });
};
