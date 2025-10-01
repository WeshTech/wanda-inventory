"use client";

import { Card } from "@/components/ui/card";

export function CustomerStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4 h-24 flex flex-col justify-center">
          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
          <div className="h-6 bg-muted rounded w-1/4"></div>
        </Card>
      ))}
    </div>
  );
}
