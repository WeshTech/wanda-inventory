"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import {
  CreateStoreFormData,
  createStoreSchema,
} from "@/schemas/createStoreSchema";

interface CreateStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateStoreDialog({
  open,
  onOpenChange,
}: CreateStoreDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateStoreFormData>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      location: "",
      status: undefined,
    },
  });

  const onSubmit = async (data: CreateStoreFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement store creation logic
      console.log("Creating store:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating store:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-primary/30 via-background to-secondary/30 bg-muted border border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Create a new store
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new store to your business. Fill in the details below to get
            started.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Store Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter store name"
                      className="rounded-full border-border bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter store location"
                      className="rounded-full border-border bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Status</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="rounded-full w-1/2 border-border bg-background text-black">
                        <SelectValue placeholder="Select store status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="flex-1 rounded-full border border-border bg-white dark:bg-transparent hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
