import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import type {
  ContextResponse,
  ContextData,
  ContextPermissions,
} from "@/types/context";
import { AES, enc } from "crypto-js";

interface AuthState {
  contextResponse: ContextResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions
  setContextResponse: (contextResponse: ContextResponse) => void;
  clearContext: () => void;
  setLoading: (loading: boolean) => void;
}

// Custom encrypted storage wrapper around localStorage
const encryptedStorage = {
  getItem: (name: string) => {
    const encrypted = localStorage.getItem(name);
    if (!encrypted) return null;
    try {
      const decrypted = AES.decrypt(encrypted, "secret-key").toString(enc.Utf8);
      return decrypted;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    const encrypted = AES.encrypt(value, "secret-key").toString();
    localStorage.setItem(name, encrypted);
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

// Zustand store
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
      storage: createJSONStorage(() => encryptedStorage),
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
  useAuthStore(useShallow((state) => state.contextResponse?.data ?? null));

// Extract the user object (email, role, businessName)
export const useAuthUser = () =>
  useAuthStore(
    useShallow((state) => state.contextResponse?.data?.user ?? null)
  );

// Extract the permissions object
export const useAuthPermissions = (): ContextPermissions | null =>
  useAuthStore(
    useShallow((state) => state.contextResponse?.data?.permissions ?? null)
  );

// Extract store access array
export const useAuthStoreAccess = (): string[] =>
  useAuthStore(
    useShallow((state) => state.contextResponse?.data?.storeAccess ?? [])
  );

// Extract the business ID
export const useAuthBusinessId = (): string | null =>
  useAuthStore((state) => state.contextResponse?.data?.businessId ?? null);
