import { useMutation } from "@tanstack/react-query";
import { PurchaseReceiptFormData } from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
import { CreatePRResponse } from "@/types/purchasereceipts";
import { createPurchaseReceiptApi } from "@/server/purchasereceipts/create-purchase-receipt";

interface CreatePurchaseReceiptParams {
  formData: PurchaseReceiptFormData;
  businessId: string;
  createdBy: string;
}

export const useCreatePurchaseReceipt = () => {
  return useMutation<CreatePRResponse, Error, CreatePurchaseReceiptParams>({
    mutationFn: ({ formData, businessId, createdBy }) =>
      createPurchaseReceiptApi(formData, businessId, createdBy),
  });
};
