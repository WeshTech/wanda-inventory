"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, X, Unlock } from "lucide-react";
import { toast } from "sonner";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { BusinessUserResponseData } from "@/types/users";
import { useAuthStore } from "@/stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useBlockedBusinessUsers,
  useUnblockBusinessUser,
} from "@/server-queries/userQuery";
import { formatToKenyanTime } from "@/utils/time-format";
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

export function BlockedUsersTable() {
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const businessId = user?.businessId;

  // ✅ use the new blocked users hook
  const {
    data,
    isLoading: queryLoading,
    isFetching,
    error,
  } = useBlockedBusinessUsers(businessId || "");

  const blockedUsers = data?.data ?? [];

  const [globalFilter, setGlobalFilter] = useState("");
  const [isConfirmUnblockDialogOpen, setIsConfirmUnblockDialogOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] =
    useState<BusinessUserResponseData | null>(null);

  useEffect(() => {
    if (isAuthLoading) {
      toast("Authenticating", {
        description: "Verifying user credentials...",
      });
    }
  }, [isAuthLoading]);

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
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <TooltipProvider>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleUnblockUser(user)}
                    >
                      <Unlock className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unblock</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          );
        },
        enableSorting: false,
        enableHiding: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: blockedUsers,
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

  const handleUnblockUser = (user: BusinessUserResponseData) => {
    setSelectedUser(user);
    setIsConfirmUnblockDialogOpen(true);
  };

  const unblockMutation = useUnblockBusinessUser();

  const confirmUnblockUser = () => {
    if (selectedUser && businessId) {
      unblockMutation.mutate(selectedUser.id, {
        onSuccess: () => {
          toast.success("User Unblocked", {
            description: `${selectedUser.userName} has been unblocked.`,
          });
          setIsConfirmUnblockDialogOpen(false);
          setSelectedUser(null);
        },
        onError: () => {
          toast.error("Failed to unblock user", {
            description: `${selectedUser.userName} could not be unblocked.`,
          });
        },
      });
    }
  };

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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <Loader text="Loading blocked users..." size="md" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-600"
                >
                  Error: {error.message || "Failed to fetch blocked users."}
                </TableCell>
              </TableRow>
            ) : blockedUsers.length === 0 ? (
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
                    <p className="text-lg font-medium">No blocked users</p>
                    <p className="text-sm text-muted-foreground">
                      There are no blocked users.
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
                  className="h-64 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/images/nostorefound.jpg" />
                      <AvatarFallback>NF</AvatarFallback>
                    </Avatar>
                    <p className="text-base font-medium">
                      No blocked users match the applied filters
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

      {/* Unblock dialog */}
      <AlertDialog
        open={isConfirmUnblockDialogOpen}
        onOpenChange={setIsConfirmUnblockDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will unblock <b>{selectedUser?.userName}</b>. They
              will be able to access the application again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmUnblockUser}
              className="bg-green-600 text-white hover:bg-green-100 hover:text-green-700"
            >
              {unblockMutation.isPending ? "Unblocking..." : "Unblock"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
