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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Users,
  UserCheck,
  UserX,
  Activity,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  XCircle,
} from "lucide-react";

import { AddCustomerDialog } from "./add-customer-dialog";
import { EditCustomerDialog } from "./edit-customer-dialog";
import { SimplePagination } from "./simple-pagination";

import { useAuthStore } from "@/stores/authStore";
import { BusinessCustomerData } from "@/types/customers";
import {
  useGetBusinessCustomers,
  useGetBusinessCustomerStats,
} from "@/server-queries/customerQueries";
import { CustomerStatsSkeleton } from "./customer-stats-skeleton";
import { CustomersListSkeleton } from "./customer-list-skeleton";
import { DeleteNotAllowedDialog } from "./delete-confitmation-dialog";

export default function CustomersPage() {
  const { user, isLoading: authLoading } = useAuthStore();
  const businessId = user?.businessId ?? "";

  const {
    data: customersResponse,
    isLoading: customersLoading,
    error: customersError,
  } = useGetBusinessCustomers(businessId);

  const customers = useMemo(
    () => customersResponse?.data || [],
    [customersResponse]
  );

  // Stats query
  const {
    data: statsResponse,
    isLoading: statsLoading,
    error: statsError,
  } = useGetBusinessCustomerStats(businessId);

  // Local UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<BusinessCustomerData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Search + pagination
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    return customers.filter(
      (customer) =>
        customer.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (customer.phone ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (customer.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // Handlers
  const openEditDialog = (customer: BusinessCustomerData) => {
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (customer: BusinessCustomerData) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

  // Empty state renderer
  const renderEmptyState = (type: "no-customers" | "no-results") => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Avatar className="h-32 w-32">
        <AvatarImage src="/images/nostorefound.jpg" alt="No customers" />
        <AvatarFallback className="text-xl font-semibold bg-muted">
          NC
        </AvatarFallback>
      </Avatar>
      <p className="text-lg font-medium text-muted-foreground">
        {type === "no-customers"
          ? "Create your first customer"
          : "No matching customers"}
      </p>
      {type === "no-customers" ? (
        <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      ) : (
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setSearchTerm("")}
        >
          <XCircle className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  const isCustomersLoading = authLoading || customersLoading;

  return (
    <TooltipProvider>
      <div className="min-h-screen p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold text-foreground">
              Customers
            </h1>
            <div className="flex gap-3">
              <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Customer
              </Button>
            </div>
          </div>

          {/* Stats */}
          {statsLoading ? (
            <CustomerStatsSkeleton />
          ) : statsError ? (
            <div className="text-red-500 font-medium mb-6">
              {statsError.message || "Failed to load stats"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Customers
                    </p>
                    <p className="text-2xl font-bold">
                      {statsResponse?.data?.totalCustomers ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold">
                      {statsResponse?.data?.totalCustomers ?? 0}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <UserX className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inactive</p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Contacts Log In Today
                    </p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex gap-3 flex-1 max-w-4xl items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search Customer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Customers */}
          {isCustomersLoading ? (
            <CustomersListSkeleton />
          ) : customersError ? (
            <div className="text-red-500 font-medium">
              {customersError.message || "Failed to load customers"}
            </div>
          ) : customers.length === 0 ? (
            renderEmptyState("no-customers")
          ) : filteredCustomers.length === 0 ? (
            renderEmptyState("no-results")
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {paginatedCustomers.map((customer) => (
                  <Card key={customer.id} className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-2">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                            {getInitials(customer.customerName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-foreground truncate">
                            {customer.customerName}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {customer.email ?? "NA"}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-2 pb-2">
                      <div className="text-sm">
                        <p className="text-muted-foreground">Mobile</p>
                        <p className="font-medium truncate">
                          {customer.phone ?? "NA"}
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Status</p>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-0">
                      <div className="flex gap-2 w-full">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 gap-2 bg-transparent"
                              onClick={() => openEditDialog(customer)}
                            >
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit customer details</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent hover:bg-red-200"
                              onClick={() => openDeleteDialog(customer)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete customer</TooltipContent>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mb-8">
                <SimplePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredCustomers.length}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={(size) => {
                    setItemsPerPage(size);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </>
          )}

          {/* Dialogs */}
          <AddCustomerDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
          />
          <EditCustomerDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            customer={selectedCustomer}
            onSubmit={() => {}}
          />
          <DeleteNotAllowedDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            customerName={selectedCustomer?.customerName || ""}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
