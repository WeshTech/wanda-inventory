import { ExpenseFormData } from "@/schemas/expenses/createExpenseSchema";
import { CreateExpenseResponse } from "@/types/expenses";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createBusinessExpenseApi = async (
  formData: ExpenseFormData,
  businessId: string
): Promise<CreateExpenseResponse> => {
  try {
    const { purpose, amount, category, date, description } = formData;
    const response = await axiosApi.post<CreateExpenseResponse>(`/expenses`, {
      purpose,
      amount,
      category,
      date,
      description,
      businessId,
    });

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Expense created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Expense creation failed");
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
