// This is a Server Component
import InventoryHeader from "./inventory-header";
import InventorySummary from "./inventory-summary";
import ProductTable from "./product-table";

export default async function InventoryPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-full mx-auto grid gap-6">
          <InventoryHeader />
          <InventorySummary />
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
