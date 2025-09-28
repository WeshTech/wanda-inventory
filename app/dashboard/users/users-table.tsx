"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Download,
  Upload,
  UserPlus,
  Edit,
  Ban,
  Trash2,
  Search,
  X,
} from "lucide-react";
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
import { UpdateUserDialog } from "./update-user-dialog";
import { BusinessUserResponseData } from "@/types/users";
import { useAuthStore } from "@/stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBusinessUsers } from "@/server-queries/userQuery";
import { formatToKenyanTime } from "@/utils/time-format";
import Loader from "@/components/ui/loading-spiner";
import { InviteUserDialog } from "./invite-user-dalog";

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

export function UsersTable() {
  const { user, isLoading: isAuthLoading } = useAuthStore();

  const businessId = user?.businessId;
  const {
    data,
    isLoading: queryLoading,
    isFetching,
    error,
  } = useBusinessUsers(businessId);

  const [globalFilter, setGlobalFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateSelectedUser, setUpdateSelectedUser] =
    useState<BusinessUserResponseData | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isConfirmBlockDialogOpen, setIsConfirmBlockDialogOpen] =
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

  const users = data?.data ?? [];

  // ✅ Merge all loading states together
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
                      className="h-8 w-8"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleBlockUser(user)}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Block</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
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
    data: users,
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

  const handleExport = () => {
    toast.info("Export Initiated", {
      description: "User data is being prepared for download.",
    });
  };

  const handleImport = () => {
    toast.info("Import Initiated", {
      description: "Please select a file to import user data.",
    });
  };

  const handleEditUser = (user: BusinessUserResponseData) => {
    setUpdateSelectedUser(user);
    setIsUpdateDialogOpen(true);
  };

  const handleBlockUser = (user: BusinessUserResponseData) => {
    setSelectedUser(user);
    setIsConfirmBlockDialogOpen(true);
  };

  const confirmBlockUser = () => {
    if (selectedUser) {
      toast.warning("User Blocked", {
        description: `${selectedUser.userName} has been blocked.`,
      });
      setIsConfirmBlockDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (user: BusinessUserResponseData) => {
    setSelectedUser(user);
    setIsConfirmDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      toast.error("User Deleted", {
        description: `${selectedUser.userName} has been permanently deleted.`,
      });
      setIsConfirmDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleClearSearch = () => {
    setGlobalFilter("");
  };

  return (
    <div className="grid gap-4 p-2">
      {/* Search + Actions */}
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
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none min-w-[100px] bg-transparent"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden lg:flex">Export</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none min-w-[100px] bg-transparent"
            onClick={handleImport}
          >
            <Upload className="mr-2 h-4 w-4" />
            <span className="hidden lg:flex">Import</span>
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-none min-w-[120px]"
            onClick={() => setIsDialogOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Add Users</span>
          </Button>
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
                  <Loader text="Loading users..." size="md" />
                </TableCell>
              </TableRow>
            ) : error ? (
              //  Error state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-600"
                >
                  Error: {error.message || "Failed to fetch users."}
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
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
                    <p className="text-lg font-medium">No user found</p>
                    <p className="text-sm text-muted-foreground">
                      Create your first user
                    </p>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create User
                    </Button>
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
                      No business users match the applied filters
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

      {/* Block dialog */}
      <AlertDialog
        open={isConfirmBlockDialogOpen}
        onOpenChange={setIsConfirmBlockDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will block {selectedUser?.userName}. They will no
              longer be able to access the application. You can unblock them
              later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBlockUser}
              className="bg-destructive text-destructive-foreground hover:bg-red-100 hover:text-red-700"
            >
              Block
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete dialog */}
      <AlertDialog
        open={isConfirmDeleteDialogOpen}
        onOpenChange={setIsConfirmDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedUser?.userName} and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-destructive text-destructive-foreground hover:bg-red-100 hover:text-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <InviteUserDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <UpdateUserDialog
        isOpen={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        selectedUser={updateSelectedUser ?? undefined}
      />
    </div>
  );
}
