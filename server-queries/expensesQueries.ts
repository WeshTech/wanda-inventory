"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExpenseFormData } from "@/schemas/expenses/createExpenseSchema";
import {
  AllExpensesResponse,
  CreateExpenseResponse,
  ExpesnseSummaryResponse,
} from "@/types/expenses";
import { createBusinessExpenseApi } from "@/server/expenses/create-expense";
import { getBusinessExpensesApi } from "@/server/expenses/get-all-expenses";
import { getBusinessExpensesSummaryApi } from "@/server/expenses/get-expense-summary";

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

//get business Expenses
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

//get business expesnes summary
export const useBusinessExpensesSummaryQuery = (businessId: string) => {
  return useQuery<ExpesnseSummaryResponse, Error>({
    queryKey: ["getBusinessExpensesSummary", businessId],
    queryFn: async () => {
      if (!businessId) throw new Error("Business ID is required");
      return await getBusinessExpensesSummaryApi(businessId);
    },
    enabled: !!businessId,
  });
};
