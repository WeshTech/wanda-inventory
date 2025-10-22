import { CreatePurchaseOrderFormData } from "@/schemas/purchaseOrderSchema";
import { CreatePurchaseOrderResponse } from "@/types/purchaseorder";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createPurchaseordersApi = async (
  formData: CreatePurchaseOrderFormData,
  businessId: string,
  userId: string
): Promise<CreatePurchaseOrderResponse> => {
  try {
    const convertedDate = new Date(formData.dateExpected).toISOString();
    const response = await axiosApi.post<CreatePurchaseOrderResponse>(
      `/purchaseorder`,
      {
        businessId,
        userId,
        storeId: formData.store,
        expectedDate: convertedDate,
        supplierId: formData.supplier,
        products: formData.products,
      }
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase order created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error("Failed to create purchase orders. Please try again.");
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
