import { ContextResponse } from "@/types/context";
import { axiosApi } from "@/utils/axios";

export const getCurrentUser = async (): Promise<ContextResponse | null> => {
  try {
    const res = await axiosApi.get("/auth/me");
    return res.data;
  } catch {
    return null;
  }
};
