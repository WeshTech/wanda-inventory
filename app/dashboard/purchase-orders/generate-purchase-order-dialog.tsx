"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  GeneratePurchaseOrderFormData,
  GeneratePurchaseOrderSchema,
} from "@/schemas/purchaseorder/generatePurchaseorderSchema";
import {
  useAuthBusinessId,
  useAuthStoreAccess,
  useAuthUser,
} from "@/stores/authStore";
import { useGeneratePurchaseOrder } from "@/server-queries/purchaseorderQueries";
import { useBusinessSuppliersQuery } from "@/server-queries/supplierQueries";
import { useStoreInfoQuery } from "@/server-queries/storeQueries";
import toast from "react-hot-toast";
import { toast as sonnerToast } from "sonner";

interface GeneratePurchaseOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GeneratePurchaseOrderDialog({
  open,
  onOpenChange,
}: GeneratePurchaseOrderDialogProps) {
  const form = useForm<GeneratePurchaseOrderFormData>({
    resolver: zodResolver(GeneratePurchaseOrderSchema),
    defaultValues: {
      supplier: "",
      store: "",
      expectedDate: "",
    },
  });

  const businessId = useAuthBusinessId() ?? "";
  const storeAccess = useAuthStoreAccess() ?? [];
  const user = useAuthUser();
  const userId = user?.userId ?? "";

  const { data: suppliersData, isLoading: isSuppliersLoading } =
    useBusinessSuppliersQuery(businessId);
  const { data: storesData, isLoading: isStoresLoading } = useStoreInfoQuery(
    businessId,
    storeAccess
  );

  const { mutate, isPending } = useGeneratePurchaseOrder();

  const onSubmit = (data: GeneratePurchaseOrderFormData) => {
    if (!businessId) {
      sonnerToast.error("Business data not found. Please log in again.");
      return;
    }

    // Show a loading toast (returns an ID so we can update it later)
    const loadingToastId = sonnerToast.loading("Generating purchase order...");

    mutate(
      { formData: data, businessId, userId },
      {
        onSuccess: (response) => {
          // Dismiss loading toast before showing the result
          sonnerToast.dismiss(loadingToastId);

          const purchaseOrderNumber = response.data?.purchaseOrderNumber;
          const successMessage = purchaseOrderNumber
            ? `${response.message} — PO #${purchaseOrderNumber}`
            : response.message;

          toast.success(successMessage);

          form.reset();
          onOpenChange(false);
        },
        onError: (error) => {
          sonnerToast.dismiss(loadingToastId);
          toast.error(error.message || "Failed to generate purchase order.");
        },
      }
    );
  };
  const suppliers = suppliersData?.data ?? [];
  const stores = Array.isArray(storesData?.data)
    ? storesData.data
    : storesData?.data
    ? [storesData.data]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Purchase Order</DialogTitle>
          <DialogDescription>
            Fill in the details to automatically generate a purchase order.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending || isSuppliersLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a supplier" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem
                          key={supplier.supplierId}
                          value={supplier.supplierId}
                        >
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="store"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending || isStoresLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a store" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stores.map((store) => (
                        <SelectItem key={store.storeId} value={store.storeId}>
                          <div className="flex gap-2 w-full">
                            <span>{store.storeName}</span>
                            <span className="text-muted-foreground">
                              ({store.ward})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Delivery Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="date"
                        placeholder="Select expected date"
                        {...field}
                        className="pl-10"
                        disabled={isPending}
                      />
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Generating..." : "Generate Purchase Order"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
