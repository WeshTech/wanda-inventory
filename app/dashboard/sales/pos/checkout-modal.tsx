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
import { useState, useMemo } from "react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentComplete: () => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  totalAmount,
  onPaymentComplete,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashGiven, setCashGiven] = useState<number | string>("");

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
    onPaymentComplete();
    setCashGiven(""); // Reset cash given
    setPaymentMethod("cash"); // Reset payment method
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Select a payment method and complete the transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4 text-lg font-semibold">
            Total Due:{" "}
            <span className="text-primary">${totalAmount.toFixed(2)}</span>
          </div>
          <Tabs
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cash">Cash</TabsTrigger>
              <TabsTrigger value="mastercard">Mastercard</TabsTrigger>
              <TabsTrigger value="mpesa">Mpesa</TabsTrigger>
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
                    value={`$${change.toFixed(2)}`}
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
        <Button onClick={handleConfirmPayment} className="w-full">
          Confirm Payment
        </Button>
      </DialogContent>
    </Dialog>
  );
}
