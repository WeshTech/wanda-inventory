"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ExpenseFormData } from "@/schemas/expenses/createExpenseSchema";
import {
  AllExpensesResponse,
  CreateExpenseResponse,
  DeleteExpenseResponse,
  ExpesnseSummaryResponse,
  UpdateExpenseResponse,
} from "@/types/expenses";
import { createBusinessExpenseApi } from "@/server/expenses/create-expense";
import { getBusinessExpensesApi } from "@/server/expenses/get-all-expenses";
import { getBusinessExpensesSummaryApi } from "@/server/expenses/get-expense-summary";
import { UpdateExpenseFormData } from "@/schemas/expenses/updateExpenseSchema";
import { updateBusinessExpenseApi } from "@/server/expenses/update-expense";
import { deleteBusinessExpenseApi } from "@/server/expenses/delete-espense";

type Variables = {
  formData: ExpenseFormData;
  businessId: string;
};

type updateVariables = {
  formData: UpdateExpenseFormData;
  businessId: string;
  expenseId: string;
};

export interface DeleteExpenseVariables {
  businessId: string;
  expenseId: string;
}

//create expense query
export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation<CreateExpenseResponse, Error, Variables>({
    mutationFn: ({ formData, businessId }) =>
      createBusinessExpenseApi(formData, businessId),
    onSuccess: (_data, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getBusinessExpenses", businessId],
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

//update expense query
export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation<UpdateExpenseResponse, Error, updateVariables>({
    mutationFn: ({ formData, businessId, expenseId }) =>
      updateBusinessExpenseApi(formData, businessId, expenseId),
    onSuccess: (_data, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getBusinessExpenses", businessId],
      });
    },
  });
}

export const useDeleteBusinessExpense = (): UseMutationResult<
  DeleteExpenseResponse,
  Error,
  DeleteExpenseVariables
> => {
  return useMutation<DeleteExpenseResponse, Error, DeleteExpenseVariables>({
    mutationFn: ({ businessId, expenseId }) =>
      deleteBusinessExpenseApi(businessId, expenseId),
  });
};
