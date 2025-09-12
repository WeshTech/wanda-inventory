"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const categoriesData = [
  {
    month: "July",
    electronics: 8500,
    clothing: 6200,
    books: 4800,
    home: 5200,
  },
  {
    month: "August",
    electronics: 9800,
    clothing: 7100,
    books: 5400,
    home: 6200,
  },
  {
    month: "September",
    electronics: 11200,
    clothing: 8300,
    books: 6100,
    home: 7200,
  },
];

export function SalesCategoriesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Category</CardTitle>
        <CardDescription>
          Category performance over the last 3 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            electronics: {
              label: "Electronics",
              color: "hsl(var(--chart-1))",
            },
            clothing: {
              label: "Clothing",
              color: "hsl(var(--chart-2))",
            },
            books: {
              label: "Books",
              color: "hsl(var(--chart-3))",
            },
            home: {
              label: "Home & Garden",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={categoriesData}
              // Corrected margins to prevent overflow
              margin={{ top: 20, right: 0, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                className="text-xs"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  `$${value.toLocaleString()}`,
                  name,
                ]}
              />
              <Area
                type="monotone"
                dataKey="electronics"
                stackId="1"
                stroke="var(--color-electronics)"
                fill="var(--color-electronics)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="clothing"
                stackId="1"
                stroke="var(--color-clothing)"
                fill="var(--color-clothing)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="books"
                stackId="1"
                stroke="var(--color-books)"
                fill="var(--color-books)"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="home"
                stackId="1"
                stroke="var(--color-home)"
                fill="var(--color-home)"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
