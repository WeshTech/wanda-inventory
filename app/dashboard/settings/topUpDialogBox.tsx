"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TopUpFormValues, topUpSchema } from "@/schemas/settings/topUpSchema";
import TopUpSpinner from "@/components/ui/topup-spinner";
import RequestSpinner from "@/components/ui/request-spinner";
import { useTopUpWalletMutation } from "@/server-queries/settingsQueries";
import { useAuthBusinessId } from "@/stores/authStore";
import toast from "react-hot-toast";

interface TopUpWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TopUpWalletDialog({
  open,
  onOpenChange,
}: TopUpWalletDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const topUpWalletMutation = useTopUpWalletMutation();
  const businessId = useAuthBusinessId() || "";

  const form = useForm<TopUpFormValues>({
    resolver: zodResolver(topUpSchema),
    defaultValues: {
      phoneNumber: "",
      amount: "100",
    },
  });

  const handleSubmit = async (values: TopUpFormValues) => {
    setIsLoading(true);

    try {
      const response = await topUpWalletMutation.mutateAsync({
        businessId,
        formData: values,
      });

      if (response.success) {
        toast.success(response.message || "Payment request sent successfully.");
        setIsConfirming(true);
      } else {
        toast.error(response.message || "Payment request failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Top Up Wallet</DialogTitle>
          <DialogDescription>
            Add funds to your wallet securely and instantly.
          </DialogDescription>
        </DialogHeader>

        {/* Payment Method Selector */}
        <div className="mt-4">
          <Label className="text-base font-semibold">Payment Method</Label>

          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="mt-3"
          >
            <div className="grid grid-cols-3 gap-3">
              {/* M-Pesa - Active */}
              <Label
                htmlFor="mpesa"
                className={`flex flex-col items-center justify-center h-40 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  paymentMethod === "mpesa"
                    ? "border-green-500 bg-green-50 shadow-md"
                    : "border-gray-200 bg-white"
                }`}
              >
                <RadioGroupItem value="mpesa" id="mpesa" className="sr-only" />

                <Image
                  src="/images/mpesalogo.png"
                  alt="M-Pesa"
                  width={80}
                  height={50}
                  className="mb-3 object-contain"
                />

                <span className="text-sm font-medium flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                    {paymentMethod === "mpesa" && (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </div>
                  M-Pesa
                </span>
              </Label>

              {/* Airtel Money - Coming Soon */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="opacity-60 ">
                      <Label
                        htmlFor="airtel"
                        className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 hover:cursor-not-allowed"
                      >
                        <RadioGroupItem
                          value="airtel"
                          id="airtel"
                          disabled
                          className="sr-only disabled:cursor-not-allowed"
                        />

                        <Image
                          src="/images/airtelmoneylogo.png"
                          alt="Airtel Money"
                          width={60}
                          height={30}
                          className="mb-3 object-contain opacity-70 rounded-4xl"
                        />

                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                          Airtel Money
                        </span>
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Airtel Money - Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Mastercard - Coming Soon */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="opacity-60 ">
                      <Label
                        htmlFor="mastercard"
                        className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-gray-200 bg-gray-50 p-4 hover:cursor-not-allowed"
                      >
                        <RadioGroupItem
                          value="mastercard"
                          id="mastercard"
                          disabled
                          className="sr-only disabled:cursor-not-allowed"
                        />

                        <Image
                          src="/images/mastercardlogo.png"
                          alt="Mastercard"
                          width={80}
                          height={50}
                          className="mb-3 object-contain opacity-70"
                        />

                        <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                          Mastercard
                        </span>
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mastercard - Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </RadioGroup>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="07... or 01..."
                      disabled={isLoading || isConfirming}
                      className="disabled:cursor-not-allowed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (KSh)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1000"
                      disabled={isLoading || isConfirming}
                      className="disabled:cursor-not-allowed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Loading Spinner Below Amount Field */}
            {isConfirming && (
              <div className="flex justify-center items-center flex-col">
                <span className="text-center text-sm text-muted-foreground">
                  Waiting for M-pesa confirmation...
                </span>
                <TopUpSpinner />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading || isConfirming}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading || isConfirming || paymentMethod !== "mpesa"
                }
              >
                {isLoading ? <RequestSpinner size="sm" /> : null}
                {isLoading ? "Processing..." : "Top Up with M-Pesa"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
