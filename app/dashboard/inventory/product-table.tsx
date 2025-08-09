"use client"; // This component needs client-side interactivity for react-table, search, and filters

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Product, ProductStatus } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // Import Input for search bar
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select for filters
import { XCircle } from "lucide-react"; // Icon for clearing filters
import { Button } from "@/components/ui/button"; // For clear filter button

// Import react-table hooks and types
import {
  type ColumnDef,
  type ColumnFilter, // Import ColumnFilter type
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel, // Import for filtering
  useReactTable,
} from "@tanstack/react-table";
import { ProductActionsCell } from "./product-action-cells";
import { DataTablePagination } from "@/components/dashboard/TablePagination";

// Import the new pagination component
// Import the new ProductActionsCell component

interface ProductTableProps {
  products: Product[];
}

// Helper function to determine the status badge color
const getStatusColor = (status: ProductStatus) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Out of Stock":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "";
  }
};

export default function ProductTable({ products }: ProductTableProps) {
  const [globalFilter, setGlobalFilter] = useState(""); // State for global search
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">(
    "all"
  ); // State for status filter
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all"); // State for category filter

  // Dynamically get unique categories from products for the filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach((product) => categories.add(product.category));
    return Array.from(categories).sort();
  }, [products]);

  // Define columns for the product table using ColumnDef from react-table
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image || "/placeholder.svg"}
          width={48}
          height={48}
          alt={row.original.name}
          className="aspect-square rounded-md object-cover"
        />
      ),
      enableSorting: false, // Disable sorting for image column
      enableColumnFilter: false, // Disable filtering for image column
    },
    {
      accessorKey: "serialNumber",
      header: "Product SN",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("serialNumber")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={getStatusColor(row.original.status)}>
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${(row.getValue("price") as number).toFixed(2)}`,
    },
    {
      id: "actions",
      enableHiding: false,
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => <ProductActionsCell product={row.original} />,
    },
  ];

  // Construct column filters explicitly to avoid `as any`
  const currentColumnFilters: ColumnFilter[] = [];
  if (statusFilter !== "all") {
    currentColumnFilters.push({ id: "status", value: statusFilter });
  }
  if (categoryFilter !== "all") {
    currentColumnFilters.push({ id: "category", value: categoryFilter });
  }

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Enable filtering
    onGlobalFilterChange: setGlobalFilter, // Update global filter state
    onColumnFiltersChange: (updater) => {
      // This updater can be a function or a direct value
      if (typeof updater === "function") {
        const newFilters = updater(table.getState().columnFilters);
        const newStatusFilter =
          newFilters.find((f) => f.id === "status")?.value || "all";
        const newCategoryFilter =
          newFilters.find((f) => f.id === "category")?.value || "all";
        setStatusFilter(newStatusFilter as ProductStatus | "all");
        setCategoryFilter(newCategoryFilter as string | "all");
      } else {
        const newStatusFilter =
          updater.find((f) => f.id === "status")?.value || "all";
        const newCategoryFilter =
          updater.find((f) => f.id === "category")?.value || "all";
        setStatusFilter(newStatusFilter as ProductStatus | "all");
        setCategoryFilter(newCategoryFilter as string | "all");
      }
    },
    state: {
      globalFilter,
      columnFilters: currentColumnFilters, // Use the explicitly constructed array
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleClearFilters = () => {
    setGlobalFilter("");
    setStatusFilter("all");
    setCategoryFilter("all");
    table.resetColumnFilters(); // Reset column filters in react-table state
    table.setGlobalFilter(""); // Reset global filter in react-table state
  };

  return (
    <div className="border rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        {/* Search Input */}
        <Input
          placeholder="Search products..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm flex-1"
        />

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value: ProductStatus | "all") => {
              setStatusFilter(value);
              table
                .getColumn("status")
                ?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select
            value={categoryFilter}
            onValueChange={(value: string | "all") => {
              setCategoryFilter(value);
              table
                .getColumn("category")
                ?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {(globalFilter ||
            statusFilter !== "all" ||
            categoryFilter !== "all") && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="h-8 px-2 lg:px-3"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto p-4 max-w-[90vw]">
        <Table>
          <TableHeader>
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

      <div className="p-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
