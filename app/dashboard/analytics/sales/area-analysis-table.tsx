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
import { Gauge, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { DataTablePagination } from "./pagination";

interface AreaAnalysisTableProps {
  searchQuery: string;
  period: string;
}

interface AreaData {
  productCode: string;
  productName: string;
  brand: string;
  units: number;
  revenue: number;
  salesStats: number;
  area: string;
}

const mockAreaData: AreaData[] = [
  {
    productCode: "PRD-001-2024",
    productName: "Samsung Galaxy S24",
    brand: "Samsung",
    units: 89,
    revenue: 1335000,
    salesStats: 82,
    area: "Nairobi Central",
  },
  {
    productCode: "PRD-002-2024",
    productName: "iPhone 15 Pro",
    brand: "Apple",
    units: 56,
    revenue: 840000,
    salesStats: 88,
    area: "Westlands",
  },
  {
    productCode: "PRD-003-2024",
    productName: "MacBook Air M3",
    brand: "Apple",
    units: 34,
    revenue: 510000,
    salesStats: 75,
    area: "Karen",
  },
  {
    productCode: "PRD-004-2024",
    productName: "Dell XPS 13",
    brand: "Dell",
    units: 67,
    revenue: 1005000,
    salesStats: 69,
    area: "Kilimani",
  },
  {
    productCode: "PRD-005-2024",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    units: 145,
    revenue: 435000,
    salesStats: 91,
    area: "Eastleigh",
  },
  {
    productCode: "PRD-006-2024",
    productName: "HP Pavilion 15",
    brand: "HP",
    units: 98,
    revenue: 588000,
    salesStats: 63,
    area: "Kasarani",
  },
  {
    productCode: "PRD-007-2024",
    productName: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    units: 23,
    revenue: 345000,
    salesStats: 71,
    area: "Langata",
  },
  {
    productCode: "PRD-008-2024",
    productName: "AirPods Pro 2",
    brand: "Apple",
    units: 189,
    revenue: 567000,
    salesStats: 93,
    area: "Parklands",
  },
];

const getAreaColor = (area: string) => {
  const colors = [
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  ];
  const index = area.length % colors.length;
  return colors[index];
};

const columnHelper = createColumnHelper<AreaData>();

const columns = [
  columnHelper.accessor("productCode", {
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
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
    cell: ({ row }: { row: Row<AreaData> }) => (
      <div className="text-center font-mono text-sm">
        {row.getValue("productCode")}
      </div>
    ),
  }),
  columnHelper.accessor("productName", {
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
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
    cell: ({ row }: { row: Row<AreaData> }) => (
      <div className="text-center font-medium">
        {row.getValue("productName")}
      </div>
    ),
  }),
  columnHelper.accessor("brand", {
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
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
    cell: ({ row }: { row: Row<AreaData> }) => (
      <div className="text-center">
        <Badge variant="outline" className="bg-background">
          {row.getValue("brand")}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("area", {
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Area
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<AreaData> }) => (
      <div className="text-center">
        <Badge className={getAreaColor(row.getValue("area"))}>
          {row.getValue("area")}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("units", {
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Units
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<AreaData> }) => (
      <div className="text-center font-medium">
        {(row.getValue("units") as number).toLocaleString()}
      </div>
    ),
  }),
  columnHelper.accessor("revenue", {
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold text-foreground justify-center w-full"
      >
        Revenue
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    ),
    cell: ({ row }: { row: Row<AreaData> }) => {
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
    header: ({ column }: { column: Column<AreaData, unknown> }) => (
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
    cell: ({ row }: { row: Row<AreaData> }) => {
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
];

export function AreaAnalysisTable({
  searchQuery,
  period,
}: AreaAnalysisTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredData = useMemo(() => {
    return mockAreaData.filter((item) => {
      const query = searchQuery.toLowerCase();
      return (
        item.productCode.toLowerCase().includes(query) ||
        item.productName.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.area.toLowerCase().includes(query)
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
        Showing area analysis for {period} month{period !== "1" ? "s" : ""}
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
