"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPurchaseOrderPageSkeleton() {
  return (
    <div className="container mx-auto p-6 max-w-6xl bg-gradient-to-br from-primary/5 via-background to-secondary/10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 rounded-md" /> {/* Page title */}
          <Skeleton className="h-4 w-64 rounded-md" /> {/* PO ID */}
        </div>
        <Button disabled size="lg" className="gap-2">
          <Skeleton className="h-4 w-20 rounded-md" />
        </Button>
      </div>

      {/* Details Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-40 rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <Skeleton className="h-6 w-28 rounded-md" />
          </CardTitle>
          <Button disabled className="gap-2">
            <Skeleton className="h-4 w-16 rounded-md" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="w-full border rounded-md">
              {/* Simulated Table Header */}
              <div className="grid grid-cols-8 gap-2 p-2 bg-muted/40 border-b">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full rounded-sm" />
                ))}
              </div>

              {/* Table Rows */}
              <div className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-8 gap-2 p-2 items-center"
                  >
                    {[...Array(8)].map((_, j) => (
                      <Skeleton key={j} className="h-5 w-full rounded-sm" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
