"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetRecentSalesData } from "@/server-queries/dashboardQueries";
import { RecentSalesData } from "@/types/dashboard";
import Loader from "../ui/loading-spiner";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthUser,
} from "@/stores/authStore";
import { ToKenyanShillings } from "@/utils/toKenyanShillings";

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function RecentSalesTable() {
  const router = useRouter();
  const businessId = useAuthBusinessId() || "";
  const user = useAuthUser() || "";
  const userId = typeof user === "object" && user !== null ? user.userId : "";
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  const { data: salesResponse, isLoading: isSalesLoading } =
    useGetRecentSalesData(businessId, userId);

  const isLoading = isAuthLoading || isSalesLoading;
  const salesData: RecentSalesData[] = salesResponse?.data || [];

  const totalSales = salesData.reduce(
    (sum, sale) => sum + sale.sellingPrice,
    0
  );
  const completedSales = salesData.filter(
    (sale) => (sale.status || "").toLowerCase() === "paid"
  ).length;

  return (
    <Card className="bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Recent Sales
            </CardTitle>
            <CardDescription className="mt-1">
              Latest transactions and order details
            </CardDescription>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">{completedSales} completed</span>
            </div>
            <div className="text-primary font-medium">
              Total: {ToKenyanShillings(totalSales)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader text="Loading sales" />
            </div>
          ) : salesData.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/images/nostorefound.jpg" alt="No sales" />
                <AvatarFallback>No Sales</AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground text-center">
                No sale data found, make your first sale
              </p>
              <Button
                onClick={() => router.push("/dashboard/makesale")}
                className="bg-primary hover:bg-primary/90"
              >
                Make a Sale
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/50">
                  <TableHead className="font-semibold">Invoice ID</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Product</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Payment</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((sale) => (
                  <TableRow
                    key={sale.invoiceNumber}
                    className="hover:bg-muted/30 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-primary">
                      {`INV-${new Date(sale.saleDate).getFullYear()}-${String(
                        sale.invoiceNumber
                      ).padStart(4, "0")}`}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatDate(sale.saleDate)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {sale.customerName}
                    </TableCell>
                    <TableCell>{sale.productName}</TableCell>
                    <TableCell className="font-semibold">
                      {ToKenyanShillings(sale.sellingPrice)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {sale.paymentMethod}
                    </TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
