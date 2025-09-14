"use client";

import { Product, ReceiptUpdate } from "@/schemas/purchaseReceiptSchema";
import { useState, useEffect } from "react";
import { ReceiptForm } from "./receipt-form";
import { AddProductDialog } from "./add-product-dialog";
import { ProductsTable } from "./products-table";

export default function UpdateReceiptPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = products.reduce((sum, product) => sum + product.total, 0);
    setTotalAmount(total);
  }, [products]);

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleSubmitReceipt = (data: ReceiptUpdate) => {
    console.log("Receipt data:", data);
    console.log("Products:", products);
    // Here you would typically send the data to your API
    alert("Receipt updated successfully!");
  };

  const initialReceiptData = {
    receiptName: "Hardware Supplies Receipt",
    store: "store-001",
    supplier: "ABC Hardware Ltd",
    status: "received" as const,
    purchaseOrderId: "PO-2024-001",
  };

  return (
    <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Update Purchase Receives
          </h1>
          <p className="text-muted-foreground">
            Edit received products and update receipt information
          </p>
        </div>

        {/* Receipt Form */}
        <ReceiptForm
          initialData={initialReceiptData}
          totalAmount={totalAmount}
          onSubmit={handleSubmitReceipt}
        />

        {/* Products Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Products</h2>
            <AddProductDialog onAddProduct={handleAddProduct} />
          </div>

          <ProductsTable
            products={products}
            onRemoveProduct={handleRemoveProduct}
          />

          {/* Total Summary */}
          {products.length > 0 && (
            <div className="flex justify-end">
              <div className="bg-card border rounded-lg p-4 min-w-64">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                      minimumFractionDigits: 2,
                    }).format(totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
