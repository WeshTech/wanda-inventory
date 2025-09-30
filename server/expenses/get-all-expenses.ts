import { AllExpensesResponse } from "@/types/expenses";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessExpensesApi = async (
  businessId: string
): Promise<AllExpensesResponse> => {
  try {
    const response = await axiosApi.get<AllExpensesResponse>(
      `/expenses/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Expense extracted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Expense extraction failed");
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
