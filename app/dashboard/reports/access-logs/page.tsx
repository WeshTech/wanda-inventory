"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Ban,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/dashboard/TablePagination";

// Mock data for access logs
const mockAccessLogs = [
  {
    id: "AL001",
    email: "john.doe@company.com",
    name: "John Doe",
    ipAddress: "192.168.1.100",
    time: "2024-01-15 09:30:45",
    device: "Chrome on Windows",
    status: "success",
  },
  {
    id: "AL002",
    email: "jane.smith@company.com",
    name: "Jane Smith",
    ipAddress: "10.0.0.25",
    time: "2024-01-15 09:28:12",
    device: "Safari on macOS",
    status: "failed",
  },
  {
    id: "AL003",
    email: "mike.wilson@company.com",
    name: "Mike Wilson",
    ipAddress: "172.16.0.50",
    time: "2024-01-15 09:25:33",
    device: "Firefox on Linux",
    status: "success",
  },
  {
    id: "AL004",
    email: "sarah.johnson@company.com",
    name: "Sarah Johnson",
    ipAddress: "192.168.1.101",
    time: "2024-01-15 09:22:18",
    device: "Edge on Windows",
    status: "failed",
  },
  {
    id: "AL005",
    email: "david.brown@company.com",
    name: "David Brown",
    ipAddress: "10.0.0.30",
    time: "2024-01-15 09:20:05",
    device: "Chrome on Android",
    status: "success",
  },
  {
    id: "AL006",
    email: "lisa.davis@company.com",
    name: "Lisa Davis",
    ipAddress: "172.16.0.75",
    time: "2024-01-15 09:18:42",
    device: "Safari on iOS",
    status: "success",
  },
  {
    id: "AL007",
    email: "robert.miller@company.com",
    name: "Robert Miller",
    ipAddress: "192.168.1.102",
    time: "2024-01-15 09:15:27",
    device: "Chrome on Windows",
    status: "failed",
  },
  {
    id: "AL008",
    email: "emily.wilson@company.com",
    name: "Emily Wilson",
    ipAddress: "10.0.0.35",
    time: "2024-01-15 09:12:14",
    device: "Firefox on macOS",
    status: "success",
  },
  {
    id: "AL009",
    email: "james.taylor@company.com",
    name: "James Taylor",
    ipAddress: "172.16.0.80",
    time: "2024-01-15 09:10:58",
    device: "Edge on Windows",
    status: "failed",
  },
  {
    id: "AL010",
    email: "maria.garcia@company.com",
    name: "Maria Garcia",
    ipAddress: "192.168.1.103",
    time: "2024-01-15 09:08:36",
    device: "Chrome on macOS",
    status: "success",
  },
];

type AccessLog = (typeof mockAccessLogs)[0];

const columnHelper = createColumnHelper<AccessLog>();

export default function AccessLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const columns = [
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <div className="font-medium text-sm">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <div className="font-medium text-sm">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor("ipAddress", {
      header: "IP Address",
      cell: (info) => (
        <div className="font-mono text-sm text-muted-foreground">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("time", {
      header: "Time",
      cell: (info) => (
        <div className="text-sm text-muted-foreground">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor("device", {
      header: "Device",
      cell: (info) => <div className="text-sm">{info.getValue()}</div>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        return (
          <Badge
            variant={status === "success" ? "default" : "destructive"}
            className={
              status === "success"
                ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400"
            }
          >
            {status === "success" ? "Success" : "Failed"}
          </Badge>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {/* View Details */}
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>

            {/* Flag as Suspicious */}
            <DropdownMenuItem className="flex items-center gap-2 data-[highlighted]:bg-yellow-100 data-[highlighted]:text-yellow-700">
              <AlertTriangle className="mr-2 h-4 w-4 data-[highlighted]:text-yellow-700" />
              Flag as Suspicious
            </DropdownMenuItem>

            {/* Block User (last in dropdown) */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="flex items-center gap-2 data-[highlighted]:bg-red-100 data-[highlighted]:text-red-700"
                >
                  <Ban className="mr-2 h-4 w-4 data-[highlighted]:text-red-700" />
                  Block User
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader className="flex items-start gap-3">
                  {/* Red shaded icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <Ban className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>

                  <div>
                    <AlertDialogTitle className="text-red-600 dark:text-red-400">
                      Block User Access
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to block access for{" "}
                      <span className="font-semibold">
                        {info.row.original.name}
                      </span>
                      ? This will prevent them from logging into the system.
                    </AlertDialogDescription>
                  </div>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  {/* Light red button */}
                  <AlertDialogAction className="bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60">
                    Block User
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ];

  const filteredData = useMemo(() => {
    return mockAccessLogs.filter((log) => {
      const matchesSearch =
        log.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || log.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-balance">Access Logs</h1>
      </div>

      {/* Search and Filter Controls */}
      <Card className="shadow-md border border-red-200 dark:border-red-900/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
            Security Monitoring
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Track and filter authentication activity in real time
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by email, name, or IP address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px] flex items-center gap-2 focus:ring-2 focus:ring-red-500">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success" className="text-green-600">
                  Success
                </SelectItem>
                <SelectItem value="failed" className="text-red-600">
                  Failed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Access Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Access Log Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="whitespace-nowrap">
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
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={
                        index % 2 === 0
                          ? "bg-background hover:bg-muted/50"
                          : "bg-muted/20 hover:bg-muted/40"
                      }
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-nowrap">
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
                      No access logs found.
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
    </div>
  );
}
