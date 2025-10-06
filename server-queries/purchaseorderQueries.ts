import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  GeneratePurchaseOrderResponse,
  PurchaseOrderResponse,
} from "@/types/purchaseorder";
import { generatePurchaseOrderApi } from "@/server/purchaseorder/generate-purchaseorder";
import { GeneratePurchaseOrderFormData } from "@/schemas/purchaseorder/generatePurchaseorderSchema";
import { getPurchaseordersApi } from "@/server/purchaseorder/get-purchaseorder";

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
