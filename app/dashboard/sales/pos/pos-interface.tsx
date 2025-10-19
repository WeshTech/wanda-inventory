"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { ProductTable } from "./product-table";
import { CustomerCart } from "./customer-cart";
import { CheckoutModal } from "./checkout-modal";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthStoreAccess,
  useAuthUser,
} from "@/stores/authStore";
import { useStoreInfoQuery } from "@/server-queries/storeQueries";

export default function POSInterface() {
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string;
      image: string;
      name: string;
      price: number;
      quantity: number;
      serialNumber: string;
    }>
  >([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");

  const authLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const businessId = useAuthBusinessId();
  const storeIds = useAuthStoreAccess();
  const user = useAuthUser();
  const userId = user?.userId ?? "";

  const { data: storesData, isLoading: storesLoading } = useStoreInfoQuery(
    businessId ?? "",
    storeIds
  );

  const stores = useMemo(() => {
    if (!storesData?.data) return [];
    return Array.isArray(storesData.data) ? storesData.data : [storesData.data];
  }, [storesData]);

  useEffect(() => {
    if (
      stores.length > 0 &&
      !selectedStoreId &&
      !storesLoading &&
      isAuthenticated &&
      !authLoading
    ) {
      setSelectedStoreId(stores[0].storeId);
    }
  }, [stores, storesLoading, isAuthenticated, authLoading, selectedStoreId]);

  const addToCart = useCallback(
    (productToAdd: {
      id: string;
      image: string;
      serialNumber: string;
      name: string;
      price: number;
    }) => {
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.id === productToAdd.id
        );

        if (existingItemIndex > -1) {
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            quantity: updatedCartItems[existingItemIndex].quantity + 1,
          };
          return updatedCartItems;
        } else {
          return [
            ...prevCartItems,
            {
              id: productToAdd.id,
              image: productToAdd.image,
              name: productToAdd.name,
              price: productToAdd.price,
              quantity: 1,
              serialNumber: productToAdd.serialNumber,
            },
          ];
        }
      });
    },
    []
  );

  const updateCartItemQuantity = useCallback(
    (productId: string, delta: number) => {
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems
          .map((item) => {
            if (item.id === productId) {
              const newQuantity = item.quantity + delta;
              if (newQuantity <= 0) {
                return null;
              }
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter(Boolean) as typeof cartItems;

        return updatedCartItems;
      });
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== productId);
    });
  }, []);

  const handleScan = useCallback((scannedSerialNumber: string) => {
    alert(`Scanned: ${scannedSerialNumber}\n(Implement product lookup here)`);
  }, []);

  const calculateTotalCartCost = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleUpdatePrice = useCallback(
    (productId: string, newPrice: number) => {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === productId ? { ...item, price: newPrice } : item
        )
      );
    },
    []
  );

  const handleCheckout = useCallback(() => {
    setIsCheckoutModalOpen(true);
  }, []);

  const handlePaymentComplete = useCallback(
    (customerName: string) => {
      if (cartItems.length > 0 && selectedStoreId) {
        const submissionData = {
          businessId,
          storeId: selectedStoreId,
          userId,
          customerName, // ✅ ADDED: Customer name in submission
          products: cartItems.map((item) => ({
            productId: item.id,
            serialNumber: item.serialNumber,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: calculateTotalCartCost,
        };
        console.log("🚀 SALE SUBMISSION:", submissionData);
      }

      setCartItems([]);
      setIsCheckoutModalOpen(false);
      alert("Payment successful! Cart cleared.");
    },
    [cartItems, selectedStoreId, businessId, userId, calculateTotalCartCost]
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 p-4 md:p-6 border-r border-gray-200 dark:border-gray-800 overflow-auto">
          <ProductTable
            onAddToCart={addToCart}
            selectedStoreId={selectedStoreId}
            setSelectedStoreId={setSelectedStoreId}
            stores={stores}
            storesLoading={storesLoading}
          />
        </div>

        <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col bg-white dark:bg-gray-900 overflow-auto">
          <CustomerCart
            cartItems={cartItems}
            onScan={handleScan}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            onUpdatePrice={handleUpdatePrice}
            totalCost={calculateTotalCartCost}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        totalAmount={calculateTotalCartCost}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}
