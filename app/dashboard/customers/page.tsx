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
  MoreHorizontal,
  Upload,
  Filter,
} from "lucide-react";
import { AddCustomerDialog } from "./add-customer-dialog";
import { EditCustomerDialog } from "./edit-customer-dialog";
import { DeleteConfirmationDialog } from "./delete-confitmation-dialog";
import { SimplePagination } from "./simple-pagination";

// Customer type definition
export interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

// Mock data for customers
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Elon Mask",
    phone: "(207) 444-2901",
    avatar: "/elon-musk-portrait.png",
  },
  {
    id: "2",
    name: "Tony Stark",
    phone: "(207) 234-3214",
    avatar: "/tony-stark.jpg",
  },
  {
    id: "3",
    name: "Henry Cavil",
    phone: "44-0343-234",
    avatar: "/henry-cavill.jpg",
  },
  {
    id: "4",
    name: "Mike Banner",
    phone: "(223) 323-7743",
    avatar: "/mike-banner.jpg",
  },
  {
    id: "5",
    name: "Tom Camel",
    phone: "11-2093-2342",
  },
  {
    id: "6",
    name: "Raj Patel",
    phone: "(234) 11-23333",
  },
  {
    id: "7",
    name: "James Brown",
    phone: "11-3664-2424",
  },
  {
    id: "8",
    name: "Wei Chen",
    phone: "(001) 221-2901",
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  const stats = useMemo(() => {
    const total = customers.length;
    const active = total;
    const inactive = 0;
    const loggedInToday = 4;

    return { total, active, inactive, loggedInToday };
  }, [customers]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAddCustomer = (data: { name: string; phone: string }) => {
    const newCustomer: Customer = {
      id: String(customers.length + 1),
      name: data.name,
      phone: data.phone,
    };
    setCustomers([...customers, newCustomer]);
    setAddDialogOpen(false);
  };

  const handleEditCustomer = (data: { name: string; phone: string }) => {
    if (selectedCustomer) {
      setCustomers(
        customers.map((customer) =>
          customer.id === selectedCustomer.id
            ? { ...customer, name: data.name, phone: data.phone }
            : customer
        )
      );
      setEditDialogOpen(false);
      setSelectedCustomer(null);
    }
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(
        customers.filter((customer) => customer.id !== selectedCustomer.id)
      );
      setSelectedCustomer(null);
      setDeleteDialogOpen(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setItemsPerPage(pageSize);
    setCurrentPage(1);
  };

  const openEditDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };

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
              <Button variant="outline" className="gap-2 bg-transparent">
                <Upload className="h-4 w-4" />
                Import Customers
              </Button>
              <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                New Customer
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Customers
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.total.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Customers
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.active.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Inactive Customers
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.inactive.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contacts Log In Today
                  </p>
                  <p className="text-2xl font-bold">
                    {stats.loggedInToday.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Export
              </Button>
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
            </div>

            <div className="flex gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

          {/* Customers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paginatedCustomers.map((customer) => (
              <Card key={customer.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {customer.name}
                        </h3>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2 pb-2">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Mobile</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Status</p>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
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
                      <TooltipContent>
                        <p>Edit customer details</p>
                      </TooltipContent>
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
                      <TooltipContent>
                        <p>Delete customer</p>
                      </TooltipContent>
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
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>

          {/* Dialogs */}
          <AddCustomerDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            onSubmit={handleAddCustomer}
          />

          <EditCustomerDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            customer={selectedCustomer}
            onSubmit={handleEditCustomer}
          />

          <DeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            customerName={selectedCustomer?.name || ""}
            onConfirm={handleDeleteCustomer}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
