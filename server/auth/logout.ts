"use client";

import { useAuthStore } from "@/stores/authStore";
import { axiosApi } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLogoutUser() {
  const router = useRouter();
  const { clearContext } = useAuthStore();

  const logoutUser = useCallback(async () => {
    try {
      await axiosApi.post("/auth/logout");
    } catch {
    } finally {
      clearContext();
      router.replace("/auth/login");
    }
  }, [clearContext, router]);

  return logoutUser;
}
