import { CategoryFormData } from "@/schemas/storeCategorySchema";
import { createStoreCategoryApi } from "@/server/store-category/create-store-category";
import { useAuthStore } from "@/stores/authStore";
import { CreateCategoryDataResponse } from "@/types/storeCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStoreCategory() {
  const queryClient = useQueryClient();
  const businessId = useAuthStore((state) => state.user?.businessId);

  return useMutation<CreateCategoryDataResponse, Error, CategoryFormData>({
    mutationFn: async (formData: CategoryFormData) => {
      if (!businessId) {
        throw new Error("No business ID found in auth store");
      }
      return createStoreCategoryApi(formData, businessId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getstorecategories"] });
    },
  });
}
