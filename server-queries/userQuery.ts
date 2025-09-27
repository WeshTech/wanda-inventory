import { InviteUserForm } from "@/schemas/users/inviteUserSchema";
import { createBusinessUserApi } from "@/server/users/create-user";
import { getAllBusinessUsersApi } from "@/server/users/get-all-users";
import { useAuthStore } from "@/stores/authStore";
import {
  BusinessUsersResponse,
  CreateBusinessUserResponse,
} from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//get all business users
export const useBusinessUsers = (businessId: string | undefined) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  return useQuery<BusinessUsersResponse, Error>({
    queryKey: ["getbusinessUsers", businessId],
    queryFn: () => {
      if (!businessId) {
        throw new Error("Business ID is required");
      }
      return getAllBusinessUsersApi(businessId);
    },
    enabled: !!businessId && isAuthenticated && !isLoading,
    retry: 1,
    staleTime: 60 * 60 * 1000 * 10,
  });
};

//create business user
export const useCreateBusinessUser = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const businessId = user?.businessId;

  return useMutation<CreateBusinessUserResponse, Error, InviteUserForm>({
    mutationKey: ["createBusinessUser"],
    mutationFn: (formData) => {
      if (!businessId || authLoading || !isAuthenticated) {
        throw new Error("Authentication required to create user");
      }
      return createBusinessUserApi(formData, businessId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getbusinessUsers", businessId],
      });
    },
  });
};
