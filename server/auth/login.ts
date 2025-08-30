import { loginSchema } from "@/schemas/loginSchema";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";
import z from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginUser = async (formData: LoginFormValues) => {
  const validatedFields = loginSchema.safeParse(formData);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues
      .map((err) => err.message)
      .join(", ");
    return { success: false, message: `Validation Failed: ${errorMessages}` };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await axiosApi.post("/auth/login", {
      email: email.toLowerCase(),
      password,
    });

    console.log("Login response:", response);

    if (response.status === 200 && response.data.user) {
      console.log("User data:", response.data.user);
      return {
        success: true,
        message: response.data?.message || "Login successful",
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.data?.message || "Login failed. Please try again.",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      if (axiosError.response.status === 401) {
        return {
          success: false,
          message:
            axiosError.response.data?.message ||
            "Invalid Credentials or Account blocked",
        };
      }

      // Handle "logged in another device" error
      if (axiosError.response.status === 403) {
        return {
          success: false,
          message:
            axiosError.response.data?.message ||
            "Sorry, you are logged in another device",
        };
      }

      return {
        success: false,
        message:
          axiosError.response.data?.message ||
          "Login failed. Please try again.",
      };
    }

    return {
      success: false,
      message:
        "Something went wrong. Please check your connection and try again.",
    };
  }
};
