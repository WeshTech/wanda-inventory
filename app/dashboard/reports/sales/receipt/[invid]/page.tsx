"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Printer, Download } from "lucide-react";
import { useParams } from "next/navigation";
import { useAuthBusinessId, useAuthUser } from "@/stores/authStore";
import { useGetSaleById } from "@/server-queries/salesQueries";
import { CreativeLoading } from "./invoiceLoading";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDFDocument from "@/components/CustomerInvoiceDocument";

const styles = `
  @media print {
    .no-print {
      display: none;
    }
    body {
      margin: 0;
      padding: 0;
    }
    .invoice-container {
      padding: 20mm;
    }
  }

  .invoice-container {
    background: white;
    max-width: 210mm;
    margin: 0 auto;
    padding: 15mm;
    font-family: 'Arial', sans-serif;
  }

  .invoice-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

.invoice-table th {
    background: #f5f5f5;
    padding: 10px;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    border-bottom: 2px solid #333;
  }

  .invoice-table td {
    padding: 8px 10px;
    font-size: 10px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }

  .invoice-table tbody tr:last-child td {
    border-bottom: 2px solid #333;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin: 20px 0;
  }

  .info-item {
    font-size: 10px;
  }

  .info-label {
    font-weight: 600;
    color: #666;
    margin-bottom: 2px;
  }

  .info-value {
    color: #000;
  }

  .totals-section {
    margin-top: 20px;
    margin-left: auto;
    width: 300px;
  }

  .totals-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 10px;
  }

  .totals-row.final {
    border-top: 2px solid #333;
    padding-top: 10px;
    margin-top: 5px;
    font-weight: bold;
    font-size: 12px;
  }

  .text-right {
    text-align: right;
  }
`;

export default function CustomerInvoicePage() {
  const params = useParams();
  const { invid } = params;

  const businessId = useAuthBusinessId();
  const user = useAuthUser();
  const userId = user?.userId ?? "";

  const isAuthLoading = !user || !businessId;
  const isAuthError = !user || !businessId;

  const {
    data: saleResponse,
    isLoading: isDataLoading,
    error,
    isError,
  } = useGetSaleById(businessId || "", userId, invid as string);

  const isLoading = isDataLoading || isAuthLoading;
  const hasError = isError || isAuthError;

  const invoiceData =
    !isLoading && !hasError && saleResponse?.success
      ? (() => {
          const dateValue =
            saleResponse.data?.createdAt ||
            new Date().toISOString().split("T")[0];
          const year = new Date(dateValue).getFullYear();

          return {
            invoiceNo: `INV-${year}-${saleResponse.data?.invoiceNumber
              ?.toString()
              .padStart(4, "0")}`,
            store: saleResponse.data?.store || "Main Branch",
            customerName: saleResponse.data?.customerName || "Customer",
            totalAmount: saleResponse.data?.totalAmount || 0,
            paymentStatus: "PAID",
            paymentMethod: "CASH",
            servedBy: saleResponse.data?.servedBy || "Staff",
            date: dateValue,
            items: saleResponse.data?.items || [],
          };
        })()
      : null;

  const errorMessage = isAuthError
    ? "Please log in to view this invoice"
    : error?.message || "Error loading invoice";

  const handlePrint = () => window.print();

  const subtotal = invoiceData?.totalAmount || 0;
  const taxRate = 0.0;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CreativeLoading
          message={
            isAuthLoading
              ? "Checking your session..."
              : "Preparing your Invoice"
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

  if (hasError) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="text-red-500 mb-4">
          <p className="text-lg font-semibold">Error loading invoice</p>
          <p className="text-sm mt-2">{errorMessage}</p>
        </div>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
        {isAuthError && (
          <p className="text-sm text-muted-foreground mt-2">
            <a href="/login" className="underline hover:no-underline">
              Click here to login
            </a>
          </p>
        )}
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-muted-foreground">Invoice not found</p>
        <Button
          onClick={() => window.history.back()}
          variant="link"
          className="mt-2"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="bg-gray-50 min-h-screen">
        {/* Action Bar */}
        <div className="bg-white border-b no-print sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex gap-3">
              <Button
                onClick={handlePrint}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Invoice
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <PDFDownloadLink
                  document={<InvoicePDFDocument saleData={invoiceData} />}
                  fileName={`${invoiceData.invoiceNo}.pdf`}
                >
                  {({ loading }) => (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      {loading ? "Preparing PDF..." : "Download PDF"}
                    </>
                  )}
                </PDFDownloadLink>
              </Button>
            </div>
          </div>
        </div>

        {/* Invoice Document */}
        <div className="invoice-container">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Avatar className="h-16 w-16">
                <AvatarImage src="/modern-business-logo-with-tc-letters.jpg" />
                <AvatarFallback
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  TC
                </AvatarFallback>
              </Avatar>
            </div>
            <h1
              style={{ fontSize: "20px", fontWeight: "bold", margin: "5px 0" }}
            >
              TechCorp Solutions Ltd
            </h1>
            <p style={{ fontSize: "10px", color: "#666" }}>
              Professional Technology Services
            </p>
            <p style={{ fontSize: "9px", color: "#666", marginTop: "5px" }}>
              contact@techcorp.co.ke | +254 XXX XXX XXX
            </p>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "2px solid #333",
              margin: "20px 0",
            }}
          />

          {/* Invoice Title */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              CUSTOMER INVOICE
            </h2>
          </div>

          {/* Invoice Information Grid */}
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Invoice Number:</div>
              <div className="info-value">{invoiceData.invoiceNo}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Date:</div>
              <div className="info-value">
                {new Date(invoiceData.date).toLocaleDateString("en-KE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Customer Name:</div>
              <div className="info-value">{invoiceData.customerName}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Store Location:</div>
              <div className="info-value">{invoiceData.store}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Payment Status:</div>
              <div className="info-value">{invoiceData.paymentStatus}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Payment Method:</div>
              <div className="info-value">{invoiceData.paymentMethod}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Served By:</div>
              <div className="info-value">{invoiceData.servedBy}</div>
            </div>
          </div>

          {/* Items Table */}
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Product Code</th>
                <th>Product Name</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Unit Price (KSh)</th>
                <th className="text-right">Total (KSh)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.productCode}</td>
                  <td>{item.productName || "N/A"}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">
                    {item.price.toLocaleString("en-KE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="text-right" style={{ fontWeight: "600" }}>
                    {item.total.toLocaleString("en-KE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="totals-section">
            <div className="totals-row">
              <span>Subtotal:</span>
              <span>
                KSh{" "}
                {subtotal.toLocaleString("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="totals-row">
              <span>Tax (0.00%):</span>
              <span>
                KSh{" "}
                {taxAmount.toLocaleString("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="totals-row final">
              <span>TOTAL:</span>
              <span>
                KSh{" "}
                {total.toLocaleString("en-KE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: "40px",
              textAlign: "center",
              fontSize: "9px",
              color: "#666",
            }}
          >
            <p style={{ marginBottom: "5px" }}>Thank you for your business!</p>
            <p>
              For any inquiries, please contact us at contact@techcorp.co.ke
            </p>
            <p style={{ marginTop: "15px", fontSize: "8px" }}>
              This is a computer-generated invoice and does not require a
              signature.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
