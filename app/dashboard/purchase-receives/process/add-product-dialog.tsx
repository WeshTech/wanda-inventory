"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ProductItem,
  productItemSchema,
} from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
import { useSearchBusinessProducts } from "@/server-queries/inventoryQueries";
import type { BusinessProductResult } from "@/types/inventory";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: ProductItem) => void;
  product?: ProductItem | null;
  mode: "add" | "edit";
}

export function ProductDialog({
  open,
  onOpenChange,
  onSave,
  product,
  mode,
}: ProductDialogProps) {
  const form = useForm<ProductItem>({
    resolver: zodResolver(productItemSchema),
    defaultValues: {
      id: "",
      productCode: "",
      productName: "",
      accepted: 0,
      rejected: 0,
      unitPrice: 0,
      total: 0,
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const businessId = useAuthBusinessId() || "";

  const { data, isLoading } = useSearchBusinessProducts(
    businessId,
    debouncedSearchTerm
  );

  const accepted = form.watch("accepted");
  const unitPrice = form.watch("unitPrice");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const calculatedTotal = (accepted || 0) * (unitPrice || 0);
    form.setValue("total", calculatedTotal);
  }, [accepted, unitPrice, form]);

  useEffect(() => {
    if (open) {
      if (product) {
        form.reset(product);
      } else {
        form.reset({
          id: `product-${Date.now()}`,
          productCode: "",
          productName: "",
          accepted: 0,
          rejected: 0,
          unitPrice: 0,
          total: 0,
        });
      }
      setSearchTerm("");
    }
  }, [open, product, form]);

  const onSubmit = (data: ProductItem) => {
    onSave(data);
    onOpenChange(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleSelectProduct = (item: BusinessProductResult) => {
    form.setValue("productCode", item.productBarcode || "");
    form.setValue("productName", item.productName || "");
    form.setValue("id", item.businessProductId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Search and select a product below. Total will be calculated automatically."
              : "Update the product details. Total will be recalculated automatically."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <FormLabel htmlFor="search" className="mb-3 block">
                  Search Products
                </FormLabel>
                <Input
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                />
              </div>

              <FormField
                control={form.control}
                name="productCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Code <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        const selectedProduct = data?.data?.find(
                          (item) => item.productBarcode === value
                        );
                        if (selectedProduct) {
                          handleSelectProduct(selectedProduct);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select product code..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : data?.data && data.data.length > 0 ? (
                          data.data.map((item) => (
                            <SelectItem
                              key={item.businessProductId}
                              value={item.productBarcode || ""}
                            >
                              {item.productBarcode}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-products" disabled>
                            Search to find products
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        const selectedProduct = data?.data?.find(
                          (item) => item.productName === value
                        );
                        if (selectedProduct) {
                          handleSelectProduct(selectedProduct);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select product name..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : data?.data && data.data.length > 0 ? (
                          data.data.map((item) => (
                            <SelectItem
                              key={item.businessProductId}
                              value={item.productName || ""}
                            >
                              {item.productName}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-products" disabled>
                            Search to find products
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="accepted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Accepted Quantity{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rejected"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Rejected Quantity{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Unit Price (KSh){" "}
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total (KSh)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={formatCurrency(field.value)}
                        disabled
                        className="bg-muted font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {mode === "add" ? "Add Product" : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
