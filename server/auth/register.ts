import { RegisterSchema } from "@/schemas/auth/registrationSchema";
import { axiosApi } from "@/utils/axios";
import { z } from "zod";
import { registerSuccessData } from "@/types/auth/register";
import { AxiosError } from "axios";

type RegisterData = z.infer<typeof RegisterSchema>;

export const RegisterUser = async (formData: RegisterData) => {
  const validatedFields = RegisterSchema.safeParse(formData);

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues
      .map((err) => err.message)
      .join(", ");
    return { status: false, message: `Validation Failed: ${errorMessages}` };
  }

  const {
    businessEmail,
    businessName,
    businessType,
    password,
    county,
    constituency,
    phoneNumber,
    ward,
    code,
    subscriptionPackage,
  } = validatedFields.data;

  try {
    const response = await axiosApi.post("/auth/register", {
      email: businessEmail.toLowerCase(),
      name: businessName,
      business: businessType,
      password,
      county,
      constituency,
      ward,
      code,
      phoneNumber,

      package: subscriptionPackage, // Map subscriptionPackage to package
    });

    if (response.data?.verification === true) {
      return {
        status: true,
        message: response.data?.message || "Please verify your email.",
        verification: true,
      };
    }

    if (response.data?.package === true) {
      return {
        status: false,
        message: "Please select a package to complete registration.",
        package: true,
      };
    }

    if (response.status === 201) {
      return {
        status: true,
        message: response.data?.message || "Registration successful.",
        data: response.data as registerSuccessData,
      };
    }

    return {
      status: false,
      message:
        response.data?.message || "Registration failed. Please try again.",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      if (axiosError.response.status === 409) {
        return {
          status: false,
          message:
            axiosError.response.data?.message ||
            "Email in use or Account Blocked",
        };
      }
      return {
        status: false,
        message:
          axiosError.response.data?.message ||
          "Registration failed. Please try again.",
      };
    }

    return {
      status: false,
      message:
        "Something went wrong. Please check your connection and try again.",
    };
  }
};
