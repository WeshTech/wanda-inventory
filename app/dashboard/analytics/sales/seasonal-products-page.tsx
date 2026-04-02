"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown, Search, X, CalendarDays, Lightbulb } from "lucide-react";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import Loader from "@/components/ui/loading-spiner";
import { SeasonalProductItem, SeasonalFilters } from "@/types/analysis";
import { useSeasonalProducts } from "@/server-queries/analysisQueries";
import { useAuthStore, useAuthStoreAccess } from "@/stores/authStore";

const columnHelper = createColumnHelper<SeasonalProductItem>();

// Skeleton column headers to show during loading
const SKELETON_COLUMN_HEADERS = [
  "Product ID",
  "Product Name",
  "Brand",
  "Month",
  "Season",
  "Total Qty",
  "Total Revenue",
  "Insight",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SEASON_STYLES: Record<string, string> = {
  spring: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  summer:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  autumn:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  fall: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  winter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};

function getSeasonStyle(season: string): string {
  return (
    SEASON_STYLES[season?.toLowerCase()] ?? "bg-muted text-muted-foreground"
  );
}

export default function SeasonalProductsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const storeIds = useAuthStoreAccess();

  const MOCK_FILTERS: SeasonalFilters = {
    store_id: storeIds[0],
    days: 3650,
    limit: 100,
  };

  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const {
    data: response,
    isLoading: isFetching,
    isError,
  } = useSeasonalProducts(MOCK_FILTERS, true, !isAuthLoading);

  const isLoading = isAuthLoading || isFetching;

  const data = useMemo(() => response?.items ?? [], [response]);

  // Client-side pagination slice
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("business_product_id", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product ID
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const id: string = row.getValue("business_product_id");
          return (
            <div className="font-mono text-xs font-medium text-muted-foreground">
              ...{id?.slice(-6).toUpperCase() ?? "UNKNOWN"}
            </div>
          );
        },
      }),

      columnHelper.accessor("product_name", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="max-w-[180px] truncate font-medium">
            {row.getValue("product_name")}
          </div>
        ),
      }),

      columnHelper.accessor("brand", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Brand
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="max-w-[120px] truncate text-muted-foreground">
            {row.getValue("brand")}
          </div>
        ),
      }),

      columnHelper.accessor("sale_month", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Month
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const month: number = row.getValue("sale_month");
          return (
            <div className="text-center">
              {MONTH_NAMES[(month - 1) % 12] ?? month}
            </div>
          );
        },
      }),

      columnHelper.accessor("season", {
        header: () => <div className="font-semibold text-center">Season</div>,
        cell: ({ row }) => {
          const season: string = row.getValue("season");
          return (
            <Badge className={`capitalize ${getSeasonStyle(season)}`}>
              {season?.toLowerCase()}
            </Badge>
          );
        },
      }),

      columnHelper.accessor("total_quantity", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Qty
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">
            {(row.getValue("total_quantity") as number).toLocaleString()}
          </div>
        ),
      }),

      columnHelper.accessor("total_revenue", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Revenue
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">
            KES {(row.getValue("total_revenue") as number).toLocaleString()}
          </div>
        ),
      }),

      columnHelper.accessor("insight", {
        header: () => (
          <div className="flex items-center justify-center gap-1 font-semibold">
            <Lightbulb className="h-3.5 w-3.5" />
            Insight
          </div>
        ),
        cell: ({ row }) => (
          <div className="max-w-[260px] truncate text-sm text-muted-foreground">
            {row.getValue("insight")}
          </div>
        ),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    manualPagination: true,
    pageCount: totalPages,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: { pageIndex: page - 1, pageSize },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize })
          : updater;
      setPage(newState.pageIndex + 1);
      setPageSize(newState.pageSize);
    },
  });

  const hasActiveFilters = columnFilters.length > 0 || globalFilter.length > 0;

  const clearAllFilters = () => {
    setColumnFilters([]);
    setGlobalFilter("");
  };

  // ── LOADING STATE ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6 p-2">
        {/* Header — always visible */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Seasonal Products
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fetching seasonal products&hellip;
          </p>
        </div>

        {/* Filters bar — disabled skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search seasonal products..."
              disabled
              className="pl-10 opacity-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Table shell with spinner in body */}
        <div className="rounded-md border bg-card">
          <div className="overflow-x-auto max-w-screen">
            <Table>
              <TableHeader>
                <TableRow>
                  {SKELETON_COLUMN_HEADERS.map((header) => (
                    <TableHead
                      key={header}
                      className="text-center whitespace-nowrap font-semibold"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={SKELETON_COLUMN_HEADERS.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <Loader text="" />
                      <p className="text-sm text-muted-foreground">
                        Preparing seasonal products&hellip;
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination shell — disabled */}
        <div className="opacity-40 pointer-events-none">
          <DataTablePagination table={table} />
        </div>
      </div>
    );
  }
  // ──────────────────────────────────────────────────────────────────────────

  if (isError || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/images/nostorefound.jpg" alt="No data" />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground">No seasonal products found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Seasonal Products</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {response?.total_items ?? 0} seasonal items &mdash; last{" "}
          <span className="font-medium">{response?.days ?? 0} days</span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search seasonal products..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="pl-10"
          />
        </div>
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

      {/* Table */}
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
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="text-center whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-64 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Avatar className="h-20 w-20 border-2 border-muted">
                        <AvatarImage
                          src="/images/nostorefound.jpg"
                          alt="No results"
                        />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                      <p className="text-muted-foreground">
                        No results match your search
                      </p>
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
