"use client";
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

interface DeleteNotAllowedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplierName?: string;
  customerName?: string;
}

export function DeleteNotAllowedDialog({
  open,
  onOpenChange,
  supplierName,
  customerName,
}: DeleteNotAllowedDialogProps) {
  const entityName = supplierName || customerName || "";
  const entityType = supplierName ? "Supplier" : "Customer";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <DialogTitle>Cannot Delete {entityType}</DialogTitle>
              <DialogDescription className="mt-1">
                The system does not allow deleting {entityType.toLowerCase()}{" "}
                <strong>{entityName}</strong>. Please update the details of the{" "}
                {entityType.toLowerCase()} as needed instead.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
