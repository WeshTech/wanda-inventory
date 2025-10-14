"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  SupplierFormData,
  supplierSchema,
} from "@/schemas/suppliers/createSupplierSchema";
import { toast } from "react-hot-toast";
import { toast as sonnerToast } from "sonner";
import { useAuthBusinessId } from "@/stores/authStore";
import { useCreateSupplier } from "@/server-queries/supplierQueries";

interface AddSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddSupplierDialog({
  open,
  onOpenChange,
}: AddSupplierDialogProps) {
  const businessId = useAuthBusinessId() ?? "";

  const form = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      description: "",
      contact: "",
      email: "",
      phone: "",
    },
  });

  const { mutate: createSupplier, isPending } = useCreateSupplier();

  const handleSubmit = (data: SupplierFormData) => {
    if (!businessId) {
      toast.error("No business found for this user.");
      return;
    }

    const toastId = sonnerToast.loading("Creating supplier...");

    createSupplier(
      { formData: data, businessId },
      {
        onSuccess: (res) => {
          sonnerToast.dismiss(toastId);
          toast.success(res.message || "Supplier created successfully!");
          form.reset();
          onOpenChange(false);
        },
        onError: (err) => {
          sonnerToast.dismiss(toastId);
          toast.error(err.message || "Failed to create supplier");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplierName">Supplier Name</Label>
            <Input
              id="supplierName"
              {...form.register("name")}
              placeholder="Enter supplier name"
              disabled={isPending}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Supplies Description{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="What suppllies does this company provide?"
              rows={3}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">
              Contact{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="contact"
              {...form.register("contact")}
              placeholder="Enter contact person"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="Enter email address"
              disabled={isPending}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="Enter phone number"
              disabled={isPending}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset();
                onOpenChange(false);
              }}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
