"use client";

import { useState, useMemo } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "@/components/ui/alert-dialog";
import { Search, MoreHorizontal, Plus, Edit, Trash2 } from "lucide-react";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { AddExpenseDialog } from "./add-expenses-dialog";
import { ExpenseCards } from "./expense-cards";

type Expense = {
  id: string;
  purpose: string;
  description: string;
  category: "recurrent" | "random";
  amount: number;
  date: string;
  createdBy: string;
  createdAt: string;
};

// Mock data for expenses
const mockExpenses: Expense[] = [
  {
    id: "EXP001",
    purpose: "Office Rent",
    description: "Monthly office space rental",
    category: "recurrent",
    amount: 2500.0,
    date: "2024-01-01",
    createdBy: "John Doe",
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "EXP002",
    purpose: "Marketing Campaign",
    description: "Social media advertising spend",
    category: "random",
    amount: 850.0,
    date: "2024-01-15",
    createdBy: "Jane Smith",
    createdAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "EXP003",
    purpose: "Utilities",
    description: "Electricity and internet bills",
    category: "recurrent",
    amount: 450.0,
    date: "2024-01-05",
    createdBy: "Mike Johnson",
    createdAt: "2024-01-05T09:15:00Z",
  },
  {
    id: "EXP004",
    purpose: "Equipment Purchase",
    description: "New laptop for development team",
    category: "random",
    amount: 1200.0,
    date: "2024-01-20",
    createdBy: "Sarah Wilson",
    createdAt: "2024-01-20T16:45:00Z",
  },
  {
    id: "EXP005",
    purpose: "Software Licenses",
    description: "Annual software subscription renewals",
    category: "recurrent",
    amount: 1800.0,
    date: "2024-01-25",
    createdBy: "Alex Brown",
    createdAt: "2024-01-25T11:30:00Z",
  },
  {
    id: "EXP006",
    purpose: "Team Building Event",
    description: "Quarterly team outing and activities",
    category: "random",
    amount: 650.0,
    date: "2024-01-28",
    createdBy: "Lisa Davis",
    createdAt: "2024-01-28T15:20:00Z",
  },
  {
    id: "EXP007",
    purpose: "Insurance Premium",
    description: "Monthly business insurance payment",
    category: "recurrent",
    amount: 320.0,
    date: "2024-02-01",
    createdBy: "Tom Wilson",
    createdAt: "2024-02-01T08:45:00Z",
  },
  {
    id: "EXP008",
    purpose: "Emergency Repairs",
    description: "HVAC system maintenance and repair",
    category: "random",
    amount: 890.0,
    date: "2024-02-05",
    createdBy: "Emma Johnson",
    createdAt: "2024-02-05T13:15:00Z",
  },
];

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState<string | null>(null);

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

  const handleDeleteExpense = (expenseId: string) => {
    setDeleteExpenseId(expenseId);
  };

  const confirmDelete = () => {
    console.log("Deleting expense:", deleteExpenseId);
    setDeleteExpenseId(null);
  };

  const columns = useMemo<ColumnDef<Expense>[]>(
    () => [
      {
        accessorKey: "id",
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
              <span className="font-medium">{expense.id}</span>
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
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          const category = row.getValue("category") as string;
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
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          const date = row.getValue("date") as string;
          return formatDate(date);
        },
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
          const createdAt = row.getValue("createdAt") as string;
          return formatDate(createdAt);
        },
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const expense = row.original;
          return (
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Update Expense
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Expense
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [] // Removed formatCurrency and formatDate from dependencies
  );

  const table = useReactTable({
    data: mockExpenses,
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
        expense.description.toLowerCase().includes(searchValue) ||
        expense.id.toLowerCase().includes(searchValue)
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
    <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-balance">Expenses</h1>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <ExpenseCards />

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Expense Records</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => {
                    return (
                      <TableRow
                        key={row.id}
                        className={`${
                          index % 2 === 0
                            ? "bg-background hover:bg-muted/50"
                            : "bg-muted/20 hover:bg-muted/40"
                        }`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="whitespace-nowrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination table={table} />
        </CardContent>
      </Card>

      {/* Add Expense Dialog */}
      <AddExpenseDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteExpenseId}
        onOpenChange={() => setDeleteExpenseId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              expense record and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-950/80 border border-red-200 dark:border-red-800"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
