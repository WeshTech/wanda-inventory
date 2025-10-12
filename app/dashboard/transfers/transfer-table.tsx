"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import Image from "next/image";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { TransferLineDto } from "@/types/transfers";
import { useAuthStore } from "@/stores/authStore";
import { useBusinessTransfers } from "@/server-queries/transferQueries";
import Loader from "@/components/ui/loading-spiner";

// Define the Transfer type to match TransferLineDto
export type Transfer = {
  productName: string;
  from: string;
  to: string;
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "APPROVED"
    | "COMPLETED"
    | "CANCELLED"
    | "REJECTED";
  createdBy: string | null;
  transferedAt: string;
};

// Status color mapping optimized for dark mode
const getStatusColor = (status: string) => {
  switch (status) {
    case "DRAFT":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-200 border-slate-200 dark:border-slate-700/50";
    case "SUBMITTED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border-blue-200 dark:border-blue-800/50";
    case "APPROVED":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border-green-200 dark:border-green-800/50";
    case "COMPLETED":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800/50";
    case "CANCELLED":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 border-orange-200 dark:border-orange-800/50";
    case "REJECTED":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border-red-200 dark:border-red-800/50";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-200 border-slate-200 dark:border-slate-700/50";
  }
};

// Format status to sentence case
const formatStatus = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Format date to Kenyan time (EAT)
const formatDateToKenyanTime = (dateString: string) => {
  const date = new Date(dateString);
  const kenyanTime = toZonedTime(date, "Africa/Nairobi");
  return format(kenyanTime, "dd MMM yyyy, HH:mm");
};

export const columns: ColumnDef<TransferLineDto>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Product Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className="font-medium text-foreground max-w-[200px] truncate"
        title={row.getValue("productName")}
      >
        {row.getValue("productName")}
      </div>
    ),
  },
  {
    accessorKey: "from",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        From
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("from")}
      </div>
    ),
  },
  {
    accessorKey: "to",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        To
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">{row.getValue("to")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Status
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="outline"
          className={`${getStatusColor(status)} font-medium text-xs`}
        >
          {formatStatus(status)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.getValue("createdBy") || "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "transferedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Transferred At
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground text-xs">
        {formatDateToKenyanTime(row.getValue("transferedAt"))}
      </div>
    ),
  },
];

export function TransfersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const businessId = user?.businessId ?? "";
  const { data: transfersData, isLoading: isTransfersLoading } =
    useBusinessTransfers(businessId);

  const isLoading = isAuthLoading || isTransfersLoading;
  const transfers = transfersData?.data ?? [];

  const table = useReactTable({
    data: transfers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    globalFilterFn: "includesString",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Loader text="Loading transfers" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transfers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] gap-4">
          <Image
            src="/images/nostorefound.jpg"
            alt="No transfers found"
            width={200}
            height={200}
            className="rounded-md"
          />
          <div className="text-muted-foreground text-center">
            No transfers found.
            <br />
            Create your first transfer
          </div>
          <Button
            variant="default"
            className="flex items-center gap-2"
            onClick={() => {
              // Add navigation or action to create a new transfer
              console.log("Navigate to create transfer");
            }}
          >
            <PlusCircle className="h-4 w-4" />
            Create Transfer
          </Button>
        </div>
      ) : (
        <>
          <div className="rounded-md border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-transparent border-b bg-muted/50"
                    >
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="font-semibold text-xs md:text-sm whitespace-nowrap"
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
                        className="hover:bg-muted/30 transition-colors border-b"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="py-3 px-2 md:px-4"
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
                        <div className="text-muted-foreground">
                          No transfers found.
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  );
}
