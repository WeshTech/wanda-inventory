import { GetSuppliersResponse } from "@/types/suppliers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessSuppliersApi = async (
  businessId: string
): Promise<GetSuppliersResponse> => {
  try {
    const response = await axiosApi.get<GetSuppliersResponse>(
      `/supplier/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Suppliers extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Supplier extraction failed");
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
