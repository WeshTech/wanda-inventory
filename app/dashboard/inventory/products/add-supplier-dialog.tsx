"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const supplierSchema = z.object({
  name: z.string().min(1, "Supplier name is required"),
  contact: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().optional(),
})

type SupplierFormData = z.infer<typeof supplierSchema>

interface AddSupplierDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddSupplierDialog({ open, onOpenChange }: AddSupplierDialogProps) {
  const form = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = (data: SupplierFormData) => {
    console.log("Supplier data:", data)
    // Handle supplier creation
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register Supplier</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="supplierName">Supplier Name</Label>
            <Input id="supplierName" {...form.register("name")} placeholder="Enter supplier name" />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">
              Contact <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Input id="contact" {...form.register("contact")} placeholder="Enter contact person" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Input id="email" type="email" {...form.register("email")} placeholder="Enter email address" />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-sm text-muted-foreground">(optional)</span>
            </Label>
            <Input id="phone" {...form.register("phone")} placeholder="Enter phone number" />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                form.reset()
                onOpenChange(false)
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
  )
}
