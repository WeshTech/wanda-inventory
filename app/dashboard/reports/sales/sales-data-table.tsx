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
import { useStoreInfoQuery } from "@/server-queries/storeQueries";
import { StoreInfo } from "@/types/stores";

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

// Store option interface for dropdown
interface StoreOption {
  storeId: string;
  storeName: string;
  ward: string;
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

  // Get store info using the hook
  const { data: storesInfoQuery } = useStoreInfoQuery(businessId, storeAccess);

  // Transform store data for dropdown
  const storeOptions: StoreOption[] = useMemo(() => {
    if (!storesInfoQuery?.data) return [];
    const storesData = Array.isArray(storesInfoQuery.data)
      ? storesInfoQuery.data
      : [storesInfoQuery.data];
    return storesData.map((store: StoreInfo) => ({
      storeId: store.storeId,
      storeName: store.storeName,
      ward: store.ward,
    }));
  }, [storesInfoQuery]);

  // Map storeId to store name for table display
  const storeIdToNameMap = useMemo(() => {
    const map = new Map<string, string>();
    storeOptions.forEach((store) => {
      map.set(store.storeId, store.storeName);
    });
    return map;
  }, [storeOptions]);

  const storeToFetch = selectedStore === "all" ? storeAccess[0] : selectedStore;
  console.log({ businessId, storeToFetch, userId });

  const { data: salesDataQuery, isLoading } = useGetAllSales(
    businessId,
    storeToFetch,
    userId
  );

  // Transform sales data to use store names
  const salesData: TableSaleRecord[] = useMemo(() => {
    const salesDataRaw = (salesDataQuery as GetSalesResponse)?.data || [];
    return salesDataRaw.map((sale) => ({
      saleId: sale.saleId,
      invoiceNo: sale.invoiceNumber.toString(),
      store: storeIdToNameMap.get(sale.store) || sale.store, // Use store name
      customerName: sale.CustomerName,
      totalAmount: sale.totalAmount,
      servedBy: sale.servedBy,
      date: sale.createdAt,
    }));
  }, [salesDataQuery, storeIdToNameMap]);

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
        cell: ({ row }) => {
          const dateVal = row.getValue("date") as string | Date | null;
          const date = dateVal ? new Date(dateVal) : new Date();
          const year = date.getFullYear();
          const rawInvoice = row.getValue("invoiceNo") as
            | string
            | number
            | null;
          const seqNum =
            typeof rawInvoice === "number"
              ? rawInvoice
              : rawInvoice
              ? parseInt(rawInvoice, 10)
              : NaN;

          const isNumericSeq = !Number.isNaN(seqNum);

          const seqStr = isNumericSeq
            ? String(seqNum).padStart(3, "0")
            : String(rawInvoice ?? "N/A");
          const formattedInvoice = `INV-${year}-${seqStr}`;

          return (
            <div className="font-medium text-center">{formattedInvoice}</div>
          );
        },
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
        cell: ({ row }) => {
          const amount = row.getValue<number>("totalAmount") ?? 0;

          const formatted = new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(amount);

          return <div className="text-center">{formatted}</div>;
        },
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
        cell: ({ row }) => {
          const date = new Date(row.getValue("date"));
          const formattedDate = new Intl.DateTimeFormat("en-KE", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Africa/Nairobi",
          }).format(date);

          return <div className="text-center">{formattedDate}</div>;
        },
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
                      className="transition-colors hover:bg-green-100 hover:text-green-600"
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
                      className="transition-colors hover:bg-green-100 hover:text-green-600"
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
                      className="transition-colors hover:bg-yellow-100 hover:text-yellow-600"
                    >
                      <RefreshCw className="h-4 w-4 text-yellow-500" />
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
                      className="transition-colors hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
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
      paymentMethod: "cash",
    };
    setSelectedRecordRefund(refundRecord);
    setRefundDialogOpen(true);
  };

  const handleStoreChange = (value: string) => {
    setSelectedStore(value);
  };

  const isLoadingData = authLoading || isLoading || !storesInfoQuery;

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
              <Select value={selectedStore} onValueChange={handleStoreChange}>
                <SelectTrigger className="w-full md:w-[220px]">
                  <SelectValue placeholder="Filter by store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <span>All Stores</span>
                      <span className="text-xs text-muted-foreground">
                        View all locations
                      </span>
                    </div>
                  </SelectItem>
                  {storeOptions.map((store) => (
                    <SelectItem key={store.storeId} value={store.storeId}>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{store.storeName}</span>
                        <span className="text-xs text-muted-foreground">
                          {store.ward}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ✅ EXACT SAME RESPONSIVE STRUCTURE AS YOUR EXAMPLE */}
          <div className="rounded-lg border shadow-sm overflow-x-auto max-w-[calc(100vw-2rem)] lg:max-w-full">
            <Table>
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
                {isLoadingData ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-muted-foreground"
                    >
                      <Loader text="Loading sales data..." />
                    </TableCell>
                  </TableRow>
                ) : salesData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-64 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/images/nostorefound.jpg" />
                          <AvatarFallback>NS</AvatarFallback>
                        </Avatar>
                        <p className="text-lg font-medium">
                          No sales found for this Store
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Create your first sale transaction or change store
                          filter.
                        </p>
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
                      className="h-64 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/images/nostorefound.jpg" />
                          <AvatarFallback>NS</AvatarFallback>
                        </Avatar>
                        <p className="text-base font-medium">
                          No sales match the applied filters
                        </p>
                        <Button
                          onClick={() => setGlobalFilter("")}
                          variant="outline"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Clear Filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination table={table} />
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
