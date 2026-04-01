"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, TrendingUp, Zap } from "lucide-react";

interface RecommendationCardProps {
  productName: string;
  value: number | string;
  insight: string;
  icon?: React.ReactNode;
  valueLabel?: string;
  variant?: "default" | "success" | "warning" | "critical";
}

export function RecommendationCard({
  productName,
  value,
  insight,
  icon,
  valueLabel,
  variant = "default",
}: RecommendationCardProps) {
  const bgColorClass = {
    default: "bg-primary/5",
    success: "bg-green-500/5",
    warning: "bg-amber-500/5",
    critical: "bg-red-500/5",
  }[variant];

  const borderColorClass = {
    default: "border-primary/20",
    success: "border-green-500/20",
    warning: "border-amber-500/20",
    critical: "border-red-500/20",
  }[variant];

  const iconColorClass = {
    default: "text-primary",
    success: "text-green-600",
    warning: "text-amber-600",
    critical: "text-red-600",
  }[variant];

  return (
    <Card
      className={`${bgColorClass} border ${borderColorClass} overflow-hidden`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-foreground truncate">
              {productName}
            </h3>
          </div>
          {icon && (
            <div className={`${iconColorClass} ml-2 flex-shrink-0`}>{icon}</div>
          )}
        </div>

        <div className="mb-3">
          <div className="text-2xl font-bold text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          {valueLabel && (
            <p className="text-xs text-muted-foreground mt-1">{valueLabel}</p>
          )}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {insight}
        </p>
      </CardContent>
    </Card>
  );
}

interface RestockCardProps {
  productName: string;
  signal: "HIGH" | "MEDIUM" | "LOW";
  insight: string;
}

export function RestockCard({
  productName,
  signal,
  insight,
}: RestockCardProps) {
  const getSignalVariant = (): RecommendationCardProps["variant"] => {
    switch (signal) {
      case "HIGH":
        return "critical";
      case "MEDIUM":
        return "warning";
      case "LOW":
        return "success";
    }
  };

  const getSignalIcon = () => {
    switch (signal) {
      case "HIGH":
        return <AlertCircle className="w-5 h-5" />;
      case "MEDIUM":
        return <Zap className="w-5 h-5" />;
      case "LOW":
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  return (
    <RecommendationCard
      productName={productName}
      value={signal}
      insight={insight}
      icon={getSignalIcon()}
      valueLabel="Restock Signal"
      variant={getSignalVariant()}
    />
  );
}
