import { InviteUserForm } from "@/schemas/users/inviteUserSchema";
import { CreateBusinessUserResponse } from "@/types/users";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createBusinessUserApi = async (
  formData: InviteUserForm,
  businessId: string
): Promise<CreateBusinessUserResponse> => {
  try {
    const { email, username, role, store } = formData;
    const response = await axiosApi.post<CreateBusinessUserResponse>(
      `/businessusers`,
      {
        userName: username,
        email,
        roleId: role,
        storeId: store,
        businessId,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "User created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Users creation failed");
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
