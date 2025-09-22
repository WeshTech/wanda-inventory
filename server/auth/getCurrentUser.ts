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
  const { setUser, clearUser, setLoading } = useAuthStore.getState();

  setLoading(true);

  try {
    console.log("Initializing auth - verifying with /me...");
    const user = await getCurrentUser();

    if (user) {
      setUser(user);
    } else {
      clearUser();
    }
  } catch {
    clearUser();
  } finally {
    setLoading(false);
  }
}
