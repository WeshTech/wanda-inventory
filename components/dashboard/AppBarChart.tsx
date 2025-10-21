"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { MonthlyComparison } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  sales: {
    label: "Sales",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface AppBarChartProps {
  data: MonthlyComparison[];
  isLoading?: boolean;
}

const AppBarChart = ({ data, isLoading = false }: AppBarChartProps) => {
  if (isLoading) {
    return (
      <div>
        <h1 className="text-lg font-medium mb-6">Total Revenue</h1>
        <div className="space-y-3">
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  // Transform data for the chart
  const chartData = data.map((item) => ({
    month: item.monthName,
    revenue: item.revenue,
    sales: item.sales,
  }));

  return (
    <div>
      <h1 className="text-lg font-medium mb-6">Total Revenue</h1>
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
          No data available
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 40,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={40} // slightly wider for larger numbers
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default AppBarChart;
