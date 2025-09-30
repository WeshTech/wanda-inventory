import { DeleteExpenseResponse } from "@/types/expenses";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const deleteBusinessExpenseApi = async (
  businessId: string,
  expenseId: string
): Promise<DeleteExpenseResponse> => {
  try {
    const response = await axiosApi.delete<DeleteExpenseResponse>(`/expenses`, {
      data: { businessId, expenseId },
    });

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Expense deleted successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Expense deletion failed");
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
