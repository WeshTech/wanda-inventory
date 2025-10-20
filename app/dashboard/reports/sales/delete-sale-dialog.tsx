"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { SaleData } from "@/types/sales";

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: SaleData | null;
}

export function DeleteDialog({
  open,
  onOpenChange,
  record,
}: DeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!record) return;

    setIsDeleting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Deleted record:", record.invoiceNumber);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete record:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!record) return null;

  const formatKES = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  const date = new Date(record.createdAt);
  const year = date.getFullYear();
  const invoiceNum = parseInt(String(record.invoiceNumber), 10);
  const formattedInvoice =
    !isNaN(invoiceNum) && typeof invoiceNum === "number"
      ? `INV-${year}-${String(invoiceNum).padStart(3, "0")}`
      : `INV-${year}-${record.invoiceNumber}`;

  const formattedDate = new Intl.DateTimeFormat("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Nairobi",
  }).format(date);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Sales Record
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this sales record? This action
            <strong> cannot be undone</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Invoice:</span>
              <span>{formattedInvoice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Customer:</span>
              <span>{record.CustomerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span>{formatKES(record.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="hover:bg-red-600 dark:hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete Record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
