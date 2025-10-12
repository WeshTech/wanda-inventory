import { GetTransfersResponse } from "@/types/transfers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessTransfersApi = async (
  businessId: string
): Promise<GetTransfersResponse> => {
  try {
    const response = await axiosApi.get<GetTransfersResponse>(
      `/transfer/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Transfers extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Transfers extraction failed");
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
