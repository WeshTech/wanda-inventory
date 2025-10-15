import { GetStoreSaleProductsResult } from "@/types/sales";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getStoreSalesProductsApi = async (
  businessId: string,
  storeId: string,
  userId: string
): Promise<GetStoreSaleProductsResult> => {
  try {
    const response = await axiosApi.get<GetStoreSaleProductsResult>(
      `/sales/products/${businessId}/${storeId}/${userId}`
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
