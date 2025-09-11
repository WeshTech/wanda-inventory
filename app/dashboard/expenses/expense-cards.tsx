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

// Mock data and utility function (replace with actual data and formatter)
const totalExpenses = 12500.75;
const recurrentExpenses = 8500.25;
const randomExpenses = 4000.5;
const maxExpenseThreshold = 15000;

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  }).format(value);

export function ExpenseCards() {
  // Function to determine card color and border
  const getExpenseColor = (value: number) => {
    const ratio = value / maxExpenseThreshold;
    if (ratio > 0.8)
      return "bg-gradient-to-br from-red-200 to-red-100 dark:from-red-900 dark:to-red-800 border-red-400 dark:border-red-600";
    if (ratio > 0.5)
      return "bg-gradient-to-br from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 border-yellow-400 dark:border-yellow-600";
    return "bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-800 border-green-400 dark:border-green-600";
  };

  // Mock trend direction (replace with real data)
  const getTrendIcon = (value: number) => {
    const ratio = value / maxExpenseThreshold;
    return ratio > 0.6 ? (
      <TrendingUp className="h-3 w-3 sm:h-4 md:w-4 text-red-500" />
    ) : (
      <TrendingDown className="h-3 w-3 sm:h-4 md:w-4 text-green-500" />
    );
  };

  // Handle card click (mocked for now)
  const handleCardClick = (type: string) => {
    console.log(`Clicked ${type} card for more details`);
    // Future: Open modal or navigate to details page
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {/* Total Expenses Card */}
        <Card
          className={cn(
            "min-h-[80px] sm:min-h-[90px] md:min-h-[100px] max-w-full transition-all duration-300 hover:scale-100 sm:hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 cursor-pointer rounded-xl",
            getExpenseColor(totalExpenses)
          )}
          onClick={() => handleCardClick("Total Expenses")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
            <Tooltip>
              <TooltipTrigger>
                <CardTitle className="text-[0.75rem] sm:text-xs md:text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-green-800 dark:text-green-200">
                  Total Expenses
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                Total Expenses: {formatCurrency(totalExpenses)} (
                {((totalExpenses / maxExpenseThreshold) * 100).toFixed(1)}%)
              </TooltipContent>
            </Tooltip>
            <DollarSign className="h-3 w-3 sm:h-4 md:w-4 text-green-600 dark:text-green-400 animate-pulse" />
          </CardHeader>
          <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-base sm:text-lg md:text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap text-green-900 dark:text-green-100">
                  {formatCurrency(totalExpenses)}
                </div>
              </TooltipTrigger>
              <TooltipContent>{formatCurrency(totalExpenses)}</TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1 mt-1">
              <Progress
                value={Math.min(
                  (totalExpenses / maxExpenseThreshold) * 100,
                  100
                )}
                className="h-1 sm:h-1.5 bg-green-200/50 dark:bg-green-800/50"
              />
              {getTrendIcon(totalExpenses)}
            </div>
          </CardContent>
        </Card>

        {/* Recurrent Expenditure Card */}
        <Card
          className={cn(
            "min-h-[80px] sm:min-h-[90px] md:min-h-[100px] max-w-full transition-all duration-300 hover:scale-100 sm:hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer rounded-xl",
            getExpenseColor(recurrentExpenses)
          )}
          onClick={() => handleCardClick("Recurrent Expenditure")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
            <Tooltip>
              <TooltipTrigger>
                <CardTitle className="text-[0.75rem] sm:text-xs md:text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-blue-800 dark:text-blue-200">
                  Recurrent Expenditure
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                Recurrent Expenditure: {formatCurrency(recurrentExpenses)} (
                {((recurrentExpenses / maxExpenseThreshold) * 100).toFixed(1)}%)
              </TooltipContent>
            </Tooltip>
            <Repeat className="h-3 w-3 sm:h-4 md:w-4 text-blue-600 dark:text-blue-400 animate-spin-slow" />
          </CardHeader>
          <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-base sm:text-lg md:text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap text-blue-900 dark:text-blue-100">
                  {formatCurrency(recurrentExpenses)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {formatCurrency(recurrentExpenses)}
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1 mt-1">
              <Progress
                value={Math.min(
                  (recurrentExpenses / maxExpenseThreshold) * 100,
                  100
                )}
                className="h-1 sm:h-1.5 bg-blue-200/50 dark:bg-blue-800/50"
              />
              {getTrendIcon(recurrentExpenses)}
            </div>
          </CardContent>
        </Card>

        {/* Random Expenditure Card */}
        <Card
          className={cn(
            "min-h-[80px] sm:min-h-[90px] md:min-h-[100px] max-w-full transition-all duration-300 hover:scale-100 sm:hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 cursor-pointer rounded-xl",
            getExpenseColor(randomExpenses)
          )}
          onClick={() => handleCardClick("Random Expenditure")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
            <Tooltip>
              <TooltipTrigger>
                <CardTitle className="text-[0.75rem] sm:text-xs md:text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap text-pink-800 dark:text-pink-200">
                  Random Expenditure
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                Random Expenditure: {formatCurrency(randomExpenses)} (
                {((randomExpenses / maxExpenseThreshold) * 100).toFixed(1)}%)
              </TooltipContent>
            </Tooltip>
            <Shuffle className="h-3 w-3 sm:h-4 md:w-4 text-pink-600 dark:text-pink-400 animate-bounce" />
          </CardHeader>
          <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
            <Tooltip>
              <TooltipTrigger>
                <div className="text-base sm:text-lg md:text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap text-pink-900 dark:text-pink-100">
                  {formatCurrency(randomExpenses)}
                </div>
              </TooltipTrigger>
              <TooltipContent>{formatCurrency(randomExpenses)}</TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1 mt-1">
              <Progress
                value={Math.min(
                  (randomExpenses / maxExpenseThreshold) * 100,
                  100
                )}
                className="h-1 sm:h-1.5 bg-pink-200/50 dark:bg-pink-800/50"
              />
              {getTrendIcon(randomExpenses)}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
