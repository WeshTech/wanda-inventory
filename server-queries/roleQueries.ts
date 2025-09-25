import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateRoleInput } from "@/schemas/users/createRole.Schema";
import { CreateBusinessRoleResponse } from "@/types/roles";
import { createBusinessRoleApi } from "@/server/roles/create-role";

export const useCreateBusinessRole = (businessId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<CreateBusinessRoleResponse, Error, CreateRoleInput>({
    mutationFn: (formData: CreateRoleInput) =>
      createBusinessRoleApi({ ...formData, businessId: businessId! }),
    onSuccess: () => {
      if (businessId) {
        queryClient.invalidateQueries({ queryKey: ["roles", businessId] });
      }
    },
  });
};
