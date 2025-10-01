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
import { SupplierData } from "@/types/suppliers";
import { toast } from "sonner";
import { useUpdateSupplier } from "@/server-queries/supplierQueries";
import { useAuthStore } from "@/stores/authStore";

const supplierSchema = z.object({
  name: z.string().trim().min(1, "Supplier name is required"),

  description: z.string().trim().optional().or(z.literal("")),

  contact: z
    .string()
    .trim()
    .max(50, "Contact must be less than 50 characters")
    .optional()
    .or(z.literal("")),

  email: z.union([z.email("Invalid email address"), z.literal("")]).optional(),

  phone: z
    .union([
      z
        .string()
        .trim()
        .regex(/^(07|01)\d{11}$/, {
          message: "Please provide a valid phone number",
        }),
      z.literal(""),
    ])
    .optional(),
});

export type SupplierFormData = z.infer<typeof supplierSchema>;

interface EditSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier: SupplierData | null;
}

export function EditSupplierDialog({
  open,
  onOpenChange,
  supplier,
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

  const updateSupplier = useUpdateSupplier();
  const { user } = useAuthStore();
  const businessId = user?.businessId;

  useEffect(() => {
    if (supplier) {
      form.reset({
        name: supplier.name || "",
        description: supplier.suppllies || "",
        contact: supplier.contact || "",
        email: supplier.email || "",
        phone: supplier.phone || "",
      });
    }
  }, [supplier, form]);

  const handleSubmit = (data: SupplierFormData) => {
    if (!supplier || !businessId) return;

    updateSupplier.mutate(
      {
        formData: data,
        businessId,
        supplierId: supplier.supplierId,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          onOpenChange(false);
        },
        onError: (err: Error) => {
          toast.error(err.message);
        },
      }
    );
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="What suppllies does this company provide?"
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact</Label>
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
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="phone">Phone</Label>
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
            <Button type="submit" disabled={updateSupplier.isPending}>
              {updateSupplier.isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
