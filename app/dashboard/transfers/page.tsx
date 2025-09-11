"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TransfersTable } from "./transfer-table";
import { CreateTransferDialog } from "./create-transfer-dialog";

type TransferStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED";

type Transfer = {
  id: number;
  productName: string;
  from: string;
  to: string;
  status: TransferStatus;
  sentBy: string;
  receivedBy: string;
  initiatedAt: string; // consider Date if parsed
  receivedAt: string; // same here
  quantity: number;
};

// Mock data for transfers
const mockTransfers: Transfer[] = [
  {
    id: 1,
    productName: "Wireless Headphones",
    from: "Main Store",
    to: "Branch A",
    status: "COMPLETED",
    sentBy: "John Doe",
    receivedBy: "Jane Smith",
    initiatedAt: "2024-01-15 10:30",
    receivedAt: "2024-01-16 14:20",
    quantity: 25,
  },
  {
    id: 2,
    productName: "Laptop Stand",
    from: "Branch B",
    to: "Main Store",
    status: "SUBMITTED",
    sentBy: "Mike Johnson",
    receivedBy: "-",
    initiatedAt: "2024-01-17 09:15",
    receivedAt: "-",
    quantity: 10,
  },
  {
    id: 3,
    productName: "USB Cable",
    from: "Main Store",
    to: "Branch C",
    status: "DRAFT",
    sentBy: "Sarah Wilson",
    receivedBy: "-",
    initiatedAt: "2024-01-18 11:45",
    receivedAt: "-",
    quantity: 50,
  },
  {
    id: 4,
    productName: "Bluetooth Speaker",
    from: "Branch A",
    to: "Branch B",
    status: "APPROVED",
    sentBy: "Tom Brown",
    receivedBy: "-",
    initiatedAt: "2024-01-19 08:30",
    receivedAt: "-",
    quantity: 15,
  },
  {
    id: 5,
    productName: "Phone Case",
    from: "Branch C",
    to: "Main Store",
    status: "REJECTED",
    sentBy: "Lisa Davis",
    receivedBy: "-",
    initiatedAt: "2024-01-20 13:20",
    receivedAt: "-",
    quantity: 30,
  },
  {
    id: 6,
    productName: "Tablet",
    from: "Main Store",
    to: "Branch A",
    status: "CANCELLED",
    sentBy: "Alex Chen",
    receivedBy: "-",
    initiatedAt: "2024-01-21 16:10",
    receivedAt: "-",
    quantity: 5,
  },
];

export default function GoodsTransferPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Filter transfers based on search term and filters
  const filteredTransfers = useMemo(() => {
    let filtered = mockTransfers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((transfer) =>
        transfer.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (transfer) => transfer.status === statusFilter
      );
    }

    // Store filter (transfer into/out of store)
    if (storeFilter !== "all") {
      filtered = filtered.filter(
        (transfer) =>
          transfer.from === storeFilter || transfer.to === storeFilter
      );
    }

    return filtered;
  }, [searchTerm, statusFilter, storeFilter]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setStoreFilter("all");
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchTerm || statusFilter !== "all" || storeFilter !== "all";

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Goods Transfers</h1>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Transfer
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger
                      id="transfer-status-filter"
                      className="w-full sm:w-[140px]"
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent id="transfer-status-filter-content">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="SUBMITTED">Submitted</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger
                    id="transfer-store-filter"
                    className="w-full sm:w-[140px]"
                  >
                    <SelectValue placeholder="Store" />
                  </SelectTrigger>
                  <SelectContent id="transfer-store-filter-content">
                    <SelectItem value="all">All Stores</SelectItem>
                    <SelectItem value="Main Store">Main Store</SelectItem>
                    <SelectItem value="Branch A">Branch A</SelectItem>
                    <SelectItem value="Branch B">Branch B</SelectItem>
                    <SelectItem value="Branch C">Branch C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 px-2 lg:px-3"
                >
                  Clear
                  <X className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchTerm}
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Status: {statusFilter}
                    <button
                      onClick={() => setStatusFilter("all")}
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {storeFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Store: {storeFilter}
                    <button
                      onClick={() => setStoreFilter("all")}
                      className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <TransfersTable data={filteredTransfers} />
        </CardContent>
      </Card>

      {/* Create Transfer Dialog */}
      <CreateTransferDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
