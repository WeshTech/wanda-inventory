import { PurchaseOrderDetailResponse } from "@/types/purchaseorder";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getPurchaseorderByIdApi = async (
  businessId: string,
  purchaseOrderId: string
): Promise<PurchaseOrderDetailResponse> => {
  try {
    const response = await axiosApi.get<PurchaseOrderDetailResponse>(
      `/purchaseorder/po/${businessId}/${purchaseOrderId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase order extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch purchase order. Please try again.");
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
