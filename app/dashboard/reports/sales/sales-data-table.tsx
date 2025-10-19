"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  RefreshCw,
  Trash2,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { DeleteDialog } from "./delete-sale-dialog";
import { RefundDialog } from "./refund-sale-dialog";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { useRouter } from "next/navigation";
import {
  useAuthBusinessId,
  useAuthUser,
  useAuthStoreAccess,
  useAuthStore,
} from "@/stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GetSalesResponse, SaleData } from "@/types/sales";
import Loader from "@/components/ui/loading-spiner";
import { useGetAllSales } from "@/server-queries/salesQueries";

// Table interface for display
interface TableSaleRecord {
  saleId: string;
  invoiceNo: string;
  store: string;
  customerName: string;
  totalAmount: number;
  servedBy: string;
  date: string;
}

// Refund dialog interface
interface RefundSalesRecord extends TableSaleRecord {
  paymentStatus: "paid" | "credit";
  paymentMethod: "mpesa" | "cash" | "card" | "other";
}

const columnHelper = createColumnHelper<TableSaleRecord>();

export function SalesDataTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedRecordDelete, setSelectedRecordDelete] =
    useState<SaleData | null>(null);
  const [selectedRecordRefund, setSelectedRecordRefund] =
    useState<RefundSalesRecord | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedStore, setSelectedStore] = useState("all");

  const router = useRouter();
  const businessId = useAuthBusinessId() ?? "";
  const user = useAuthUser();
  const userId = user?.userId ?? "";
  const storeAccess = useAuthStoreAccess();
  const authLoading = useAuthStore(useShallow((state) => state.isLoading));

  const storeToFetch = selectedStore === "all" ? storeAccess[0] : selectedStore;
  console.log({ businessId, storeToFetch, userId });
  const { data: salesDataQuery, isLoading } = useGetAllSales(
    businessId,
    storeToFetch,
    userId
  );

  const salesData: TableSaleRecord[] = useMemo(() => {
    const salesDataRaw = (salesDataQuery as GetSalesResponse)?.data || [];
    return salesDataRaw.map((sale) => ({
      saleId: sale.saleId,
      invoiceNo: sale.invoiceNumber.toString(),
      store: sale.store,
      customerName: sale.CustomerName,
      totalAmount: sale.totalAmount,
      servedBy: sale.servedBy,
      date: sale.createdAt,
    }));
  }, [salesDataQuery]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("invoiceNo", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Invoice No
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="font-medium text-center">
            {row.getValue("invoiceNo")}
          </div>
        ),
      }),
      columnHelper.accessor("store", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Store
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("store")}</div>
        ),
      }),
      columnHelper.accessor("customerName", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("customerName")}</div>
        ),
      }),
      columnHelper.accessor("totalAmount", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            ${row.getValue<number>("totalAmount").toFixed(2)}
          </div>
        ),
      }),
      columnHelper.accessor("servedBy", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Served By
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">{row.getValue("servedBy")}</div>
        ),
      }),
      columnHelper.accessor("date", {
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            {new Intl.DateTimeFormat("en-KE", {
              dateStyle: "short",
              timeZone: "Africa/Nairobi",
            }).format(new Date(row.getValue("date")))}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
          const record = row.original;
          return (
            <TooltipProvider>
              <div className="flex justify-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        router.push(
                          `/dashboard/reports/sales/receipt/${record.saleId}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdate(record)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Update</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRefund(record)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Refund</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(record)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          );
        },
      }),
    ],
    [router]
  );

  const table = useReactTable({
    data: salesData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row) => {
      const rowValues = [
        row.getValue("invoiceNo"),
        row.getValue("customerName"),
        row.getValue("servedBy"),
      ]
        .join(" ")
        .toLowerCase();
      return rowValues.includes(globalFilter.toLowerCase());
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const handleUpdate = (record: TableSaleRecord) => {
    console.log("Update record:", record.invoiceNo);
  };

  const handleDelete = (record: TableSaleRecord) => {
    const saleData: SaleData = {
      saleId: record.saleId,
      invoiceNumber: parseInt(record.invoiceNo),
      store: record.store,
      CustomerName: record.customerName,
      servedBy: record.servedBy,
      totalAmount: record.totalAmount,
      createdAt: record.date,
    };
    setSelectedRecordDelete(saleData);
    setDeleteDialogOpen(true);
  };

  const handleRefund = (record: TableSaleRecord) => {
    const refundRecord: RefundSalesRecord = {
      ...record,
      paymentStatus: "paid",
      paymentMethod: "mpesa",
    };
    setSelectedRecordRefund(refundRecord);
    setRefundDialogOpen(true);
  };

  const isLoadingData = authLoading || isLoading;

  return (
    <>
      <Card className="flex flex-col min-h-[80vh]">
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
          <CardDescription>
            Complete list of all sales transactions and their details
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="relative w-full md:w-1/3 lg:w-1/4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by customer, invoice or server..."
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex w-full flex-wrap items-center justify-end gap-4">
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  {storeAccess.map((store) => (
                    <SelectItem key={store} value={store}>
                      {store}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-center">
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
                {isLoadingData ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <Loader text="Loading sales data..." />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center">
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
                      className="h-24 flex items-center justify-center"
                    >
                      <Avatar>
                        <AvatarImage src="/images/nostorefound.jpg" />
                        <AvatarFallback>NS</AvatarFallback>
                      </Avatar>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <DataTablePagination table={table} />
          </div>
        </CardContent>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        record={selectedRecordDelete}
      />

      <RefundDialog
        open={refundDialogOpen}
        onOpenChange={setRefundDialogOpen}
        record={selectedRecordRefund}
      />
    </>
  );
}
