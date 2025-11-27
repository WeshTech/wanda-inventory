"use client";

import { useAuthStore } from "@/stores/authStore";
import { axiosApi } from "@/utils/axios";
import { useCallback } from "react";
import { clearCookies } from "./clearCookies";

export function useLogoutUser() {
  const { clearContext } = useAuthStore();

  const logoutUser = useCallback(async () => {
    try {
      await axiosApi.post("/auth/logout");
      await clearCookies();
    } catch {
    } finally {
      clearContext();
      window.location.replace("/auth/login");
    }
  }, [clearContext]);

  return logoutUser;
}
