import { MonthlyComparisonResponse } from "@/types/dashboard";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getChartDataAPI = async (
  businessId: string,
  userId: string
): Promise<MonthlyComparisonResponse> => {
  try {
    const response = await axiosApi.get<MonthlyComparisonResponse>(
      `/dashboard/chart-data/${businessId}/${userId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Chart data extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch Chart data. Please try again.");
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
