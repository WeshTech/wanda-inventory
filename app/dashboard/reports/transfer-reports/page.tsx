"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Package,
  Store,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Transfer } from "@/types/transfers";
import { ViewTransferDialog } from "./view-transfer-dialog";
import { EditTransferDialog } from "./edit-transfer-dialog";
import { DeleteTransferDialog } from "./delete-transfer-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

function SimplePagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: SimplePaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 mb-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} transfers
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            value={itemsPerPage}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex bg-transparent"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 bg-transparent"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 sm:flex bg-transparent"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mockTransfers: Transfer[] = [
  {
    id: 1,
    productName: "iPhone 15 Pro",
    productImage: "/modern-smartphone.png",
    from: "Main Store",
    to: "Branch A",
    status: "completed",
    time: "2024-01-15 10:30 AM",
    receivedBy: "John Doe",
    quantity: 5,
  },
  {
    id: 2,
    productName: "MacBook Air M2",
    productImage: "/macbook.jpg",
    from: "Warehouse",
    to: "Main Store",
    status: "pending",
    time: "2024-01-15 09:15 AM",
    receivedBy: "",
    quantity: 3,
  },
  {
    id: 3,
    productName: "AirPods Pro",
    productImage: "/generic-wireless-earbuds.png",
    from: "Branch B",
    to: "Branch C",
    status: "in-transit",
    time: "2024-01-14 02:45 PM",
    receivedBy: "",
    quantity: 10,
  },
  {
    id: 4,
    productName: "iPad Pro 12.9",
    productImage: "/silver-ipad-on-wooden-desk.png",
    from: "Main Store",
    to: "Warehouse",
    status: "completed",
    time: "2024-01-14 11:20 AM",
    receivedBy: "Sarah Wilson",
    quantity: 2,
  },
  {
    id: 5,
    productName: "Apple Watch Series 9",
    productImage: "/smartwatch.png",
    from: "Branch A",
    to: "Main Store",
    status: "failed",
    time: "2024-01-13 04:10 PM",
    receivedBy: "",
    quantity: 8,
  },
  {
    id: 6,
    productName: "Mac Studio",
    productImage: "/mac-studio-setup.png",
    from: "Warehouse",
    to: "Branch B",
    status: "completed",
    time: "2024-01-13 01:30 PM",
    receivedBy: "Mike Johnson",
    quantity: 1,
  },
];

const stores = [
  "All Stores",
  "Main Store",
  "Warehouse",
  "Branch A",
  "Branch B",
  "Branch C",
];

export default function TransferLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromStore, setFromStore] = useState("All Stores");
  const [toStore, setToStore] = useState("All Stores");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null
  );
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);
  const [deletingTransfer, setDeletingTransfer] = useState<Transfer | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Filter transfers based on search and filters
  const filteredTransfers = mockTransfers.filter((transfer) => {
    const matchesSearch = transfer.productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFrom =
      fromStore === "All Stores" || transfer.from === fromStore;
    const matchesTo = toStore === "All Stores" || transfer.to === toStore;
    return matchesSearch && matchesFrom && matchesTo;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransfers = filteredTransfers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status: Transfer["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "in-transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const handleDelete = (id: number) => {
    // Handle delete logic here
    console.log("Deleting transfer:", id);
  };

  const handleUpdate = (transfer: Transfer) => {
    // Handle update logic here
    console.log("Updating transfer:", transfer);
  };

  const handleViewTransfer = (transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setViewDialogOpen(true);
  };

  const handleEditTransfer = (transfer: Transfer) => {
    setEditingTransfer(transfer);
    setEditDialogOpen(true);
  };

  const handleDeleteTransfer = (transfer: Transfer) => {
    setDeletingTransfer(transfer);
    setDeleteDialogOpen(true);
  };

  const handlePageSizeChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-balance">Transfer Logs</h1>
      </div>

      {/* Search and Filter Controls */}
      <Card className="shadow-md border border-primary/20 dark:border-primary/40">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            <h2 className="text-lg font-semibold">
              Product Transfer Management
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Track and manage product transfers between stores
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* From Store Filter */}
            <Select value={fromStore} onValueChange={setFromStore}>
              <SelectTrigger className="w-full lg:w-[200px] flex items-center gap-2 focus:ring-2 focus:ring-primary">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="From store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* To Store Filter */}
            <Select value={toStore} onValueChange={setToStore}>
              <SelectTrigger className="w-full lg:w-[200px] flex items-center gap-2 focus:ring-2 focus:ring-primary">
                <Store className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="To store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transfer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedTransfers.map((transfer) => (
          <Card key={transfer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={transfer.productImage || "/placeholder.svg"}
                    alt={transfer.productName}
                  />
                  <AvatarFallback>
                    {transfer.productName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {transfer.productName}
                  </h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">From:</span>
                  <span className="font-medium">{transfer.from}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium">{transfer.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(transfer.status)}>
                    {transfer.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">
                    {transfer.time}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 justify-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/20 bg-transparent"
                      onClick={() => handleViewTransfer(transfer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View Transfer</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 text-yellow-600 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-700 dark:text-yellow-400 dark:border-yellow-800 dark:hover:bg-yellow-900/20 bg-transparent"
                      onClick={() => handleEditTransfer(transfer)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Update Transfer</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="w-10 h-10 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 bg-transparent"
                      onClick={() => handleDeleteTransfer(transfer)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Delete Transfer</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ViewTransferDialog
        transfer={selectedTransfer}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <EditTransferDialog
        transfer={editingTransfer}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleUpdate}
        stores={stores}
      />

      <DeleteTransferDialog
        transfer={deletingTransfer}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />

      {/* Pagination */}
      {totalPages > 0 && (
        <SimplePagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTransfers.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      {/* No Results */}
      {filteredTransfers.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No transfers found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
