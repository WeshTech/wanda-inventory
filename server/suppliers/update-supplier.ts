import { SupplierFormData } from "@/schemas/suppliers/createSupplierSchema";
import { UpdateSupplierResponse } from "@/types/suppliers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const updateSupplierApi = async (
  formData: SupplierFormData,
  businessId: string,
  supplierId: string
): Promise<UpdateSupplierResponse> => {
  try {
    const { name, contact, email, phone, description } = formData;
    console.log(formData);
    const response = await axiosApi.patch<UpdateSupplierResponse>(
      `/supplier/${supplierId}`,
      {
        name,
        contact,
        email,
        phone,
        suppllies: description,
        businessId,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Supplier updated successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Supplier update failed");
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
