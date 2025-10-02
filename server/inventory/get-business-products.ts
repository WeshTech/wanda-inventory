import { GetBusinessProductsResponse } from "@/types/inventory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessProductsApi = async (
  businessId: string
): Promise<GetBusinessProductsResponse> => {
  try {
    const response = await axiosApi.get<GetBusinessProductsResponse>(
      `/businessproduct/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Products extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch products. Please try again.");
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
