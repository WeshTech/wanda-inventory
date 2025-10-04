import { GeneratePurchaseOrderFormData } from "@/schemas/purchaseorder/generatePurchaseorderSchema";
import { GeneratePurchaseOrderResponse } from "@/types/purchaseorder";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const generatePurchaseOrderApi = async (
  formData: GeneratePurchaseOrderFormData,
  businessId: string
): Promise<GeneratePurchaseOrderResponse> => {
  const submitData = { ...formData, businessId };
  console.log("Submitting data:", submitData);
  try {
    const response = await axiosApi.post<GeneratePurchaseOrderResponse>(
      `/purchaseorder/aigen`,
      submitData
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Product created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Product creation failed");
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
