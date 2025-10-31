import { ForgotPasswordFormValues } from "@/schemas/auth/forgotPasswordSchema";
import { ForgotPasswordResponse } from "@/types/auth/user-login-response";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const ResetPasswordApi = async (
  formData: ForgotPasswordFormValues
): Promise<ForgotPasswordResponse> => {
  const { email, password, code } = formData;

  try {
    const response = await axiosApi.post<ForgotPasswordResponse>(
      "/auth/password/forgot-password",
      {
        email: email.toLowerCase(),
        code,
        password,
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Handle known API error response
      if (error.response?.data && typeof error.response.data === "object") {
        return error.response.data as ForgotPasswordResponse;
      }

      // Fallback for network errors or no response
      return {
        success: false,
        message: "Check your connection and try again",
        code: false,
        password: false,
      };
    }

    // For any other unexpected errors
    return {
      success: false,
      message: "An unexpected error occurred",
      code: false,
      password: false,
    };
  }
};
