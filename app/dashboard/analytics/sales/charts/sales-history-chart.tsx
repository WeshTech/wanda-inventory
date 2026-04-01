"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreSalesHistoryData } from "../lib/api_types";

interface SalesHistoryChartProps {
  data: StoreSalesHistoryData;
  title?: string;
}

export function SalesHistoryChart({
  data,
  title = "Daily Sales History",
}: SalesHistoryChartProps) {
  if (!data || !data.records || data.records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
          No sales history data available
        </CardContent>
      </Card>
    );
  }

  const chartData = data.records.map((record) => ({
    date: new Date(record.sale_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    sales: record.total_sales,
    transactions: record.total_transactions,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Store ID: {data.store_id}
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--color-border))"
            />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--color-muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="hsl(var(--color-muted-foreground))"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: "1px solid hsl(var(--color-border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--color-foreground))" }}
              formatter={(value: number) => value.toLocaleString()}
            />
            <Legend />
            <Bar
              dataKey="sales"
              fill="hsl(var(--color-primary))"
              name="Total Sales ($)"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="transactions"
              fill="hsl(var(--color-secondary))"
              name="Transactions"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
