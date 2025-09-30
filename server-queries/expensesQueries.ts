"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpenseFormData } from "@/schemas/expenses/createExpenseSchema";
import { CreateExpenseResponse } from "@/types/expenses";
import { createBusinessExpenseApi } from "@/server/expenses/create-expense";

type Variables = {
  formData: ExpenseFormData;
  businessId: string;
};

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation<CreateExpenseResponse, Error, Variables>({
    mutationFn: ({ formData, businessId }) =>
      createBusinessExpenseApi(formData, businessId),
    onSuccess: (_data, { businessId }) => {
      queryClient.invalidateQueries({ queryKey: ["expenses", businessId] });
    },
  });
}
