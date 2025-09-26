import { getAllBusinessUsersApi } from "@/server/users/get-all-users";
import { useAuthStore } from "@/stores/authStore";
import { BusinessUsersResponse } from "@/types/users";
import { useQuery } from "@tanstack/react-query";

export const useBusinessUsers = (businessId: string | undefined) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  return useQuery<BusinessUsersResponse, Error>({
    queryKey: ["businessUsers", businessId],
    queryFn: () => {
      if (!businessId) {
        throw new Error("Business ID is required");
      }
      return getAllBusinessUsersApi(businessId);
    },
    enabled: !!businessId && isAuthenticated && !isLoading,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });
};
