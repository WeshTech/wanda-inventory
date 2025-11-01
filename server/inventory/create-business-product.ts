import { InventoryFormData } from "@/schemas/inventory/add-inventory";
import { CreateBusinessProductResponse } from "@/types/inventory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createBusinessProductApi = async (
  formData: InventoryFormData,
  businessId: string,
  userId: string
): Promise<CreateBusinessProductResponse> => {
  const submitData = { ...formData, businessId, userId };
  console.log("Submitting data:", submitData);
  try {
    const response = await axiosApi.post<CreateBusinessProductResponse>(
      `/businessproduct`,
      submitData
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Product created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Product creation failed");
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
