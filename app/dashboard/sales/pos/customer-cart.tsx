"use client";

import type React from "react";
import { ShoppingCart } from "lucide-react";
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
  onUpdatePrice: (productId: string, newPrice: number) => void;
  totalCost: number;
  onCheckout: () => void;
}

export function CustomerCart({
  cartItems,
  onScan,
  onUpdateQuantity,
  onRemoveItem,
  onUpdatePrice,
  totalCost,
  onCheckout,
}: CustomerCartProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onScan(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  const handleCheckout = () => {
    onCheckout();
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
        <ShoppingCart className="h-6 w-6" />
        Customer Cart
      </h2>
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
          <>
            {cartItems[0] && (
              <div
                key={cartItems[0].id}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <Image
                  src={cartItems[0].image || "/placeholder.svg"}
                  alt={cartItems[0].name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 grid gap-1">
                  <h3 className="font-medium">{cartItems[0].name}</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      defaultValue={cartItems[0].price}
                      onChange={(e) =>
                        onUpdatePrice(
                          cartItems[0].id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-24 h-8 text-sm"
                      step="0.01"
                      min="0"
                    />
                    <span className="text-sm text-muted-foreground">
                      KES / item
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-secondary">
                    Total: KES{" "}
                    {(
                      cartItems[0].price * cartItems[0].quantity
                    ).toLocaleString("en-KE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateQuantity(cartItems[0].id, -1)}
                    disabled={cartItems[0].quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium w-6 text-center">
                    {cartItems[0].quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateQuantity(cartItems[0].id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    onClick={() => onRemoveItem(cartItems[0].id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {cartItems[1] && (
              <div
                key={cartItems[1].id}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <Image
                  src={cartItems[1].image || "/placeholder.svg"}
                  alt={cartItems[1].name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 grid gap-1">
                  <h3 className="font-medium">{cartItems[1].name}</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      defaultValue={cartItems[1].price}
                      onChange={(e) =>
                        onUpdatePrice(
                          cartItems[1].id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-24 h-8 text-sm"
                      step="0.01"
                      min="0"
                    />
                    <span className="text-sm text-muted-foreground">
                      KES / item
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-secondary">
                    Total: KES{" "}
                    {(
                      cartItems[1].price * cartItems[1].quantity
                    ).toLocaleString("en-KE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateQuantity(cartItems[1].id, -1)}
                    disabled={cartItems[1].quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-medium w-6 text-center">
                    {cartItems[1].quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateQuantity(cartItems[1].id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    onClick={() => onRemoveItem(cartItems[1].id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {cartItems[2] && (
              <div
                key={cartItems[2].id}
                className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm"
              ></div>
            )}
          </>
        )}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center text-lg font-bold mb-4">
        <span>Total:</span>
        <span>
          KES{" "}
          {totalCost.toLocaleString("en-KE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      <Button
        size="lg"
        className="w-full flex items-center gap-2"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        <ShoppingCart className="h-5 w-5" />
        Checkout
      </Button>
    </div>
  );
}
