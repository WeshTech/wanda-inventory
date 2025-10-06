"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { PurchaseOrdersTable } from "./purchase-order-table";
import { DeletePurchaseOrderDialog } from "./delete-purchase-orders";
import { useRouter } from "next/navigation";
import { GeneratePurchaseOrderDialog } from "./generate-purchase-order-dialog";
import { PurchaseOrderResponseItem } from "@/types/purchaseorder";
import { toast as sonnerToast } from "sonner";
import toast from "react-hot-toast";

export default function PurchaseOrdersPage() {
  const [selectedOrder, setSelectedOrder] =
    useState<PurchaseOrderResponseItem | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

  const router = useRouter();

  const handleDeleteOrder = (order: PurchaseOrderResponseItem) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      // Show loading toast
      const loadingToast = sonnerToast.loading("Deleting purchase order...");

      setTimeout(() => {
        sonnerToast.dismiss(loadingToast);
        toast.error("Delete operation blocked");

        setSelectedOrder(null);
        setIsDeleteDialogOpen(false);
      }, 1300);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            Purchase Orders
          </h1>
          <div className="flex items-center gap-2">
            <Button
              className="flex items-center gap-2"
              onClick={() => setIsGenerateDialogOpen(true)}
            >
              <Sparkles className="h-4 w-4" />
              Generate Purchase Order
            </Button>
            <Button
              className="flex items-center gap-2"
              onClick={() => router.push("/dashboard/purchase-orders/po")}
            >
              <Plus className="h-4 w-4" />
              Create Purchase Order
            </Button>
          </div>
        </div>

        {/* Table - fetches its own data internally */}
        <PurchaseOrdersTable onDelete={handleDeleteOrder} />

        {/* Generate Dialog */}
        <GeneratePurchaseOrderDialog
          open={isGenerateDialogOpen}
          onOpenChange={setIsGenerateDialogOpen}
        />

        {/* Delete Dialog */}
        <DeletePurchaseOrderDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          order={selectedOrder}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
