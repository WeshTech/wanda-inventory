import { GetBusinessStoresResponse } from "@/types/stores";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessStores = async (
  businessId: string
): Promise<GetBusinessStoresResponse> => {
  try {
    const response = await axiosApi.get<GetBusinessStoresResponse>(
      `/stores/${businessId}`
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    }
    return {
      success: false,
      message: response.data?.message || "Store extraction failed",
      data: null,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response) {
      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "Something went wrong. Please check your connection and try again",
        data: null,
      };
    }
    throw error;
  }
};
