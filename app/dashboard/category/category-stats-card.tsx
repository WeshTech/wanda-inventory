import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryStat {
  id: string;
  name: string;
  productCount: number;
  colorClass: string;
}

const categoryStats: CategoryStat[] = [
  {
    id: "cat1",
    name: "Electronics",
    productCount: 120,
    colorClass: "bg-blue-500 dark:bg-blue-700",
  },
  {
    id: "cat2",
    name: "Apparel",
    productCount: 350,
    colorClass: "bg-green-500 dark:bg-green-700",
  },
  {
    id: "cat3",
    name: "Home Goods",
    productCount: 80,
    colorClass: "bg-yellow-500 dark:bg-yellow-700",
  },
  {
    id: "cat4",
    name: "Books",
    productCount: 210,
    colorClass: "bg-purple-500 dark:bg-purple-700",
  },
  {
    id: "cat5",
    name: "Sports",
    productCount: 95,
    colorClass: "bg-red-500 dark:bg-red-700",
  },
];

export function CategoryStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
      {categoryStats.map((stat) => (
        <Card key={stat.id} className={`text-white ${stat.colorClass}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            {/* You can add an icon here if needed, e.g., <Package className="h-4 w-4 text-white" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.productCount}</div>
            <p className="text-xs text-white/80">Total Products</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
