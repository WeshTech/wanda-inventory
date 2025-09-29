import { CategoryFormData } from "@/schemas/storeCategorySchema";
import { createStoreCategoryApi } from "@/server/store-category/create-store-category";
import { getStoreCategoryApi } from "@/server/store-category/get-store-categories";
import { useAuthStore } from "@/stores/authStore";
import {
  CreateCategoryDataResponse,
  GetBusinessCategoryDataResponse,
} from "@/types/storeCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateStoreCategory() {
  const queryClient = useQueryClient();
  const businessId = useAuthStore((state) => state.user?.businessId);

  //create store category query
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

//get store categories
export function useStoreCategories(businessId: string) {
  return useQuery<GetBusinessCategoryDataResponse, Error>({
    queryKey: ["getStoreCategories", businessId],
    queryFn: () => getStoreCategoryApi(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 60 * 10,
  });
}
