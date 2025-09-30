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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format } from "date-fns";
import {
  ExpenseFormData,
  expenseSchema,
} from "@/schemas/expenses/createExpenseSchema";
import toast from "react-hot-toast";
import { toast as sonnerToast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useCreateExpense } from "@/server-queries/expensesQueries";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExpenseDialog({
  open,
  onOpenChange,
}: AddExpenseDialogProps) {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      purpose: "",
      description: "",
      amount: "",
      date: new Date().toISOString(),
    },
  });

  const businessId = useAuthStore((state) => state.user?.businessId);
  const { mutate: createExpense, isPending } = useCreateExpense();

  const onSubmit = (data: ExpenseFormData) => {
    if (!businessId) {
      toast.error("No business ID found. Please log in again.");
      return;
    }

    const transformedData = {
      ...data,
      category: data.category as "RECURRENT" | "RANDOM",
    };

    sonnerToast.loading("Creating expense...", { id: "create-expense" });

    createExpense(
      { formData: transformedData, businessId },
      {
        onSuccess: (res) => {
          sonnerToast.dismiss("create-expense");
          toast.success(res.message || "Expense created successfully");
          onOpenChange(false);
          form.reset();
        },
        onError: (err) => {
          sonnerToast.dismiss("create-expense");
          toast.error(err.message || "Failed to create expense");
        },
      }
    );
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter expense purpose" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter expense description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expense category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RECURRENT">Recurrent</SelectItem>
                      <SelectItem value="RANDOM">Random</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      max={format(new Date(), "yyyy-MM-dd")}
                      value={
                        field.value
                          ? format(new Date(field.value), "yyyy-MM-dd")
                          : ""
                      }
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date.getTime())) {
                          field.onChange(date.toISOString());
                        }
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-4 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="rounded-full"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
