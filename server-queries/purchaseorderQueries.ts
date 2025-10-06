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
} from "@/types/purchaseorder";
import { generatePurchaseOrderApi } from "@/server/purchaseorder/generate-purchaseorder";
import { GeneratePurchaseOrderFormData } from "@/schemas/purchaseorder/generatePurchaseorderSchema";
import { getPurchaseordersApi } from "@/server/purchaseorder/get-purchaseorder";
import { getPurchaseorderByIdApi } from "@/server/purchaseorder/get-PO-by-id";

// Hook to generate a purchase order
export const useGeneratePurchaseOrder = (): UseMutationResult<
  GeneratePurchaseOrderResponse,
  Error,
  { formData: GeneratePurchaseOrderFormData; businessId: string }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    GeneratePurchaseOrderResponse,
    Error,
    { formData: GeneratePurchaseOrderFormData; businessId: string }
  >({
    mutationKey: ["generatepurchaseorder"],
    mutationFn: ({ formData, businessId }) =>
      generatePurchaseOrderApi(formData, businessId),
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
    staleTime: 1000,
  });
};
