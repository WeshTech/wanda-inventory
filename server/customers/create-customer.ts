import { CustomerFormData } from "@/schemas/customers/createCustomerSchema";
import { CreateCustomerResponse } from "@/types/customers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createCustomerApi = async (
  formData: CustomerFormData,
  businessId: string
): Promise<CreateCustomerResponse> => {
  try {
    const { name, email, phone } = formData;
    const response = await axiosApi.post<CreateCustomerResponse>(`/customers`, {
      customerName: name,
      email,
      phone,
      businessId,
    });

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Customer created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Customer creation failed");
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
