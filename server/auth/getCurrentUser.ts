import { useAuthStore } from "@/stores/authStore";
import { axiosApi } from "@/utils/axios";

export const getCurrentUser = async () => {
  try {
    const res = await axiosApi.get("/auth/me");
    return res.data;
  } catch {
    return null;
  }
};

export async function initializeAuth() {
  const { setUser, clearUser } = useAuthStore.getState();

  try {
    const user = await getCurrentUser();
    if (user) {
      console.log("Initializing user:", user);
      setUser(user);
    } else {
      clearUser();
    }
  } catch {
    clearUser();
  }
}
