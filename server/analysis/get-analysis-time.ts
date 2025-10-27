import { AnalysisTimeResponse } from "@/types/analysis";
import { axiosApi } from "@/utils/axios";
import { AxiosError } from "axios";

export const getBusinessAnalysisTimeApi = async (
  businessId: string
): Promise<AnalysisTimeResponse> => {
  try {
    const response = await axiosApi.get<AnalysisTimeResponse>(
      `/business/analysis/dt/${businessId}`
    );

    if (response.data?.success) {
      return {
        success: true,
        message: response.data?.message || "Days extracted successfully",
        date: response.data?.date,
      };
    } else {
      throw new Error(response.data?.message || "Day extraction failed");
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
