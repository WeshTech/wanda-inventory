"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ReceiptUpdate,
  receiptUpdateSchema,
} from "@/schemas/purchaseReceiptSchema";

interface ReceiptFormProps {
  initialData?: Partial<ReceiptUpdate>;
  totalAmount: number;
  onSubmit: (data: ReceiptUpdate) => void;
}

const availableStores = [
  { value: "store-001", label: "Main Store - Nairobi" },
  { value: "store-002", label: "Branch Store - Mombasa" },
  { value: "store-003", label: "Warehouse - Kisumu" },
  { value: "store-004", label: "Outlet - Nakuru" },
];

export function ReceiptForm({
  initialData,
  totalAmount,
  onSubmit,
}: ReceiptFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReceiptUpdate>({
    resolver: zodResolver(receiptUpdateSchema),
    defaultValues: {
      receiptName: initialData?.receiptName || "",
      store: initialData?.store || "",
      supplier: initialData?.supplier || "",
      status: initialData?.status || "received",
      totalAmount: totalAmount,
      purchaseOrderId: initialData?.purchaseOrderId || "PO-2024-001",
    },
  });

  const selectedStore = watch("store");
  const selectedStatus = watch("status");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receipt Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="purchaseOrderId">Purchase Order ID</Label>
            <Input
              id="purchaseOrderId"
              {...register("purchaseOrderId")}
              readOnly
              className="bg-muted font-mono"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <Label htmlFor="receiptName">Receipt Name</Label>
              <Input
                id="receiptName"
                {...register("receiptName")}
                placeholder="Enter receipt name"
              />
              {errors.receiptName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.receiptName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                {...register("supplier")}
                placeholder="Enter supplier name"
              />
              {errors.supplier && (
                <p className="text-sm text-destructive mt-1">
                  {errors.supplier.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="store">Store</Label>
              <Select
                value={selectedStore}
                onValueChange={(value) => setValue("store", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a store" />
                </SelectTrigger>
                <SelectContent>
                  {availableStores.map((store) => (
                    <SelectItem key={store.value} value={store.value}>
                      {store.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.store && (
                <p className="text-sm text-destructive mt-1">
                  {errors.store.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) =>
                  setValue("status", value as "received" | "rejected")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-destructive mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="totalAmount">Total Amount (KSh)</Label>
            <Input
              id="totalAmount"
              type="number"
              step="0.01"
              {...register("totalAmount", { valueAsNumber: true })}
              readOnly
              className="bg-muted font-medium text-lg"
              value={totalAmount.toFixed(2)}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="hover:bg-yellow-50 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400"
            >
              Update Receipt
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
