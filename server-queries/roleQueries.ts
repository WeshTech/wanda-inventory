import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CreateRoleInput } from "@/schemas/users/createRole.Schema";
import { createBusinessRoleApi } from "@/server/roles/create-role";
import { getBusinessRoles } from "@/server/roles/get-all-roes";
import {
  BusinessRolesResponse,
  CreateBusinessRoleResponse,
  SingleRoleResponse,
  UpdateBusinessRoleResponse,
} from "@/types/roles";
import { getBusinessRoleApi } from "@/server/roles/get-role-by-id";
import { updateBusinessRoleApi } from "@/server/roles/update-role";

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
export const useGetBusinessRoles = (businessId: string) => {
  return useQuery<BusinessRolesResponse, Error>({
    queryKey: ["getBusinessRoles", businessId],
    queryFn: () => getBusinessRoles(businessId),
    enabled: !!businessId,
    staleTime: 60 * 60 * 1000 * 10,
  });
};

//get a singe role by id
export const useGetBusinessRole = (roleId: string) => {
  return useQuery<SingleRoleResponse, Error>({
    queryKey: ["getRoleById", roleId],
    queryFn: () => getBusinessRoleApi(roleId),
    enabled: !!roleId,
    staleTime: 60 * 60 * 1000 * 10,
  });
};

//update role
export const useUpdateBusinessRole = (
  businessId?: string,
  options?: UseMutationOptions<
    UpdateBusinessRoleResponse,
    Error,
    { formData: CreateRoleInput & { businessId: string }; roleId: string }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateBusinessRoleResponse,
    Error,
    { formData: CreateRoleInput & { businessId: string }; roleId: string }
  >({
    mutationFn: ({ formData, roleId }) =>
      updateBusinessRoleApi(formData, roleId),
    onSuccess: (data, variables) => {
      if (businessId) {
        queryClient.invalidateQueries({
          queryKey: ["getBusinessRoles", businessId],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["getRoleById", variables.roleId],
      });
    },
    ...options,
  });
};
