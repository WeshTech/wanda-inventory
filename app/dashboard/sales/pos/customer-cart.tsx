"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  serialNumber: string;
}

interface CustomerCartProps {
  cartItems: CartItem[];
  onScan: (serialNumber: string) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  totalCost: number;
  onCheckout: () => void;
  availableStock: { [key: string]: number };
}

export function CustomerCart({
  cartItems,
  onScan,
  onUpdateQuantity,
  onRemoveItem,
  totalCost,
  onCheckout,
  availableStock,
}: CustomerCartProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onScan(e.currentTarget.value);
      e.currentTarget.value = ""; // Clear input after scan
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-primary">Customer Cart</h2>
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Scan product"
          onKeyDown={handleKeyDown}
          className="pr-4 py-2 rounded-md w-full"
        />
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-2 -mr-2">
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Your cart is empty. Scan or add products!
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 grid gap-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} / item
                </p>
                <p className="text-sm font-semibold text-secondary">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Subtract quantity</span>
                </Button>
                <span className="font-medium w-6 text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  disabled={availableStock[item.id] <= 0}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add quantity</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center text-lg font-bold mb-4">
        <span>Total:</span>
        <span>${totalCost.toFixed(2)}</span>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={onCheckout}
        disabled={cartItems.length === 0}
      >
        Checkout
      </Button>
    </div>
  );
}
