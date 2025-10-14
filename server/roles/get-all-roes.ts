import { useAuthStore } from "@/stores/authStore";
import { BusinessRolesResponse } from "@/types/roles";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessRoles = async (): Promise<BusinessRolesResponse> => {
  const { isLoading } = useAuthStore.getState();
  const businessId = useAuthBusinessId() ?? "";

  if (!businessId) {
    if (isLoading) {
      return {
        success: false,
        message: "Authenticating user, please wait...",
        data: null,
      };
    }
    return {
      success: false,
      message: "You must be logged in to extract roles",
      data: null,
    };
  }

  try {
    const response = await axiosApi.get<BusinessRolesResponse>(
      `/roles/business/${businessId}`
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
