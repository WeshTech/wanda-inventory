import { DashboardMetricsResponse } from "@/types/dashboard";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getDashboardMetricsApi = async (
  businessId: string,
  storeId?: string,
  monthsBack?: number
): Promise<DashboardMetricsResponse> => {
  try {
    console.log("Fetching dashboard metrics for:", {
      businessId,
      storeId,
      monthsBack,
    });
    const response = await axiosApi.post<DashboardMetricsResponse>(
      `/dashboard`,
      {
        businessId,
        storeId,
        monthsBack,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Metrics extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch metrics. Please try again.");
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
