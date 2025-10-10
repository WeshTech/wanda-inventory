import { GetPurchaseReceiptsResponse } from "@/types/purchasereceipts";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getPurchaseReceiptsApi = async (
  businessId: string
): Promise<GetPurchaseReceiptsResponse> => {
  try {
    const response = await axiosApi.get<GetPurchaseReceiptsResponse>(
      `/purchase-receipts/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase receipts extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch purchase receipts. Please try again.");
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
