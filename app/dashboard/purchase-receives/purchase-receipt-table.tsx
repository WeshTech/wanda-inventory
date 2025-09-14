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
import { DataTablePagination } from "@/components/dashboard/TablePagination";

type Receipt = {
  id: string;
  receiptNo: string;
  receiptName: string;
  supplier: string;
  store: string;
  totalAmount: number;
  status: "received" | "pending";
  date: string;
};

interface PurchaseReceiptsTableProps {
  receipts: Receipt[];
  onDeleteReceipt: (receiptId: string) => void;
}

const columnHelper = createColumnHelper<Receipt>();

export function PurchaseReceiptsTable({
  receipts,
  onDeleteReceipt,
}: PurchaseReceiptsTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = [
    columnHelper.accessor("receiptNo", {
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Receipt No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => (
        <div className="text-center font-medium">
          {row.getValue("receiptNo")}
        </div>
      ),
    }),
    columnHelper.accessor("receiptName", {
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Receipt Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => (
        <div className="text-center">{row.getValue("receiptName")}</div>
      ),
    }),
    columnHelper.accessor("supplier", {
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Supplier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => (
        <div className="text-center">{row.getValue("supplier")}</div>
      ),
    }),
    columnHelper.accessor("store", {
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Store
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => (
        <div className="text-center">{row.getValue("store")}</div>
      ),
    }),
    columnHelper.accessor("totalAmount", {
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => (
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
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => {
        const status = row.getValue<"received" | "pending">("status");
        return (
          <div className="text-center">
            <Badge
              variant={status === "received" ? "default" : "secondary"}
              className={
                status === "received"
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        );
      },
    }),
    columnHelper.accessor("date", {
      header: ({ column }: { column: Column<Receipt, unknown> }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-semibold text-center justify-center w-full"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: Row<Receipt> }) => (
        <div className="text-center">
          {new Date(row.getValue<string>("date")).toLocaleDateString("en-KE")}
        </div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <div className="text-center font-semibold">Actions</div>,
      cell: ({ row }: { row: Row<Receipt> }) => {
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
                {/* View */}
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/dashboard/purchase-receives/${receipt.receiptNo}`
                    )
                  }
                  className="group hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400 cursor-pointer"
                >
                  <Eye className="mr-2 h-4 w-4 group-hover:text-green-700 dark:group-hover:text-green-400" />
                  View Details
                </DropdownMenuItem>

                {/* Update */}
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/dashboard/purchase-receives/receipt/${receipt.receiptNo}`
                    )
                  }
                  className="group hover:bg-yellow-50 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400 cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4 group-hover:text-yellow-700 dark:group-hover:text-yellow-400" />
                  Update
                </DropdownMenuItem>

                {/* Delete */}
                <DropdownMenuItem
                  onClick={() => onDeleteReceipt(receipt.id)}
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

  const table = useReactTable({
    data: receipts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

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

      <DataTablePagination table={table} />
    </div>
  );
}
