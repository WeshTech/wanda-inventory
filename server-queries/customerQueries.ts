import { useMutation } from "@tanstack/react-query";
import { CustomerFormData } from "@/schemas/customers/createCustomerSchema";
import { CreateCustomerResponse } from "@/types/customers";
import { createCustomerApi } from "@/server/customers/create-customer";

//create customer mutation
export function useCreateCustomer(businessId: string) {
  return useMutation<CreateCustomerResponse, Error, CustomerFormData>({
    mutationFn: (formData: CustomerFormData) =>
      createCustomerApi(formData, businessId),
  });
}
