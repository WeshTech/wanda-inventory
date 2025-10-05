"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { PurchaseOrdersTable } from "./purchase-order-table";
import { DeletePurchaseOrderDialog } from "./delete-purchase-orders";
import { useRouter } from "next/navigation";
import { GeneratePurchaseOrderDialog } from "./generate-purchase-order-dialog";

export type PurchaseOrder = {
  id: string;
  supplier: string;
  store: string;
  status: "pending" | "approved" | "shipped" | "delivered" | "cancelled";
  dateCreated: string;
  products: number;
  dateExpected: string;
  createdBy: string;
};

// Mock data for demonstration
const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-001",
    supplier: "ABC Supplies Co.",
    store: "Main Store",
    status: "pending",
    dateCreated: "2024-01-15",
    products: 25,
    dateExpected: "2024-01-25",
    createdBy: "Sarah Johnson",
  },
  {
    id: "PO-002",
    supplier: "XYZ Electronics",
    store: "Electronics Branch",
    status: "approved",
    dateCreated: "2024-01-14",
    products: 12,
    dateExpected: "2024-01-24",
    createdBy: "Michael Chen",
  },
  {
    id: "PO-003",
    supplier: "Global Parts Ltd",
    store: "Warehouse A",
    status: "shipped",
    dateCreated: "2024-01-13",
    products: 8,
    dateExpected: "2024-01-23",
    createdBy: "Emily Rodriguez",
  },
  {
    id: "PO-004",
    supplier: "Tech Solutions Inc",
    store: "Main Store",
    status: "delivered",
    dateCreated: "2024-01-12",
    products: 15,
    dateExpected: "2024-01-22",
    createdBy: "David Thompson",
  },
  {
    id: "PO-005",
    supplier: "Office Supplies Pro",
    store: "Office Branch",
    status: "cancelled",
    dateCreated: "2024-01-11",
    products: 30,
    dateExpected: "2024-01-21",
    createdBy: "Lisa Wang",
  },
];

export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] =
    useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);

  const router = useRouter();

  const handleDeleteOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOrder) {
      setPurchaseOrders((prev) =>
        prev.filter((po) => po.id !== selectedOrder.id)
      );
      setSelectedOrder(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUpdateStatus = (order: PurchaseOrder, newStatus: string) => {
    setPurchaseOrders((prev) =>
      prev.map((po) =>
        po.id === order.id
          ? { ...po, status: newStatus as PurchaseOrder["status"] }
          : po
      )
    );
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

        {/* Table */}
        <PurchaseOrdersTable
          data={purchaseOrders}
          onDelete={handleDeleteOrder}
          onUpdateStatus={handleUpdateStatus}
        />

        <GeneratePurchaseOrderDialog
          open={isGenerateDialogOpen}
          onOpenChange={setIsGenerateDialogOpen}
        />

        {/* Dialogs */}
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
