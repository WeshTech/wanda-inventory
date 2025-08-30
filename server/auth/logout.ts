import { useAuthStore } from "@/stores/authStore";
import { axiosApi } from "@/utils/axios";

export const logoutUser = async () => {
  try {
    await axiosApi.post("/auth/logout");

    useAuthStore.getState().clearUser();

    window.location.href = "/auth/login";
  } catch {}
};
