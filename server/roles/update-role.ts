import { CreateRoleInput } from "@/schemas/users/createRole.Schema";
import { UpdateBusinessRoleResponse } from "@/types/roles";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const updateBusinessRoleApi = async (
  formData: CreateRoleInput & { businessId: string },
  roleId: string
): Promise<UpdateBusinessRoleResponse> => {
  const { title, description, permissions, businessId } = formData;

  const flatPermissions: Record<string, boolean> = {};
  Object.entries(permissions).forEach(([module, actions]) => {
    const moduleKey = module.charAt(0).toUpperCase() + module.slice(1);
    ["create", "extract", "update", "delete"].forEach((action) => {
      const backendKey = `${action}${moduleKey}`;
      flatPermissions[backendKey] = !!actions[action as keyof typeof actions];
    });
  });

  try {
    const response = await axiosApi.patch<UpdateBusinessRoleResponse>(
      `/roles/${roleId}`,
      {
        roleName: title,
        description,
        businessId,
        ...flatPermissions,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Role updated successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Role update failed");
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
