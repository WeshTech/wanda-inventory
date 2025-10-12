import { useAuthStore } from "@/stores/authStore";
import { GetBusinessStoresResponse } from "@/types/stores";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessStores =
  async (): Promise<GetBusinessStoresResponse> => {
    const { user, isLoading } = useAuthStore.getState();
    const businessId = user?.businessId;

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
        message: "You must be logged in to create a store",
        data: null,
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
