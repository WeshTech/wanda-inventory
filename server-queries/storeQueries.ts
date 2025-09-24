import { CreateStoreFormData } from "@/schemas/stores/createStoreSchema";
import { createStoreApi } from "@/server/stores/createStore";
import { CreateStoreResponse, Store } from "@/types/stores";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";

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
      await queryClient.cancelQueries({ queryKey: ["stores"] });

      // Snapshot previous data
      const previousStores = queryClient.getQueryData<Store[]>(["stores"]);

      // Optimistically update cache
      queryClient.setQueryData(["stores"], (old: Store[] = []) => [
        ...old,
        { ...newStore, id: "temp-id", optimistic: true },
      ]);

      return { previousStores };
    },
    onError: (err, _newStore, context) => {
      // Rollback on error
      if (context?.previousStores) {
        queryClient.setQueryData(["stores"], context.previousStores);
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};
