import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PurchaseReceiptFormData } from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
import {
  CreatePRResponse,
  GetPurchaseReceiptsResponse,
} from "@/types/purchasereceipts";
import { createPurchaseReceiptApi } from "@/server/purchasereceipts/create-purchase-receipt";
import { getPurchaseReceiptsApi } from "@/server/purchasereceipts/get-all-PRs";

interface CreatePurchaseReceiptParams {
  formData: PurchaseReceiptFormData;
  businessId: string;
  createdBy: string;
}

//create purchase receipt mutation
export const useCreatePurchaseReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePRResponse, Error, CreatePurchaseReceiptParams>({
    mutationFn: ({ formData, businessId, createdBy }) =>
      createPurchaseReceiptApi(formData, businessId, createdBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseReceipts"] });
    },
  });
};

//get all purchase receipts
export const usePurchaseReceipts = (businessId: string) => {
  return useQuery<GetPurchaseReceiptsResponse, Error>({
    queryKey: ["purchaseReceipts", businessId],
    queryFn: () => getPurchaseReceiptsApi(businessId),
    enabled: !!businessId,
    staleTime: 10 * 60 * 60 * 1000,
  });
};
