"use client";

import { useParams } from "next/navigation";
import { Download, Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useGetPurchaseReceiptById } from "@/server-queries/purchaseReceiptsQueries";
import PurchaseReceiptPDFDocument from "@/components/PurchaseReceiptsDocument";
import { CreativeLoading } from "../../reports/sales/receipt/[invid]/invoiceLoading";

export default function PurchaseReceiptPage() {
  const params = useParams();
  const purchaseReceiptId = params?.poid as string;
  const businessId = useAuthBusinessId() ?? "";
  const { isLoading: isAuthLoading } = useAuthStore();

  const {
    data,
    isLoading: isReceiptLoading,
    isError,
  } = useGetPurchaseReceiptById(businessId, purchaseReceiptId);

  const isLoading = isAuthLoading || isReceiptLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CreativeLoading
          message={
            isAuthLoading
              ? "Performing a quick security check..."
              : "Preparing your Receipt..."
          }
          subMessage={
            isAuthLoading
              ? "Just a moment while we verify your access..."
              : "Just a moment while we get everything ready"
          }
          size="lg"
          showDocument={true}
          showParticles={true}
        />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Failed to load purchase receipt.
      </div>
    );
  }

  const receipt = data.data;

  const subtotal = receipt.products.reduce(
    (sum, p) => sum + p.unitPrice * p.quantity,
    0
  );

  const formatCurrency = (amount: number) =>
    amount.toLocaleString("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-10">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-end gap-3 mb-6 print:hidden">
          <Button
            asChild
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-primary/10"
          >
            <PDFDownloadLink
              document={<PurchaseReceiptPDFDocument receiptData={receipt} />}
              fileName={`PurchaseReceipt-${new Date(
                receipt.dateReceived
              ).getFullYear()}-${receipt.receiptNumber
                .toString()
                .padStart(4, "0")}.pdf`}
            >
              {({ loading }) => (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? "Preparing PDF..." : "Download PDF"}
                </>
              )}
            </PDFDownloadLink>
          </Button>

          {/* Print Button */}
          <Button
            onClick={() => window.print()}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>

        <Card className="shadow-md border border-gray-200 bg-white print:shadow-none print:border-none print:bg-transparent">
          <CardHeader className="text-center pb-6">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                B
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Business Name
              </CardTitle>
              <CardDescription>
                Procurement & Supply Chain Excellence
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            {/* Receipt Info */}
            {/* Receipt Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Info
                  label="Receipt Number"
                  value={`PR-${new Date(
                    receipt.dateReceived
                  ).getFullYear()}-${String(receipt.receiptNumber).padStart(
                    4,
                    "0"
                  )}`}
                />
                <Info label="Receipt Name" value={receipt.receiptName} />
                <Info
                  label="Order ID"
                  value={receipt.purchaseOrderId.slice(-6)}
                />
              </div>

              <div className="space-y-2">
                <Info label="Supplier" value={receipt.supplierName} />
                <Info label="Store" value={receipt.storeName} />
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        receipt.status === "RECEIVED"
                          ? "default"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {receipt.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Info
                  label="Business ID"
                  value={businessId.slice(-6) || "Unavailable"}
                />
                <Info
                  label="Receipt ID"
                  value={receipt.purchaseReceiptId.slice(-6)}
                />
                <Info
                  label="Date Received"
                  value={new Date(receipt.dateReceived).toLocaleDateString(
                    "en-KE",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )}
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Products Table */}
            <h2 className="text-lg font-bold mb-3 text-gray-800">Products</h2>
            <div className="rounded-md border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-[20%] text-gray-700">
                      Product Code
                    </TableHead>
                    <TableHead className="w-[40%] text-gray-700">
                      Product Name
                    </TableHead>
                    <TableHead className="text-right text-gray-700">
                      Unit Price
                    </TableHead>
                    <TableHead className="text-center text-gray-700">
                      Qty
                    </TableHead>
                    <TableHead className="text-right text-gray-700">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receipt.products.map((p, i) => (
                    <TableRow
                      key={p.businessProductId}
                      className={i % 2 === 0 ? "bg-gray-50" : ""}
                    >
                      <TableCell>{p.productCode || "N/A"}</TableCell>
                      <TableCell>{p.productName || "N/A"}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(p.unitPrice)}
                      </TableCell>
                      <TableCell className="text-center">
                        {p.quantity}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(p.unitPrice * p.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div className="mt-6 flex justify-end">
              <div className="border border-gray-300 rounded-md bg-gray-50 p-4 w-64 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (0%)</span>
                  <span>{formatCurrency(0)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center text-sm text-muted-foreground border-t pt-4">
              <p>Generated by Business System</p>
              <p className="text-xs mt-2">
                This is a system-generated document and does not require a
                signature.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Small helper component for clean label-value pairs
function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <p className="text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}
