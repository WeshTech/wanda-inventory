"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Gauge,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { DataTablePagination } from "./pagination";

interface BusinessPredictionTableProps {
  searchQuery: string;
  period: string;
}

interface PredictionData {
  productCode: string;
  productName: string;
  brand: string;
  units: number;
  revenue: number;
  salesStats: number;
  trend: "up" | "down" | "stable";
  prediction: number;
}

const mockPredictionData: PredictionData[] = [
  {
    productCode: "PRD-001-2024",
    productName: "Samsung Galaxy S24",
    brand: "Samsung",
    units: 165,
    revenue: 2475000,
    salesStats: 89,
    trend: "up",
    prediction: 12,
  },
  {
    productCode: "PRD-002-2024",
    productName: "iPhone 15 Pro",
    brand: "Apple",
    units: 112,
    revenue: 1680000,
    salesStats: 95,
    trend: "up",
    prediction: 18,
  },
  {
    productCode: "PRD-003-2024",
    productName: "MacBook Air M3",
    brand: "Apple",
    units: 58,
    revenue: 870000,
    salesStats: 72,
    trend: "down",
    prediction: -8,
  },
  {
    productCode: "PRD-004-2024",
    productName: "Dell XPS 13",
    brand: "Dell",
    units: 76,
    revenue: 1140000,
    salesStats: 68,
    trend: "down",
    prediction: -5,
  },
  {
    productCode: "PRD-005-2024",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    units: 267,
    revenue: 801000,
    salesStats: 92,
    trend: "up",
    prediction: 15,
  },
  {
    productCode: "PRD-006-2024",
    productName: "HP Pavilion 15",
    brand: "HP",
    units: 134,
    revenue: 804000,
    salesStats: 61,
    trend: "stable",
    prediction: 2,
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    default:
      return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
  }
};

const getPredictionColor = (prediction: number) => {
  if (prediction > 10) return "text-green-600 dark:text-green-400";
  if (prediction > 0) return "text-blue-600 dark:text-blue-400";
  if (prediction < -5) return "text-red-600 dark:text-red-400";
  return "text-yellow-600 dark:text-yellow-400";
};

const columnHelper = createColumnHelper<PredictionData>();

const columns = [
  columnHelper.accessor("productCode", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Product Code
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => (
      <div className="text-center font-mono text-sm">
        {row.getValue("productCode")}
      </div>
    ),
  }),
  columnHelper.accessor("productName", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Product Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => (
      <div className="text-center font-medium">
        {row.getValue("productName")}
      </div>
    ),
  }),
  columnHelper.accessor("brand", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Brand
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => (
      <div className="text-center">
        <Badge variant="outline" className="bg-background">
          {row.getValue("brand")}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("units", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Predicted Units
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => (
      <div className="text-center font-medium">
        {(row.getValue("units") as number).toLocaleString()}
      </div>
    ),
  }),
  columnHelper.accessor("revenue", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Predicted Revenue
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => {
      const amount = row.getValue("revenue") as number;
      const formatted = new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 0,
      }).format(amount);
      return (
        <div className="text-center font-medium text-primary">{formatted}</div>
      );
    },
  }),
  columnHelper.accessor("salesStats", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Sales Stats
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => {
      const stats = row.getValue("salesStats") as number;
      const getSalesStatsColor = (stats: number) => {
        if (stats >= 90) return "text-green-500";
        if (stats >= 75) return "text-blue-500";
        if (stats >= 60) return "text-yellow-500";
        return "text-red-500";
      };
      return (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <Gauge className={`h-4 w-4 ${getSalesStatsColor(stats)}`} />
              <span className="font-medium">{stats}%</span>
            </div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("prediction", {
    header: ({ column }: { column: Column<PredictionData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Growth %
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<PredictionData> }) => {
      const prediction = row.getValue("prediction") as number;
      const trend = row.original.trend;
      return (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            {getTrendIcon(trend)}
            <span className={`font-medium ${getPredictionColor(prediction)}`}>
              {prediction > 0 ? "+" : ""}
              {prediction}%
            </span>
          </div>
        </div>
      );
    },
  }),
];

export function BusinessPredictionTable({
  searchQuery,
  period,
}: BusinessPredictionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredData = useMemo(() => {
    return mockPredictionData.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.productCode.toLowerCase().includes(query) ||
        item.productName.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing business predictions for next {period} month
        {period !== "1" ? "s" : ""}
      </div>

      <div className="rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="min-w-[140px]">
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
                    className="hover:bg-muted/30 transition-colors"
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
                    No results found for `${searchQuery}`
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
