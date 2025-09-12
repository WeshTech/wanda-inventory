"use client";

import type React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Percent,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, changeLabel, icon }: StatCardProps) {
  const isPositive = change > 0;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-gray-900 dark:border-gray-800 min-w-[200px] flex flex-col">
      <div className="p-4 sm:p-6 flex-grow">
        <div className="flex items-center justify-between">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
              {title}
            </p>
            <p className="text-lg sm:text-2xl font-bold truncate">{value}</p>
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
            )}
            <span
              className={`text-xs sm:text-sm font-medium ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground truncate">
              {changeLabel}
            </span>
          </div>
          <button className="text-xs text-primary hover:underline whitespace-nowrap">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export function SalesStatsCards() {
  const stats = [
    {
      title: "Total Sales",
      value: "$34,133.40",
      change: 40,
      changeLabel: "last month",
      icon: <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    },
    {
      title: "Total Revenue",
      value: "$14,133.40",
      change: -10,
      changeLabel: "last month",
      icon: <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    },
    {
      title: "Total Products Sold",
      value: "2,847",
      change: 25,
      changeLabel: "last month",
      icon: <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    },
    {
      title: "Gross Margin",
      value: "68.5%",
      change: 5,
      changeLabel: "last month",
      icon: <Percent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
