import { GlobalBusinessInfoResponse } from "@/types/settings";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessInfoApi = async (
  businessId: string,
  userId: string
): Promise<GlobalBusinessInfoResponse> => {
  try {
    const response = await axiosApi.get<GlobalBusinessInfoResponse>(
      `/business/${businessId}/${userId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Business info  extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to fetch business info. Please try again.");
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
