import { loginSchema } from "@/schemas/loginSchema";
import { InitializeLoginResponse } from "@/types/auth/user-login-response";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";
import { z } from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export const InitializeLogin = async (
  formData: LoginFormValues
): Promise<InitializeLoginResponse> => {
  const { email, password } = formData;

  try {
    const response = await axiosApi.post<InitializeLoginResponse>(
      "/auth/initial/login",
      {
        email: email.toLowerCase(),
        password,
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Handle known API error response
      if (error.response?.data && typeof error.response.data === "object") {
        return error.response.data as InitializeLoginResponse;
      }

      // Fallback for network errors or no response
      return {
        success: false,
        message: "Check your connection and try again",
        twoFactor: false,
      };
    }

    // For any other unexpected errors
    return {
      success: false,
      message: "An unexpected error occurred",
      twoFactor: false,
    };
  }
};
