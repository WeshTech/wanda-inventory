import { CategoryFormData } from "@/schemas/storeCategorySchema";
import { CreateCategoryDataResponse } from "@/types/storeCategory";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createStoreCategoryApi = async (
  formData: CategoryFormData,
  businessId: string
): Promise<CreateCategoryDataResponse> => {
  try {
    const { store, name, description } = formData;
    const response = await axiosApi.post<CreateCategoryDataResponse>(
      `/storecategory`,
      {
        name,
        description,
        storeId: store,
        businessId,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Category created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Category creation failed");
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
