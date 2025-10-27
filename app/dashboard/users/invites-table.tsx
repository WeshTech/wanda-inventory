"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { toast } from "sonner";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { BusinessUserResponseData } from "@/types/users";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInvitedBusinessUsers } from "@/server-queries/userQuery";
import { formatToKenyanTime } from "@/utils/time-format";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loading-spiner";

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "bg-primary/10 text-primary";
    case "Member":
      return "bg-secondary/10 text-secondary";
    case "Viewer":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function InvitesTable() {
  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";

  const {
    data,
    isLoading: queryLoading,
    isFetching,
    error,
  } = useInvitedBusinessUsers(businessId);

  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    if (isAuthLoading) {
      toast("Authenticating", {
        description: "Verifying user credentials...",
      });
    }
  }, [isAuthLoading]);

  //  Now the API already returns invited users only
  const invites = data?.data ?? [];

  //  Merge all loading states together
  const isLoading = isAuthLoading || queryLoading || isFetching;

  const columns: ColumnDef<BusinessUserResponseData>[] = useMemo(
    () => [
      {
        accessorKey: "profilePhoto",
        header: "Photo",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Image
              src={"/images/placeholder.jpg"}
              alt={`${row.original.userName}'s profile photo`}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "userName",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.userName}</div>
        ),
      },
      {
        accessorKey: "roleName",
        header: "Role",
        cell: ({ row }) => (
          <Badge className={getRoleColor(row.original.roleName)}>
            {row.original.roleName}
          </Badge>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.original.email}</div>,
      },
      {
        accessorKey: "storeName",
        header: "Store",
        cell: ({ row }) => (
          <div
            className={
              row.original.storeName
                ? "text-foreground"
                : "text-red-600 bg-red-50 px-2 py-1 rounded"
            }
          >
            {row.original.storeName ?? "Unassigned"}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Join Date",
        cell: ({ row }) => (
          <div className="text-sm">
            {formatToKenyanTime(new Date(row.original.createdAt))}
          </div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Last Updated",
        cell: ({ row }) => (
          <div className="text-sm">
            {formatToKenyanTime(new Date(row.original.updatedAt))}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: invites,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleClearSearch = () => {
    setGlobalFilter("");
  };

  return (
    <div className="grid gap-4 p-2">
      {/* Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="w-full rounded-lg bg-background pl-10 pr-3 h-10"
            value={globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
        </div>
      </div>

      {/* Table */}
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
            {isLoading ? (
              //  Loader state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <Loader text="Loading invites..." size="md" />
                </TableCell>
              </TableRow>
            ) : error ? (
              //  Error state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-600"
                >
                  Error: {error.message || "Failed to fetch invites."}
                </TableCell>
              </TableRow>
            ) : invites.length === 0 ? (
              // Empty state (after fetch is done)
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/images/nostorefound.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-medium">No pending invites</p>
                    <p className="text-sm text-muted-foreground">
                      There are no pending user invites.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              //  Data rows
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
              // 🔍 Filtered out state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-64 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/images/nostorefound.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <p className="text-base font-medium">
                      No invites match the applied filters
                    </p>
                    <Button onClick={handleClearSearch} variant="outline">
                      <X className="mr-2 h-4 w-4" />
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
    </div>
  );
}
