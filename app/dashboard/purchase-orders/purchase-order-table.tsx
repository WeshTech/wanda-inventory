"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender, // Fixed: Import flexRender from @tanstack/react-table instead of @/components/ui/table
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
  TableRow, // Removed flexRender from this import
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown, X, Trash2, Search, Eye, PenLine } from "lucide-react";
import Link from "next/link";
import type { PurchaseOrderResponseItem } from "@/types/purchaseorder";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useGetPurchaseOrders } from "@/server-queries/purchaseorderQueries";
import Loader from "@/components/ui/loading-spiner";
import { DataTablePagination } from "@/components/dashboard/TablePagination";

interface PurchaseOrdersTableProps {
  onDelete: (order: PurchaseOrderResponseItem) => void;
}

const columnHelper = createColumnHelper<PurchaseOrderResponseItem>();

const statusColors = {
  DRAFT: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  SUBMITTED:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  APPROVED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  RECEIVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  PARTIAL:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  CANCELLED: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
  CLOSED: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
};

export function PurchaseOrdersTable({ onDelete }: PurchaseOrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";

  const {
    data: purchaseOrdersResponse,
    isLoading: isQueryLoading,
    isError,
  } = useGetPurchaseOrders(businessId);

  const data = useMemo(
    () => purchaseOrdersResponse?.data || [],
    [purchaseOrdersResponse]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("purchaseOrderId", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Purchase Order ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const id: string = row.getValue("purchaseOrderId");
          const shortId = id
            ? `PO-${id.slice(-6).toUpperCase()}`
            : "PO-UNKNOWN";
          return <div className="font-medium">{shortId}</div>;
        },
      }),

      columnHelper.accessor("supplierName", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Supplier
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate">
            {row.getValue("supplierName") || "N/A"}
          </div>
        ),
      }),
      columnHelper.accessor("storeName", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Store
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="max-w-[150px] truncate">
            {row.getValue("storeName") || "N/A"}
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as keyof typeof statusColors;
          return (
            <Badge className={`${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      }),
      columnHelper.accessor("productCount", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Products
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("productCount")}</div>
        ),
      }),
      columnHelper.accessor("dateCreated", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            {new Date(row.getValue("dateCreated")).toLocaleString("en-KE", {
              timeZone: "Africa/Nairobi",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        ),
      }),
      columnHelper.accessor("createdBy", {
        header: ({ column }) => (
          <div
            className="h-auto p-0 font-semibold flex items-center justify-center cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created By
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="max-w-[150px] truncate">
            {row.getValue("createdBy")}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="font-semibold">Actions</div>,
        cell: ({ row }) => {
          const order = row.original;
          return (
            <TooltipProvider>
              <div className="flex items-center justify-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link
                        href={`/dashboard/purchase-orders/${order.purchaseOrderId}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Details</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <Link
                        href={`/dashboard/purchase-orders/po/${order.purchaseOrderId}`}
                      >
                        <PenLine className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Update Details</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-200 dark:hover:bg-red-900/30"
                      onClick={() => onDelete(order)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
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

  const { uniqueStatuses, uniqueStores, uniqueSuppliers } = useMemo(
    () => ({
      uniqueStatuses: Array.from(new Set(data.map((item) => item.status))),
      uniqueStores: Array.from(new Set(data.map((item) => item.storeName))),
      uniqueSuppliers: Array.from(
        new Set(data.map((item) => item.supplierName))
      ),
    }),
    [data]
  );

  const hasActiveFilters =
    columnFilters.length > 0 || (globalFilter && globalFilter.length > 0);

  const clearAllFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
  };

  if (isAuthLoading || isQueryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader text="extracting purchase orders" />
      </div>
    );
  }

  if (isError || !purchaseOrdersResponse?.success || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src="/images/nostorefound.jpg"
            alt="No purchase orders"
          />
          <AvatarFallback>PO</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground">No purchase orders found</p>
        <Button asChild>
          <Link href="/dashboard/purchase-orders/new">
            Generate Purchase Order
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:items-center">
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
            value={
              (table.getColumn("storeName")?.getFilterValue() as string) ?? ""
            }
            onValueChange={(value) =>
              table
                .getColumn("storeName")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Store" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stores</SelectItem>
              {uniqueStores.map((store) => (
                <SelectItem key={store || "N/A"} value={store || "N/A"}>
                  {store || "N/A"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={
              (table.getColumn("supplierName")?.getFilterValue() as string) ??
              ""
            }
            onValueChange={(value) =>
              table
                .getColumn("supplierName")
                ?.setFilterValue(value === "all" ? "" : value)
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Supplier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suppliers</SelectItem>
              {uniqueSuppliers.map((supplier) => (
                <SelectItem key={supplier || "N/A"} value={supplier || "N/A"}>
                  {supplier || "N/A"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="gap-2 bg-transparent"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto max-w-screen">
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
                    className="h-96 text-center"
                  >
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Avatar className="h-24 w-24 border-2 border-muted">
                        <AvatarImage
                          src="/images/nostorefound.jpg"
                          alt="No purchase orders"
                        />
                        <AvatarFallback className="text-lg">PO</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-base font-medium text-muted-foreground">
                          No purchase order matches your criteria
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
