"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SuppliersSkeletonPage() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10 md:mb-6">
        <div className="mx-auto max-w-7xl">
          {/* Skeleton Header */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 justify-between">
            <Skeleton className="h-9 w-40 rounded-md" />
            <div className="flex-1 max-w-md mx-0 sm:mx-8">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>

          {/* Skeleton Suppliers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border border-border rounded-lg">
                <CardHeader className="bg-muted/50 p-4 rounded-t-lg m-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32 rounded-md" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-5 rounded-md" />
                  </div>
                </CardHeader>
                <CardContent className="pt-4 px-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 rounded-md flex-shrink-0" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-20 rounded-md" />
                      <Skeleton className="h-4 w-48 rounded-md" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-md" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-md" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-md" />
                    <Skeleton className="h-4 w-28 rounded-md" />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 rounded-b-lg m-0">
                  <div className="flex gap-2 w-full">
                    <Skeleton className="h-8 flex-1 rounded-md" />
                    <Skeleton className="h-8 flex-1 rounded-md" />
                    <Skeleton className="h-8 flex-1 rounded-md" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Skeleton Pagination */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-40 rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
