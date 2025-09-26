import { BusinessUsersResponse } from "@/types/users";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getAllBusinessUsersApi = async (
  businessId: string
): Promise<BusinessUsersResponse> => {
  try {
    const response = await axiosApi.get<BusinessUsersResponse>(
      `/businessusers/business/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Users retrieved successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Users retrival failed");
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
