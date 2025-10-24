import { CreateStoreFormData } from "@/schemas/stores/createStoreSchema";
import { createStoreApi } from "@/server/stores/createStore";
import { getBusinessStoreInfoApi } from "@/server/stores/get-business-store-info";
import { getStoreInfoApi } from "@/server/stores/get-stores-info";
import { getBusinessStores } from "@/server/stores/getBusinessStores";
import { useAuthStore } from "@/stores/authStore";
import {
  BusinessStoreResponse,
  CreateStoreResponse,
  GetBusinessStoresResponse,
  Store,
  StoresInfoResponse,
} from "@/types/stores";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

//* Get all the stores
export const useGetBusinessStores = (businessId: string) => {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  return useQuery<GetBusinessStoresResponse, Error>({
    queryKey: ["getbusinessStores", businessId],
    queryFn: () => getBusinessStores(businessId),
    enabled: !authLoading && isAuthenticated && !!businessId,
    staleTime: 60 * 60 * 1000 * 10,
  });
};

// * Create store Query
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

//get store info
export const useStoreInfoQuery = (businessId: string, storeIds: string[]) => {
  return useQuery<StoresInfoResponse, Error>({
    queryKey: ["storesInfo", businessId, storeIds],
    queryFn: () => getStoreInfoApi(businessId, storeIds),
    enabled: !!businessId && !!storeIds,
    staleTime: 10 * 60 * 60 * 1000,
  });
};

//get business store info
export const useBusinessStoreInfo = (businessId: string) => {
  return useQuery<BusinessStoreResponse, Error>({
    queryKey: ["businessStoreInfo", businessId],
    queryFn: () => getBusinessStoreInfoApi(businessId),
    enabled: !!businessId,
    staleTime: 10 * 60 * 1000,
  });
};
