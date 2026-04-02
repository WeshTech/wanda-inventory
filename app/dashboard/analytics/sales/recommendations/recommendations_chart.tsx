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
import { ArrowUpDown, Search, X, MapPin, TrendingUp } from "lucide-react";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import Loader from "@/components/ui/loading-spiner";
import {
  RegionalRecommendationItem,
  RegionalRecommendationsFilters,
} from "@/types/analysis";
import { useRegionalRecommendations } from "@/server-queries/analysisQueries";
import { useAuthStore } from "@/stores/authStore";

const columnHelper = createColumnHelper<RegionalRecommendationItem>();

// Skeleton column headers to show during loading
const SKELETON_COLUMN_HEADERS = [
  "Product ID",
  "Product Name",
  "Brand",
  "Unit",
  "County",
  "Business Type",
  "Businesses",
  "Total Qty",
  "Total Revenue",
  "Avg Daily Qty",
];

export default function RegionalRecommendationsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const MOCK_FILTERS: RegionalRecommendationsFilters = {
    business_type: "",
    county: "Muranga",
    constituency: "",
    ward: "",
    days: 36,
    limit: 100,
  };

  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const {
    data: response,
    isLoading: isFetching,
    isError,
  } = useRegionalRecommendations(MOCK_FILTERS, true);

  const isLoading = isAuthLoading || isFetching;

  const data = useMemo(() => response?.recommendations ?? [], [response]);

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

      columnHelper.accessor("unit", {
        header: () => <div className="font-semibold text-center">Unit</div>,
        cell: ({ row }) => (
          <Badge variant="outline" className="capitalize">
            {row.getValue("unit")}
          </Badge>
        ),
      }),

      columnHelper.accessor("county", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <MapPin className="h-3.5 w-3.5" />
            County
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("county")}</div>
        ),
      }),

      columnHelper.accessor("business_type", {
        header: () => (
          <div className="font-semibold text-center">Business Type</div>
        ),
        cell: ({ row }) => (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 capitalize">
            {(row.getValue("business_type") as string)?.toLowerCase()}
          </Badge>
        ),
      }),

      columnHelper.accessor("business_count", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Businesses
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">
            {row.getValue("business_count")}
          </div>
        ),
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

      columnHelper.accessor("avg_daily_quantity", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Avg Daily Qty
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center font-medium">
            {(row.getValue("avg_daily_quantity") as number).toFixed(2)}
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
            Murang&apos;a Regional Recommendations
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fetching recommendations&hellip;
          </p>
        </div>

        {/* Filters bar — disabled skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search recommendations..."
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
                        Preparing recommendations…
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
          <AvatarFallback>RR</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground">
          No regional recommendations found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Regional Recommendations
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {response?.total_recommendations ?? 0} recommendations for{" "}
          <span className="font-medium capitalize">
            {response?.filters.county}
          </span>{" "}
          &mdash;{" "}
          <span className="font-medium capitalize">
            {response?.filters.business_type}
          </span>
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search recommendations..."
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
                        <AvatarFallback>RR</AvatarFallback>
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
