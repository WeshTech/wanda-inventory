import { SearchStoreProductResponse } from "@/types/storeProducts";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const searchStoreProductApi = async (
  businessId: string,
  businessUserId: string,
  storeId: string,
  searchTerm: string
): Promise<SearchStoreProductResponse> => {
  try {
    const response = await axiosApi.get(
      `/store-products/search/${businessId}/${businessUserId}/${storeId}/${searchTerm}`
    );
    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Products found successfully",
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
