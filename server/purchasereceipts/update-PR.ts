import {
  updatePurchaseReceiptResponse,
  UpdateReceiptSubmissionData,
} from "@/types/purchasereceipts";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

// Type matching the backend UpdatePRDto
type UpdatePRPayload = {
  businessId: string;
  businessUserId: string;
  purchaseReceiptId: string;
  receiptNumber: number;
  products: Array<{
    businessProductId: string;
    quantity: number;
    unitPrice: number;
  }>;
};

export const updatePurchaseReceiptApi = async (
  formData: UpdateReceiptSubmissionData,
  businessId: string,
  businessUserId: string
): Promise<updatePurchaseReceiptResponse> => {
  const { purchaseReceiptId, receiptNumber, products: formProducts } = formData;

  // Validate required fields
  if (!purchaseReceiptId) {
    throw new Error("Purchase receipt ID is required");
  }

  const products = formProducts.map((product) => ({
    businessProductId: product.businessProductId,
    quantity: product.quantity,
    unitPrice: product.unitPrice,
  }));

  const submitData: UpdatePRPayload = {
    businessId,
    businessUserId,
    purchaseReceiptId,
    receiptNumber,
    products,
  };

  try {
    const response = await axiosApi.patch<updatePurchaseReceiptResponse>(
      `/purchase-receipts`,
      submitData
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase receipt updated successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(
        response.data?.message || "Purchase receipt update failed"
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message ||
          "Something went wrong. Please check your connection and try again"
      );
    } else {
      throw error;
    }
  }
};
