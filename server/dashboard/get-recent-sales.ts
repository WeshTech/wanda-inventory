import { RecentSalesResponse } from "@/types/dashboard";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getRecentSalesAPI = async (
  businessId: string,
  userId: string
): Promise<RecentSalesResponse> => {
  try {
    const response = await axiosApi.get<RecentSalesResponse>(
      `/dashboard/recent-sales/${businessId}/${userId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Sales data extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch Sales data. Please try again.");
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
