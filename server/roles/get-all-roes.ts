import { BusinessRolesResponse } from "@/types/roles";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessRoles = async (
  businessId: string
): Promise<BusinessRolesResponse> => {
  try {
    const response = await axiosApi.get<BusinessRolesResponse>(
      `/roles/business/${businessId}`
    );

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message || "Roles fetched successfully",
        data: response.data.data,
      };
    }
    return {
      success: false,
      message: response.data?.message || "Roles extraction failed",
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
