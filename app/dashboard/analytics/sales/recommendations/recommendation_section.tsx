"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "../spinner";

interface RecommendationsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export function RecommendationsSection({
  title,
  description,
  children,
  isLoading = false,
  isEmpty = false,
  emptyMessage = "No recommendations available",
}: RecommendationsSectionProps) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description && (
          <p className="text-muted-foreground text-sm mt-1">{description}</p>
        )}
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Spinner className="w-8 h-8" />
              <p className="text-sm text-muted-foreground">
                Loading recommendations...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : isEmpty ? (
        <Card>
          <CardContent className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {children}
        </div>
      )}
    </div>
  );
}
