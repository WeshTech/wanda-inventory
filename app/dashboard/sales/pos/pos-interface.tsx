"use client";

import { useState, useMemo, useCallback } from "react";
import { ProductTable } from "./product-table";
import { CustomerCart } from "./customer-cart";
import { CheckoutModal } from "./checkout-modal";

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: "prod-001",
    image: "/ripe-red-apple.png",
    serialNumber: "SN001",
    name: "Apple (Red)",
    category: "Fruits",
    stock: 10,
    price: 1.5,
  },
  {
    id: "prod-002",
    image: "/ripe-banana.png",
    serialNumber: "SN002",
    name: "Banana (Yellow)",
    category: "Fruits",
    stock: 15,
    price: 0.75,
  },
  {
    id: "prod-003",
    image: "/fresh-spinach.png",
    serialNumber: "SN003",
    name: "Spinach (Fresh)",
    category: "Vegetables",
    stock: 8,
    price: 2.2,
  },
  {
    id: "prod-004",
    image: "/glass-of-milk.png",
    serialNumber: "SN004",
    name: "Milk (Whole)",
    category: "Dairy",
    stock: 20,
    price: 3.0,
  },
  {
    id: "prod-005",
    image: "/assorted-breads.png",
    serialNumber: "SN005",
    name: "Bread (Wheat)",
    category: "Bakery",
    stock: 12,
    price: 2.75,
  },
  {
    id: "prod-006",
    image: "/roasted-chicken.png",
    serialNumber: "SN006",
    name: "Chicken Breast",
    category: "Meat",
    stock: 7,
    price: 8.99,
  },
  {
    id: "prod-007",
    image: "/assorted-soda-cans.png",
    serialNumber: "SN007",
    name: "Cola (Can)",
    category: "Beverages",
    stock: 30,
    price: 1.25,
  },
  {
    id: "prod-008",
    image: "/assorted-cheese-platter.png",
    serialNumber: "SN008",
    name: "Cheddar Cheese",
    category: "Dairy",
    stock: 9,
    price: 5.5,
  },
];

export default function POSInterface() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.serialNumber.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [products, searchTerm]);

  const addToCart = useCallback((productToAdd: (typeof MOCK_PRODUCTS)[0]) => {
    setCartItems((prevCartItems) => {
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.id === productToAdd.id
      );

      if (existingItemIndex > -1) {
        // Item already in cart, increment quantity
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + 1,
        };
        return updatedCartItems;
      } else {
        // New item, add to cart with quantity 1
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

    // Decrement stock
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productToAdd.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
  }, []);

  const updateCartItemQuantity = useCallback(
    (productId: string, delta: number) => {
      setCartItems((prevCartItems) => {
        const updatedCartItems = prevCartItems
          .map((item) => {
            if (item.id === productId) {
              const newQuantity = item.quantity + delta;
              if (newQuantity <= 0) {
                return null; // Mark for removal
              }
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter(Boolean) as typeof cartItems; // Filter out nulls

        return updatedCartItems;
      });

      // Update stock based on delta
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - delta } : p
        )
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevCartItems) => {
      const itemToRemove = prevCartItems.find((item) => item.id === productId);
      if (itemToRemove) {
        // Increment stock back
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId
              ? { ...p, stock: p.stock + itemToRemove.quantity }
              : p
          )
        );
      }
      return prevCartItems.filter((item) => item.id !== productId);
    });
  }, []);

  const handleScan = useCallback(
    (scannedSerialNumber: string) => {
      const product = products.find(
        (p) =>
          p.serialNumber.toLowerCase() === scannedSerialNumber.toLowerCase() &&
          p.stock > 0
      );
      if (product) {
        addToCart(product);
      } else {
        alert("Product not found or out of stock!");
      }
    },
    [products, addToCart]
  );

  const calculateTotalCartCost = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleCheckout = useCallback(() => {
    setIsCheckoutModalOpen(true);
  }, []);

  const handlePaymentComplete = useCallback(() => {
    // Here you would typically process the payment and clear the cart
    setCartItems([]);
    setIsCheckoutModalOpen(false);
    alert("Payment successful! Cart cleared.");
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side: Product Table */}
        <div className="w-full md:w-3/5 p-4 md:p-6 border-r border-gray-200 dark:border-gray-800 overflow-auto">
          <ProductTable
            products={filteredProducts}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddToCart={addToCart}
            availableStock={products.reduce(
              (acc, p) => ({ ...acc, [p.id]: p.stock }),
              {}
            )}
          />
        </div>

        {/* Right Side: Customer Cart */}
        <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col bg-white dark:bg-gray-900 overflow-auto">
          <CustomerCart
            cartItems={cartItems}
            onScan={handleScan}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            totalCost={calculateTotalCartCost}
            onCheckout={handleCheckout}
            availableStock={products.reduce(
              (acc, p) => ({ ...acc, [p.id]: p.stock }),
              {}
            )}
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
