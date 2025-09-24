import { UserLoginResponse } from "@/types/auth/user-login-response";
import { axiosApi } from "@/utils/axios";

export const getCurrentUser = async (): Promise<UserLoginResponse | null> => {
  try {
    const res = await axiosApi.get("/auth/me");
    return res.data;
  } catch {
    return null;
  }
};
