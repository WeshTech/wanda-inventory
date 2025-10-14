import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ContextResponse } from "@/types/context";

interface AuthState {
  contextResponse: ContextResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setContextResponse: (contextResponse: ContextResponse) => void;
  clearContext: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      contextResponse: null,
      isAuthenticated: false,
      isLoading: true,

      setContextResponse: (contextResponse) => {
        // Store the full backend response
        set({
          contextResponse,
          isAuthenticated: contextResponse.success && !!contextResponse.data,
          isLoading: false,
        });
      },

      clearContext: () =>
        set({
          contextResponse: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "auth-context-storage",
      storage: createJSONStorage(() => localStorage),

      // ✅ Persist everything exactly as returned from the backend
      partialize: (state) => ({
        contextResponse: state.contextResponse,
        isAuthenticated: state.isAuthenticated,
      }),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.warn("Failed to rehydrate auth state:", error);
            useAuthStore.getState().setLoading(false);
            return;
          }
          console.log(
            "Auth context restored for:",
            state?.contextResponse?.data?.user?.email || "no user"
          );
        };
      },
    }
  )
);
