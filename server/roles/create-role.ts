import { CreateRoleInput } from "@/schemas/users/createRole.Schema";
import { CreateBusinessRoleResponse } from "@/types/roles";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createBusinessRoleApi = async (
  formData: CreateRoleInput & { businessId: string }
): Promise<CreateBusinessRoleResponse> => {
  const { title, description, permissions, businessId } = formData;

  const flatPermissions: Record<string, boolean> = {};
  Object.entries(permissions).forEach(([module, actions]) => {
    Object.entries(actions).forEach(([action, value]) => {
      if (value === true) {
        const moduleKey = module.charAt(0).toUpperCase() + module.slice(1);
        const backendKey = `${action}${moduleKey}`;
        flatPermissions[backendKey] = true;
      }
    });
  });

  try {
    const response = await axiosApi.post("/roles", {
      roleName: title,
      description,
      businessId,
      ...flatPermissions,
    });

    if (response.status === 201 && response.data) {
      return {
        success: true,
        message: response.data?.message || "Role created successfully",
        data: response.data,
      };
    }
    throw new Error(response.data?.message || "Role creation failed");
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    throw new Error(
      axiosError.response?.data?.message ||
        "Something went wrong. Please check your connection and try again"
    );
  }
};
