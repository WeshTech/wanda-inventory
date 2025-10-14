"use client";

import {
  DollarSign,
  Repeat,
  Shuffle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useBusinessExpensesSummaryQuery } from "@/server-queries/expensesQueries";
import { ExpenseCardsSkeleton } from "./expense-card-skeleton";

const maxExpenseThreshold = 15000;

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  }).format(value);

export function ExpenseCards() {
  const { isLoading: authLoading } = useAuthStore();
  const businessId = useAuthBusinessId();

  const {
    data,
    isLoading: queryLoading,
    isFetching,
  } = useBusinessExpensesSummaryQuery(businessId ?? "");

  const isStillLoading = authLoading || queryLoading || isFetching;

  if (isStillLoading) return <ExpenseCardsSkeleton />;
  if (!data?.success || !data.data) return null;

  const { totalExpenses, totalRecurrentExpenditure, totalRandomExpenditure } =
    data.data;

  const getExpenseColor = (value: number) => {
    const ratio = value / maxExpenseThreshold;

    if (ratio > 0.8) {
      return "bg-[var(--chart-5)]/20 border-[var(--destructive)] dark:bg-[var(--chart-5)]/30";
    }
    if (ratio > 0.5) {
      return "bg-[var(--chart-4)]/20 border-[var(--accent)] dark:bg-[var(--chart-4)]/30";
    }
    return "bg-[var(--chart-1)]/20 border-[var(--primary)] dark:bg-[var(--chart-1)]/30";
  };

  const getTrendIcon = (value: number) => {
    const ratio = value / maxExpenseThreshold;
    return ratio > 0.6 ? (
      <TrendingUp className="h-3 w-3 sm:h-4 md:w-4 text-[var(--destructive)]" />
    ) : (
      <TrendingDown className="h-3 w-3 sm:h-4 md:w-4 text-[var(--primary)]" />
    );
  };

  const cards = [
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: (
        <DollarSign className="h-3 w-3 sm:h-4 md:w-4 text-[var(--primary)] animate-pulse" />
      ),
      color: getExpenseColor(totalExpenses),
    },
    {
      title: "Recurrent Expenditure",
      value: totalRecurrentExpenditure,
      icon: (
        <Repeat className="h-3 w-3 sm:h-4 md:w-4 text-[var(--secondary)] animate-spin-slow" />
      ),
      color: getExpenseColor(totalRecurrentExpenditure),
    },
    {
      title: "Random Expenditure",
      value: totalRandomExpenditure,
      icon: (
        <Shuffle className="h-3 w-3 sm:h-4 md:w-4 text-[var(--chart-3)] animate-bounce" />
      ),
      color: getExpenseColor(totalRandomExpenditure),
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {cards.map((card) => (
          <Card
            key={card.title}
            className={cn(
              "min-h-[80px] sm:min-h-[90px] md:min-h-[100px] max-w-full transition-all duration-300 hover:scale-100 sm:hover:scale-105 hover:shadow-xl cursor-pointer rounded-xl",
              card.color
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
              <Tooltip>
                <TooltipTrigger>
                  <CardTitle className="text-[0.75rem] sm:text-xs md:text-sm font-semibold truncate">
                    {card.title}
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  {card.title}: {formatCurrency(card.value)} (
                  {((card.value / maxExpenseThreshold) * 100).toFixed(1)}%)
                </TooltipContent>
              </Tooltip>
              {card.icon}
            </CardHeader>
            <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-base sm:text-lg md:text-xl font-bold truncate">
                    {formatCurrency(card.value)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>{formatCurrency(card.value)}</TooltipContent>
              </Tooltip>
              <div className="flex items-center gap-1 mt-1">
                <Progress
                  value={Math.min(
                    (card.value / maxExpenseThreshold) * 100,
                    100
                  )}
                  className="h-1 sm:h-1.5 bg-[var(--muted)]/50 dark:bg-[var(--muted)]/30"
                />
                {getTrendIcon(card.value)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}
