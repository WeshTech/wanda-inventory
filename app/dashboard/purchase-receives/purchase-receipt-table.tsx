"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type Column,
  type Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, Eye, Edit, Trash2 } from "lucide-react";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { PurchaseReceiptData } from "@/types/purchasereceipts";
import { usePurchaseReceipts } from "@/server-queries/purchaseReceiptsQueries";
import { formatToKenyanTime } from "@/utils/time-format";
import Loader from "@/components/ui/loading-spiner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServerSidePagination } from "./pagination";

interface PurchaseReceiptsTableProps {
  onDeleteReceipt: (receiptId: string) => void;
}

const columnHelper = createColumnHelper<PurchaseReceiptData>();

export function PurchaseReceiptsTable({
  onDeleteReceipt,
}: PurchaseReceiptsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() || "";

  const {
    data: receiptsData,
    isLoading: isReceiptsLoading,
    error,
  } = usePurchaseReceipts(businessId, currentPage, pageSize);

  const columns = [
    columnHelper.accessor("receiptNumber", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Receipt No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => (
        <div className="text-center font-medium">
          {`PR-${new Date(row.original.dateCreated).getFullYear()}-${row
            .getValue<number>("receiptNumber")
            .toString()
            .padStart(3, "0")}`}
        </div>
      ),
    }),
    columnHelper.accessor("receiptName", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Receipt Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => (
        <div className="text-center">{row.getValue("receiptName")}</div>
      ),
    }),
    columnHelper.accessor("supplier", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => (
        <div className="text-center">{row.getValue("supplier")}</div>
      ),
    }),
    columnHelper.accessor("store", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Store
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => (
        <div className="text-center">{row.getValue("store")}</div>
      ),
    }),
    columnHelper.accessor("totalAmount", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => (
        <div className="text-center font-medium">
          KSh{" "}
          {row.getValue<number>("totalAmount").toLocaleString("en-KE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    }),
    columnHelper.accessor("status", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => {
        const status = row.getValue<string>("status");
        const badgeClasses =
          status === "RECEIVED"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : status === "REJECTED"
            ? "bg-red-100 text-red-800 hover:bg-red-200"
            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
        return (
          <div className="text-center">
            <Badge variant="default" className={badgeClasses}>
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </Badge>
          </div>
        );
      },
    }),
    columnHelper.accessor("dateCreated", {
      header: ({
        column,
      }: {
        column: Column<PurchaseReceiptData, unknown>;
      }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => (
        <div className="text-center">
          {formatToKenyanTime(new Date(row.getValue<string>("dateCreated")))}
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <div className="text-center font-semibold">Actions</div>,
      cell: ({ row }: { row: Row<PurchaseReceiptData> }) => {
        const receipt = row.original;
        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/dashboard/purchase-receives/${receipt.purchaseReceiptId}`
                    )
                  }
                  className="group hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400 cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4 group-hover:text-green-700 dark:group-hover:text-green-400" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/dashboard/purchase-receives/receipt/${receipt.purchaseReceiptId}`
                    )
                  }
                  className="group hover:bg-yellow-50 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400 cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4 group-hover:text-yellow-700 dark:group-hover:text-yellow-400" />
                  Update
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteReceipt(receipt.purchaseReceiptId)}
                  className="group hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4 group-hover:text-red-700 dark:group-hover:text-red-400" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    }),
  ];

  const receipts: PurchaseReceiptData[] = receiptsData?.data || [];

  const table = useReactTable({
    data: receipts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualPagination: true, // Enable server-side pagination
    pageCount: receiptsData?.pagination?.totalPages ?? 0,
  });

  if (isAuthLoading || isReceiptsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader text="loading purchase receipts" />
      </div>
    );
  }

  if (error || !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-64 space-y-3">
        <Avatar className="w-24 h-24 border-none rounded-none overflow-hidden">
          <AvatarImage
            src={error ? "/images/nostorefound.jpg" : undefined}
            alt="No Store Found"
            className={error ? "rounded-full object-cover" : "object-cover"}
          />
          <AvatarFallback className="rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm">
            NS
          </AvatarFallback>
        </Avatar>
        <p className="text-gray-600 text-sm">
          {error
            ? "Error loading purchase receipts"
            : "Please authenticate to view receipts"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
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
                    <TableCell key={cell.id} className="text-center">
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
                  No purchase receipts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ServerSidePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalPages={receiptsData?.pagination?.totalPages ?? 0}
        totalRecords={receiptsData?.pagination?.totalRecords ?? 0}
        onPageChange={setCurrentPage}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
