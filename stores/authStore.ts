import { UserLoginResponse } from "@/types/auth/user-login-response";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: UserLoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserLoginResponse) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),
      clearUser: () =>
        set({ user: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist non-sensitive user data
      partialize: (state) => ({
        user: state.user
          ? {
              business: state.user.business,
              businessId: state.user.businessId,
              constituency: state.user.constituency,
              county: state.user.county,
              createdAt: state.user.createdAt,
              email: state.user.email,
              name: state.user.name,
              phoneNumber: state.user.phoneNumber,
              role: state.user.role,
              ward: state.user.ward,
            }
          : null,
        isAuthenticated: state.isAuthenticated,
      }),
      // Keep loading true until server verification completes
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.warn("Failed to rehydrate auth state:", error);
            useAuthStore.getState().setLoading(false);
            return;
          }
          // State restored, but keep loading true until /me verification
          console.log(
            "Auth state restored from storage:",
            state?.user?.email || "no user"
          );
        };
      },
    }
  )
);
