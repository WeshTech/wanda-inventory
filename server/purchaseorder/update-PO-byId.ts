import { UpdatePurchaseOrderFormData } from "@/schemas/purchaseOrderSchema";
import { UpdatePurchaseOrderResponse } from "@/types/purchaseorder";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const updatePurchaseorderByIdApi = async (
  formData: UpdatePurchaseOrderFormData,
  businessId: string
): Promise<UpdatePurchaseOrderResponse> => {
  try {
    const combinedData = { businessId, ...formData };
    const response = await axiosApi.patch<UpdatePurchaseOrderResponse>(
      `/purchaseorder`,
      combinedData
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase order updated successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(
        `${response.data.message}` ||
          "Failed to update purchase order. Please try again."
      );
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
