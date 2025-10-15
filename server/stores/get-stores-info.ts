import { GetStoreSaleProductsResult } from "@/types/sales";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getStoreInfoApi = async (
  businessId: string,
  storeIds: string[]
): Promise<GetStoreSaleProductsResult> => {
  try {
    const response = await axiosApi.post<GetStoreSaleProductsResult>(
      `/stores/info`,
      { storeIds, businessId }
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
