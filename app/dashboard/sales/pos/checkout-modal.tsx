"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useMemo } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentComplete: (customerName: string) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  onPaymentComplete,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashGiven, setCashGiven] = useState<number | string>("");
  const [customerName, setCustomerName] = useState("");

  const change = useMemo(() => {
    if (
      paymentMethod === "cash" &&
      typeof cashGiven === "number" &&
      cashGiven >= totalAmount
    ) {
      return cashGiven - totalAmount;
    }
    return 0;
  }, [paymentMethod, cashGiven, totalAmount]);

  const handleCashInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value);
    setCashGiven(isNaN(value) ? "" : value);
  };

  const handleConfirmPayment = () => {
    if (
      paymentMethod === "cash" &&
      (typeof cashGiven !== "number" || cashGiven < totalAmount)
    ) {
      alert("Please enter enough cash or select another payment method.");
      return;
    }
    onPaymentComplete(customerName);
    setCashGiven("");
    setPaymentMethod("cash");
    setCustomerName("");
  };

  const isFormValid =
    customerName.trim() !== "" &&
    paymentMethod === "cash" &&
    typeof cashGiven === "number" &&
    cashGiven >= totalAmount;

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Select a payment method and complete the transaction.
            </DialogDescription>
          </DialogHeader>

          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-1 text-center">
              👤 Name should be just a nickname
            </div>
            <Input
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`${
                customerName.trim() === "" ? "border-red-300" : ""
              }`}
              required
            />
            {customerName.trim() === "" && (
              <p className="text-xs text-red-500 mt-1">Name is required</p>
            )}
          </div>

          <div className="py-4">
            <div className="mb-4 text-lg font-semibold">
              Total Due:{" "}
              <span className="text-primary">KES{totalAmount.toFixed(2)}</span>
            </div>
            <Tabs
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cash">Cash</TabsTrigger>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="mastercard"
                      disabled
                      className="cursor-not-allowed opacity-50 data-[state=active]:opacity-50"
                    >
                      Mastercard
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger
                      value="mpesa"
                      disabled
                      className="cursor-not-allowed opacity-50 data-[state=active]:opacity-50"
                    >
                      Mpesa
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>

              <TabsContent value="cash" className="mt-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cash-given">Cash Given</Label>
                    <Input
                      id="cash-given"
                      type="number"
                      placeholder="0.00"
                      value={cashGiven}
                      onChange={handleCashInputChange}
                      min={0}
                      step="0.01"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Change</Label>
                    <Input
                      value={`KES${change.toFixed(2)}`}
                      readOnly
                      className="font-bold text-lg text-secondary"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mastercard" className="mt-4">
                <div className="text-center text-muted-foreground py-8">
                  Mastercard payment gateway integration coming soon.
                </div>
              </TabsContent>

              <TabsContent value="mpesa" className="mt-4">
                <div className="text-center text-muted-foreground py-8">
                  Mpesa payment gateway integration coming soon.
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Button
            onClick={handleConfirmPayment}
            className="w-full"
            disabled={!isFormValid}
          >
            {isFormValid ? "Confirm Payment" : "Enter name and cash given"}
          </Button>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
