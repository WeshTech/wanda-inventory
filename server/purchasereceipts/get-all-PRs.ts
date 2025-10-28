import { GetPurchaseReceiptsResponse } from "@/types/purchasereceipts";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getPurchaseReceiptsApi = async (
  businessId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<GetPurchaseReceiptsResponse> => {
  try {
    const response = await axiosApi.get<GetPurchaseReceiptsResponse>(
      `/purchase-receipts/${businessId}`,
      {
        params: { page, pageSize },
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase receipts extracted successfully",
        data: response.data?.data,
        pagination: response.data?.pagination,
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
