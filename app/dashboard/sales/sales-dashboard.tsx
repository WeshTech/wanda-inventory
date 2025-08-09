"use client";

import { useState, useMemo, useCallback } from "react";
import { SalesOverview } from "./sales-overview";
import { SalesTable } from "./sales-table";
import { format } from "date-fns";

// Mock Sales Data
const MOCK_SALES_DATA = [
  {
    id: "sale-001",
    productImage: "/ripe-red-apple.png",
    productSN: "SN001",
    productName: "Apple (Red)",
    category: "Fruits",
    quantity: 2,
    totalPrice: 3.0,
    paymentMethod: "cash",
    soldBy: "John Doe",
    soldAt: new Date("2025-08-08T10:00:00"),
  },
  {
    id: "sale-002",
    productImage: "/ripe-banana.png",
    productSN: "SN002",
    productName: "Banana (Yellow)",
    category: "Fruits",
    quantity: 5,
    totalPrice: 3.75,
    paymentMethod: "mpesa",
    soldBy: "Jane Smith",
    soldAt: new Date("2025-08-08T11:30:00"),
  },
  {
    id: "sale-003",
    productImage: "/fresh-spinach.png",
    productSN: "SN003",
    productName: "Spinach (Fresh)",
    category: "Vegetables",
    quantity: 1,
    totalPrice: 2.2,
    paymentMethod: "mastercard",
    soldBy: "John Doe",
    soldAt: new Date("2025-08-07T14:00:00"),
  },
  {
    id: "sale-004",
    productImage: "/glass-of-milk.png",
    productSN: "SN004",
    productName: "Milk (Whole)",
    category: "Dairy",
    quantity: 3,
    totalPrice: 9.0,
    paymentMethod: "cash",
    soldBy: "Jane Smith",
    soldAt: new Date("2025-08-06T09:15:00"),
  },
  {
    id: "sale-005",
    productImage: "/assorted-breads.png",
    productSN: "SN005",
    productName: "Bread (Wheat)",
    category: "Bakery",
    quantity: 1,
    totalPrice: 2.75,
    paymentMethod: "mpesa",
    soldBy: "John Doe",
    soldAt: new Date("2025-08-05T16:45:00"),
  },
  {
    id: "sale-006",
    productImage: "/roasted-chicken.png",
    productSN: "SN006",
    productName: "Chicken Breast",
    category: "Meat",
    quantity: 1,
    totalPrice: 8.99,
    paymentMethod: "mastercard",
    soldBy: "Jane Smith",
    soldAt: new Date("2025-08-04T12:00:00"),
  },
  {
    id: "sale-007",
    productImage: "/assorted-soda-cans.png",
    productSN: "SN007",
    productName: "Cola (Can)",
    category: "Beverages",
    quantity: 6,
    totalPrice: 7.5,
    paymentMethod: "cash",
    soldBy: "John Doe",
    soldAt: new Date("2025-08-03T18:00:00"),
  },
  {
    id: "sale-008",
    productImage: "/assorted-cheese-platter.png",
    productSN: "SN008",
    productName: "Cheddar Cheese",
    category: "Dairy",
    quantity: 2,
    totalPrice: 11.0,
    paymentMethod: "mpesa",
    soldBy: "Jane Smith",
    soldAt: new Date("2025-08-02T08:30:00"),
  },
  {
    id: "sale-009",
    productImage: "/ripe-red-apple.png",
    productSN: "SN001",
    productName: "Apple (Red)",
    category: "Fruits",
    quantity: 1,
    totalPrice: 1.5,
    paymentMethod: "cash",
    soldBy: "John Doe",
    soldAt: new Date("2025-08-01T09:00:00"),
  },
  {
    id: "sale-010",
    productImage: "/ripe-banana.png",
    productSN: "SN002",
    productName: "Banana (Yellow)",
    category: "Fruits",
    quantity: 3,
    totalPrice: 2.25,
    paymentMethod: "mastercard",
    soldBy: "Jane Smith",
    soldAt: new Date("2025-07-31T10:00:00"),
  },
  {
    id: "sale-011",
    productImage: "/fresh-spinach.png",
    productSN: "SN003",
    productName: "Spinach (Fresh)",
    category: "Vegetables",
    quantity: 2,
    totalPrice: 4.4,
    paymentMethod: "cash",
    soldBy: "John Doe",
    soldAt: new Date("2025-07-30T11:00:00"),
  },
  {
    id: "sale-012",
    productImage: "/glass-of-milk.png",
    productSN: "SN004",
    productName: "Milk (Whole)",
    category: "Dairy",
    quantity: 1,
    totalPrice: 3.0,
    paymentMethod: "mpesa",
    soldBy: "Jane Smith",
    soldAt: new Date("2025-07-29T12:00:00"),
  },
];

export type Sale = (typeof MOCK_SALES_DATA)[0];

export default function SalesDashboard() {
  const [timePeriod, setTimePeriod] = useState("last7days"); // 'today', 'last7days', 'last30days', 'all'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [salesData, setSalesData] = useState<Sale[]>(MOCK_SALES_DATA); // State to manage sales data for deletion

  const filteredSales = useMemo(() => {
    let sales = salesData;

    // Filter by time period
    const now = new Date();
    if (timePeriod === "today") {
      sales = sales.filter(
        (sale) =>
          format(sale.soldAt, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")
      );
    } else if (timePeriod === "last7days") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Corrected date calculation
      sales = sales.filter((sale) => sale.soldAt >= sevenDaysAgo);
    } else if (timePeriod === "last30days") {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Corrected date calculation
      sales = sales.filter((sale) => sale.soldAt >= thirtyDaysAgo);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      sales = sales.filter((sale) => sale.category === selectedCategory);
    }

    return sales;
  }, [timePeriod, selectedCategory, salesData]);

  const totalSalesValue = useMemo(() => {
    return filteredSales.reduce((total, sale) => total + sale.totalPrice, 0);
  }, [filteredSales]);

  const totalProductsSold = useMemo(() => {
    return filteredSales.reduce((total, sale) => total + sale.quantity, 0);
  }, [filteredSales]);

  const salesByCategory = useMemo(() => {
    const categoryMap: { [key: string]: number } = {};
    filteredSales.forEach((sale) => {
      categoryMap[sale.category] =
        (categoryMap[sale.category] || 0) + sale.totalPrice;
    });

    const total = Object.values(categoryMap).reduce((sum, val) => sum + val, 0);
    return Object.entries(categoryMap).map(([category, value]) => ({
      name: category, // Changed to 'name' for Recharts
      value: value,
      percentage: total > 0 ? (value / total) * 100 : 0,
    }));
  }, [filteredSales]);

  const allCategories = useMemo(() => {
    const categories = new Set(MOCK_SALES_DATA.map((sale) => sale.category));
    return ["all", ...Array.from(categories)].sort();
  }, []);

  const handleExport = useCallback(() => {
    // In a real application, you would generate and download a CSV/Excel file here.
    alert("Exporting sales data (mock function)...");
    console.log("Sales data to export:", filteredSales);
  }, [filteredSales]);

  const handleDeleteSale = useCallback((saleId: string) => {
    setSalesData((prevSales) => prevSales.filter((sale) => sale.id !== saleId));
    alert(`Sale ${saleId} deleted! (Mock action)`);
  }, []);

  const handleEditSale = useCallback((saleId: string) => {
    alert(`Editing sale ${saleId}! (Mock action)`);
    // In a real app, you'd open a form to edit the sale details
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <h1 className="text-3xl font-semibold mb-6">Sales</h1>

      <SalesOverview
        totalSalesValue={totalSalesValue}
        totalProductsSold={totalProductsSold}
        salesByCategory={salesByCategory}
        timePeriod={timePeriod}
        onTimePeriodChange={setTimePeriod}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        allCategories={allCategories}
        onExport={handleExport}
      />

      <div className="mt-8 pb-8">
        <SalesTable
          sales={filteredSales}
          onDeleteSale={handleDeleteSale}
          onEditSale={handleEditSale}
        />
      </div>
    </div>
  );
}
