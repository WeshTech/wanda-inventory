import { CreateStoreFormData } from "@/schemas/stores/createStoreSchema";
import { useAuthStore } from "@/stores/authStore";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const CreateStore = async (formData: CreateStoreFormData) => {
  const { name, county, constituency, ward, storeStatus } = formData;
  const { user } = useAuthStore.getState();

  const businessId = user?.businessId;
  if (!businessId) {
    return {
      success: false,
      message: "You must be logged in to create a store",
    };
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
        message: response.data?.message || "Store created Successfully",
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.data?.message || "Store creation failed.",
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
