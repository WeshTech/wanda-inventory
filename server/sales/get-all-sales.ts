import { GetSalesResponse } from "@/types/sales";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getAllSalesApi = async (
  businessId: string,
  storeId: string,
  userId: string
): Promise<GetSalesResponse> => {
  try {
    const response = await axiosApi.get<GetSalesResponse>(
      `/sales/${businessId}/${storeId}/${userId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Sales extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch Sales. Please try again.");
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
