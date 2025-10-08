import { SearchBusinessProductResponse } from "@/types/inventory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const searchBusinessProductsApi = async (
  businessId: string,
  searchTerm: string
): Promise<SearchBusinessProductResponse> => {
  try {
    const response = await axiosApi.get(
      `/businessproduct/search/${businessId}/${searchTerm}`
    );
    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Product found successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to search products. Please try again.");
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
