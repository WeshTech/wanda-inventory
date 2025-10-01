import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CustomerFormData } from "@/schemas/customers/createCustomerSchema";
import {
  CreateCustomerResponse,
  GetBusinessCustomersResponse,
} from "@/types/customers";
import { createCustomerApi } from "@/server/customers/create-customer";
import { getBusinessCustomerssApi } from "@/server/customers/get-customers";

// create customer mutation
export function useCreateCustomer(businessId: string) {
  const queryClient = useQueryClient();

  return useMutation<CreateCustomerResponse, Error, CustomerFormData>({
    mutationFn: (formData: CustomerFormData) =>
      createCustomerApi(formData, businessId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getBusinessCustomers", businessId],
      });
    },
  });
}

// get customer queries
export function useGetBusinessCustomers(businessId: string) {
  return useQuery<GetBusinessCustomersResponse, Error>({
    queryKey: ["getBusinessCustomers", businessId],
    queryFn: () => getBusinessCustomerssApi(businessId),
    enabled: !!businessId,
    staleTime: 1000 * 60 * 60 * 10,
  });
}
