"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useEffect } from "react";

// Define the form schema
const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  description: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

// Supplier interface (aligned with SuppliersPage.tsx)
export interface Supplier {
  id: string;
  name: string;
  description?: string;
  contact?: string;
  email?: string;
  phone?: string;
}

interface EditSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: Supplier | null;
  onSubmit: (data: Supplier) => void; // Updated to use Supplier type directly
}

export function EditSupplierDialog({
  open,
  onOpenChange,
  supplier,
  onSubmit,
}: EditSupplierDialogProps) {
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

  useEffect(() => {
    if (supplier) {
      form.reset({
        name: supplier.name || "",
        description: supplier.description || "",
        contact: supplier.contact || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
      });
    }
  }, [supplier, form]);

  const handleSubmit = (data: SupplierFormData) => {
    if (supplier) {
      onSubmit({ ...data, id: supplier.id }); // Include id in the submitted data
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplierName">Supplier Name</Label>
            <Input
              id="supplierName"
              {...form.register("name")}
              placeholder="Enter supplier name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description{" "}
              <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="What supplies does this company provide?"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
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
            />
            {form.formState.errors.contact && (
              <p className="text-sm text-destructive">
                {form.formState.errors.contact.message}
              </p>
            )}
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
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
