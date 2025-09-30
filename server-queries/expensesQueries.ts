"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExpenseFormData } from "@/schemas/expenses/createExpenseSchema";
import { AllExpensesResponse, CreateExpenseResponse } from "@/types/expenses";
import { createBusinessExpenseApi } from "@/server/expenses/create-expense";
import { getBusinessExpensesApi } from "@/server/expenses/get-all-expenses";

type Variables = {
  formData: ExpenseFormData;
  businessId: string;
};

export function useCreateExpense() {
  const queryClient = useQueryClient();

  //create expense query
  return useMutation<CreateExpenseResponse, Error, Variables>({
    mutationFn: ({ formData, businessId }) =>
      createBusinessExpenseApi(formData, businessId),
    onSuccess: (_data, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getbusinessExpenses", businessId],
      });
    },
  });
}

//get business queries
export const useBusinessExpensesQuery = (businessId: string) => {
  return useQuery<AllExpensesResponse, Error>({
    queryKey: ["getBusinessExpenses", businessId],
    queryFn: async () => {
      if (!businessId) throw new Error("Business ID is required");
      return await getBusinessExpensesApi(businessId);
    },
    enabled: !!businessId,
  });
};
