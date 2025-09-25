import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateRoleInput } from "@/schemas/users/createRole.Schema";
import { createBusinessRoleApi } from "@/server/roles/create-role";
import { getBusinessRoles } from "@/server/roles/get-all-roes";
import {
  BusinessRolesResponse,
  CreateBusinessRoleResponse,
} from "@/types/roles";

export const useCreateBusinessRole = (businessId?: string) => {
  const queryClient = useQueryClient();

  //mutation to create business role
  return useMutation<CreateBusinessRoleResponse, Error, CreateRoleInput>({
    mutationFn: (formData: CreateRoleInput) =>
      createBusinessRoleApi({ ...formData, businessId: businessId! }),
    onSuccess: () => {
      if (businessId) {
        queryClient.invalidateQueries({
          queryKey: ["getBusinessRoles", businessId],
        });
      }
    },
  });
};

//query to get all business roles
export const useGetBusinessRoles = (businessId?: string) => {
  return useQuery<BusinessRolesResponse, Error>({
    queryKey: ["getBusinessRoles", businessId],
    queryFn: getBusinessRoles,
    enabled: !!businessId,
    staleTime: 1000 * 60 * 5,
  });
};
