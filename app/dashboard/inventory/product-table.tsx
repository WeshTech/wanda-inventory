"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus, XCircle, ArrowUpDown } from "lucide-react";
import {
  type ColumnDef,
  type ColumnFilter,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ProductActionsCell } from "./product-action-cells";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useBusinessProducts } from "@/server-queries/inventoryQueries";
import type { BusinessProductStoreRow } from "@/types/inventory";
import Loader from "@/components/ui/loading-spiner";
import { useRouter } from "next/navigation";

// Define the ProductStatus type
export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

// Define the Product type
export type Product = {
  id: string;
  serialNumber: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: ProductStatus;
  image: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "InStock":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "lowStock":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "out of stock":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "";
  }
};

// Helper function to convert BusinessProductStoreRow to Product type
const mapBusinessProductToProduct = (
  businessProduct: BusinessProductStoreRow
): Product => {
  // Map status to match Product type's ProductStatus
  const mapStatus = (
    status: "InStock" | "lowStock" | "out of stock"
  ): ProductStatus => {
    switch (status) {
      case "InStock":
        return "In Stock";
      case "lowStock":
        return "Low Stock";
      case "out of stock":
        return "Out of Stock";
      default:
        return "In Stock";
    }
  };

  return {
    id: businessProduct.businessProductId,
    serialNumber: businessProduct.barcode || "",
    name: businessProduct.productName || "",
    category: businessProduct.categoryName || "",
    quantity: businessProduct.quantity,
    price: businessProduct.sellingPrice || 0,
    status: mapStatus(businessProduct.status),
    image: businessProduct.imageUrl || "",
  };
};

export default function ProductTable() {
  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";
  const { data, isLoading, error } = useBusinessProducts(businessId);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<
    "InStock" | "lowStock" | "out of stock" | "all"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");

  const products = useMemo(() => data?.data || [], [data]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(
      (product) => product.categoryName && categories.add(product.categoryName)
    );
    return Array.from(categories).sort();
  }, [products]);

  const columns: ColumnDef<BusinessProductStoreRow>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Image
            src={row.original.imageUrl || "/placeholder.svg"}
            width={48}
            height={48}
            alt={row.original.productName || "Product"}
            className="aspect-square rounded-md object-cover"
          />
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      minSize: 80,
    },
    {
      accessorKey: "barcode",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:bg-transparent p-0"
            >
              Product SN
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium text-center">
          {row.getValue("barcode") || "N/A"}
        </div>
      ),
      minSize: 120,
    },
    {
      accessorKey: "productName",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:bg-transparent p-0"
            >
              Product Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const productName = row.getValue("productName") as string;
        const truncatedName =
          productName.length > 20
            ? `${productName.substring(0, 20)}...`
            : productName;
        return <div className="text-center">{truncatedName}</div>;
      },
      minSize: 180,
    },
    {
      accessorKey: "categoryName",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:bg-transparent p-0"
            >
              Category
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("categoryName")}</div>
      ),
      minSize: 120,
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:bg-transparent p-0"
            >
              Quantity
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("quantity")}</div>
      ),
      minSize: 100,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:bg-transparent p-0"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Badge className={getStatusColor(row.original.status)}>
            {row.getValue("status")}
          </Badge>
        </div>
      ),
      minSize: 120,
    },
    {
      accessorKey: "sellingPrice",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="hover:bg-transparent p-0"
            >
              Price
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{`KES ${
          (row.getValue("sellingPrice") as number)?.toFixed(2) || "0.00"
        }`}</div>
      ),
      minSize: 120,
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      enableHiding: false,
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <ProductActionsCell
            product={mapBusinessProductToProduct(row.original)}
          />
        </div>
      ),
      minSize: 100,
    },
  ];

  const currentColumnFilters = useMemo(() => {
    const filters: ColumnFilter[] = [];
    if (statusFilter !== "all") {
      filters.push({ id: "status", value: statusFilter });
    }
    if (categoryFilter !== "all") {
      filters.push({ id: "categoryName", value: categoryFilter });
    }
    return filters;
  }, [statusFilter, categoryFilter]);

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      columnFilters: currentColumnFilters,
      sorting,
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
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-x-auto max-w-[calc(100vw-2rem)] lg:max-w-full">
      <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
        <Input
          placeholder="Search products..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm flex-1"
        />
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Select
            value={statusFilter}
            onValueChange={(
              value: "InStock" | "lowStock" | "out of stock" | "all"
            ) => {
              setStatusFilter(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="InStock">In Stock</SelectItem>
              <SelectItem value="lowStock">Low Stock</SelectItem>
              <SelectItem value="out of stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={categoryFilter}
            onValueChange={(value: string | "all") => {
              setCategoryFilter(value);
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

      <div className="overflow-x-auto">
        <div className="p-4 min-w-[1000px]">
          <Table className="w-full">
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
              {isLoading || isAuthLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex justify-center items-center">
                      <Loader text="Loading products..." size="md" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center text-red-600"
                  >
                    Error: {error.message || "Failed to fetch products."}
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
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
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-base">Create your first product</p>
                      <Button
                        onClick={() =>
                          router.push("/dashboard/inventory/products")
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Products
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
                        No products match the applied filters
                      </p>
                      <Button onClick={handleClearFilters} variant="outline">
                        <XCircle className="mr-2 h-4 w-4" />
                        Clear Filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="p-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
