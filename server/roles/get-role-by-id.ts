import { SingleRoleResponse } from "@/types/roles";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessRoleApi = async (
  businessId: string,
  roleId: string
): Promise<SingleRoleResponse> => {
  try {
    const response = await axiosApi.get<SingleRoleResponse>(
      `/roles/${businessId}/${roleId}`
    );

    if (response.status === 200 && response.data) {
      return {
        success: true,
        message: response.data.message,
        data: response.data.data,
      };
    }
    return {
      success: false,
      message: response.data?.message || "Role extraction failed",
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
    return {
      success: false,
      message:
        "Something went wrong. Please check your connection and try again",
      data: null,
    };
  }
};
