import { GetPurchaseReceiptResponse } from "@/types/purchasereceipts";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getPurchaseReceiptByIdApi = async (
  businessId: string,
  purchasereceiptId: string
): Promise<GetPurchaseReceiptResponse> => {
  try {
    const response = await axiosApi.get<GetPurchaseReceiptResponse>(
      `/purchase-receipts/${businessId}/${purchasereceiptId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase receipt extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch purchase receipt. Please try again.");
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
