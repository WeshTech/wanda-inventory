"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner"; // optional, for better UX feedback
import { useAuthStore } from "@/stores/authStore";
import { useGeneratePurchaseOrder } from "@/server-queries/purchaseorderQueries";

// Mock data (replace with backend data if needed)
const suppliers = [
  "ABC Supplies Co.",
  "XYZ Electronics",
  "Global Parts Ltd",
  "Tech Solutions Inc",
  "Office Supplies Pro",
];

const stores = [
  "Main Store",
  "Electronics Branch",
  "Warehouse A",
  "Office Branch",
  "Downtown Location",
];

export function GeneratePurchaseOrderForm() {
  const form = useForm<GeneratePurchaseOrderFormData>({
    resolver: zodResolver(GeneratePurchaseOrderSchema),
    defaultValues: {
      supplier: "",
      store: "",
      expectedDate: "",
    },
  });

  const { user } = useAuthStore(); // ✅ get user from auth store
  const businessId = user?.businessId; // we’ll send this to the backend

  const { mutate, isPending } = useGeneratePurchaseOrder();

  const onSubmit = (data: GeneratePurchaseOrderFormData) => {
    if (!businessId) {
      toast.error("Business ID not found. Please log in again.");
      return;
    }

    mutate(
      { formData: data, businessId },
      {
        onSuccess: (response) => {
          toast.success(
            `✅ ${response.message} — PO #${response.data?.purchaseOrderNumber}`
          );
          form.reset();
        },
        onError: (error) => {
          toast.error(`❌ ${error.message}`);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a store" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store} value={store}>
                      {store}
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
  );
}
