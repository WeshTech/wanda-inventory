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

interface BusinessAnalysisTableProps {
  searchQuery: string;
  period: string;
}

interface BusinessData {
  productCode: string;
  productName: string;
  brand: string;
  units: number;
  revenue: number;
  salesStats: number;
}

const mockBusinessData: BusinessData[] = [
  {
    productCode: "PRD-001-2024",
    productName: "Samsung Galaxy S24",
    brand: "Samsung",
    units: 145,
    revenue: 2175000,
    salesStats: 85,
  },
  {
    productCode: "PRD-002-2024",
    productName: "iPhone 15 Pro",
    brand: "Apple",
    units: 98,
    revenue: 1470000,
    salesStats: 92,
  },
  {
    productCode: "PRD-003-2024",
    productName: "MacBook Air M3",
    brand: "Apple",
    units: 67,
    revenue: 1005000,
    salesStats: 78,
  },
  {
    productCode: "PRD-004-2024",
    productName: "Dell XPS 13",
    brand: "Dell",
    units: 89,
    revenue: 1335000,
    salesStats: 71,
  },
  {
    productCode: "PRD-005-2024",
    productName: "Sony WH-1000XM5",
    brand: "Sony",
    units: 234,
    revenue: 702000,
    salesStats: 88,
  },
  {
    productCode: "PRD-006-2024",
    productName: "HP Pavilion 15",
    brand: "HP",
    units: 156,
    revenue: 936000,
    salesStats: 65,
  },
  {
    productCode: "PRD-007-2024",
    productName: "Lenovo ThinkPad X1",
    brand: "Lenovo",
    units: 43,
    revenue: 645000,
    salesStats: 73,
  },
  {
    productCode: "PRD-008-2024",
    productName: "AirPods Pro 2",
    brand: "Apple",
    units: 312,
    revenue: 936000,
    salesStats: 95,
  },
];

const columnHelper = createColumnHelper<BusinessData>();

const columns = [
  columnHelper.accessor("productCode", {
    header: ({ column }: { column: Column<BusinessData, unknown> }) => (
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
    cell: ({ row }: { row: Row<BusinessData> }) => (
      <div className="text-center font-mono text-sm">
        {row.getValue("productCode")}
      </div>
    ),
  }),
  columnHelper.accessor("productName", {
    header: ({ column }: { column: Column<BusinessData, unknown> }) => (
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
    cell: ({ row }: { row: Row<BusinessData> }) => (
      <div className="text-center font-medium">
        {row.getValue("productName")}
      </div>
    ),
  }),
  columnHelper.accessor("brand", {
    header: ({ column }: { column: Column<BusinessData, unknown> }) => (
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
    cell: ({ row }: { row: Row<BusinessData> }) => (
      <div className="text-center">
        <Badge variant="outline" className="bg-background">
          {row.getValue("brand")}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("units", {
    header: ({ column }: { column: Column<BusinessData, unknown> }) => (
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
    cell: ({ row }: { row: Row<BusinessData> }) => (
      <div className="text-center font-medium">
        {(row.getValue("units") as number).toLocaleString()}
      </div>
    ),
  }),
  columnHelper.accessor("revenue", {
    header: ({ column }: { column: Column<BusinessData, unknown> }) => (
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
    cell: ({ row }: { row: Row<BusinessData> }) => {
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
    header: ({ column }: { column: Column<BusinessData, unknown> }) => (
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
    cell: ({ row }: { row: Row<BusinessData> }) => {
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

export function BusinessAnalysisTable({
  searchQuery,
  period,
}: BusinessAnalysisTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const filteredData = useMemo(() => {
    return mockBusinessData.filter((item) => {
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
        Showing business analysis for {period} month{period !== "1" ? "s" : ""}
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
