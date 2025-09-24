"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Store,
  Eye,
  Edit,
  MapPin,
  Eraser,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SimplePagination } from "./simple-pagination";
import { CreateStoreDialog } from "./create-store-dialog";
import NoStoresFoundPage from "./no-store-found";
import StoresPageSkeleton from "./loading";
import { useAuthStore } from "@/stores/authStore";
import { useGetBusinessStores } from "@/server-queries/storeQueries";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stores data using TanStack Query
  const {
    data: storesData,
    isLoading: queryLoading,
    error: queryError,
  } = useGetBusinessStores();

  // Handle auth state
  const { isLoading: authLoading, isAuthenticated, user } = useAuthStore();

  // Sync local loading state with query and auth
  useEffect(() => {
    setLoading(authLoading || queryLoading);
  }, [authLoading, queryLoading]);

  // Sync error state
  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    } else if (storesData && !storesData.success) {
      setError(storesData.message);
    } else {
      setError(null);
    }
  }, [queryError, storesData]);

  // Early return for auth loading or unauthenticated state
  if (authLoading || !isAuthenticated || !user?.businessId) {
    return <StoresPageSkeleton />;
  }

  // Filter stores based on search query
  const filteredStores = storesData?.success
    ? storesData.data.stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.ward.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Check if user has no stores at all (empty search and no stores)
  const hasNoStoresAtAll =
    storesData?.success &&
    storesData.data.stores.length === 0 &&
    searchQuery === "";

  // Check if filters don't match any stores (search applied but no results)
  const hasFilteredResults =
    storesData?.success &&
    storesData.data.stores.length > 0 &&
    filteredStores.length === 0;

  // Calculate stats from API data
  const totalSales = storesData?.success
    ? `KES ${storesData.data.totalSales.toLocaleString()}`
    : "KES 0";
  const totalStores = storesData?.success ? storesData.data.totalStores : 0;
  const openStores = storesData?.success
    ? storesData.data.stores.filter((store) => store.status === "OPENED").length
    : 0;
  const closedStores = storesData?.success
    ? storesData.data.stores.filter((store) => store.status === "CLOSED").length
    : 0;
  const topStore =
    storesData?.success && storesData.data.stores.length > 0
      ? storesData.data.stores.reduce((prev, current) =>
          (prev?.sales || 0) > (current.sales || 0) ? prev : current
        )?.name || "No stores"
      : "No stores";

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStores = filteredStores.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle loading state
  if (loading) {
    return <StoresPageSkeleton />;
  }

  // Handle error state
  if (error || !storesData?.success) {
    return (
      <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-red-500/10 via-background to-secondary/10 flex items-center justify-center">
        <Card className="max-w-md w-full shadow-lg border-destructive/20">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
                <AlertTriangle className="relative w-16 h-16 text-destructive" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-destructive">
              Something went wrong
            </h2>
            <p className="text-muted-foreground">
              {error || "Failed to load stores data. Please try again."}
            </p>
            <Button
              variant="destructive"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle no stores created at all - show NoStoresFoundPage
  if (hasNoStoresAtAll) {
    return <NoStoresFoundPage />;
  }

  return (
    <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Stores</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-8 border border-border bg-muted/30 rounded-lg">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="text-center hidden md:grid">
              <div className="text-2xl font-bold text-foreground">
                {totalSales}
              </div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {totalStores}
              </div>
              <div className="text-sm text-muted-foreground">Total Stores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {openStores}
              </div>
              <div className="text-sm text-muted-foreground">Open Stores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {closedStores}
              </div>
              <div className="text-sm text-muted-foreground">Closed Stores</div>
            </div>
            <div className="text-center hidden md:grid">
              <div className="text-2xl font-bold text-foreground">
                {topStore}
              </div>
              <div className="text-sm text-muted-foreground">Top Store</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Block */}
      <Card className="rounded-lg border border-border bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                className="gap-2 bg-primary hover:bg-primary/90"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Store
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Store Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 min-h-[400px]">
            {hasFilteredResults ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center space-y-6">
                <div className="flex justify-center">
                  <Avatar className="w-full h-auto max-w-[180px] max-h-[180px] rounded-lg">
                    <AvatarImage
                      src="/images/nostorefound.jpg"
                      alt="No stores found"
                      className="object-contain"
                    />
                    <AvatarFallback className="bg-muted flex items-center justify-center">
                      <Store className="w-16 h-16 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  No store with the given filters was found
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Try adjusting your search criteria or clear the filters to see
                  all stores.
                </p>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                >
                  <Eraser className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            ) : (
              paginatedStores.map((store) => (
                <Card
                  key={store.id}
                  className="border border-border bg-card rounded-lg overflow-hidden"
                >
                  <CardHeader className="bg-muted/50 p-4  rounded-t-lg m-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-primary/10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(store.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground">
                            {store.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {store.ward}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-primary" />
                        <Badge
                          variant={
                            store.status === "OPENED"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            store.status === "OPENED"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-1 ${
                              store.status === "OPENED"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          />
                          {store.status === "OPENED" ? "Open" : "Closed"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Body */}
                  <CardContent className="pt-4 px-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Products
                        </div>
                        <div className="text-lg font-semibold">
                          {store.products}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Sales
                        </div>
                        <div className="text-lg font-semibold">
                          KES {store.sales.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Categories
                        </div>
                        <div className="text-lg font-semibold">
                          {store.categories}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Staff
                        </div>
                        <div className="text-lg font-semibold">
                          {store.staff}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-muted/30 p-4 rounded-b-lg m-0">
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 gap-2 bg-background/50"
                      >
                        <Eye className="h-4 w-4" />
                        View Store
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          {/* Only show pagination when there are results or no search applied */}
          {(!hasFilteredResults || searchQuery === "") && (
            <SimplePagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredStores.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={setItemsPerPage}
            />
          )}
        </CardContent>
      </Card>

      <CreateStoreDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
