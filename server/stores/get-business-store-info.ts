import { BusinessStoreResponse } from "@/types/stores";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessStoreInfoApi = async (
  businessId: string
): Promise<BusinessStoreResponse> => {
  try {
    const response = await axiosApi.get<BusinessStoreResponse>(
      `/stores/business-info/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Stores info extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch Store info. Please try again.");
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
