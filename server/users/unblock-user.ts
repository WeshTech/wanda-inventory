import { UpdateBusinessUserResponse } from "@/types/users";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const unblockBusinessUserApi = async (
  businessId: string,
  userId: string
): Promise<UpdateBusinessUserResponse> => {
  try {
    const response = await axiosApi.patch<UpdateBusinessUserResponse>(
      `/businessusers/access/ubu/${userId}`,
      {
        userId,
        businessId,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "User unblocked successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Unblocking failed");
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
