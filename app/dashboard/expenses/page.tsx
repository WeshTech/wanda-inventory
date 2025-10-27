"use client";

import { useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, MoreHorizontal, Plus, Edit, Trash2, X } from "lucide-react";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { AddExpenseDialog } from "./add-expenses-dialog";
import { UpdateExpenseDialog } from "./update-expense-dialog";
import { ExpenseCards } from "./expense-cards";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import Loader from "@/components/ui/loading-spiner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useBusinessExpensesQuery,
  useDeleteBusinessExpense,
} from "@/server-queries/expensesQueries";
import { AllExpenseResponseData } from "@/types/expenses";
import { formatToKenyanTime } from "@/utils/time-format";

export default function ExpensesPage() {
  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";

  const {
    data,
    isLoading: queryLoading,
    isFetching,
    error,
    refetch,
  } = useBusinessExpensesQuery(businessId ?? "");

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] =
    useState<AllExpenseResponseData | null>(null);

  const isLoading = isAuthLoading || queryLoading || isFetching || !businessId;

  //  mutation hook
  const { mutate: deleteExpense, isPending: isDeleting } =
    useDeleteBusinessExpense();

  const handleDeleteExpense = useCallback(
    (expenseId: string) => {
      const toastId = toast.loading("Deleting expense...");
      deleteExpense(
        { businessId, expenseId },
        {
          onSuccess: () => {
            toast.success("Expense deleted successfully!", { id: toastId });
            refetch(); // refresh table data
          },
          onError: (err) => {
            toast.error(err.message || "Failed to delete expense", {
              id: toastId,
            });
          },
        }
      );
    },
    [businessId, deleteExpense, refetch]
  );

  const formatCurrency = (amount: number) => {
    return `Kes ${amount.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const columns = useMemo<ColumnDef<AllExpenseResponseData>[]>(
    () => [
      {
        accessorKey: "expenseId",
        header: "Expense ID",
        cell: ({ row }) => {
          const expense = row.original;
          return (
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  expense.category === "recurrent"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              />
              <span className="font-medium">
                EXP{expense.expenseId.slice(-6)}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <div>{row.getValue("description") ?? "No description"}</div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          const category = (row.getValue("category") as string).toLowerCase();
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                category === "recurrent"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              }`}
            >
              {category}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
          const amount = row.getValue("amount") as number;
          return <span className="font-medium">{formatCurrency(amount)}</span>;
        },
      },
      {
        accessorKey: "expenseDate",
        header: "Expense Date",
        cell: ({ row }) => {
          const date = row.getValue("expenseDate") as string;
          return formatDate(date);
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string;
          return formatToKenyanTime(new Date(createdAt));
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const expense = row.original;
          return (
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      if (!expense.expenseId) {
                        console.error(
                          "No expenseId found for expense:",
                          expense
                        );
                        return;
                      }
                      setSelectedExpense(expense);
                      setIsUpdateDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update Expense
                  </DropdownMenuItem>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Expense
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the expense record and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteExpense(expense.expenseId)}
                    className="bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-950/80 border border-red-200 dark:border-red-800"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        },
      },
    ],
    [handleDeleteExpense, isDeleting]
  );

  const allExpenses = data?.data ?? [];

  const table = useReactTable({
    data: allExpenses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const expense = row.original;
      const searchValue = filterValue.toLowerCase();
      return (
        expense.purpose.toLowerCase().includes(searchValue) ||
        (expense.description?.toLowerCase().includes(searchValue) ?? false) ||
        (expense.expenseId?.toLowerCase().includes(searchValue) ?? false)
      );
    },
    state: {
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="grid gap-4 p-2">
      <h1 className="text-xl font-bold text-balance md:text-3xl lg:text-4xl">
        Expenses
      </h1>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="flex-1 sm:flex-none min-w-[120px]"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="sr-only sm:not-sr-only">Add Expense</span>
        </Button>
      </div>
      <ExpenseCards />
      <h4 className="text-lg font-semibold text-balance mt-2">
        Expenses records
      </h4>
      <div className="rounded-lg border shadow-sm overflow-x-auto max-w-[calc(100vw-2rem)] lg:max-w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <Loader text="loading expenses" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-600"
                >
                  Error: {error.message || "Failed to fetch expenses."}
                </TableCell>
              </TableRow>
            ) : allExpenses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/images/nostorefound.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium">No expenses found</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first expense
                    </p>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Expense
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/images/nostorefound.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <p className="text-base font-medium">
                      No expenses match the applied filters
                    </p>
                    <Button onClick={handleClearSearch} variant="outline">
                      <X className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <AddExpenseDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <UpdateExpenseDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        expense={selectedExpense}
      />
    </div>
  );
}
