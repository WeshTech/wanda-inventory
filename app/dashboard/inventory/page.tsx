// This is a Server Component
import type { Product } from "@/lib/types";
import InventoryHeader from "./inventory-header";
import InventorySummary from "./inventory-summary";
import ProductTable from "./product-table";

// Dummy data for demonstration purposes.
// In a real application, you would fetch this data from a database or an API.
const getProducts = async (): Promise<Product[]> => {
  return [
    {
      id: "1",
      serialNumber: "SN001",
      name: "Wireless Mouse",
      category: "Electronics",
      quantity: 150,
      status: "In Stock",
      price: 25.99,
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "2",
      serialNumber: "SN002",
      name: "Mechanical Keyboard",
      category: "Electronics",
      quantity: 8, // Low stock example
      status: "Low Stock",
      price: 79.99,
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "3",
      serialNumber: "SN003",
      name: "USB-C Hub",
      category: "Accessories",
      quantity: 0, // Out of stock example
      status: "Out of Stock",
      price: 35.0,
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "4",
      serialNumber: "SN004",
      name: "Gaming Headset",
      category: "Electronics",
      quantity: 120,
      status: "In Stock",
      price: 59.99,
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "5",
      serialNumber: "SN005",
      name: "Monitor Stand",
      category: "Office Supplies",
      quantity: 5, // Low stock example
      status: "Low Stock",
      price: 45.5,
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "6",
      serialNumber: "SN006",
      name: "Ergonomic Chair",
      category: "Furniture",
      quantity: 0, // Out of stock example
      status: "Out of Stock",
      price: 299.0,
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: "7",
      serialNumber: "SN007",
      name: "External SSD 1TB",
      category: "Storage",
      quantity: 75,
      status: "In Stock",
      price: 120.0,
      image: "/placeholder.svg?height=64&width=64",
    },
  ];
};

export default async function InventoryPage() {
  const products = await getProducts();

  // Calculate total assets value
  const totalAssetsValue = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );

  // Calculate stock summary counts
  const inStockCount = products.filter((p) => p.status === "In Stock").length;
  const lowStockCount = products.filter((p) => p.status === "Low Stock").length;
  const outOfStockCount = products.filter(
    (p) => p.status === "Out of Stock"
  ).length;
  const totalProducts = products.length;

  // Calculate percentages for the summary loaders
  const inStockPercentage =
    totalProducts > 0 ? (inStockCount / totalProducts) * 100 : 0;
  const lowStockPercentage =
    totalProducts > 0 ? (lowStockCount / totalProducts) * 100 : 0;
  const outOfStockPercentage =
    totalProducts > 0 ? (outOfStockCount / totalProducts) * 100 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid gap-6">
          <InventoryHeader />
          <InventorySummary
            totalAssetsValue={totalAssetsValue}
            inStockPercentage={inStockPercentage}
            lowStockPercentage={lowStockPercentage}
            outOfStockPercentage={outOfStockPercentage}
          />
          <ProductTable products={products} />
        </div>
      </div>
    </div>
  );
}
