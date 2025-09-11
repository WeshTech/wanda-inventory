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
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog"; // Add this import
import { AddSupplierDialog } from "./add-suppler-dialog";

// Supplier type definition
export interface Supplier {
  id: string;
  name: string;
  description?: string; // Made optional
  contact?: string; // Made optional
  email?: string; // Made optional
  phone?: string; // Made optional
}

// Mock data for suppliers
const mockSuppliers: Supplier[] = [
  {
    id: "SUP001",
    name: "Tech Solutions Inc",
    description: "Computer hardware, software licenses, and IT equipment",
    contact: "John Smith",
    email: "john@techsolutions.com",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "SUP002",
    name: "Global Materials Ltd",
    description: "Raw materials, steel, aluminum, and construction supplies",
    contact: "Sarah Johnson",
    email: "sarah@globalmaterials.com",
    phone: "+1 (555) 987-6543",
  },
  {
    id: "SUP003",
    name: "Premium Parts Co",
    description: "Automotive parts, machinery components, and spare parts",
    contact: "Mike Wilson",
    email: "mike@premiumparts.com",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "SUP004",
    name: "Industrial Supply Corp",
    description: "Industrial tools, safety equipment, and maintenance supplies",
    contact: "Lisa Brown",
    email: "lisa@industrialsupply.com",
    phone: "+1 (555) 321-0987",
  },
  {
    id: "SUP005",
    name: "Quality Components",
    description: "Electronic components, circuit boards, and semiconductors",
    contact: "David Lee",
    email: "david@qualitycomponents.com",
    phone: "+1 (555) 654-3210",
  },
  {
    id: "SUP006",
    name: "Reliable Resources",
    description: "Office supplies, furniture, and business equipment",
    contact: "Emma Davis",
    email: "emma@reliableresources.com",
    phone: "+1 (555) 789-0123",
  },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = useMemo(() => {
    if (!searchTerm) return suppliers;

    return suppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (supplier.contact &&
          supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (supplier.email &&
          supplier.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (supplier.description &&
          supplier.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [suppliers, searchTerm]);

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSuppliers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSuppliers, currentPage, itemsPerPage]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddSupplier = (data: Omit<Supplier, "id">) => {
    const newSupplier: Supplier = {
      id: `SUP${String(suppliers.length + 1).padStart(3, "0")}`,
      name: data.name,
      description: data.description,
      contact: data.contact,
      email: data.email,
      phone: data.phone,
    };
    setSuppliers([...suppliers, newSupplier]);
    setAddDialogOpen(false);
  };

  const handleEditSupplier = (data: Supplier) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === data.id ? { ...supplier, ...data } : supplier
      )
    );
    setEditDialogOpen(false);
    setSelectedSupplier(null);
  };

  const handleDeleteSupplier = () => {
    if (selectedSupplier) {
      setSuppliers(
        suppliers.filter((supplier) => supplier.id !== selectedSupplier.id)
      );
      setSelectedSupplier(null);
    }
  };

  const openEditDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setDeleteDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between">
            <h1 className="text-3xl font-bold text-foreground">Suppliers</h1>

            <div className="flex-1 max-w-md mx-0 sm:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Supplier
            </Button>
          </div>

          {searchTerm && (
            <div className="mb-4 text-sm text-muted-foreground">
              Found {filteredSuppliers.length} supplier
              {filteredSuppliers.length !== 1 ? "s" : ""} matching `$
              {searchTerm}`
            </div>
          )}

          {/* Suppliers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginatedSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
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
                          {supplier.id}
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
                      <span className="text-muted-foreground">Supplies:</span>
                      <p className="font-medium text-foreground mt-1 leading-relaxed">
                        {supplier.description || "No description provided"}
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

          {/* Dialogs */}
          <AddSupplierDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            onSubmit={handleAddSupplier}
          />

          <EditSupplierDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            supplier={selectedSupplier}
            onSubmit={handleEditSupplier}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            supplierName={selectedSupplier?.name || ""}
            onConfirm={handleDeleteSupplier}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
