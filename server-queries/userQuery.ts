import { InviteUserForm } from "@/schemas/users/inviteUserSchema";
import { UpdateUserForm } from "@/schemas/users/updateUserSchema";
import { blockBusinessUserApi } from "@/server/users/block-user";
import { createBusinessUserApi } from "@/server/users/create-user";
import { getAllBusinessUsersApi } from "@/server/users/get-all-users";
import { getBlockedBusinessUsersApi } from "@/server/users/get-blocked-users";
import { getInvitedBusinessUsersApi } from "@/server/users/get-invited-users";
import { unblockBusinessUserApi } from "@/server/users/unblock-user";
import { updateBusinessUserApi } from "@/server/users/update-user";
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
    queryKey: ["getbusinessusers", businessId],
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
    mutationKey: ["createBusinessUser", businessId],

    mutationFn: (formData) => {
      if (!businessId || authLoading || !isAuthenticated) {
        throw new Error("Authentication required to create user");
      }
      return createBusinessUserApi(formData, businessId);
    },

    onSuccess: async () => {
      if (!businessId) return;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getbusinessusers", businessId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getInvitedBusinessUsers", businessId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getBusinessStores", businessId],
        }),
      ]);
    },
  });
};

//update business user
export const useUpdateBusinessUser = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const businessId = user?.businessId;

  return useMutation({
    mutationFn: ({
      formData,
      userId,
    }: {
      formData: Partial<UpdateUserForm>;
      userId: string;
    }) => updateBusinessUserApi(formData, businessId!, userId),
    onSuccess: async () => {
      if (businessId) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getbusinessUsers", businessId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getbusinessStores", businessId],
          }),
        ]);
      }
    },
  });
};

//block business user
export const useBlockBusinessUser = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const businessId = user?.businessId;

  return useMutation({
    mutationKey: ["blockBusinessUser"],
    mutationFn: async (userId: string) => {
      if (!businessId) {
        throw new Error("Business ID is required");
      }
      return blockBusinessUserApi(businessId, userId);
    },
    onSuccess: async () => {
      if (businessId) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getbusinessUsers", businessId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getBlockedBusinessUsers", businessId],
          }),
        ]);
      }
    },
  });
};

//unblock business user
export const useUnblockBusinessUser = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const businessId = user?.businessId;

  return useMutation({
    mutationKey: ["unblockBusinessUser"],
    mutationFn: async (userId: string) => {
      if (!businessId) {
        throw new Error("Business ID is required");
      }
      return unblockBusinessUserApi(businessId, userId);
    },
    onSuccess: async () => {
      if (businessId) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getBlockedBusinessUsers", businessId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getbusinessUsers", businessId],
          }),
        ]);
      }
    },
  });
};

//get blocked users
export const useBlockedBusinessUsers = (businessId: string) => {
  return useQuery<BusinessUsersResponse, Error>({
    queryKey: ["getBlockedBusinessUsers", businessId],
    queryFn: () => getBlockedBusinessUsersApi(businessId),
    enabled: !!businessId,
    staleTime: 60 * 60 * 1000 * 10,
  });
};

//get invited users
export const useInvitedBusinessUsers = (businessId: string) => {
  return useQuery<BusinessUsersResponse, Error>({
    queryKey: ["getInvitedBusinessUsers", businessId],
    queryFn: () => getInvitedBusinessUsersApi(businessId),
    enabled: !!businessId,
    staleTime: 60 * 60 * 1000 * 10,
  });
};
