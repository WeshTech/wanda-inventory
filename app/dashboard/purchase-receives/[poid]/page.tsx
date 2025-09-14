"use client";

import { Printer } from "lucide-react";
import { ReceiptHeader } from "./receipt-header";
import { ReceiptProducts } from "./receipt-products";

// Sample data - replace with actual data from your API/database
const sampleReceiptData = {
  receiptNumber: "RCP-2024-001",
  orderNumber: "ORD-2024-0156",
  receiptName: "Monthly Inventory Purchase",
  storeName: "Main Store - Nairobi",
  supplier: "ABC Suppliers Ltd",
  status: "received" as const,
  dateCreated: "2024-01-15",
  dateGenerated: "2024-01-16",
};

const sampleProducts = [
  {
    id: "1",
    name: "Laptop Computer",
    code: "LPT-001",
    unitPrice: 85000,
    quantity: 2,
    total: 170000,
  },
  {
    id: "2",
    name: "Office Chair",
    code: "CHR-002",
    unitPrice: 12500,
    quantity: 5,
    total: 62500,
  },
  {
    id: "3",
    name: "Printer Paper",
    code: "PPR-003",
    unitPrice: 800,
    quantity: 10,
    total: 8000,
  },
  {
    id: "4",
    name: "Wireless Mouse",
    code: "MSE-004",
    unitPrice: 2500,
    quantity: 8,
    total: 20000,
  },
];

const totalAmount = sampleProducts.reduce(
  (sum, product) => sum + product.total,
  0
);

export default function ReceiptPage() {
  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="max-w-4xl mx-auto p-8">
        {/* Print Button - Hidden when printing */}
        <div className="no-print mb-6 flex justify-end">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
        </div>

        {/* Receipt Content */}
        <div className="bg-white text-black p-8 rounded-lg shadow-lg print:shadow-none print:rounded-none">
          <ReceiptHeader {...sampleReceiptData} />
          <ReceiptProducts
            products={sampleProducts}
            totalAmount={totalAmount}
          />

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center text-muted-foreground">
            <p className="text-sm">Thank you for your business!</p>
            <p className="text-xs mt-2">
              This is a computer-generated receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
