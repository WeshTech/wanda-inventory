import { CreateSaleFormData, CreateSaleResponse } from "@/types/sales";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const createSaleApi = async (
  formData: CreateSaleFormData
): Promise<CreateSaleResponse> => {
  const { customerName, totalAmount, businessId, storeId, userId } = formData;

  const submitData = {
    businessId,
    storeId,
    userId,
    subTotal: totalAmount,
    customerName,
    products: formData.products.map((product) => ({
      productId: product.productId,
      quantity: product.quantity,
      price: product.price,
    })),
  };

  try {
    const response = await axiosApi.post<CreateSaleResponse>(
      `/sales`,
      submitData
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Sale created successfully",
        data: response.data?.data,
      };
    } else {
      throw new Error(response.data?.message || "Sale creation failed");
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
