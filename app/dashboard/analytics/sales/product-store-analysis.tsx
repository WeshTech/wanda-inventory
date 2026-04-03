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
import {
  ArrowUpDown,
  Search,
  X,
  TrendingUp,
  Package,
  Layers,
  AlertTriangle,
  Calendar,
  Droplets,
  TrendingDown,
  Minus,
} from "lucide-react";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import Loader from "@/components/ui/loading-spiner";
import {
  StoreIntelligenceFilters,
  StoreIntelligenceItem,
  StockoutRiskLevel,
  DeadStockRiskLevel,
  ForecastTrend,
} from "@/types/analysis";
import { useStoreIntelligence } from "@/server-queries/analysisQueries";
import { useAuthStore, useAuthStoreAccess } from "@/stores/authStore";

const columnHelper = createColumnHelper<StoreIntelligenceItem>();

// Skeleton column headers to show during loading
const SKELETON_COLUMN_HEADERS = [
  "Product ID / Barcode",
  "Product Name",
  "Unit",
  "Category",
  "Sale Rate",
  "Stockout Risk",
  "Dead Stock Risk",
  "Days of Inventory",
  "Demand Forecast",
];

// Helper to format stockout risk label and color
const getStockoutRiskConfig = (level: StockoutRiskLevel) => {
  switch (level) {
    case "low":
      return {
        label: "Low",
        variant: "outline",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200",
      };
    case "medium":
      return {
        label: "Medium",
        variant: "secondary",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200",
      };
    case "high":
      return {
        label: "High",
        variant: "destructive",
        className:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 border-orange-200",
      };
    case "critical":
      return {
        label: "Critical",
        variant: "destructive",
        className:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
      };
    default:
      return { label: level, variant: "outline", className: "" };
  }
};

// Helper to format dead stock risk label and color
const getDeadStockRiskConfig = (level: DeadStockRiskLevel) => {
  switch (level) {
    case "low":
      return {
        label: "Low",
        variant: "outline",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-200",
      };
    case "medium":
      return {
        label: "Medium",
        variant: "secondary",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200",
      };
    case "high":
      return {
        label: "High",
        variant: "destructive",
        className:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border-red-200",
      };
    default:
      return { label: level, variant: "outline", className: "" };
  }
};

// Helper to format days of inventory badge
const getDaysOfInventoryConfig = (days: number) => {
  if (days <= 7)
    return {
      label: "Critical",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
  if (days <= 14)
    return {
      label: "Low",
      className:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    };
  if (days <= 30)
    return {
      label: "Moderate",
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };
  if (days <= 60)
    return {
      label: "Good",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    };
  return {
    label: "Excess",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  };
};

// Helper for forecast trend icon
const ForecastTrendIcon = ({ trend }: { trend: ForecastTrend }) => {
  switch (trend) {
    case "up":
      return (
        <TrendingUp className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
      );
    case "down":
      return (
        <TrendingDown className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
      );
    default:
      return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  }
};

export default function StoreIntelligencePage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const storeIds = useAuthStoreAccess();

  // TODO: Replace these with actual values from your store context/params
  const MOCK_FILTERS: StoreIntelligenceFilters = {
    store_id: storeIds[0],
    county: "",
    constituency: "",
    ward: "",
    lookback_days: 30,
  };

  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const {
    data: response,
    isLoading: isFetching,
    isError,
  } = useStoreIntelligence(MOCK_FILTERS, true, !isAuthLoading);

  const isLoading = isAuthLoading || isFetching;

  const data = useMemo(() => response?.items ?? [], [response]);
  const storeRank = useMemo(() => response?.store_rank, [response]);

  // Client-side pagination slice
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("barcode", {
        id: "productIdentifier",
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Package className="h-3.5 w-3.5" />
            Product ID / Barcode
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const barcode = row.original.barcode;
          const businessProductId = row.original.business_product_id;
          const displayValue =
            barcode && barcode.trim() !== ""
              ? barcode
              : `...${businessProductId?.slice(-6).toUpperCase() ?? "UNKNOWN"}`;
          return (
            <div className="font-mono text-xs font-medium text-muted-foreground">
              {displayValue}
            </div>
          );
        },
      }),

      columnHelper.accessor("name", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div
            className="max-w-[200px] truncate font-medium"
            title={row.getValue("name")}
          >
            {row.getValue("name")}
          </div>
        ),
      }),

      columnHelper.accessor("unit", {
        header: () => (
          <div className="font-semibold text-center whitespace-nowrap">
            Unit
          </div>
        ),
        cell: ({ row }) => (
          <Badge variant="outline" className="capitalize">
            {row.getValue("unit")}
          </Badge>
        ),
      }),

      columnHelper.accessor("category_name", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Layers className="h-3.5 w-3.5" />
            Category
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => (
          <div
            className="max-w-[150px] truncate text-muted-foreground"
            title={row.getValue("category_name")}
          >
            {row.getValue("category_name")}
          </div>
        ),
      }),

      columnHelper.accessor("blended_daily_sale_rate", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Sale Rate
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const rate = row.getValue("blended_daily_sale_rate") as number;
          return (
            <div className="text-center font-medium">
              {rate.toFixed(2)}{" "}
              <span className="text-xs text-muted-foreground">units/day</span>
            </div>
          );
        },
      }),

      columnHelper.accessor("stockout_risk_level", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Stockout Risk
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const level = row.getValue(
            "stockout_risk_level",
          ) as StockoutRiskLevel;
          const score = row.original.stockout_risk_score;
          const config = getStockoutRiskConfig(level);
          return (
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-xs font-medium">
                {score.toFixed(1)}
              </span>
              <Badge className={`${config.className} capitalize`}>
                {config.label}
              </Badge>
            </div>
          );
        },
      }),

      columnHelper.accessor("dead_stock_risk_level", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Droplets className="h-3.5 w-3.5" />
            Dead Stock Risk
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const level = row.getValue(
            "dead_stock_risk_level",
          ) as DeadStockRiskLevel;
          const score = row.original.dead_stock_risk_score;
          const config = getDeadStockRiskConfig(level);
          return (
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-xs font-medium">
                {score.toFixed(1)}
              </span>
              <Badge className={`${config.className} capitalize`}>
                {config.label}
              </Badge>
            </div>
          );
        },
      }),

      columnHelper.accessor("days_of_inventory", {
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Calendar className="h-3.5 w-3.5" />
            Days of Inventory
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const days = row.getValue("days_of_inventory") as number;
          const config = getDaysOfInventoryConfig(days);
          return (
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-xs font-medium">
                {days.toFixed(1)}
              </span>
              <Badge className={`${config.className} capitalize`}>
                {config.label}
              </Badge>
            </div>
          );
        },
      }),

      columnHelper.accessor("forecast_next_7_days_units", {
        id: "demandForecast",
        header: ({ column }) => (
          <div
            className="flex items-center justify-center gap-1 cursor-pointer font-semibold whitespace-nowrap"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Demand Forecast
            <ArrowUpDown className="h-4 w-4" />
          </div>
        ),
        cell: ({ row }) => {
          const forecast7Days = row.original.forecast_next_7_days_units;
          const forecast30Days = row.original.forecast_next_30_days_units;
          const trend = row.original.forecast_trend;
          return (
            <div className="flex items-center justify-center gap-2">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="font-mono text-sm font-bold">
                    {Math.round(forecast7Days)}
                  </span>
                  <span className="text-xs text-muted-foreground">/7d</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{Math.round(forecast30Days)}/30d</span>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 ${
                  trend === "up"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : trend === "down"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                <ForecastTrendIcon trend={trend} />
                {trend === "up"
                  ? "Rising"
                  : trend === "down"
                    ? "Falling"
                    : "Stable"}
              </Badge>
            </div>
          );
        },
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
            Store Intelligence
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fetching store intelligence data&hellip;
          </p>
        </div>

        {/* Filters bar — disabled skeleton */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              disabled
              className="pl-10 opacity-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Table shell with spinner in body */}
        <div className="rounded-md border bg-card">
          <div className="overflow-x-auto">
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
                        Preparing store intelligence data…
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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/images/nostorefound.jpg" alt="Error" />
          <AvatarFallback>ERR</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground">
          Failed to load store intelligence data. Please try again.
        </p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/images/nostorefound.jpg" alt="No data" />
          <AvatarFallback>SI</AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground">
          No products found for this store
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with store rank summary */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Store Intelligence
        </h1>
        {storeRank && (
          <p className="text-muted-foreground text-sm mt-1 flex flex-wrap gap-x-4 gap-y-1">
            <span>
              Store Rank:{" "}
              <span className="font-medium">#{storeRank.ward_rank}</span> /{" "}
              {storeRank.total_stores_in_ward} in ward
            </span>
            <span>
              Composite Score:{" "}
              <span className="font-medium">
                {storeRank.composite_score.toFixed(1)}
              </span>
            </span>
            <span>
              Total Products: <span className="font-medium">{data.length}</span>
            </span>
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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

      {/* Table with horizontal scroll on overflow */}
      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
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
                        <AvatarFallback>SI</AvatarFallback>
                      </Avatar>
                      <p className="text-muted-foreground">
                        No products match your search
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
