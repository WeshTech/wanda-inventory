import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ContextResponse,
  ContextData,
  ContextPermissions,
} from "@/types/context";

interface AuthState {
  contextResponse: ContextResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setContextResponse: (contextResponse: ContextResponse) => void;
  clearContext: () => void;
  setLoading: (loading: boolean) => void;
}

//  Zustand store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      contextResponse: null,
      isAuthenticated: false,
      isLoading: true,

      setContextResponse: (contextResponse) => {
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
      partialize: (state) => ({
        contextResponse: state.contextResponse,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
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

// Return the entire data object
export const useAuthContext = (): ContextData | null =>
  useAuthStore((state) => state.contextResponse?.data ?? null);

// Extract the user object (email, role, businessName)
export const useAuthUser = () =>
  useAuthStore((state) => state.contextResponse?.data?.user ?? null);

// Extract the permissions object
export const useAuthPermissions = (): ContextPermissions | null =>
  useAuthStore((state) => state.contextResponse?.data?.permissions ?? null);

// Extract store access array
export const useAuthStoreAccess = (): string[] =>
  useAuthStore((state) => state.contextResponse?.data?.storeAccess ?? []);

// Extract the business ID
export const useAuthBusinessId = (): string | null =>
  useAuthStore((state) => state.contextResponse?.data?.businessId ?? null);
