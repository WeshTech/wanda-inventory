import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PurchaseReceiptFormData } from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
import {
  CreatePRResponse,
  GetPurchaseReceiptResponse,
  GetPurchaseReceiptsResponse,
  updatePurchaseReceiptResponse,
} from "@/types/purchasereceipts";
import { UpdateReceiptSubmissionData } from "@/types/purchasereceipts";
import { createPurchaseReceiptApi } from "@/server/purchasereceipts/create-purchase-receipt";
import { getPurchaseReceiptsApi } from "@/server/purchasereceipts/get-all-PRs";
import { getPurchaseReceiptByIdApi } from "@/server/purchasereceipts/get-PR-byId";
import { updatePurchaseReceiptApi } from "@/server/purchasereceipts/update-PR";

// Create Purchase Receipt Mutation
interface CreatePurchaseReceiptParams {
  formData: PurchaseReceiptFormData;
  businessId: string;
  userId: string;
}

export const useCreatePurchaseReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePRResponse, Error, CreatePurchaseReceiptParams>({
    mutationKey: ["createPurchaseReceipt"],
    mutationFn: async ({ formData, businessId, userId }) => {
      return await createPurchaseReceiptApi(formData, businessId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchaseReceipts"] });
    },
  });
};

// ------------------------------------
// Get All Purchase Receipts
// ------------------------------------
export const usePurchaseReceipts = (
  businessId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery<GetPurchaseReceiptsResponse, Error>({
    queryKey: ["purchaseReceipts", businessId, page, pageSize],
    queryFn: () => getPurchaseReceiptsApi(businessId, page, pageSize),
    enabled: !!businessId,
    staleTime: 10 * 60 * 60 * 1000, // 10 hours
  });
};

// ------------------------------------
// Get Purchase Receipt by ID
// ------------------------------------
export const useGetPurchaseReceiptById = (
  businessId: string,
  purchasereceiptId: string
) => {
  return useQuery<GetPurchaseReceiptResponse, Error>({
    queryKey: ["getPurchaseReceiptById", businessId, purchasereceiptId],
    queryFn: () => getPurchaseReceiptByIdApi(businessId, purchasereceiptId),
    staleTime: 3,
    enabled: !!businessId && !!purchasereceiptId,
  });
};

// ------------------------------------
// Update Purchase Receipt Mutation
// ------------------------------------
interface UpdatePurchaseReceiptParams {
  formData: UpdateReceiptSubmissionData;
  businessId: string;
  businessUserId: string;
}

export const useUpdatePurchaseReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation<
    updatePurchaseReceiptResponse,
    Error,
    UpdatePurchaseReceiptParams
  >({
    mutationFn: ({ formData, businessId, businessUserId }) =>
      updatePurchaseReceiptApi(formData, businessId, businessUserId),

    onSuccess: (data, variables) => {
      // Invalidate all purchase receipts queries
      queryClient.invalidateQueries({ queryKey: ["purchaseReceipts"] });

      // Invalidate the specific purchase receipt query
      queryClient.invalidateQueries({
        queryKey: [
          "getPurchaseReceiptById",
          variables.businessId,
          variables.formData.purchaseReceiptId,
        ],
      });
    },
  });
};
