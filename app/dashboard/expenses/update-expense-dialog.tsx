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
  updateExpenseSchema,
  UpdateExpenseFormData,
} from "@/schemas/expenses/updateExpenseSchema";
import toast from "react-hot-toast";
import { toast as sonnerToast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useUpdateExpense } from "@/server-queries/expensesQueries";
import { AllExpenseResponseData } from "@/types/expenses";
import { useEffect } from "react";

interface UpdateExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: AllExpenseResponseData | null;
}

export function UpdateExpenseDialog({
  open,
  onOpenChange,
  expense,
}: UpdateExpenseDialogProps) {
  const form = useForm<UpdateExpenseFormData>({
    resolver: zodResolver(updateExpenseSchema),
    defaultValues: {
      purpose: expense?.purpose ?? "",
      description: expense?.description ?? "",
      category: (expense?.category as "RECURRENT" | "RANDOM") ?? undefined,
      amount: expense ? expense.amount.toString() : "",
      date: expense?.expenseDate ?? "",
    },
  });

  // Reset form when expense changes
  useEffect(() => {
    if (expense) {
      console.log("UpdateExpenseDialog: Received expense:", expense); // Debug log
      form.reset({
        purpose: expense.purpose,
        description: expense.description ?? "",
        category: expense.category as "RECURRENT" | "RANDOM",
        amount: expense.amount.toString(),
        date: expense.expenseDate,
      });
    }
  }, [expense, form]);

  const businessId = useAuthStore((state) => state.user?.businessId);
  const { mutate: updateExpense, isPending } = useUpdateExpense();

  const onSubmit = (data: UpdateExpenseFormData) => {
    if (!businessId) {
      toast.error("No business ID found. Please log in again.");
      console.error("UpdateExpenseDialog: Business ID is missing");
      return;
    }
    if (!expense?.expenseId) {
      toast.error("No expense ID found. Please select a valid expense.");
      console.error(
        "UpdateExpenseDialog: Expense ID is missing, expense:",
        expense
      );
      return;
    }

    console.log(
      "UpdateExpenseDialog: Submitting update with expenseId:",
      expense.expenseId
    ); // Debug log
    sonnerToast.loading("Updating expense...", { id: "update-expense" });

    updateExpense(
      { formData: data, businessId, expenseId: expense.expenseId },
      {
        onSuccess: (res) => {
          sonnerToast.dismiss("update-expense");
          toast.success(res.message || "Expense updated successfully");
          console.log(
            "UpdateExpenseDialog: Update successful for expenseId:",
            expense.expenseId
          ); // Debug log
          onOpenChange(false);
          form.reset();
        },
        onError: (err) => {
          sonnerToast.dismiss("update-expense");
          toast.error(err.message || "Failed to update expense");
          console.error("UpdateExpenseDialog: Update expense error:", err);
        },
      }
    );
  };

  const handleCancel = () => {
    console.log("UpdateExpenseDialog: Cancel clicked"); // Debug log
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open && !!expense} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
        </DialogHeader>

        {expense && expense.expenseId ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter expense purpose"
                        {...field}
                        disabled={isPending}
                      />
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
                        disabled={isPending}
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
                      disabled={isPending}
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
                        {...field}
                        disabled={isPending}
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
                        disabled={isPending}
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
                  {isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <p className="text-center text-muted-foreground">
            No valid expense selected. Please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
