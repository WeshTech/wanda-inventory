"use client";

import { useState, useMemo } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel, // Import getFilteredRowModel
  type VisibilityState,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Search } from "lucide-react"; // Import Search icon

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import Image from "next/image";
import type { Sale } from "./sales-dashboard";
import { DataTablePagination } from "@/components/dashboard/TablePagination";

interface SalesTableProps {
  sales: Sale[];
  onDeleteSale: (saleId: string) => void;
  onEditSale: (saleId: string) => void;
}

export function SalesTable({
  sales,
  onDeleteSale,
  onEditSale,
}: SalesTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState(""); // State for the search input

  const columns: ColumnDef<Sale>[] = useMemo(
    () => [
      {
        accessorKey: "productImage",
        header: "Image",
        cell: ({ row }) => (
          <Image
            src={row.original.productImage || "/placeholder.svg"}
            alt={row.original.productName}
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "productSN",
        header: "Product SN",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.productSN}</div>
        ),
        filterFn: "includesString", // Enable filtering for this column
      },
      {
        accessorKey: "productName",
        header: "Product Name",
        cell: ({ row }) => <div>{row.original.productName}</div>,
        filterFn: "includesString", // Enable filtering for this column
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <div>{row.original.category}</div>,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        cell: ({ row }) => (
          <div className="text-right">{row.original.quantity}</div>
        ),
      },
      {
        accessorKey: "totalPrice",
        header: "Total Price",
        cell: ({ row }) => (
          <div className="text-right">
            ${row.original.totalPrice.toFixed(2)}
          </div>
        ),
      },
      {
        accessorKey: "paymentMethod",
        header: "Payment",
        cell: ({ row }) => {
          const payment = row.original.paymentMethod;
          let bgColorClass = "";
          let textColorClass = "";
          switch (payment) {
            case "mpesa":
              bgColorClass = "bg-green-100";
              textColorClass = "text-green-800";
              break;
            case "mastercard":
              bgColorClass = "bg-yellow-100";
              textColorClass = "text-yellow-800";
              break;
            case "cash":
              bgColorClass = "bg-blue-100";
              textColorClass = "text-blue-800";
              break;
            default:
              bgColorClass = "bg-gray-100";
              textColorClass = "text-gray-800";
          }
          return (
            <div
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${bgColorClass} ${textColorClass}`}
            >
              {payment}
            </div>
          );
        },
      },
      {
        accessorKey: "soldBy",
        header: "Sold By",
        cell: ({ row }) => <div>{row.original.soldBy}</div>,
      },
      {
        accessorKey: "soldAt",
        header: "Sold At",
        cell: ({ row }) => (
          <div>{format(row.original.soldAt, "MMM dd, yyyy HH:mm")}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const sale = row.original;
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
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEditSale(sale.id)}>
                    Edit Sale
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                      Delete Sale
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the sale record.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteSale(sale.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        },
      },
    ],
    [onDeleteSale, onEditSale]
  );

  const table = useReactTable({
    data: sales,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Enable global filtering
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
      globalFilter: globalFilter, // Pass the global filter state
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    onGlobalFilterChange: setGlobalFilter, // Update global filter state
  });

  return (
    <div className="flex flex-col">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search with serial number or product name"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-9 pr-4 py-2 rounded-md w-full"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-white dark:bg-gray-900 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-primary/10 transition-colors"
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
    </div>
  );
}
