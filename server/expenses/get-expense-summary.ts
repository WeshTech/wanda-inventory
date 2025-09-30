import { ExpesnseSummaryResponse } from "@/types/expenses";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessExpensesSummaryApi = async (
  businessId: string
): Promise<ExpesnseSummaryResponse> => {
  try {
    const response = await axiosApi.get<ExpesnseSummaryResponse>(
      `/expenses/summary/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Expense Summary success",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Expense summary failed");
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
