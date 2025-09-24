import { CreateStoreFormData } from "@/schemas/stores/createStoreSchema";
import { createStoreApi } from "@/server/stores/createStore";
import { getBusinessStores } from "@/server/stores/getBusinessStores";
import { useAuthStore } from "@/stores/authStore";
import { CreateStoreResponse, GetStoresResult, Store } from "@/types/stores";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

/*
 * Get all the stores
 */
export const useGetBusinessStores = () => {
  const { isAuthenticated, user, isLoading: authLoading } = useAuthStore();
  return useQuery<GetStoresResult, Error>({
    queryKey: ["getbusinessStores", user?.businessId],
    queryFn: getBusinessStores,
    enabled: !authLoading && isAuthenticated && !!user?.businessId,
  });
};

/*
 * Create store Query
 */
export const useCreateStore = (): UseMutationResult<
  CreateStoreResponse,
  Error,
  CreateStoreFormData
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStoreApi,
    mutationKey: ["createStore"],
    onMutate: async (newStore) => {
      // Cancel any outgoing queries for stores
      await queryClient.cancelQueries({ queryKey: ["getbusinessStores"] });

      // Snapshot previous data
      const previousStores = queryClient.getQueryData<Store[]>([
        "getbusinessStores",
      ]);

      // Optimistically update cache
      queryClient.setQueryData(["getbusinessStores"], (old: Store[] = []) => [
        ...old,
        { ...newStore, id: "temp-id", optimistic: true },
      ]);

      return { previousStores };
    },
    onError: (err, _newStore, context) => {
      // Rollback on error
      if (context?.previousStores) {
        queryClient.setQueryData(["getbusinessStores"], context.previousStores);
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["getbusinessStores"] });
    },
  });
};
