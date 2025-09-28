import { UpdateBusinessUserResponse } from "@/types/users";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const blockBusinessUserApi = async (
  businessId: string,
  userId: string
): Promise<UpdateBusinessUserResponse> => {
  try {
    const response = await axiosApi.patch<UpdateBusinessUserResponse>(
      `/businessusers/access/${userId}`,
      {
        userId,
        businessId,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "User blocked successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "User blocking failed");
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
