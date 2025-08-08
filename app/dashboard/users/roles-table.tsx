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
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckedState } from "@radix-ui/react-checkbox"; // Import CheckedState for clarity

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DataTablePagination } from "@/components/dashboard/TablePagination";

type PermissionActions = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

type PermissionModuleKeys = "users" | "invites" | "roles";

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

const MOCK_ROLES: Role[] = [
  {
    id: "r1",
    title: "Administrator",
    description: "Full access to all features and settings.",
    activeUsers: 2,
    dateCreated: "2024-01-15T09:00:00Z",
    permissions: {
      users: { create: true, read: true, update: true, delete: true },
      invites: { create: true, read: true, update: true, delete: true },
      roles: { create: true, read: true, update: true, delete: true },
    },
  },
  {
    id: "r2",
    title: "Editor",
    description: "Can create and update content, but limited deletion.",
    activeUsers: 5,
    dateCreated: "2024-02-20T11:30:00Z",
    permissions: {
      users: { create: true, read: true, update: true, delete: false },
      invites: { create: true, read: true, update: true, delete: false },
      roles: { create: false, read: true, update: false, delete: false },
    },
  },
  {
    id: "r3",
    title: "Viewer",
    description: "Read-only access to most data.",
    activeUsers: 10,
    dateCreated: "2024-03-01T14:00:00Z",
    permissions: {
      users: { create: false, read: true, update: false, delete: false },
      invites: { create: false, read: true, update: false, delete: false },
      roles: { create: false, read: true, update: false, delete: false },
    },
  },
];

const PERMISSION_MODULES: { key: PermissionModuleKeys; label: string }[] = [
  { key: "users", label: "Users" },
  { key: "invites", label: "Invites" },
  { key: "roles", label: "Roles" },
];

const permissionActionsSchema = z.object({
  create: z.boolean(),
  read: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Role title must be at least 2 characters.",
    })
    .max(50, {
      message: "Role title must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "Role description must be at least 5 characters.",
    })
    .max(200, {
      message: "Role description must not exceed 200 characters.",
    }),
  permissions: z.object({
    users: permissionActionsSchema,
    invites: permissionActionsSchema,
    roles: permissionActionsSchema,
  }),
});

export function RolesTable() {
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      permissions: {
        users: { create: false, read: false, update: false, delete: false },
        invites: { create: false, read: false, update: false, delete: false },
        roles: { create: false, read: false, update: false, delete: false },
      },
    },
  });

  const handleToggleAllPermissions = (
    moduleKey: PermissionModuleKeys,
    checked: boolean
  ) => {
    form.setValue(`permissions.${moduleKey}.create`, checked);
    form.setValue(`permissions.${moduleKey}.read`, checked);
    form.setValue(`permissions.${moduleKey}.update`, checked);
    form.setValue(`permissions.${moduleKey}.delete`, checked);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newRole: Role = {
      id: `r${roles.length + 1}`, // Simple ID generation
      activeUsers: 0, // New roles start with 0 active users
      dateCreated: new Date().toISOString(),
      ...values,
    };
    setRoles((prev) => [...prev, newRole]);
    toast.success("Role Added!", {
      description: `The role "${newRole.title}" has been successfully added.`,
    });
    setIsAddRoleDialogOpen(false);
    form.reset(); // Reset form fields
  };

  const handleExportData = () => {
    toast.info("Feature Coming Soon", {
      description: "Exporting roles data is not yet implemented.",
    });
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
    <div className="grid gap-4">
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

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {" "}
          {/* Made dialog wider */}
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>
              Define a new role with its title, description, and specific
              permissions.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Marketing Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of the role's responsibilities and scope."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PERMISSION_MODULES.map((module) => {
                    const modulePermissions = form.watch(
                      `permissions.${module.key}`
                    );
                    const allChecked =
                      modulePermissions.create &&
                      modulePermissions.read &&
                      modulePermissions.update &&
                      modulePermissions.delete;
                    const anyChecked =
                      modulePermissions.create ||
                      modulePermissions.read ||
                      modulePermissions.update ||
                      modulePermissions.delete;
                    const isIndeterminate = anyChecked && !allChecked;

                    return (
                      <div key={module.key} className="border rounded-md p-4">
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={
                                isIndeterminate
                                  ? "indeterminate"
                                  : (allChecked as CheckedState)
                              } // Explicit cast here
                              onCheckedChange={(checkedState: CheckedState) => {
                                handleToggleAllPermissions(
                                  module.key,
                                  checkedState === true
                                );
                              }}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-base font-semibold">
                              {module.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                        <div className="grid grid-cols-2 gap-2 mt-4 pl-4">
                          {["create", "read", "update", "delete"].map(
                            (action) => (
                              <FormField
                                key={`${module.key}-${action}`}
                                control={form.control}
                                name={
                                  `permissions.${module.key}.${action}` as Path<
                                    z.infer<typeof formSchema>
                                  >
                                }
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={!!field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                      <FormLabel className="capitalize">
                                        {action}
                                      </FormLabel>
                                    </div>
                                  </FormItem>
                                )}
                              />
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddRoleDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Add Role</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
