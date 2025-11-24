import { TopUpFormValues } from "@/schemas/settings/topUpSchema";
import { TopUpResponse } from "@/types/settings";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const topUpWalletApi = async (
  businessId: string,
  formData: TopUpFormValues
): Promise<TopUpResponse> => {
  const { phoneNumber, amount } = formData;

  try {
    const response = await axiosApi.post<TopUpResponse>(`/payments`, {
      phoneNumber,
      amount: Number(amount),
      businessId,
    });

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Payment request sent successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Payment request failed");
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
