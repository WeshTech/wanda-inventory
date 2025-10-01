import { GetBusinessCustomerStatsResponse } from "@/types/customers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessCustomerStatsApi = async (
  businessId: string
): Promise<GetBusinessCustomerStatsResponse> => {
  try {
    const response = await axiosApi.get<GetBusinessCustomerStatsResponse>(
      `/customers/totals/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Customers extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Customer extraction failed");
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
