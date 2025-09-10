"use client";

import { useState, useMemo } from "react";
import { Download, Plus, Search } from "lucide-react";
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
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { CreateRoleDialog } from "./create-role-dialog"; // Import the provided CreateRoleDialog

// Update types to match CreateRoleDialog
type PermissionActions = {
  create: boolean;
  extract: boolean; // Changed from 'read' to 'extract'
  update: boolean;
  delete: boolean;
};

type PermissionModuleKeys =
  | "store"
  | "users"
  | "roles"
  | "products"
  | "storeInventory"
  | "categories"
  | "transfers"
  | "sales"
  | "invoices"
  | "suppliers"
  | "purchaseOrders";

type Role = {
  id: string;
  title: string;
  description: string;
  activeUsers: number;
  dateCreated: string; // ISO string
  permissions: {
    [key in PermissionModuleKeys]: PermissionActions;
  };
};

// Update MOCK_ROLES to include all permission modules and use 'extract'
const MOCK_ROLES: Role[] = [
  {
    id: "r1",
    title: "Administrator",
    description: "Full access to all features and settings.",
    activeUsers: 2,
    dateCreated: "2024-01-15T09:00:00Z",
    permissions: {
      store: { create: true, extract: true, update: true, delete: true },
      users: { create: true, extract: true, update: true, delete: true },
      roles: { create: true, extract: true, update: true, delete: true },
      products: { create: true, extract: true, update: true, delete: true },
      storeInventory: {
        create: true,
        extract: true,
        update: true,
        delete: true,
      },
      categories: { create: true, extract: true, update: true, delete: true },
      transfers: { create: true, extract: true, update: true, delete: true },
      sales: { create: true, extract: true, update: true, delete: true },
      invoices: { create: true, extract: true, update: true, delete: true },
      suppliers: { create: true, extract: true, update: true, delete: true },
      purchaseOrders: {
        create: true,
        extract: true,
        update: true,
        delete: true,
      },
    },
  },
  {
    id: "r2",
    title: "Editor",
    description: "Can create and update content, but limited deletion.",
    activeUsers: 5,
    dateCreated: "2024-02-20T11:30:00Z",
    permissions: {
      store: { create: true, extract: true, update: true, delete: false },
      users: { create: true, extract: true, update: true, delete: false },
      roles: { create: false, extract: true, update: false, delete: false },
      products: { create: true, extract: true, update: true, delete: false },
      storeInventory: {
        create: true,
        extract: true,
        update: true,
        delete: false,
      },
      categories: { create: true, extract: true, update: true, delete: false },
      transfers: { create: true, extract: true, update: true, delete: false },
      sales: { create: true, extract: true, update: true, delete: false },
      invoices: { create: true, extract: true, update: true, delete: false },
      suppliers: { create: true, extract: true, update: true, delete: false },
      purchaseOrders: {
        create: true,
        extract: true,
        update: true,
        delete: false,
      },
    },
  },
  {
    id: "r3",
    title: "Viewer",
    description: "Read-only access to most data.",
    activeUsers: 10,
    dateCreated: "2024-03-01T14:00:00Z",
    permissions: {
      store: { create: false, extract: true, update: false, delete: false },
      users: { create: false, extract: true, update: false, delete: false },
      roles: { create: false, extract: true, update: false, delete: false },
      products: { create: false, extract: true, update: false, delete: false },
      storeInventory: {
        create: false,
        extract: true,
        update: false,
        delete: false,
      },
      categories: {
        create: false,
        extract: true,
        update: false,
        delete: false,
      },
      transfers: { create: false, extract: true, update: false, delete: false },
      sales: { create: false, extract: true, update: false, delete: false },
      invoices: { create: false, extract: true, update: false, delete: false },
      suppliers: { create: false, extract: true, update: false, delete: false },
      purchaseOrders: {
        create: false,
        extract: true,
        update: false,
        delete: false,
      },
    },
  },
];

export function RolesTable() {
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);

  const handleExportData = () => {
    toast.info("Feature Coming Soon", {
      description: "Exporting roles data is not yet implemented.",
    });
  };

  // Define onRoleCreate callback for CreateRoleDialog
  const handleRoleCreate = (newRole: Role) => {
    console.log(newRole);
    setRoles((prev) => [...prev, newRole]);
    toast.success("Role Added!", {
      description: `The role "${newRole.title}" has been successfully added.`,
    });
    setIsAddRoleDialogOpen(false);
  };

  const columns: ColumnDef<Role>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Role Title",
        cell: ({ row }) => (
          <div className="font-medium">{row.original.title}</div>
        ),
      },
      {
        accessorKey: "description",
        header: "Role Description",
        cell: ({ row }) => (
          <div className="text-muted-foreground">
            {row.original.description}
          </div>
        ),
      },
      {
        accessorKey: "activeUsers",
        header: "Active Users",
        cell: ({ row }) => <div>{row.original.activeUsers}</div>,
      },
      {
        accessorKey: "dateCreated",
        header: "Date Created",
        cell: ({ row }) => (
          <div>{new Date(row.original.dateCreated).toLocaleDateString()}</div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: roles,
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

  return (
    <div className="grid gap-4 p-2">
      <div className="flex items-center sm:flex-col lg:flex-row lg:justify-between gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search roles..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm" onClick={() => setIsAddRoleDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm max-w-screen overflow-x-auto">
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
                  No roles found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />

      {/* Use CreateRoleDialog */}
      <CreateRoleDialog
        open={isAddRoleDialogOpen}
        onOpenChange={setIsAddRoleDialogOpen}
        onRoleCreate={handleRoleCreate}
      />
    </div>
  );
}
