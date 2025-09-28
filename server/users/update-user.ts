import { UpdateUserForm } from "@/schemas/users/updateUserSchema";
import { CreateBusinessUserResponse } from "@/types/users";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const updateBusinessUserApi = async (
  formData: UpdateUserForm,
  businessId: string,
  userId: string
): Promise<CreateBusinessUserResponse> => {
  try {
    const { email, username, role, store } = formData;
    console.log({ formData });
    const response = await axiosApi.patch<CreateBusinessUserResponse>(
      `/businessusers/${userId}`,
      {
        userId,
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
        message: response.data?.message || "User updated successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Users update failed");
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
