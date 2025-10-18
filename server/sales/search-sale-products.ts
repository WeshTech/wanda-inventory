import { SearchStoreSaleProductsResponse } from "@/types/sales";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const searchStoreSalesProductsApi = async (
  businessId: string,
  storeId: string,
  userId: string,
  searchTerm: string
): Promise<SearchStoreSaleProductsResponse> => {
  try {
    const response = await axiosApi.get<SearchStoreSaleProductsResponse>(
      `/sales/search/${businessId}/${storeId}/${userId}/${searchTerm}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Products found successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to find products. Please try again.");
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
