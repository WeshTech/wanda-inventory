"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Plus,
  Upload,
  Download,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { DataTablePagination } from "./data-table-pagination";
import { AddCategoryDialog } from "./add-category-dialog";

interface Category {
  id: string;
  name: string;
  quantity: number;
  description: string;
}

const categories: Category[] = [
  {
    id: "CAT001",
    name: "Electronics",
    quantity: 120,
    description: "Gadgets, devices, and electronic components.",
  },
  {
    id: "CAT002",
    name: "Apparel",
    quantity: 350,
    description: "Clothing, footwear, and accessories for all ages.",
  },
  {
    id: "CAT003",
    name: "Home Goods",
    quantity: 80,
    description: "Furniture, decor, kitchenware, and home essentials.",
  },
  {
    id: "CAT004",
    name: "Books",
    quantity: 210,
    description: "Fiction, non-fiction, educational, and children's books.",
  },
  {
    id: "CAT005",
    name: "Sports & Outdoors",
    quantity: 95,
    description:
      "Equipment, apparel, and gear for sports and outdoor activities.",
  },
  {
    id: "CAT006",
    name: "Beauty & Personal Care",
    quantity: 180,
    description: "Skincare, makeup, haircare, and personal hygiene products.",
  },
  {
    id: "CAT007",
    name: "Toys & Games",
    quantity: 150,
    description: "Toys, board games, video games, and puzzles.",
  },
  {
    id: "CAT008",
    name: "Automotive",
    quantity: 60,
    description: "Car parts, accessories, and maintenance products.",
  },
  {
    id: "CAT009",
    name: "Food & Beverages",
    quantity: 200,
    description: "Packaged foods, snacks, drinks, and gourmet items.",
  },
  {
    id: "CAT010",
    name: "Pet Supplies",
    quantity: 75,
    description: "Food, toys, and accessories for pets.",
  },
  {
    id: "CAT011",
    name: "Jewelry",
    quantity: 40,
    description: "Rings, necklaces, bracelets, and earrings.",
  },
  {
    id: "CAT012",
    name: "Art Supplies",
    quantity: 55,
    description: "Paints, brushes, canvases, and craft materials.",
  },
];

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "Category ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(category.id)}
              >
                Copy Category ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <Edit className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                category &quot;{category.name}&quot; and remove its data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => console.log(`Deleting category: ${category.id}`)}
                className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export function CategoriesTable() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleAddCategory = (data: { name: string; store: string }) => {
    console.log("New category added:", data);
    // Here you would typically send the data to an API or update the categories array
    setIsAddCategoryDialogOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsAddCategoryDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
      <AddCategoryDialog
        open={isAddCategoryDialogOpen}
        onOpenChange={setIsAddCategoryDialogOpen}
        onCategoryAdd={handleAddCategory}
      />
    </div>
  );
}
