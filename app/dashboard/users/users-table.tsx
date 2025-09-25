"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Download,
  Upload,
  UserPlus,
  Edit,
  Ban,
  Trash2,
  Search,
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
import { InviteUserDialog } from "./invite-user-dalog";
import { InviteUserForm } from "@/schemas/users/inviteUserSchema";
import { MOCK_USERS, User } from "./mock";

const getRoleColor = (role: User["role"]) => {
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
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isConfirmBlockDialogOpen, setIsConfirmBlockDialogOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleInviteUser = (data: InviteUserForm) => {
    console.log("Inviting user:", data);
    // Here you would typically send the data to your API
    toast.success("User Invited", {
      description: `Invitation sent to ${data.email}`,
    });
  };

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "profilePhoto",
        header: "Photo",
        cell: ({ row }) => (
          <Image
            src={row.original.profilePhoto || "/placeholder.svg"}
            alt={`${row.original.name}'s profile photo`}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.name}</div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <Badge className={getRoleColor(row.original.role)}>
            {row.original.role}
          </Badge>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.original.email}</div>,
      },
      {
        accessorKey: "joinDate",
        header: "Join Date",
        cell: ({ row }) => (
          <div className="text-sm">
            {new Date(row.original.joinDate).toLocaleString()}
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
        pageSize: 10, // Default page size
      },
    },
  });

  const handleExport = () => {
    console.log("Exporting users...");
    toast.info("Export Initiated", {
      description: "User data is being prepared for download.",
    });
    // In a real app, trigger a download or API call
  };

  const handleImport = () => {
    console.log("Importing users...");
    toast.info("Import Initiated", {
      description: "Please select a file to import user data.",
    });
    // In a real app, open file input dialog
  };

  const handleEditUser = (user: User) => {
    console.log("Editing user:", user.name);
    toast.info("Edit User", {
      description: `Opening edit form for ${user.name}. (Not implemented)`,
    });
    // Implement actual edit logic or open an edit dialog
  };

  const handleBlockUser = (user: User) => {
    setSelectedUser(user);
    setIsConfirmBlockDialogOpen(true);
  };

  const confirmBlockUser = () => {
    if (selectedUser) {
      console.log("Blocking user:", selectedUser.name);
      setUsers(users.filter((u) => u.id !== selectedUser.id)); // Remove from local state for demo
      toast.warning("User Blocked", {
        description: `${selectedUser.name} has been blocked.`,
      });
      // In a real app, update user status in backend
      setIsConfirmBlockDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsConfirmDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      console.log("Deleting user:", selectedUser.name);
      setUsers(users.filter((u) => u.id !== selectedUser.id)); // Remove from local state for demo
      toast.error("User Deleted", {
        description: `${selectedUser.name} has been permanently deleted.`,
      });
      // In a real app, delete user from backend
      setIsConfirmDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="grid gap-4 p-2">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input - Full width on mobile, constrained on larger screens */}
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

        {/* Action Buttons - Wrap on small screens, stay in row on larger */}
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
            <span className="sr-only sm:not-sr-only">Invite Users</span>
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-x-auto max-w-[calc(100vw-2rem)] lg:max-w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />

      {/* Block User Confirmation Dialog */}
      <AlertDialog
        open={isConfirmBlockDialogOpen}
        onOpenChange={setIsConfirmBlockDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will block {selectedUser?.name}. They will no longer
              be able to access the application. You can unblock them later.
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

      {/* Delete User Confirmation Dialog */}
      <AlertDialog
        open={isConfirmDeleteDialogOpen}
        onOpenChange={setIsConfirmDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedUser?.name} and remove their data from our servers.
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

      <InviteUserDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onInviteUser={handleInviteUser}
      />
    </div>
  );
}
