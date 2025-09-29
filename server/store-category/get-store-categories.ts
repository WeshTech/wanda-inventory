import { GetBusinessCategoryDataResponse } from "@/types/storeCategory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getStoreCategoryApi = async (
  businessId: string
): Promise<GetBusinessCategoryDataResponse> => {
  try {
    const response = await axiosApi.get<GetBusinessCategoryDataResponse>(
      `/storecategory/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Categories retrieved successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Categories retrieval failed");
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
