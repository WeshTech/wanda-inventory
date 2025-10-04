"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GeneratePurchaseOrderForm } from "./generate-purchase-order-form";
import Loader from "@/components/ui/loading-spiner";

interface GeneratePurchaseOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GeneratePurchaseOrderDialog({
  open,
  onOpenChange,
}: GeneratePurchaseOrderDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderText, setLoaderText] = useState(
    "sit back while we perform the magic"
  );
  const [startTime, setStartTime] = useState<number | null>(null);

  // Reset state when dialog closes
  useEffect(() => {
    if (!open) {
      setIsSubmitting(false);
      setShowLoader(false);
      setLoaderText("sit back while we perform the magic");
      setStartTime(null);
    }
  }, [open]);

  // Update loader text after 2 seconds
  useEffect(() => {
    if (startTime && isSubmitting) {
      const timer = setTimeout(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= 2000) {
          setLoaderText("finishing up...");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [startTime, isSubmitting]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setStartTime(Date.now());

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Show loader after fields disappear
    setShowLoader(true);

    // Simulate additional processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success - close dialog
    setIsSubmitting(false);
    setShowLoader(false);
    onOpenChange(false);

    // Here you would typically handle the actual purchase order generation
    console.log("Generated purchase order with data:", data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Purchase Order</DialogTitle>
          <DialogDescription>
            Fill in the details to automatically generate a purchase order.
          </DialogDescription>
        </DialogHeader>

        {showLoader ? (
          <Loader text="loading" />
        ) : (
          <GeneratePurchaseOrderForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
