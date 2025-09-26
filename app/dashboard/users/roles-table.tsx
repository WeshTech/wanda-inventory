"use client";

import { useState, useMemo } from "react";
import { Download, Plus, Search, Edit } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateRoleDialog } from "./create-role-dialog";
import { UpdateRoleDialog } from "./update-role-dialog";
import { DataTablePagination } from "@/components/dashboard/TablePagination";
import { useAuthStore } from "@/stores/authStore";
import { useGetBusinessRoles } from "@/server-queries/roleQueries";
import { BusinessRoleItem } from "@/types/roles";
import { formatToKenyanTime } from "@/utils/time-format";
import Loader from "@/components/ui/loading-spiner";

type RoleRow = {
  id: string;
  title: string;
  description: string;
  activeUsers: number;
  dateCreated: string;
};

export function RolesTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [updateRoleId, setUpdateRoleId] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId;

  const {
    data: rolesResponse,
    isLoading,
    error,
    refetch,
  } = useGetBusinessRoles(businessId);

  const roles: RoleRow[] = useMemo(() => {
    if (!rolesResponse?.success || !rolesResponse.data?.roles) {
      return [];
    }
    return rolesResponse.data.roles.map((role: BusinessRoleItem) => ({
      id: role.roleId,
      title: role.roleName.charAt(0).toUpperCase() + role.roleName.slice(1),
      description: role.description,
      activeUsers: role.activeUsers,
      dateCreated: formatToKenyanTime(new Date(role.createdAt)),
    }));
  }, [rolesResponse]);

  const handleExportData = () => {
    toast.info("Feature Coming Soon", {
      description: "Exporting roles data is not yet implemented.",
    });
  };

  const handleEditRole = (role: RoleRow) => {
    setUpdateRoleId(role.id);
  };

  const handleRoleCreate = () => {
    refetch();
    setIsAddRoleDialogOpen(false);
    toast.success("Role created successfully");
  };

  const columns: ColumnDef<RoleRow>[] = useMemo(
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
        cell: ({ row }) => <div>{row.original.dateCreated}</div>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const role = row.original;
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditRole(role)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Role</p>
                </TooltipContent>
              </Tooltip>
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
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <Loader text="Loading roles..." size="md" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-destructive"
                >
                  Error: {rolesResponse?.message || "Failed to load roles"}
                  <Button variant="default" onClick={() => refetch()}>
                    Retry
                  </Button>
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

      <CreateRoleDialog
        open={isAddRoleDialogOpen}
        onOpenChange={setIsAddRoleDialogOpen}
        onRoleCreate={handleRoleCreate}
      />
      <UpdateRoleDialog
        open={!!updateRoleId}
        onOpenChange={(open) => {
          if (!open) setUpdateRoleId(null);
        }}
        roleId={updateRoleId}
        onRoleUpdate={refetch}
      />
    </div>
  );
}
