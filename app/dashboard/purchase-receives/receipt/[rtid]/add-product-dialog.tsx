"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Product, productSchema } from "@/schemas/purchaseReceiptSchema";

interface AddProductDialogProps {
  onAddProduct: (product: Product) => void;
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productCode: "",
      productName: "",
      unitPrice: 0,
      quantity: 1,
      total: 0,
    },
  });

  const unitPrice = watch("unitPrice");
  const quantity = watch("quantity");

  useEffect(() => {
    const calculatedTotal = (unitPrice || 0) * (quantity || 0);
    setValue("total", calculatedTotal);
  }, [unitPrice, quantity, setValue]);

  const onSubmit: SubmitHandler<Product> = (data) => {
    onAddProduct({
      ...data,
      id: Math.random().toString(36).substr(2, 9), // Generate simple ID
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="productCode">Product Code</Label>
            <Input
              id="productCode"
              {...register("productCode")}
              placeholder="Enter product code"
            />
            {errors.productCode && (
              <p className="text-sm text-destructive mt-1">
                {errors.productCode.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              {...register("productName")}
              placeholder="Enter product name"
            />
            {errors.productName && (
              <p className="text-sm text-destructive mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="unitPrice">Unit Price (KSh)</Label>
            <Input
              id="unitPrice"
              type="number"
              step="0.01"
              {...register("unitPrice", { valueAsNumber: true })}
              placeholder="0.00"
            />
            {errors.unitPrice && (
              <p className="text-sm text-destructive mt-1">
                {errors.unitPrice.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              placeholder="1"
            />
            {errors.quantity && (
              <p className="text-sm text-destructive mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="total">Total (KSh)</Label>
            <Input
              id="total"
              type="number"
              step="0.01"
              {...register("total", { valueAsNumber: true })}
              placeholder="0.00"
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="hover:bg-yellow-50 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400"
            >
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
