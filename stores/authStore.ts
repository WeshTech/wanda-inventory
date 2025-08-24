import { UserLoginResponse } from "@/types/auth/user-login-response";
import { create } from "zustand";

interface AuthState {
  user: UserLoginResponse | null;
  isAuthenticated: boolean;
  setUser: (user: UserLoginResponse) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
