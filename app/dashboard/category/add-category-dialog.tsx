"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
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
  CategoryFormData,
  categorySchema,
} from "@/schemas/storeCategorySchema";
import { toast } from "sonner"; // Standardized to use Sonner
import { useCreateStoreCategory } from "@/server-queries/storeCategoryQueries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBusinessStores } from "@/server-queries/storeQueries";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import Loader from "@/components/ui/loading-spiner";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
}: AddCategoryDialogProps) {
  const { isLoading: authLoading } = useAuthStore();
  const businessId = useAuthBusinessId() || "";
  const { data: storesData, isLoading: storesLoading } =
    useGetBusinessStores(businessId);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      store: "",
      description: "",
    },
  });

  const createCategory = useCreateStoreCategory(businessId ?? "");

  const onSubmit: SubmitHandler<CategoryFormData> = (data) => {
    const loadingId = toast.loading("Creating category...");
    createCategory.mutate(data, {
      onSuccess: (res) => {
        toast.dismiss(loadingId);
        toast.success(res.message || "Category created successfully");
        form.reset();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.dismiss(loadingId);
        toast.error(error.message || "Failed to create category");
      },
    });
  };

  if (authLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-[90vw] sm:max-w-lg md:max-w-xl">
          <div className="flex justify-center items-center h-40">
            <Loader text="Preparing store data..." />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[90vw] sm:max-w-lg md:max-w-xl bg-gray-100">
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
              className="w-full"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryDescription">Description</Label>
            <Textarea
              id="categoryDescription"
              {...form.register("description")}
              placeholder="Enter category description"
              className="w-full"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-2 w-full md:w-3/4">
            <Label htmlFor="categoryStore">Store</Label>
            <Select
              onValueChange={(value) => {
                form.setValue("store", value);
              }}
              value={form.watch("store")}
              disabled={
                storesLoading ||
                !storesData?.data?.stores?.length ||
                !businessId
              }
            >
              <SelectTrigger id="categoryStore" className="w-full sm:w-3/4">
                <SelectValue placeholder="Select store..." />
              </SelectTrigger>
              <SelectContent>
                {storesData?.data?.stores?.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}{" "}
                    <span className="text-sm text-muted-foreground">
                      ({store.ward})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.store && (
              <p className="text-sm text-destructive">
                {form.formState.errors.store.message}
              </p>
            )}
            {storesData?.data?.stores?.length === 0 && (
              <p className="text-sm text-destructive">No stores available</p>
            )}
          </div>

          <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 pt-4">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => {
                form.reset();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="rounded-lg"
              disabled={
                createCategory.isPending || storesLoading || !businessId
              }
            >
              {createCategory.isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
