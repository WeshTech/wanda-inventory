import { PurchaseReceiptFormData } from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
import {
  CreatePRDto,
  CreatePRResponse,
  ProductDto,
} from "@/types/purchasereceipts";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createPurchaseReceiptApi = async (
  formData: PurchaseReceiptFormData,
  businessId: string,
  userId: string
): Promise<CreatePRResponse> => {
  const {
    receiptName,
    supplier: supplierId,
    store: storeId,
    products: formProducts,
  } = formData;

  const products: ProductDto[] = formProducts.map((product) => ({
    businessProductId: product.id || "",
    acceptedQuantity: product.accepted,
    rejectedQuantity: product.rejected,
    unitPrice: product.unitPrice,
  }));

  const submitData: CreatePRDto = {
    createdBy: userId,
    businessId,
    receiptName,
    supplierId,
    storeId,
    products,
  };

  try {
    const response = await axiosApi.post<CreatePRResponse>(
      `/purchase-receipts`,
      submitData
    );

    if (response.data?.success) {
      return {
        success: true,
        message:
          response.data?.message || "Purchase receipt created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(
        response.data?.message || "Purchase receipt creation failed"
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
