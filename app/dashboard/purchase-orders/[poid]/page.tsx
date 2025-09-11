"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer as Print } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const mockPurchaseOrder = {
  id: "PO-2024-001",
  supplier: "ABC Supplies Ltd",
  store: "Main Warehouse",
  status: "approved" as const,
  dateCreated: "2024-01-15",
  dateExpected: "2024-01-25",
  createdBy: "John Smith",
  products: [
    {
      barcode: "1234567890123",
      name: "Premium Coffee Beans - Arabica",
      quantity: 50,
      price: 12.99,
    },
    {
      barcode: "2345678901234",
      name: "Organic Green Tea Bags",
      quantity: 100,
      price: 8.5,
    },
    {
      barcode: "3456789012345",
      name: "Stainless Steel Water Bottles",
      quantity: 25,
      price: 24.99,
    },
    {
      barcode: "4567890123456",
      name: "Bamboo Cutting Boards",
      quantity: 15,
      price: 18.75,
    },
    // Add more mock products to reach or exceed 20 for demonstration
    ...Array.from({ length: 20 }, (_, i) => ({
      barcode: `999${i}000${i}1234`,
      name: `Product ${i + 5}`,
      quantity: 10 + i,
      price: 10 + i * 2.5,
    })),
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "approved":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "shipped":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

export default function PurchaseOrderInvoice() {
  const subtotal = mockPurchaseOrder.products
    .slice(0, 20)
    .reduce((sum, product) => sum + product.quantity * product.price, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Purchase Orders
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Print className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Invoice Card */}
        <Card className="bg-white dark:bg-gray-900 shadow-lg">
          <CardHeader className="pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Purchase Order
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {mockPurchaseOrder.id}
                </p>
              </div>
              <Badge className={getStatusColor(mockPurchaseOrder.status)}>
                {mockPurchaseOrder.status.charAt(0).toUpperCase() +
                  mockPurchaseOrder.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Purchase Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Supplier
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {mockPurchaseOrder.supplier}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Store
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {mockPurchaseOrder.store}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Date Created
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {new Date(
                      mockPurchaseOrder.dateCreated
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Date Expected
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {new Date(
                      mockPurchaseOrder.dateExpected
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Created By
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {mockPurchaseOrder.createdBy}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Products Table */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Products
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Barcode
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Product Name
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Quantity
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Unit Price
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPurchaseOrder.products
                      .slice(0, 20)
                      .map((product, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="py-4 px-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                            {product.barcode}
                          </td>
                          <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-medium">
                            {product.name}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-900 dark:text-gray-100">
                            {product.quantity}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-900 dark:text-gray-100">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-900 dark:text-gray-100 font-semibold">
                            ${(product.quantity * product.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end">
              <div className="w-full max-w-sm space-y-3">
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal:
                  </span>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tax (10%):
                  </span>
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
