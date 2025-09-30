//single expense type
export type ExpenseResponseData = {
  expenseId: string;
  purpose: string;
  description: string | null;
  category: string;
  amount: number;
  dateCreated: Date;
};

//create expense response
export type CreateExpenseResponse = {
  success: boolean;
  message: string;
  data: ExpenseResponseData | null;
};
