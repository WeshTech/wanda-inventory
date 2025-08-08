"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Warehouse,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: {
    value: string;
    isPositive: boolean;
  };
  gradient: string;
}

function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  gradient,
}: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradient} bg-opacity-10`}>{icon}</div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
          <Badge
            variant={trend.isPositive ? "default" : "destructive"}
            className="text-xs px-2 py-1"
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-1" />
            )}
            {trend.value}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Cards() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "Revenue this month",
      icon: <DollarSign className="h-4 w-4 text-green-600" />,
      trend: {
        value: "+20.1%",
        isPositive: true,
      },
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
    },
    {
      title: "Total Sales",
      value: "2,350",
      description: "Sales this month",
      icon: <ShoppingCart className="h-4 w-4 text-blue-600" />,
      trend: {
        value: "+15.3%",
        isPositive: true,
      },
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Total Products",
      value: "12,234",
      description: "Products in inventory",
      icon: <Package className="h-4 w-4 text-purple-600" />,
      trend: {
        value: "+5.2%",
        isPositive: true,
      },
      gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
    },
    {
      title: "Low Stock Products",
      value: "23",
      description: "Items need restocking",
      icon: <Warehouse className="h-4 w-4 text-red-600" />,
      trend: {
        value: "-8.1%",
        isPositive: false,
      },
      gradient: "bg-gradient-to-br from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          icon={metric.icon}
          trend={metric.trend}
          gradient={metric.gradient}
        />
      ))}
    </div>
  );
}
