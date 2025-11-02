import { CreateStoreFormData } from "@/schemas/stores/createStoreSchema";
import { useAuthStore } from "@/stores/authStore";
import { CreateStoreResponse } from "@/types/stores";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createStoreApi = async (
  formData: CreateStoreFormData,
  businessId: string
): Promise<CreateStoreResponse> => {
  const { name, county, constituency, ward, storeStatus } = formData;
  const { isLoading } = useAuthStore.getState();

  if (!isLoading && !businessId) {
    throw new Error("You must be logged in to create a store");
  }

  try {
    const response = await axiosApi.post("/stores", {
      name,
      county,
      constituency,
      ward,
      storeStatus,
      businessId,
    });

    if (response.status === 201 && response.data) {
      return {
        success: true,
        message: response.data?.message || "Store created successfully",
        data: response.data,
      };
    }
    throw new Error(response.data?.message || "Store creation failed");
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(
      axiosError.response?.data?.message ||
        "Something went wrong. Please check your connection and try again"
    );
  }
};
