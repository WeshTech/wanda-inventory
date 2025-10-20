import { GetSaleByIdResponse } from "@/types/sales";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getSaleByIdApi = async (
  businessId: string,
  userId: string,
  saleId: string
): Promise<GetSaleByIdResponse> => {
  try {
    const response = await axiosApi.get<GetSaleByIdResponse>(
      `/sales/sale/${businessId}/${userId}/${saleId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Sale extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch Sale. Please try again.");
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
