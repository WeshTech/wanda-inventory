import {
  SingleTransferFormData,
  SingleTransferResponse,
} from "@/types/transfers";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createSingleTransferApi = async (
  formData: SingleTransferFormData,
  businessId: string,
  businessUserId: string
): Promise<SingleTransferResponse> => {
  try {
    const submitData = { ...formData, businessId, businessUserId };
    const response = await axiosApi.post<SingleTransferResponse>(`/transfer`, {
      ...submitData,
      toStoreId: submitData.toStore,
      fromStoreId: submitData.fromStore,
    });

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Transfer created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Transfer creation failed");
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
