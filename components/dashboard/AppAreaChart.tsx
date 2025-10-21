"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface AppAreaChartProps {
  data: MonthlyComparison[];
  isLoading?: boolean;
}

const AppAreaChart = ({ data, isLoading = false }: AppAreaChartProps) => {
  if (isLoading) {
    return (
      <div>
        <h1 className="text-lg font-medium mb-6">Sales Trend</h1>
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
      <h1 className="text-lg font-medium mb-6">Sales Trend</h1>
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
          No data available
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 40,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              height={30}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={40}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend
              content={<ChartLegendContent />}
              wrapperStyle={{
                paddingTop: "8px",
                paddingBottom: "0",
              }}
            />
            <Line
              dataKey="sales"
              type="natural"
              stroke="var(--color-sales)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default AppAreaChart;
