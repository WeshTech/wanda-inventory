import { loginSchema } from "@/schemas/loginSchema";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";
import z from "zod";
import { useAuthStore } from "@/stores/authStore";
import type { ContextResponse } from "@/types/context";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginUser = async (formData: LoginFormValues) => {
  const { email, password } = formData;
  const { setContextResponse, clearContext } = useAuthStore.getState();

  try {
    // Step 1: Attempt login
    const response = await axiosApi.post("/auth/login", {
      email: email.toLowerCase(),
      password,
      code: formData.twoFactorCode,
    });

    console.log("Login response:", response);

    if (response.status === 200) {
      try {
        const meResponse = await axiosApi.get<ContextResponse>("/auth/me");

        if (meResponse.status === 200 && meResponse.data.success) {
          setContextResponse(meResponse.data);

          return {
            success: true,
            message: meResponse.data.message || "Login successful",
            data: meResponse.data,
          };
        } else {
          // Context fetch failed after login
          clearContext();
          return {
            success: false,
            message: "Failed to retrieve user context after login.",
          };
        }
      } catch (contextError) {
        console.error("Failed to fetch /auth/me:", contextError);
        clearContext();
        return {
          success: false,
          message: "Login succeeded, but failed to load user context.",
        };
      }
    }

    // Fallback for unexpected login response
    return {
      success: false,
      message: response.data?.message || "Login failed. Please try again.",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    //  Handle server responses
    if (axiosError.response) {
      if (axiosError.response.status === 401) {
        return {
          success: false,
          message:
            axiosError.response.data?.message ||
            "Invalid credentials or account blocked.",
        };
      }

      if (axiosError.response.status === 403) {
        return {
          success: false,
          message:
            axiosError.response.data?.message ||
            "Sorry, you are logged in on another device.",
        };
      }

      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "Login failed. Please try again.",
      };
    }

    //  Network or unknown error
    return {
      success: false,
      message:
        "Something went wrong. Please check your connection and try again.",
    };
  }
};
