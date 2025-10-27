"use client";

import { useState, useMemo, useEffect } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type VisibilityState,
  type PaginationState,
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
import { DataTablePagination } from "./data-table-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthUser,
} from "@/stores/authStore";
import { useStoreSalesProducts } from "@/server-queries/salesQueries";
import { useSearchStoreSalesProducts } from "@/server-queries/salesQueries";
import { SearchStoreSaleProduct, StoreSaleProduct } from "@/types/sales";
import Loader from "@/components/ui/loading-spiner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { StoreInfo } from "@/types/stores";

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
  onAddToCart: (product: Product) => void;
  selectedStoreId: string;
  setSelectedStoreId: (id: string) => void;
  stores: StoreInfo[];
  storesLoading: boolean;
}

export function ProductTable({
  onAddToCart,
  selectedStoreId,
  setSelectedStoreId,
  stores,
  storesLoading,
}: ProductTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Pagination state
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Get auth data
  const authLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const businessId = useAuthBusinessId();
  const user = useAuthUser();
  const userId = user?.userId ?? "";

  // Debounce the search term (500ms)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Ensure page and pageSize are valid positive integers
  const page = Math.max(1, Math.floor(Number(pageIndex) + 1));
  const limit = Math.max(1, Math.floor(Number(pageSize)));

  // Debug logging
  useEffect(() => {
    console.log("Pagination values:", {
      page,
      limit,
      businessId,
      selectedStoreId,
      userId,
    });
  }, [page, limit, businessId, selectedStoreId, userId]);

  // Fetch ALL products for the selected store (server-side pagination)
  const selectedStore =
    selectedStoreId && selectedStoreId !== "all"
      ? selectedStoreId
      : stores[0]?.storeId ?? "";
  const { data: productsData, isLoading: productsLoading } =
    useStoreSalesProducts(businessId ?? "", selectedStore, userId, page, limit);

  // Fetch SEARCHED products
  const { data: searchProductsData, isLoading: searchLoading } =
    useSearchStoreSalesProducts(
      businessId ?? "",
      selectedStore,
      userId,
      debouncedSearchTerm
    );

  // Transform ALL products data
  const allProducts: Product[] = useMemo(() => {
    if (
      authLoading ||
      storesLoading ||
      productsLoading ||
      !isAuthenticated ||
      !productsData?.success
    )
      return [];

    const rawProducts: StoreSaleProduct[] = productsData.data ?? [];

    // Transform to Product format
    const productMap = new Map<string, Product>();
    rawProducts.forEach((p) => {
      const id = p.productCode ?? "";
      if (productMap.has(id)) {
        const existing = productMap.get(id)!;
        existing.stock += p.quantity;
      } else {
        productMap.set(id, {
          id: p.productId,
          image: p.imgUrl ?? "/images/noimagefound.jpg",
          serialNumber: p.productCode ?? "",
          name: p.productName ?? "",
          category: p.category ?? "",
          stock: p.quantity,
          price: p.price,
        });
      }
    });

    return Array.from(productMap.values());
  }, [
    productsData,
    authLoading,
    storesLoading,
    productsLoading,
    isAuthenticated,
  ]);

  // Transform SEARCHED products data (unchanged)
  const searchedProducts: Product[] = useMemo(() => {
    if (
      authLoading ||
      storesLoading ||
      searchLoading ||
      !isAuthenticated ||
      !searchProductsData?.success ||
      !debouncedSearchTerm
    )
      return [];

    const rawSearchProducts: SearchStoreSaleProduct[] =
      searchProductsData.data ?? [];

    // Transform to Product format
    const productMap = new Map<string, Product>();
    rawSearchProducts.forEach((p) => {
      const id = p.productCode ?? "";
      if (productMap.has(id)) {
        const existing = productMap.get(id)!;
        existing.stock += p.quantity;
      } else {
        productMap.set(id, {
          id: p.productId,
          image: p.imgUrl ?? "/images/noimagefound.jpg",
          serialNumber: p.productCode ?? "",
          name: p.productName ?? "",
          category: p.category ?? "",
          stock: p.quantity,
          price: p.price,
        });
      }
    });

    return Array.from(productMap.values());
  }, [
    searchProductsData,
    authLoading,
    storesLoading,
    searchLoading,
    isAuthenticated,
    debouncedSearchTerm,
  ]);

  // Determine which products to show
  const tableProducts = useMemo(() => {
    if (debouncedSearchTerm) {
      return searchedProducts;
    }
    return allProducts;
  }, [allProducts, searchedProducts, debouncedSearchTerm]);

  const loading =
    authLoading ||
    storesLoading ||
    (debouncedSearchTerm ? searchLoading : productsLoading) ||
    !isAuthenticated;

  // Get total rows for pagination
  const totalRows = debouncedSearchTerm
    ? searchedProducts.length
    : productsData?.total ?? 0;

  // Reset page to 0 when store or search term changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [selectedStoreId, debouncedSearchTerm]);

  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
          <Image
            src={row.original.image || "/images/noimagefound.jpg"}
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
        cell: ({ row }) => <div>{row.original.name.slice(0, 20)}...</div>,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div className="hidden md:table-cell">
            {row.original.category.slice(0, 20)}...
          </div>
        ),
      },
      {
        accessorKey: "stock",
        header: "Qty",
        cell: ({ row }) => (
          <div className="text-right">{row.original.stock}</div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
          const price = row.original.price;
          const formatted = price.toLocaleString("en-KE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return <div className="text-right">{formatted}</div>;
        },
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
              disabled={row.original.stock <= 0}
            >
              Add to Cart
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onAddToCart]
  );

  const table = useReactTable({
    data: tableProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Use manual pagination for non-searched data, client-side for searched
    manualPagination: !debouncedSearchTerm,
    getPaginationRowModel: debouncedSearchTerm
      ? getPaginationRowModel()
      : undefined,
    pageCount: debouncedSearchTerm
      ? Math.ceil(searchedProducts.length / pageSize)
      : productsData?.pages ?? -1,
    rowCount: totalRows,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-md w-full"
          />
        </div>
        <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={storesLoading ? "Loading..." : "Select Store"}
            />
          </SelectTrigger>
          <SelectContent>
            {stores.map((store) => (
              <SelectItem key={store.storeId} value={store.storeId}>
                <div className="flex gap-2">
                  <span>{store.storeName}</span>
                  <span className="text-muted-foreground text-sm">
                    {store.ward}
                  </span>
                </div>
              </SelectItem>
            ))}
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
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader
                    text={
                      debouncedSearchTerm
                        ? "Searching products..."
                        : "Loading products..."
                    }
                  />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
                  className="h-48 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3 py-6">
                    <Avatar className="w-24 h-24 border-0">
                      <AvatarImage
                        src={
                          debouncedSearchTerm
                            ? "/images/nosearchresult.jpg"
                            : "/images/nostorefound.jpg"
                        }
                        alt="No products found"
                      />
                      <AvatarFallback className="text-sm text-muted-foreground">
                        {debouncedSearchTerm ? "No Results" : "No Image"}
                      </AvatarFallback>
                    </Avatar>

                    <p className="text-sm text-muted-foreground">
                      {debouncedSearchTerm
                        ? `No products found matching "${searchTerm}"`
                        : "No stock products found in the specified store."}
                    </p>

                    {!debouncedSearchTerm && (
                      <Button
                        variant="default"
                        onClick={() =>
                          router.push("/dashboard/inventory/products")
                        }
                      >
                        Add Store Product
                      </Button>
                    )}
                  </div>
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
