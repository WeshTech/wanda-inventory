"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Scan, Keyboard } from "lucide-react";
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
import {
  AddProductFormData,
  addProductSchema,
} from "@/schemas/purchaseOrderSchema";

type Product = {
  barcode: string;
  name: string;
  quantity: number;
  price: number;
};

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: Product) => void;
}

// Mock product database for barcode lookup
const mockProductDatabase: Record<string, { name: string; price: number }> = {
  "1234567890123": { name: "Wireless Mouse", price: 25.99 },
  "2345678901234": { name: "USB Cable", price: 8.5 },
  "3456789012345": { name: "Keyboard", price: 45.0 },
  "4567890123456": { name: "Monitor", price: 299.99 },
  "5678901234567": { name: "Headphones", price: 79.99 },
};

export function AddProductDialog({
  open,
  onOpenChange,
  onAdd,
}: AddProductDialogProps) {
  const form = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      barcode: "",
      scanType: "scan",
      name: "",
      quantity: 1,
      price: 0,
    },
  });

  const watchedBarcode = form.watch("barcode");
  const watchedScanType = form.watch("scanType");

  // Debounced barcode lookup with 500ms delay
  useEffect(() => {
    if (!watchedBarcode || watchedScanType !== "scan") return;

    const timeoutId = setTimeout(() => {
      const productData = mockProductDatabase[watchedBarcode];
      if (productData) {
        form.setValue("name", productData.name);
        form.setValue("price", productData.price);
        console.log(
          "[v0] Product found for barcode:",
          watchedBarcode,
          productData
        );
      } else {
        // Clear fields if barcode not found
        form.setValue("name", "");
        form.setValue("price", 0);
        console.log("[v0] No product found for barcode:", watchedBarcode);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [watchedBarcode, watchedScanType, form]);

  const onSubmit: SubmitHandler<AddProductFormData> = (data) => {
    // Transform the form data to match the Product type
    const productData: Product = {
      barcode: data.barcode,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
    };
    onAdd(productData);
    form.reset();
  };

  const handleScanTypeChange = (value: "scan" | "manual") => {
    form.setValue("scanType", value);
    if (value === "manual") {
      // Clear auto-filled data when switching to manual
      form.setValue("name", "");
      form.setValue("price", 0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Product Barcode</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Scan or enter barcode"
                        {...field}
                        className="font-mono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scanType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={handleScanTypeChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scan">
                          <div className="flex items-center gap-2">
                            <Scan className="h-4 w-4" />
                            Scan
                          </div>
                        </SelectItem>
                        <SelectItem value="manual">
                          <div className="flex items-center gap-2">
                            <Keyboard className="h-4 w-4" />
                            Manual
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      disabled={
                        watchedScanType === "scan" &&
                        !!mockProductDatabase[watchedBarcode]
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value) || 0)
                        }
                        disabled={
                          watchedScanType === "scan" &&
                          !!mockProductDatabase[watchedBarcode]
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Product</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
