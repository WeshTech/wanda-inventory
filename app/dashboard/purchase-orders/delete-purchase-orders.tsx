"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import type { PurchaseOrderResponseItem } from "@/types/purchaseorder";

interface DeletePurchaseOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: PurchaseOrderResponseItem | null;
  onConfirm: () => void;
}

export function DeletePurchaseOrderDialog({
  open,
  onOpenChange,
  order,
  onConfirm,
}: DeletePurchaseOrderDialogProps) {
  if (!order) return null;

  // Format the purchase order ID for display
  const shortId = order.purchaseOrderId
    ? `PO-${order.purchaseOrderId.slice(-6).toUpperCase()}`
    : "PO-UNKNOWN";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-left">
                Delete Purchase Order
              </DialogTitle>
              <DialogDescription className="text-left">
                Are you sure you want to delete this purchase order?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Purchase Order ID:</span>
              <span className="text-sm font-mono">{shortId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Supplier:</span>
              <span className="text-sm">{order.supplierName || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Store:</span>
              <span className="text-sm">{order.storeName || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Status:</span>
              <span className="text-sm capitalize">
                {order.status.toLowerCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Products:</span>
              <span className="text-sm">{order.productCount}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Warning:</strong> This action cannot be undone. The purchase
            order will be permanently deleted from the system.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Delete Purchase Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
