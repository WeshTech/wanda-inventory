import { FindProductByBarcodeResponse } from "@/types/inventory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getProductApi = async (
  businessId: string,
  barcode: string
): Promise<FindProductByBarcodeResponse> => {
  try {
    const response = await axiosApi.get<FindProductByBarcodeResponse>(
      `/businessproduct/product/${businessId}/${barcode}`
    );

    if (response.data?.success) {
      return {
        success: true,
        foundAt: response.data?.foundAt,
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to search");
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
