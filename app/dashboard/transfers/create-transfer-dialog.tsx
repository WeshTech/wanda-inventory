"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreateTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  productName: string;
  fromStore: string;
  toStore: string;
  quantity: string;
  notes: string;
}

const stores = [
  { value: "main", label: "Main Store" },
  { value: "branch-a", label: "Branch A" },
  { value: "branch-b", label: "Branch B" },
  { value: "branch-c", label: "Branch C" },
];

export function CreateTransferDialog({
  open,
  onOpenChange,
}: CreateTransferDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    fromStore: "",
    toStore: "",
    quantity: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!formData.fromStore) {
      newErrors.fromStore = "From store is required";
    }

    if (!formData.toStore) {
      newErrors.toStore = "To store is required";
    }

    if (formData.fromStore === formData.toStore && formData.fromStore) {
      newErrors.fromStore = "From and To stores must be different";
      newErrors.toStore = "From and To stores must be different";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) <= 0
    ) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form and close dialog
    setFormData({
      productName: "",
      fromStore: "",
      toStore: "",
      quantity: "",
      notes: "",
    });
    setErrors({});
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      fromStore: "",
      toStore: "",
      quantity: "",
      notes: "",
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-balance flex items-center justify-between">
            Create New Transfer
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Product Name with Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="product" className="text-sm font-medium">
              Product Name *
            </Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="product"
                  placeholder="Enter product name"
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange("productName", e.target.value)
                  }
                  className={errors.productName ? "border-red-500" : ""}
                />
                {errors.productName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.productName}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="h-12 w-12 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer group">
                  <Upload className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Image</span>
              </div>
            </div>
          </div>

          {/* From Store */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-sm font-medium">
              From Store *
            </Label>
            <Select
              value={formData.fromStore}
              onValueChange={(value) => handleInputChange("fromStore", value)}
            >
              <SelectTrigger
                className={errors.fromStore ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select source store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.value} value={store.value}>
                    {store.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fromStore && (
              <p className="text-sm text-red-500">{errors.fromStore}</p>
            )}
          </div>

          {/* To Store */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-sm font-medium">
              To Store *
            </Label>
            <Select
              value={formData.toStore}
              onValueChange={(value) => handleInputChange("toStore", value)}
            >
              <SelectTrigger className={errors.toStore ? "border-red-500" : ""}>
                <SelectValue placeholder="Select destination store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.value} value={store.value}>
                    {store.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.toStore && (
              <p className="text-sm text-red-500">{errors.toStore}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity *
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              min="1"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or instructions..."
              className="resize-none"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>

          {/* Transfer Summary */}
          {(formData.productName ||
            formData.fromStore ||
            formData.toStore ||
            formData.quantity) && (
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Transfer Summary
              </h4>
              <div className="space-y-1 text-sm">
                {formData.productName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product:</span>
                    <span className="font-medium">{formData.productName}</span>
                  </div>
                )}
                {formData.quantity && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <Badge variant="secondary">{formData.quantity} units</Badge>
                  </div>
                )}
                {formData.fromStore && formData.toStore && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transfer:</span>
                    <span className="font-medium">
                      {
                        stores.find((s) => s.value === formData.fromStore)
                          ?.label
                      }{" "}
                      →{" "}
                      {stores.find((s) => s.value === formData.toStore)?.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full bg-transparent"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full bg-transparent"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Transfer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
