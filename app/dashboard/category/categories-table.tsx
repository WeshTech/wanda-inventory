"use client";

import { useState, useCallback } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, Upload, Download, Search, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddCategoryDialog } from "./add-category-dialog";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import Loader from "@/components/ui/loading-spiner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { useStoreCategories } from "@/server-queries/storeCategoryQueries";
import type { GetCategoryData } from "@/types/storeCategory";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { toast } from "sonner";

const columns: ColumnDef<GetCategoryData>[] = [
  {
    accessorKey: "categoryId",
    header: "Category ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.categoryId.slice(-6)}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "storeName",
    header: "Store Name",
    cell: ({ row }) => <div>{row.getValue("storeName") ?? "Unassigned"}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled
                  className="h-8 w-8 disabled:cursor-not-allowed"
                  onClick={() =>
                    console.log(`Editing category: ${category.categoryId}`)
                  }
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Category</TooltipContent>
            </Tooltip>
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled
                      className="h-8 w-8 disabled:cursor-not-allowed text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>Delete Category</TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the category &quot;{category.name}&quot; and remove its data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      console.log(`Deleting category: ${category.categoryId}`)
                    }
                    className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TooltipProvider>
        </div>
      );
    },
  },
];

export function CategoriesTable() {
  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";
  const {
    data,
    isLoading: queryLoading,
    isFetching,
    error,
  } = useStoreCategories(businessId);

  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  const isLoading = isAuthLoading || queryLoading || isFetching;
  const allCategories = data?.data ?? [];

  const table = useReactTable({
    data: allCategories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  const handleExport = useCallback(() => {
    // Implement export logic
    toast.success("Feature under maintainance");
  }, []);

  const handleImport = useCallback(() => {
    // Implement import logic
    toast.success("Feature under maintainance");
  }, []);

  const handleClearSearch = useCallback(() => {
    setGlobalFilter("");
  }, []);

  return (
    <div className="grid gap-4 p-2">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, description or store..."
            className="w-full rounded-lg bg-background pl-10 pr-3 h-10"
            value={globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex-1 sm:flex-none min-w-[100px] bg-transparent dasabled:cursor-not-allowed"
            onClick={handleImport}
          >
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden lg:flex">Import</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex-1 sm:flex-none min-w-[100px] bg-transparent dasabled:cursor-not-allowed"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden lg:flex">Export</span>
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-none min-w-[120px]"
            onClick={() => setIsAddCategoryDialogOpen(true)}
            disabled={isLoading}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Add Category</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-x-auto max-w-[calc(100vw-2rem)] lg:max-w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                  <Loader text="Loading categories..." size="md" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-600"
                >
                  Error: {error.message || "Failed to fetch categories."}
                </TableCell>
              </TableRow>
            ) : allCategories.length === 0 ? (
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
                    <p className="text-lg font-medium">No categories found</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first category
                    </p>
                    <Button
                      onClick={() => setIsAddCategoryDialogOpen(true)}
                      disabled={isLoading}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Category
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
                    <TableCell key={cell.id}>
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
                      No categories match the applied filters
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

      <AddCategoryDialog
        open={isAddCategoryDialogOpen}
        onOpenChange={setIsAddCategoryDialogOpen}
      />
    </div>
  );
}
