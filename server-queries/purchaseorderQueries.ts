import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { GeneratePurchaseOrderResponse } from "@/types/purchaseorder";
import { generatePurchaseOrderApi } from "@/server/purchaseorder/generate-purchaseorder";
import { GeneratePurchaseOrderFormData } from "@/schemas/purchaseorder/generatePurchaseorderSchema";

// Hook to generate a purchase order
export const useGeneratePurchaseOrder = (): UseMutationResult<
  GeneratePurchaseOrderResponse,
  Error,
  { formData: GeneratePurchaseOrderFormData; businessId: string }
> => {
  return useMutation<
    GeneratePurchaseOrderResponse,
    Error,
    { formData: GeneratePurchaseOrderFormData; businessId: string }
  >({
    mutationKey: ["generatepurchaseorder"],
    mutationFn: ({ formData, businessId }) =>
      generatePurchaseOrderApi(formData, businessId),
  });
};
