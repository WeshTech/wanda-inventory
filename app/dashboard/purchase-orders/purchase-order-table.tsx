"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, MoreHorizontal, Trash2, Search, Eye } from "lucide-react";
import { PurchaseOrder } from "./page";
import { DataTablePagination } from "./data-table-pagination";
import Link from "next/link";

interface PurchaseOrdersTableProps {
  data: PurchaseOrder[];
  onDelete: (order: PurchaseOrder) => void;
  onUpdateStatus: (order: PurchaseOrder, newStatus: string) => void;
}

const columnHelper = createColumnHelper<PurchaseOrder>();

const statusColors = {
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  approved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  shipped:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  delivered:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function PurchaseOrdersTable({
  data,
  onDelete,
}: PurchaseOrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Purchase Order ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">{row.getValue("id")}</div>
        ),
      }),
      columnHelper.accessor("supplier", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Supplier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center max-w-[200px] truncate">
            {row.getValue("supplier")}
          </div>
        ),
      }),
      columnHelper.accessor("store", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Store
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center max-w-[150px] truncate">
            {row.getValue("store")}
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as keyof typeof statusColors;
          return (
            <Badge className={`text-center ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("dateCreated", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center whitespace-nowrap">
            {new Date(row.getValue("dateCreated")).toLocaleDateString()}
          </div>
        ),
      }),
      columnHelper.accessor("products", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Products
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">
            {row.getValue("products")}
          </div>
        ),
      }),
      columnHelper.accessor("dateExpected", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Expected
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center whitespace-nowrap">
            {new Date(row.getValue("dateExpected")).toLocaleDateString()}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="font-semibold">Actions</div>,
        cell: ({ row }) => {
          const order = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/purchase-orders/${order.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(order)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      }),
    ],
    [onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  // Get unique values for filters
  const uniqueStatuses = Array.from(new Set(data.map((item) => item.status)));
  const uniqueStores = Array.from(new Set(data.map((item) => item.store)));
  const uniqueSuppliers = Array.from(
    new Set(data.map((item) => item.supplier))
  );

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search purchase orders..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(String(event.target.value))}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <Select
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {uniqueStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={(table.getColumn("store")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) =>
              table
                .getColumn("store")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {uniqueStores.map((store) => (
                <SelectItem key={store} value={store}>
                  {store}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={
              (table.getColumn("supplier")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table
                .getColumn("supplier")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              {uniqueSuppliers.map((supplier) => (
                <SelectItem key={supplier} value={supplier}>
                  {supplier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-center whitespace-nowrap"
                    >
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center whitespace-nowrap"
                      >
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
