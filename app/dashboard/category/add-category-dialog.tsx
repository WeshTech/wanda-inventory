"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
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
import { ComboBox } from "@/components/ui/combobox";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  store: z.string().min(1, "Store is required"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

// Mock stores data - replace with actual API call
const mockStores = [
  { value: "store1", label: "Main Store" },
  { value: "store2", label: "Warehouse A" },
  { value: "store3", label: "Branch Store" },
];

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdd: (data: CategoryFormData) => void;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
  onCategoryAdd,
}: AddCategoryDialogProps) {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      store: "",
    },
  });

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
    onCategoryAdd(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              {...form.register("name")}
              placeholder="Enter category name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryStore">Store</Label>
            <ComboBox
              options={mockStores}
              placeholder="Select store..."
              onSelect={(value) => form.setValue("store", value)}
            />
            {form.formState.errors.store && (
              <p className="text-sm text-destructive">
                {form.formState.errors.store.message}
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
            <Button type="submit" className="rounded-full">
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
