"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

interface Sale {
  id: string;
  date: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "cancelled";
  paymentMethod: string;
}

const salesData: Sale[] = [
  {
    id: "INV-001",
    date: "2024-01-15",
    customer: "John Doe",
    product: "Wireless Headphones",
    amount: 299.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-002",
    date: "2024-01-15",
    customer: "Sarah Johnson",
    product: "Smartphone Case",
    amount: 49.99,
    status: "pending",
    paymentMethod: "PayPal",
  },
  {
    id: "INV-003",
    date: "2024-01-14",
    customer: "Mike Wilson",
    product: "Bluetooth Speaker",
    amount: 159.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-004",
    date: "2024-01-14",
    customer: "Emily Davis",
    product: "Laptop Stand",
    amount: 89.99,
    status: "cancelled",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "INV-005",
    date: "2024-01-13",
    customer: "David Brown",
    product: "Wireless Mouse",
    amount: 79.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-006",
    date: "2024-01-13",
    customer: "Lisa Anderson",
    product: "USB-C Hub",
    amount: 129.99,
    status: "pending",
    paymentMethod: "PayPal",
  },
  {
    id: "INV-007",
    date: "2024-01-12",
    customer: "Robert Taylor",
    product: "Webcam HD",
    amount: 199.99,
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "INV-008",
    date: "2024-01-12",
    customer: "Jennifer White",
    product: "Keyboard Mechanical",
    amount: 149.99,
    status: "completed",
    paymentMethod: "Bank Transfer",
  },
];

const getStatusBadge = (status: Sale["status"]) => {
  switch (status) {
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function RecentSalesTable() {
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
  const completedSales = salesData.filter(
    (sale) => sale.status === "completed"
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
              Total: {formatCurrency(totalSales)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border/50 overflow-hidden">
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
                <TableHead className="font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale) => (
                <TableRow
                  key={sale.id}
                  className="hover:bg-muted/30 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-primary">
                    {sale.id}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(sale.date)}
                  </TableCell>
                  <TableCell className="font-medium">{sale.customer}</TableCell>
                  <TableCell>{sale.product}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(sale.amount)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {sale.paymentMethod}
                  </TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-muted/50"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Sale
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="mr-2 h-4 w-4" />
                          Download Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Refund Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Sale
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
