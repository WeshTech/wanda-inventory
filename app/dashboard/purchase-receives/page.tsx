"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { PurchaseReceiptsTable } from "./purchase-receipt-table";
import { DeleteReceiptDialog } from "./delete-receipt-dialog";

const stores = ["All Stores", "Main Branch", "IT Department", "Marketing Dept"];

export default function PurchaseReceiptsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [receiptToDelete, setReceiptToDelete] = useState<string | null>(null);

  const handleDeleteReceipt = (receiptId: string) => {
    setReceiptToDelete(receiptId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (receiptToDelete) {
      // Here you would typically make an API call to delete the receipt
      console.log("Deleting receipt:", receiptToDelete);
      setDeleteDialogOpen(false);
      setReceiptToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-foreground font-medium">Purchase Receipts</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Purchase Receipts
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Purchase Receipts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by receipt no, name, supplier, or store..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem
                        key={store}
                        value={store === "All Stores" ? "all" : store}
                      >
                        {store}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  className="whitespace-nowrap"
                  onClick={() =>
                    router.push("/dashboard/purchase-receives/process")
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Receipt
                </Button>
              </div>
            </div>

            <PurchaseReceiptsTable onDeleteReceipt={handleDeleteReceipt} />
          </CardContent>
        </Card>

        <DeleteReceiptDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
