import { GetInventoryStatsResponse } from "@/types/inventory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getInventoryStatsApi = async (
  businessId: string
): Promise<GetInventoryStatsResponse> => {
  try {
    const response = await axiosApi.get<GetInventoryStatsResponse>(
      `/businessproduct/stats/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Inventory extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch Inventory Stats. Please try again.");
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
