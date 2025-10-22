"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDebounce } from "use-debounce";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthUser,
} from "@/stores/authStore";
import { useSearchBusinessProductsPO } from "@/server-queries/purchaseorderQueries";
import {
  type AddProductFormData,
  AddProductSchema,
} from "@/schemas/purchaseorder/addProductSchema";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: AddProductFormData) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
  onAdd,
}: AddProductDialogProps) {
  const businessId = useAuthBusinessId() ?? "";
  const user = useAuthUser() ?? "";
  const userId = typeof user === "object" && user !== null ? user.userId : "";
  const { isLoading: isAuthLoading } = useAuthStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const form = useForm<AddProductFormData>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      businessProductId: "",
      productBarcode: "",
      productName: "",
      price: 0,
      quantity: 1,
      total: 0,
    },
  });

  const { data: searchResults, isFetching: isSearching } =
    useSearchBusinessProductsPO(businessId, userId, debouncedSearch);

  const combinedLoading = isAuthLoading || isSearching;

  const handleSelectProduct = (selectedId: string) => {
    const selected = searchResults?.data?.find(
      (p) => p.businessProductId === selectedId
    );
    if (selected) {
      form.setValue("businessProductId", selected.businessProductId);
      form.setValue("productName", selected.productName || "");
      form.setValue("productBarcode", selected.productBarcode || "");
      form.setValue("price", selected.price ?? 0);
      const quantity = form.getValues("quantity") || 1;
      form.setValue("total", (selected.price ?? 0) * quantity);
    }
  };

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      // Only recalculate total when quantity or price changes, not when total itself changes
      if (name === "quantity" || name === "price") {
        const quantity = values.quantity ?? 0;
        const price = values.price ?? 0;
        form.setValue("total", quantity * price);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (values: AddProductFormData) => {
    onAdd(values);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Search Field */}
            <FormItem>
              <FormLabel>Search Product</FormLabel>
              <div className="relative">
                <Input
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {isSearching && (
                  <span className="absolute right-3 top-2 text-xs text-secondary italic">
                    searching...
                  </span>
                )}
              </div>
            </FormItem>

            {/* Product Name Select */}
            <FormField
              control={form.control}
              name="productName"
              render={({}) => {
                const businessProductId = form.getValues("businessProductId");
                return (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <Select
                      value={businessProductId}
                      onValueChange={handleSelectProduct}
                      disabled={combinedLoading || !searchResults?.data?.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {searchResults?.data?.map((item) => (
                          <SelectItem
                            key={item.businessProductId}
                            value={item.businessProductId}
                          >
                            {item.productName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Product Barcode Select */}
            <FormField
              control={form.control}
              name="productBarcode"
              render={({}) => {
                const businessProductId = form.getValues("businessProductId");
                return (
                  <FormItem>
                    <FormLabel>Product Code</FormLabel>
                    <Select
                      value={businessProductId}
                      onValueChange={handleSelectProduct}
                      disabled={combinedLoading || !searchResults?.data?.length}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {searchResults?.data?.map((item) => (
                          <SelectItem
                            key={item.businessProductId}
                            value={item.businessProductId}
                          >
                            {item.productBarcode || "N/A"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Unit Price (Editable) */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      value={field.value || ""}
                      disabled={combinedLoading}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value) || 1)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total (Read-only) */}
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={combinedLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={combinedLoading}>
                Add Product
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
