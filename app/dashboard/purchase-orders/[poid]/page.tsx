"use client";

import { useParams } from "next/navigation";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePurchaseOrderDetail } from "@/server-queries/purchaseorderQueries";
import PurchaseOrderPDFDocument from "@/components/PurchaseOrderDocument";
import Image from "next/image";
import { CreativeLoading } from "../../reports/sales/receipt/[invid]/invoiceLoading";

const getStatusColor = (status: string) => {
  const map: Record<string, string> = {
    DRAFT: "bg-gray-200 text-gray-700",
    SUBMITTED: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-blue-100 text-blue-700",
    REJECTED: "bg-red-100 text-red-700",
    RECEIVED: "bg-green-100 text-green-700",
    PARTIAL: "bg-purple-100 text-purple-700",
    CANCELLED: "bg-red-200 text-red-800",
    CLOSED: "bg-gray-300 text-gray-800",
  };
  return map[status] ?? "bg-gray-100 text-gray-700";
};

const companyInfo = {
  name: "TechCorp Solutions Ltd",
  tagline: "Procurement & Supply Chain Excellence",
  email: "contact@techcorp.co.ke",
  phone: "+254 XXX XXX XXX",
  logoUrl: "/images/logo.png",
};

export default function PurchaseOrderDetailPage() {
  const poid = useParams()?.poid as string;
  const businessId = useAuthBusinessId() ?? "";
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const {
    data: poResponse,
    isLoading: isPOLoading,
    isError,
  } = usePurchaseOrderDetail(businessId, poid);

  const loading = isAuthLoading || isPOLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CreativeLoading
          message={
            isAuthLoading
              ? "Performing a quick security check..."
              : "Preparing your Purchase order"
          }
          subMessage={
            isAuthLoading
              ? "Just a moment while we verify your access..."
              : "Loading your purchase order..."
          }
          size="lg"
          showDocument={true}
          showParticles={true}
        />
      </div>
    );
  }

  if (isError || !poResponse?.data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <p className="text-gray-700 mb-4 font-helvetica text-sm">
          Failed to load Purchase Order.
        </p>
        <Link href="/purchase-orders">
          <Button
            variant="outline"
            className="font-helvetica text-sm border-gray-400 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Purchase Orders
          </Button>
        </Link>
      </div>
    );
  }

  const purchaseOrder = poResponse.data;
  const products = purchaseOrder.products || [];
  const subtotal = products.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const currency = "KSh";
  const locale = "en-KE";

  const formatCurrency = (amount: number) =>
    amount.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-white p-8 md:p-10 font-helvetica print:p-0 mb-6">
      <div className="max-w-3xl mx-auto bg-white print:shadow-none">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link href="/dashboard/purchase-orders">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-400 text-gray-700 hover:bg-gray-100 font-helvetica text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button
              asChild
              variant="outline"
              className="border-gray-400 text-gray-700 hover:bg-primary font-helvetica text-sm"
            >
              <PDFDownloadLink
                document={
                  <PurchaseOrderPDFDocument orderData={purchaseOrder} />
                }
                fileName={`PurchaseOrder-${purchaseOrder.orderNumber}.pdf`}
              >
                {({ loading }) => (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    {loading ? "Preparing PDF..." : "Download PDF"}
                  </>
                )}
              </PDFDownloadLink>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="border-gray-400 text-gray-700 hover:bg-gray-100 font-helvetica text-sm"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          {companyInfo.logoUrl && (
            <Image
              src={companyInfo.logoUrl}
              alt="Company Logo"
              className="w-16 h-16 mx-auto mb-2"
              width={64}
              height={64}
            />
          )}
          <h1 className="text-xl font-bold text-gray-900">
            {companyInfo.name}
          </h1>
          {companyInfo.tagline && (
            <p className="text-xs text-gray-600 mt-1">{companyInfo.tagline}</p>
          )}
          {(companyInfo.email || companyInfo.phone) && (
            <p className="text-xs text-gray-600 mt-1">
              {[companyInfo.email, companyInfo.phone]
                .filter(Boolean)
                .join(" | ")}
            </p>
          )}
        </div>

        <Separator className="border-gray-800 border-t-2 my-6" />

        {/* Title and Status */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
            Purchase Order
          </h2>
          <Badge
            className={cn(
              "uppercase text-xs font-semibold",
              getStatusColor(purchaseOrder.status)
            )}
          >
            {purchaseOrder.status}
          </Badge>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Order Number
            </p>
            <p className="text-sm text-gray-900">{purchaseOrder.orderNumber}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Supplier
            </p>
            <p className="text-sm text-gray-900">
              {purchaseOrder.supplier || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">Store</p>
            <p className="text-sm text-gray-900">
              {purchaseOrder.store || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">Status</p>
            <p className="text-sm text-gray-900">{purchaseOrder.status}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Expected Date
            </p>
            <p className="text-sm text-gray-900">
              {formatDate(purchaseOrder.dateExpected)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Date Created
            </p>
            <p className="text-sm text-gray-900">
              {formatDate(purchaseOrder.dateCreated)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Created By
            </p>
            <p className="text-sm text-gray-900">{purchaseOrder.createdBy}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Auto Generated
            </p>
            <p className="text-sm text-gray-900">
              {purchaseOrder.autoGenerated ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <Separator className="border-gray-300 my-6" />

        {/* Products Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Products</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-800">
                  <th className="py-2 px-3 text-center text-xs font-bold uppercase text-gray-600 w-[20%]">
                    Product ID
                  </th>
                  <th className="py-2 px-3 text-center text-xs font-bold uppercase text-gray-600 w-[40%]">
                    Product Name
                  </th>
                  <th className="py-2 px-3 text-center text-xs font-bold uppercase text-gray-600 w-[13%]">
                    Qty
                  </th>
                  <th className="py-2 px-3 text-center text-xs font-bold uppercase text-gray-600 w-[13%]">
                    Unit Price ({currency})
                  </th>
                  <th className="py-2 px-3 text-center text-xs font-bold uppercase text-gray-600 w-[14%]">
                    Total ({currency})
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-b",
                      i === products.length - 1
                        ? "border-gray-800 border-b-2"
                        : "border-gray-200"
                    )}
                  >
                    <td className="py-2 px-3 text-sm text-gray-900 text-center font-mono">
                      {item.barcode || item.businessProductId}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-900 text-center">
                      {item.productName || "N/A"}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-900 text-center">
                      {item.quantity}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-900 text-center">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-900 text-center font-semibold">
                      {formatCurrency(item.quantity * item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-full max-w-xs space-y-2">
            <Separator className="border-gray-800 border-t-2" />
            <div className="flex justify-between text-sm font-bold">
              <span className="text-gray-900">Total Order Value:</span>
              <span className="text-gray-900">
                {currency} {formatCurrency(subtotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-600">
            This purchase order was generated by {companyInfo.name}
          </p>
          {(companyInfo.email || companyInfo.phone) && (
            <p className="text-xs text-gray-600 mt-1">
              Contact:{" "}
              {[companyInfo.email, companyInfo.phone]
                .filter(Boolean)
                .join(" | ")}
            </p>
          )}
          <p className="text-xs text-gray-600 mt-2">
            This is a system-generated document and does not require a
            signature.
          </p>
        </div>
      </div>
    </div>
  );
}
