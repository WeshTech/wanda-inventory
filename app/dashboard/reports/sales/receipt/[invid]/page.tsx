"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Printer,
  Calendar,
  User,
  MapPin,
  CreditCard,
  CheckCircle,
  Clock,
  Send,
} from "lucide-react";
import toast from "react-hot-toast";

// CSS for layout and responsive design
const styles = `
  .invoice-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: space-between;
    align-items: flex-start;
  }

  .invoice-field {
    flex: 1;
    min-width: 120px;
  }

  /* Stack fields vertically on small screens */
  @media (max-width: 768px) {
    .invoice-fields {
      flex-direction: column;
      gap: 1rem;
    }
  }

  /* Print styles */
  @media print {
    .no-print {
      display: none;
    }
    .container {
      padding: 0;
      margin: 0;
    }
    .card {
      box-shadow: none;
      border: none;
    }
    .table {
      width: 100%;
    }
  }
`;

interface InvoiceItem {
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  invoiceNo: string;
  store: string;
  customerName: string;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "overdue";
  paymentMethod: "cash" | "mpesa" | "card" | "other";
  servedBy: string;
  date: string;
  items: InvoiceItem[];
}

export default function CustomerInvoicePage() {
  const [email, setEmail] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);

  // Sample invoice data
  const invoiceData: InvoiceData = {
    invoiceNo: "INV-2025-010",
    store: "Main Branch",
    customerName: "Mia King",
    totalAmount: 1800.0,
    paymentStatus: "paid",
    paymentMethod: "cash",
    servedBy: "Emma Clark",
    date: "2025-09-09",
    items: [
      {
        productCode: "8901030895029",
        productName: "Samsung Galaxy Earbuds Pro",
        quantity: 1,
        unitPrice: 850.0,
        total: 850.0,
      },
      {
        productCode: "8901030895036",
        productName: "Wireless Charging Pad",
        quantity: 2,
        unitPrice: 475.0,
        total: 950.0,
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailSend = async () => {
    if (!email) {
      toast.error(`Email required`);
      return;
    }

    setIsEmailSending(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(`Sent`);

      setEmail("");
    } catch (error) {
      toast.error(`Operation failed: ${error}`);
    } finally {
      setIsEmailSending(false);
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "mpesa":
        return "bg-green-100 text-green-800 border-green-200";
      case "cash":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "card":
        return "bg-purple-100 text-purple-800 border-blue-200";
      case "other":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "overdue":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="bg-background print:bg-white">
        {/* Action Bar - Hidden in print */}
        <div className="bg-card border-b no-print">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <Label htmlFor="email" className="text-sm font-medium">
                  Send to Email:
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleEmailSend}
                  disabled={isEmailSending}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isEmailSending ? "Sending..." : "Send Email"}
                </Button>
                <Button
                  onClick={handlePrint}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="container mx-auto px-6 py-4 print:px-0 print:py-2">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-3">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src="/modern-business-logo-with-tc-letters.jpg" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                    TC
                  </AvatarFallback>
                </Avatar>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                TechCorp Solutions Ltd
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional Technology Services
              </p>
            </div>

            {/* Invoice Details Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl text-center text-foreground">
                  Customer Invoice
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="invoice-fields">
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Invoice Number
                    </Label>
                    <p className="text-base flex items-center gap-1">
                      {invoiceData.invoiceNo}
                    </p>
                  </div>
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Customer Name
                    </Label>
                    <p className="text-base flex items-center gap-1">
                      <User className="h-4 w-4 text-primary" />
                      {invoiceData.customerName}
                    </p>
                  </div>
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Store Location
                    </Label>
                    <p className="text-base flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-primary" />
                      {invoiceData.store}
                    </p>
                  </div>
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Date
                    </Label>
                    <p className="text-base flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {new Date(invoiceData.date).toLocaleDateString("en-KE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Payment Status
                    </Label>
                    <Badge
                      className={`${getPaymentStatusColor(
                        invoiceData.paymentStatus
                      )} flex items-center gap-1 w-fit`}
                    >
                      {getPaymentStatusIcon(invoiceData.paymentStatus)}
                      {invoiceData.paymentStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Payment Method
                    </Label>
                    <Badge
                      className={`${getPaymentMethodColor(
                        invoiceData.paymentMethod
                      )} flex items-center gap-1 w-fit`}
                    >
                      <CreditCard className="h-4 w-4" />
                      {invoiceData.paymentMethod.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="invoice-field">
                    <Label className="text-xs font-semibold text-muted-foreground">
                      Served By
                    </Label>
                    <p className="text-base flex items-center gap-1">
                      <Building2 className="h-4 w-4 text-primary" />
                      {invoiceData.servedBy}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items Table */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  Purchase Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full table">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-semibold text-sm">
                          Product Code
                        </th>
                        <th className="text-left p-3 font-semibold text-sm">
                          Product Name
                        </th>
                        <th className="text-center p-3 font-semibold text-sm">
                          Quantity
                        </th>
                        <th className="text-right p-3 font-semibold text-sm">
                          Unit Price (KSh)
                        </th>
                        <th className="text-right p-3 font-semibold text-sm">
                          Total (KSh)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-mono text-sm">
                            {item.productCode}
                          </td>
                          <td className="p-3 text-sm">{item.productName}</td>
                          <td className="p-3 text-center text-sm">
                            {item.quantity}
                          </td>
                          <td className="p-3 text-right text-sm">
                            {item.unitPrice.toLocaleString("en-KE", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="p-3 text-right font-semibold text-sm">
                            {item.total.toLocaleString("en-KE", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Total Section */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex justify-end">
                  <div className="w-full max-w-sm">
                    <Separator className="mb-3" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-foreground">
                        TOTAL AMOUNT:
                      </span>
                      <span className="text-xl font-bold text-secondary">
                        KSh{" "}
                        {invoiceData.totalAmount.toLocaleString("en-KE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      *Amount in Kenyan Shillings (KSh)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Thank you for your business!</p>
              <p className="text-xs mt-1">
                For any inquiries, please contact us at contact@techcorp.co.ke
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
