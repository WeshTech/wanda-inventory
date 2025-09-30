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

//single expense type
export type AllExpenseResponseData = {
  expenseId: string;
  purpose: string;
  description: string | null;
  category: string;
  amount: number;
  expenseDate: string;
  createdAt: string;
};

//create expense response
export type AllExpensesResponse = {
  success: boolean;
  message: string;
  data: AllExpenseResponseData[] | null;
};

//expense summary
export type ExpesnseSummaryData = {
  totalExpenses: number;
  totalRecurrentExpenditure: number;
  totalRandomExpenditure: number;
};

//expense summary response
export type ExpesnseSummaryResponse = {
  success: boolean;
  message: string;
  data: ExpesnseSummaryData | null;
};

//single expense type
export type UpdateExpenseResponseData = {
  expenseId: string;
  purpose: string;
  description: string | null;
  category: string;
  amount: number;
  dateCreated: Date;
};

//create expense response
export type UpdateExpenseResponse = {
  success: boolean;
  message: string;
  data: UpdateExpenseResponseData | null;
};
