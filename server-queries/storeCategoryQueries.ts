import { CategoryFormData } from "@/schemas/storeCategorySchema";
import { createStoreCategoryApi } from "@/server/store-category/create-store-category";
import { getStoreCategoryApi } from "@/server/store-category/get-store-categories";
import {
  CreateCategoryDataResponse,
  GetBusinessCategoryDataResponse,
} from "@/types/storeCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//create store category query
export function useCreateStoreCategory(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation<CreateCategoryDataResponse, Error, CategoryFormData>({
    mutationKey: ["createstorecategory", businessId],
    mutationFn: async (formData: CategoryFormData) => {
      if (!businessId) {
        throw new Error("No business ID found");
      }
      return createStoreCategoryApi(formData, businessId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getstorecategories", businessId],
      });
    },
  });
}

//get store categories
export function useStoreCategories(businessId: string) {
  return useQuery<GetBusinessCategoryDataResponse, Error>({
    queryKey: ["getstorecategories", businessId],
    queryFn: () => getStoreCategoryApi(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 60 * 10,
  });
}
