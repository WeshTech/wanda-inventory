"use client";

import { useState, useMemo } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { DataTablePagination } from "./data-table-pagination"; // Import the pagination component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  image: string;
  serialNumber: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface ProductTableProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddToCart: (product: Product) => void;
  availableStock: { [key: string]: number };
}

export function ProductTable({
  products,
  searchTerm,
  onSearchChange,
  onAddToCart,
  availableStock,
}: ProductTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
          <Image
            src={row.original.image || "/placeholder.svg"}
            alt={row.original.name}
            width={48}
            height={48}
            className="rounded-md object-cover"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "serialNumber",
        header: "Product SN",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.serialNumber}</div>
        ),
      },
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => <div>{row.original.name}</div>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div className="hidden md:table-cell">{row.original.category}</div>
        ),
      },
      {
        accessorKey: "stock",
        header: "Qty",
        cell: ({ row }) => (
          <div className="text-right">{availableStock[row.original.id]}</div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <div className="text-right">${row.original.price.toFixed(2)}</div>
        ),
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <div className="text-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onAddToCart(row.original)}
              disabled={availableStock[row.original.id] <= 0}
            >
              Add to Cart
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onAddToCart, availableStock]
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0, // Start at first page
        pageSize: 10, // Default to 10 items per page
      },
    },
  });

  return (
    <div className="h-full flex flex-col">
      <div className="relative mb-4 flex gap-2">
        <div className="flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by serial NO or product name"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-md w-full"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="books">Books</SelectItem>
            <SelectItem value="home">Home & Garden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 overflow-auto border rounded-lg">
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
                  className="hover:bg-primary/10 transition-colors" // Added hover color
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
      <DataTablePagination table={table} />{" "}
      {/* Add the pagination component here */}
    </div>
  );
}
