import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

export default function StoresPageSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb Skeleton */}
      <div className="mb-4 sm:mb-6">
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Summary Card Skeleton */}
      <Card className="mb-2 sm:mb-8 border border-border bg-muted/30 rounded-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-2" />
            </div>
            <div className="text-center">
              <Skeleton className="h-8 w-24 mx-auto" />
              <Skeleton className="h-4 w-16 mx-auto mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Block Skeleton */}
      <Card className="rounded-lg border border-border bg-card">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Skeleton className="h-10 w-full sm:w-64" />
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Skeleton className="h-10 w-full sm:w-24" />
              <Skeleton className="h-10 w-full sm:w-32" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="sm:p-6">
          {/* Store Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-2">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className="border border-border bg-card rounded-lg overflow-hidden"
              >
                <CardHeader className="bg-muted/50 p-4 rounded-t-lg m-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 sm:w-32 mb-2" />
                        <Skeleton className="h-3 w-16 sm:w-20" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 px-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 p-4 rounded-b-lg m-0">
                  <div className="flex gap-2 w-full">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center">
            <Skeleton className="h-10 w-64" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
