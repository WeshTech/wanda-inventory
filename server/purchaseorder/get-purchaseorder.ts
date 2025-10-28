import { PurchaseOrderResponse } from "@/types/purchaseorder";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getPurchaseordersApi = async (
  businessId: string,
  pagination: { page: number; pageSize: number }
): Promise<PurchaseOrderResponse> => {
  try {
    console.log({ businessId, pagination });
    const response = await axiosApi.get<PurchaseOrderResponse>(
      `/purchaseorder/${businessId}?page=${pagination.page}&pageSize=${pagination.pageSize}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase orders extracted successfully",
        data: response.data?.data,
        pagination: response.data?.pagination,
      };
    } else {
      throw new Error("Failed to fetch purchase orders. Please try again.");
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
