"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import {
  ColumnDef,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
} from "@/components/ui/alert-dialog";
import { DataTablePagination } from "@/components/dashboard/TablePagination";

type Invite = {
  id: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  invitedAt: string; // ISO string or similar for date/time
};

const MOCK_INVITES: Invite[] = [
  {
    id: "inv1",
    email: "new.user1@example.com",
    role: "Member",
    invitedAt: "2025-08-01T10:00:00Z",
  },
  {
    id: "inv2",
    email: "admin.candidate@example.com",
    role: "Admin",
    invitedAt: "2025-07-28T14:30:00Z",
  },
  {
    id: "inv3",
    email: "viewer.request@example.com",
    role: "Viewer",
    invitedAt: "2025-07-25T09:15:00Z",
  },
  {
    id: "inv4",
    email: "another.invite@example.com",
    role: "Member",
    invitedAt: "2025-08-02T11:00:00Z",
  },
  {
    id: "inv5",
    email: "test.admin@example.com",
    role: "Admin",
    invitedAt: "2025-07-30T16:00:00Z",
  },
  {
    id: "inv6",
    email: "guest.viewer@example.com",
    role: "Viewer",
    invitedAt: "2025-07-29T08:00:00Z",
  },
];

const getRoleColor = (role: Invite["role"]) => {
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
  const [invites, setInvites] = useState<Invite[]>(MOCK_INVITES);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isConfirmRevokeDialogOpen, setIsConfirmRevokeDialogOpen] =
    useState(false);
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);

  const columns: ColumnDef<Invite>[] = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.email}</div>
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
        accessorKey: "invitedAt",
        header: "Invited At",
        cell: ({ row }) => (
          <div>{new Date(row.original.invitedAt).toLocaleString()}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const invite = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => handleRevokeInvite(invite)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Revoke Invite
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        enableSorting: false,
        enableHiding: false,
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
        pageSize: 10, // Default page size
      },
    },
  });

  const handleRevokeInvite = (invite: Invite) => {
    setSelectedInvite(invite);
    setIsConfirmRevokeDialogOpen(true);
  };

  const confirmRevokeInvite = () => {
    if (selectedInvite) {
      console.log("Revoking invite for:", selectedInvite.email);
      setInvites(invites.filter((i) => i.id !== selectedInvite.id));
      toast.error("Invite Revoked", {
        description: `The invitation for ${selectedInvite.email} has been revoked.`,
      });
      // In a real app, send API call to revoke invite
      setIsConfirmRevokeDialogOpen(false);
      setSelectedInvite(null);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by email..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
        </div>
        {/* No export/import/invite buttons for invites table as per previous request, but can be added */}
      </div>

      <div className="rounded-lg border shadow-sm">
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
                  No pending invites.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />

      {/* Revoke Invite Confirmation Dialog */}
      <AlertDialog
        open={isConfirmRevokeDialogOpen}
        onOpenChange={setIsConfirmRevokeDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will revoke the invitation for {selectedInvite?.email}
              . They will no longer be able to join using this invite.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRevokeInvite}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
