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
  Trash2,
  RefreshCw,
  Search,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";
import { DeleteDialog } from "./delete-sale-dialog";
import { RefundDialog } from "./refund-sale-dialog";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SalesRecord {
  invoiceNo: string;
  store: string;
  customerName: string;
  totalAmount: number;
  paymentStatus: "paid" | "credit";
  paymentMethod: "mpesa" | "cash" | "card" | "other";
  servedBy: string;
  date: string;
}

const salesData: SalesRecord[] = [
  {
    invoiceNo: "INV-2025-001",
    store: "Main Branch",
    customerName: "John Doe",
    totalAmount: 1250.0,
    paymentStatus: "paid",
    paymentMethod: "mpesa",
    servedBy: "Alice Johnson",
    date: "2025-09-15",
  },
  {
    invoiceNo: "INV-2025-002",
    store: "Downtown",
    customerName: "Jane Smith",
    totalAmount: 890.5,
    paymentStatus: "credit",
    paymentMethod: "card",
    servedBy: "Bob Wilson",
    date: "2025-08-20",
  },
  {
    invoiceNo: "INV-2025-003",
    store: "Mall Branch",
    customerName: "Mike Johnson",
    totalAmount: 2100.0,
    paymentStatus: "paid",
    paymentMethod: "cash",
    servedBy: "Carol Davis",
    date: "2025-07-25",
  },
  {
    invoiceNo: "INV-2025-004",
    store: "Main Branch",
    customerName: "Sarah Brown",
    totalAmount: 675.25,
    paymentStatus: "paid",
    paymentMethod: "mpesa",
    servedBy: "David Lee",
    date: "2025-06-10",
  },
  {
    invoiceNo: "INV-2025-005",
    store: "Online Store",
    customerName: "Tom Wilson",
    totalAmount: 1450.0,
    paymentStatus: "credit",
    paymentMethod: "other",
    servedBy: "Emma Clark",
    date: "2025-05-18",
  },
  {
    invoiceNo: "INV-2025-006",
    store: "Downtown",
    customerName: "Laura White",
    totalAmount: 500.0,
    paymentStatus: "paid",
    paymentMethod: "cash",
    servedBy: "Alice Johnson",
    date: "2025-09-01",
  },
  {
    invoiceNo: "INV-2025-007",
    store: "Main Branch",
    customerName: "Kevin Green",
    totalAmount: 3400.0,
    paymentStatus: "paid",
    paymentMethod: "card",
    servedBy: "Bob Wilson",
    date: "2025-08-05",
  },
  {
    invoiceNo: "INV-2025-008",
    store: "Mall Branch",
    customerName: "Olivia Davis",
    totalAmount: 99.99,
    paymentStatus: "credit",
    paymentMethod: "mpesa",
    servedBy: "Carol Davis",
    date: "2025-04-22",
  },
  {
    invoiceNo: "INV-2025-009",
    store: "Online Store",
    customerName: "Peter Hall",
    totalAmount: 760.5,
    paymentStatus: "paid",
    paymentMethod: "other",
    servedBy: "David Lee",
    date: "2025-07-01",
  },
  {
    invoiceNo: "INV-2025-010",
    store: "Main Branch",
    customerName: "Mia King",
    totalAmount: 1800.0,
    paymentStatus: "paid",
    paymentMethod: "cash",
    servedBy: "Emma Clark",
    date: "2025-09-09",
  },
];

const columnHelper = createColumnHelper<SalesRecord>();

export function SalesDataTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SalesRecord | null>(
    null
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
            {new Date(row.getValue("date")).toLocaleDateString()}
          </div>
        ),
        filterFn: (row, columnId, filterValue) => {
          if (filterValue === "all" || filterValue === "") return true;
          const currentDate = new Date();
          const months = parseInt(filterValue as string);
          const cutoffDate = new Date(currentDate);
          cutoffDate.setMonth(currentDate.getMonth() - months);
          const recordDate = new Date(row.original.date);
          return recordDate >= cutoffDate && recordDate <= currentDate;
        },
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => {
          const record = row.original;
          return (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleView(record)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleUpdate(record)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleRefund(record)}
                    className="flex items-center gap-2 hover:bg-yellow-200"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refund
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(record)}
                    className="flex items-center gap-2 hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      }),
    ],
    []
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
    globalFilterFn: (row, columnId, filterValue) => {
      const rowValues = [
        row.getValue("invoiceNo"),
        row.getValue("customerName"),
        row.getValue("servedBy"),
      ]
        .join(" ")
        .toLowerCase();
      return rowValues.includes(filterValue.toLowerCase());
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const uniqueStores = useMemo(
    () => Array.from(new Set(salesData.map((record) => record.store))),
    []
  );

  const handleView = (record: SalesRecord) => {
    console.log("View record:", record.invoiceNo);
    console.log("Payment Status:", record.paymentStatus);
    console.log("Payment Method:", record.paymentMethod);
  };

  const handleUpdate = (record: SalesRecord) => {
    console.log("Update record:", record.invoiceNo);
    console.log("Payment Status:", record.paymentStatus);
    console.log("Payment Method:", record.paymentMethod);
  };

  const handleDelete = (record: SalesRecord) => {
    setSelectedRecord(record);
    setDeleteDialogOpen(true);
  };

  const handleRefund = (record: SalesRecord) => {
    setSelectedRecord(record);
    setRefundDialogOpen(true);
  };

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
              <Select
                value={
                  (table.getColumn("store")?.getFilterValue() as string) ??
                  "all"
                }
                onValueChange={(value) =>
                  table
                    .getColumn("store")
                    ?.setFilterValue(value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  {uniqueStores.map((store) => (
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
                {table.getRowModel().rows.length ? (
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
                      className="h-24 text-center"
                    >
                      No results.
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
        record={selectedRecord}
      />

      <RefundDialog
        open={refundDialogOpen}
        onOpenChange={setRefundDialogOpen}
        record={selectedRecord}
      />
    </>
  );
}

// "use client";

// import { useState, useMemo } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   createColumnHelper,
//   flexRender,
//   type SortingState,
//   type ColumnFiltersState,
// } from "@tanstack/react-table";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Eye,
//   Edit,
//   Trash2,
//   RefreshCw,
//   Search,
//   ArrowUpDown,
//   MoreHorizontal,
// } from "lucide-react";
// import { DeleteDialog } from "./delete-sale-dialog";
// import { RefundDialog } from "./refund-sale-dialog";
// import { DataTablePagination } from "@/components/dashboard/TablePagination";
// import { Badge } from "@/components/ui/badge";

// // CSS for centering table contents and dropdown styling
// const styles = `
//   .responsive-table {
//     width: 100%;
//     max-width: 100%;
//     table-layout: auto;
//   }

//   .responsive-table th,
//   .responsive-table td {
//     text-align: center; /* Center all table content */
//     padding: 8px;
//   }

//   /* Center the actions column content */
//   .actions-column {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   /* Dropdown menu item styling */
//   .dropdown-menu-item {
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     padding: 0.5rem 1rem;
//   }
//   .dropdown-menu-item.refund:hover {
//     background-color: hsl(54, 100%, 88%); /* yellow-200 */
//     color: hsl(var(--foreground));
//   }
//   .dropdown-menu-item.delete:hover {
//     background-color: hsl(0, 87%, 92%); /* red-200 */
//     color: hsl(var(--foreground));
//   }
//   .dark .dropdown-menu-item.refund:hover {
//     background-color: hsl(54, 50%, 40%); /* yellow-800 */
//   }
//   .dark .dropdown-menu-item.delete:hover {
//     background-color: hsl(0, 50%, 40%); /* red-800 */
//   }
// `;

// interface SalesRecord {
//   invoiceNo: string;
//   store: string;
//   customerName: string;
//   totalAmount: number;
//   paymentStatus: "paid" | "credit";
//   paymentMethod: "mpesa" | "cash" | "card" | "other";
//   servedBy: string;
//   date: string;
// }

// const salesData: SalesRecord[] = [
//   {
//     invoiceNo: "INV-2025-001",
//     store: "Main Branch",
//     customerName: "John Doe",
//     totalAmount: 1250.0,
//     paymentStatus: "paid",
//     paymentMethod: "mpesa",
//     servedBy: "Alice Johnson",
//     date: "2025-09-15",
//   },
//   {
//     invoiceNo: "INV-2025-002",
//     store: "Downtown",
//     customerName: "Jane Smith",
//     totalAmount: 890.5,
//     paymentStatus: "credit",
//     paymentMethod: "card",
//     servedBy: "Bob Wilson",
//     date: "2025-08-20",
//   },
//   {
//     invoiceNo: "INV-2025-003",
//     store: "Mall Branch",
//     customerName: "Mike Johnson",
//     totalAmount: 2100.0,
//     paymentStatus: "paid",
//     paymentMethod: "cash",
//     servedBy: "Carol Davis",
//     date: "2025-07-25",
//   },
//   {
//     invoiceNo: "INV-2025-004",
//     store: "Main Branch",
//     customerName: "Sarah Brown",
//     totalAmount: 675.25,
//     paymentStatus: "paid",
//     paymentMethod: "mpesa",
//     servedBy: "David Lee",
//     date: "2025-06-10",
//   },
//   {
//     invoiceNo: "INV-2025-005",
//     store: "Online Store",
//     customerName: "Tom Wilson",
//     totalAmount: 1450.0,
//     paymentStatus: "credit",
//     paymentMethod: "other",
//     servedBy: "Emma Clark",
//     date: "2025-05-18",
//   },
//   {
//     invoiceNo: "INV-2025-006",
//     store: "Downtown",
//     customerName: "Laura White",
//     totalAmount: 500.0,
//     paymentStatus: "paid",
//     paymentMethod: "cash",
//     servedBy: "Alice Johnson",
//     date: "2025-09-01",
//   },
//   {
//     invoiceNo: "INV-2025-007",
//     store: "Main Branch",
//     customerName: "Kevin Green",
//     totalAmount: 3400.0,
//     paymentStatus: "paid",
//     paymentMethod: "card",
//     servedBy: "Bob Wilson",
//     date: "2025-08-05",
//   },
//   {
//     invoiceNo: "INV-2025-008",
//     store: "Mall Branch",
//     customerName: "Olivia Davis",
//     totalAmount: 99.99,
//     paymentStatus: "credit",
//     paymentMethod: "mpesa",
//     servedBy: "Carol Davis",
//     date: "2025-04-22",
//   },
//   {
//     invoiceNo: "INV-2025-009",
//     store: "Online Store",
//     customerName: "Peter Hall",
//     totalAmount: 760.5,
//     paymentStatus: "paid",
//     paymentMethod: "other",
//     servedBy: "David Lee",
//     date: "2025-07-01",
//   },
//   {
//     invoiceNo: "INV-2025-010",
//     store: "Main Branch",
//     customerName: "Mia King",
//     totalAmount: 1800.0,
//     paymentStatus: "paid",
//     paymentMethod: "cash",
//     servedBy: "Emma Clark",
//     date: "2025-09-09",
//   },
// ];

// function PaymentStatusBadge({ status }: { status: "paid" | "credit" }) {
//   return (
//     <div className="flex justify-center">
//       <Badge
//         variant={status === "paid" ? "default" : "secondary"}
//         className={
//           status === "paid"
//             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//             : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
//         }
//       >
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     </div>
//   );
// }

// function PaymentMethodBadge({
//   method,
// }: {
//   method: "mpesa" | "cash" | "card" | "other";
// }) {
//   const colors = {
//     mpesa: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//     cash: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
//     card: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
//     other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
//   };

//   return (
//     <div className="flex justify-center">
//       <Badge variant="outline" className={colors[method]}>
//         {method.toUpperCase()}
//       </Badge>
//     </div>
//   );
// }

// const columnHelper = createColumnHelper<SalesRecord>();

// export function SalesDataTable() {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [refundDialogOpen, setRefundDialogOpen] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState<SalesRecord | null>(
//     null
//   );
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [globalFilter, setGlobalFilter] = useState("");

//   const columns = useMemo(
//     () => [
//       columnHelper.accessor("invoiceNo", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Invoice No
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <div className="font-medium text-center">
//             {row.getValue("invoiceNo")}
//           </div>
//         ),
//       }),
//       columnHelper.accessor("store", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Store
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <div className="text-center">{row.getValue("store")}</div>
//         ),
//       }),
//       columnHelper.accessor("customerName", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Customer Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <div className="text-center">{row.getValue("customerName")}</div>
//         ),
//       }),
//       columnHelper.accessor("totalAmount", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Total Amount
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <div className="text-center">
//             ${row.getValue<number>("totalAmount").toFixed(2)}
//           </div>
//         ),
//       }),
//       columnHelper.accessor("paymentStatus", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Payment Status
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <PaymentStatusBadge status={row.getValue("paymentStatus")} />
//         ),
//       }),
//       columnHelper.accessor("paymentMethod", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Payment Method
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <PaymentMethodBadge method={row.getValue("paymentMethod")} />
//         ),
//       }),
//       columnHelper.accessor("servedBy", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Served By
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <div className="text-center">{row.getValue("servedBy")}</div>
//         ),
//       }),
//       columnHelper.accessor("date", {
//         header: ({ column }) => (
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="mx-auto flex"
//           >
//             Date
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         ),
//         cell: ({ row }) => (
//           <div className="text-center">
//             {new Date(row.getValue("date")).toLocaleDateString()}
//           </div>
//         ),
//         filterFn: (row, columnId, filterValue) => {
//           if (filterValue === "all" || filterValue === "") return true;
//           const currentDate = new Date();
//           const months = parseInt(filterValue as string);
//           const cutoffDate = new Date(currentDate);
//           cutoffDate.setMonth(currentDate.getMonth() - months);
//           const recordDate = new Date(row.original.date);
//           return recordDate >= cutoffDate && recordDate <= currentDate;
//         },
//       }),
//       columnHelper.display({
//         id: "actions",
//         header: () => <div className="text-center">Actions</div>,
//         cell: ({ row }) => {
//           const record = row.original;
//           return (
//             <div className="actions-column">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     className="h-8 w-8 p-0"
//                     aria-label={`Open actions for sale ${record.invoiceNo}`}
//                   >
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem
//                     onClick={() => handleView(record)}
//                     className="dropdown-menu-item"
//                   >
//                     <Eye className="h-4 w-4" />
//                     View
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => handleUpdate(record)}
//                     className="dropdown-menu-item"
//                   >
//                     <Edit className="h-4 w-4" />
//                     Update
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => handleRefund(record)}
//                     className="dropdown-menu-item refund"
//                   >
//                     <RefreshCw className="h-4 w-4" />
//                     Refund
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={() => handleDelete(record)}
//                     className="dropdown-menu-item delete"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                     Delete
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           );
//         },
//       }),
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: salesData,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onGlobalFilterChange: setGlobalFilter,
//     globalFilterFn: (row, columnId, filterValue) => {
//       const rowValues = [
//         row.getValue("invoiceNo"),
//         row.getValue("customerName"),
//         row.getValue("servedBy"),
//       ]
//         .join(" ")
//         .toLowerCase();
//       return rowValues.includes(filterValue.toLowerCase());
//     },
//     state: {
//       sorting,
//       columnFilters,
//       globalFilter,
//     },
//   });

//   const uniqueStores = useMemo(
//     () => Array.from(new Set(salesData.map((record) => record.store))),
//     []
//   );

//   const handleView = (record: SalesRecord) => {
//     console.log("View record:", record.invoiceNo);
//     console.log("Payment Status:", record.paymentStatus);
//     console.log("Payment Method:", record.paymentMethod);
//   };

//   const handleUpdate = (record: SalesRecord) => {
//     console.log("Update record:", record.invoiceNo);
//     console.log("Payment Status:", record.paymentStatus);
//     console.log("Payment Method:", record.paymentMethod);
//   };

//   const handleDelete = (record: SalesRecord) => {
//     setSelectedRecord(record);
//     setDeleteDialogOpen(true);
//   };

//   const handleRefund = (record: SalesRecord) => {
//     setSelectedRecord(record);
//     setRefundDialogOpen(true);
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <Card className="flex flex-col min-h-[80vh]">
//         <CardHeader>
//           <CardTitle>Sales Transactions</CardTitle>
//           <CardDescription>
//             Complete list of all sales transactions and their details
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="flex flex-col">
//           <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
//             <div className="relative w-full md:w-1/3 lg:w-1/4">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search by customer, invoice or server..."
//                 value={globalFilter ?? ""}
//                 onChange={(e) => setGlobalFilter(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <div className="flex w-full flex-wrap items-center justify-end gap-4">
//               <Select
//                 value={
//                   (table.getColumn("store")?.getFilterValue() as string) ??
//                   "all"
//                 }
//                 onValueChange={(value) =>
//                   table
//                     .getColumn("store")
//                     ?.setFilterValue(value === "all" ? "" : value)
//                 }
//               >
//                 <SelectTrigger className="w-full md:w-[180px]">
//                   <SelectValue placeholder="Filter by store" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Stores</SelectItem>
//                   {uniqueStores.map((store) => (
//                     <SelectItem key={store} value={store}>
//                       {store}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="w-full overflow-x-auto">
//             <Table className="responsive-table">
//               <TableHeader className="sticky top-0 bg-background z-10">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody>
//                 {table.getRowModel().rows.length ? (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow key={row.id}>
//                       {row.getVisibleCells().map((cell) => (
//                         <TableCell key={cell.id}>
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={columns.length}
//                       className="h-24 text-center"
//                     >
//                       No results.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="mt-4">
//             <DataTablePagination table={table} />
//           </div>
//         </CardContent>
//       </Card>

//       <DeleteDialog
//         open={deleteDialogOpen}
//         onOpenChange={setDeleteDialogOpen}
//         record={selectedRecord}
//       />

//       <RefundDialog
//         open={refundDialogOpen}
//         onOpenChange={setRefundDialogOpen}
//         record={selectedRecord}
//       />
//     </>
//   );
// }
