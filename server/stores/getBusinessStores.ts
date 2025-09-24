import { useAuthStore } from "@/stores/authStore";
import { GetBusinessStoresResponse, GetStoresResult } from "@/types/stores";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessStores = async (): Promise<GetStoresResult> => {
  const { user, isLoading } = useAuthStore.getState();
  const businessId = user?.businessId;

  if (!businessId) {
    if (isLoading) {
      return {
        success: false,
        message: "Authenticating user, please wait...",
      };
    }
    return {
      success: false,
      message: "You must be logged in to create a store",
    };
  }

  try {
    const response = await axiosApi.get<GetBusinessStoresResponse>(
      `/stores/${businessId}`
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
      message: response.data?.message || "Store extraction failed",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    if (axiosError.response) {
      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "Something went wrong. Please check your connection and try again",
      };
    }
    return {
      success: false,
      message:
        "Something went wrong. Please check your connection and try again",
    };
  }
};
