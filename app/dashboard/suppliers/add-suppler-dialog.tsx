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

const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  description: z.string().optional(),
  contact: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
});

type SupplierFormData = z.infer<typeof supplierSchema>;

interface AddSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: SupplierFormData) => void;
}

export function AddSupplierDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddSupplierDialogProps) {
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

  const handleSubmit = (data: SupplierFormData) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log("Supplier data:", data);
    }
    form.reset();
    onOpenChange(false);
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
            <Button type="submit" className="rounded-full">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
