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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";

interface SalesRecord {
  invoiceNo: string;
  store: string;
  customerName: string;
  totalAmount: number;
  paymentStatus: "paid" | "credit";
  paymentMethod: "mpesa" | "cash" | "card" | "other";
  servedBy: string;
  date: string;
}

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: SalesRecord | null;
}

export function RefundDialog({
  open,
  onOpenChange,
  record,
}: RefundDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleRefund = async () => {
    if (!record || !refundAmount || !reason) return;

    setIsProcessing(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(
        "Processed refund for:",
        record.invoiceNo,
        "Amount:",
        refundAmount,
        "Reason:",
        reason
      );
      onOpenChange(false);
      setRefundAmount("");
      setReason("");
    } catch (error) {
      console.error("Failed to process refund:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setRefundAmount("");
      setReason("");
    }
    onOpenChange(open);
  };

  if (!record) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-600">
            <RefreshCw className="h-5 w-5" />
            Process Refund
          </DialogTitle>
          <DialogDescription>
            Process a refund for this sales transaction. Please provide the
            refund amount and reason.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Invoice:</span>
              <span>{record.invoiceNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Customer:</span>
              <span>{record.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Original Amount:</span>
              <span>${record.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span className="uppercase">{record.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="refundAmount">Refund Amount</Label>
            <Input
              id="refundAmount"
              type="number"
              placeholder="0.00"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              max={record.totalAmount}
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Refund</Label>
            <Textarea
              id="reason"
              placeholder="Please provide a reason for the refund..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleRefund}
            disabled={isProcessing || !refundAmount || !reason}
            className="bg-yellow-600 hover:bg-yellow-700 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800"
          >
            {isProcessing ? "Processing..." : "Process Refund"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
