import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GeneratePurchaseOrderResponse,
  PurchaseOrderDetailResponse,
  PurchaseOrderResponse,
  UpdatePurchaseOrderResponse,
} from "@/types/purchaseorder";
import { generatePurchaseOrderApi } from "@/server/purchaseorder/generate-purchaseorder";
import { GeneratePurchaseOrderFormData } from "@/schemas/purchaseorder/generatePurchaseorderSchema";
import { getPurchaseordersApi } from "@/server/purchaseorder/get-purchaseorder";
import { getPurchaseorderByIdApi } from "@/server/purchaseorder/get-PO-by-id";
import { UpdatePurchaseOrderFormData } from "@/schemas/purchaseOrderSchema";
import { updatePurchaseorderByIdApi } from "@/server/purchaseorder/update-PO-byId";

// Hook to generate a purchase order
export const useGeneratePurchaseOrder = (): UseMutationResult<
  GeneratePurchaseOrderResponse,
  Error,
  {
    formData: GeneratePurchaseOrderFormData;
    businessId: string;
    userId: string;
  }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    GeneratePurchaseOrderResponse,
    Error,
    {
      formData: GeneratePurchaseOrderFormData;
      businessId: string;
      userId: string;
    }
  >({
    mutationKey: ["generatepurchaseorder"],
    mutationFn: ({ formData, businessId, userId }) =>
      generatePurchaseOrderApi(formData, businessId, userId),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders", businessId],
      });
    },
  });
};

// Get purchase orders
export const useGetPurchaseOrders = (
  businessId: string
): UseQueryResult<PurchaseOrderResponse, Error> => {
  return useQuery<PurchaseOrderResponse, Error>({
    queryKey: ["purchaseOrders", businessId],
    queryFn: () => getPurchaseordersApi(businessId),
    enabled: !!businessId,
    staleTime: 5,
  });
};

// Get purchase order by ID
export const usePurchaseOrderDetail = (
  businessId: string,
  purchaseOrderId: string
): UseQueryResult<PurchaseOrderDetailResponse, Error> => {
  return useQuery({
    queryKey: ["purchaseOrderDetail", businessId, purchaseOrderId],
    queryFn: async () => getPurchaseorderByIdApi(businessId, purchaseOrderId),
    enabled: !!businessId && !!purchaseOrderId,
    staleTime: 5,
  });
};

// Update purchase order by ID
export const useUpdatePurchaseOrder = (businessId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdatePurchaseOrderResponse,
    Error,
    UpdatePurchaseOrderFormData
  >({
    mutationFn: async (formData) => {
      return await updatePurchaseorderByIdApi(formData, businessId);
    },
    onSuccess: (data) => {
      // Invalidate the specific purchase order detail query
      if (data?.data?.purchaseOrderId) {
        queryClient.invalidateQueries({
          queryKey: [
            "purchaseOrderDetail",
            businessId,
            data.data.purchaseOrderId,
          ],
        });
      }
      //invalidate the purchase orders list query
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders", businessId],
      });
    },
  });
};
