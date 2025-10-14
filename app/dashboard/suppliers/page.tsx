"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building2,
  User,
  Mail,
  Phone,
  Hash,
  Edit,
  Trash2,
  RotateCcw,
  Plus,
  FileText,
  Search,
} from "lucide-react";
import { SimplePagination } from "./simple-pagination";
import { EditSupplierDialog } from "./edit-supplier-dialog";
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { AddSupplierDialog } from "./add-suppler-dialog";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { SupplierData } from "@/types/suppliers";
import { useBusinessSuppliersQuery } from "@/server-queries/supplierQueries";
import { SuppliersSkeletonPage } from "./supplier-skeleton";
import Image from "next/image";

export default function SuppliersPage() {
  const { isLoading: authLoading } = useAuthStore();
  const businessId = useAuthBusinessId() || "";

  const {
    data,
    isLoading: queryLoading,
    isError,
    error,
  } = useBusinessSuppliersQuery(businessId);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierData | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const suppliers: SupplierData[] = useMemo(() => data?.data || [], [data]);

  const filteredSuppliers = useMemo(() => {
    if (!searchTerm) return suppliers;

    const lowerSearch = searchTerm.toLowerCase();
    return suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(lowerSearch) ||
        supplier.supplierId.toLowerCase().includes(lowerSearch) ||
        (supplier.contact &&
          supplier.contact.toLowerCase().includes(lowerSearch)) ||
        (supplier.email &&
          supplier.email.toLowerCase().includes(lowerSearch)) ||
        (supplier.suppllies &&
          supplier.suppllies.toLowerCase().includes(lowerSearch))
    );
  }, [suppliers, searchTerm]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSuppliers, currentPage, itemsPerPage]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const openEditDialog = (supplier: SupplierData) => {
    setSelectedSupplier(supplier);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (supplier: SupplierData) => {
    setSelectedSupplier(supplier);
    setDeleteDialogOpen(true);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handlePageSizeChange = (pageSize: number) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  };
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  /** ------------------
   * Conditional rendering
   * ------------------ */
  if (authLoading || queryLoading) {
    return <SuppliersSkeletonPage />;
  }

  if (isError) {
    return (
      <p className="p-6 text-destructive">
        Failed to load suppliers: {error.message}
      </p>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10 md:mb-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between">
            <h1 className="text-3xl font-bold text-foreground">Suppliers</h1>
            <div className="flex-1 max-w-md mx-0 sm:mx-8">
              {filteredSuppliers.length > 0 && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
            </div>

            <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </Button>
          </div>

          {searchTerm && filteredSuppliers.length > 0 && (
            <div className="mb-4 text-sm text-muted-foreground">
              Found {filteredSuppliers.length} supplier
              {filteredSuppliers.length !== 1 ? "s" : ""} matching `{searchTerm}
              `
            </div>
          )}

          {/* Empty State */}
          {suppliers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Avatar className="relative h-40 w-40 mb-6">
                <Image
                  src="/images/nostorefound.jpg"
                  alt="No suppliers found"
                  fill
                  className="object-contain rounded-lg"
                />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-2xl">
                  NS
                </AvatarFallback>
              </Avatar>

              <p className="text-lg md:text-xl font-medium text-muted-foreground mb-4">
                No supplier found
              </p>
              <p className="text-base font-medium text-muted-foreground mb-4">
                Create your first supplier
              </p>

              <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Supplier
              </Button>
            </div>
          ) : (
            <>
              {/* Suppliers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {paginatedSuppliers.map((supplier) => (
                  <Card
                    key={supplier.supplierId}
                    className="border border-border bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="bg-muted/50 p-4 rounded-t-lg m-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 bg-primary">
                            <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                              {getInitials(supplier.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {supplier.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Hash className="h-3 w-3" />
                              SID{supplier.supplierId.slice(-6)}
                            </div>
                          </div>
                        </div>
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 px-4 space-y-3">
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-muted-foreground">
                            Supplies:
                          </span>
                          <p className="font-medium text-foreground mt-1 leading-relaxed">
                            {supplier.suppllies || "No supplies provided"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="font-medium">
                          {supplier.contact || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium truncate">
                          {supplier.email || "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-medium">
                          {supplier.phone || "N/A"}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="bg-muted/30 p-4 rounded-b-lg m-0">
                      <div className="flex gap-2 w-full">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1 gap-2 bg-background/50"
                              onClick={() => openEditDialog(supplier)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit supplier details</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1 gap-2 bg-background/50"
                            >
                              <RotateCcw className="h-4 w-4" />
                              Update
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Update supplier information</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1 gap-2 bg-background/50 text-destructive hover:text-destructive hover:bg-red-200"
                              onClick={() => openDeleteDialog(supplier)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete supplier</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <SimplePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredSuppliers.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}

          {/* Dialogs */}
          <AddSupplierDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
          />

          <EditSupplierDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            supplier={selectedSupplier}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            supplierName={selectedSupplier?.name || ""}
            onConfirm={() => setDeleteDialogOpen(false)}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
