import { SupplierFormData } from "@/schemas/suppliers/createSupplierSchema";
import { CreateSupplierResponse } from "@/types/suppliers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createSupplierApi = async (
  formData: SupplierFormData,
  businessId: string
): Promise<CreateSupplierResponse> => {
  try {
    const { name, contact, email, phone, description } = formData;
    const response = await axiosApi.post<CreateSupplierResponse>(`/supplier`, {
      name,
      contact,
      email,
      phone,
      supplies: description,
      businessId,
    });

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Supplier created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Supplier creation failed");
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
