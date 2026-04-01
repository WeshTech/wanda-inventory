"use client";

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreSalesForecastData } from "../lib/api_types";

interface StoreSalesForecastChartProps {
  data: StoreSalesForecastData;
  title?: string;
}

export function StoreSalesForecastChart({
  data,
  title = "Store Sales Forecast",
}: StoreSalesForecastChartProps) {
  if (!data || !data.forecast || data.forecast.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
          No forecast data available
        </CardContent>
      </Card>
    );
  }

  const chartData = data.forecast.map((point) => ({
    date: new Date(point.ds).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    actual: point.yhat,
    forecast: point.yhat,
    lower: point.yhat_lower,
    upper: point.yhat_upper,
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
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--color-primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--color-primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
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
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--color-primary))"
              fill="url(#colorForecast)"
              name="Forecast"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="upper"
              stroke="hsl(var(--color-secondary))"
              strokeDasharray="5 5"
              name="Upper Bound"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="lower"
              stroke="hsl(var(--color-secondary))"
              strokeDasharray="5 5"
              name="Lower Bound"
              strokeWidth={1}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
