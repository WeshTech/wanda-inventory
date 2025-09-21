"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, Store, Eye, Edit, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  GetStoresResult,
  StoreSummary,
} from "@/types/stores/getBusinessStores";
import { getBusinessStores } from "@/server/stores/getBusinessStores";
import NoStoresFoundPage from "./no-store-found";

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
  const [storesData, setStoresData] = useState<GetStoresResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stores data
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getBusinessStores();
        setStoresData(result);

        if (!result.success) {
          setError(result.message);
        }
      } catch (err) {
        setError("Failed to fetch stores data");
        console.error("Error fetching stores:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Filter stores based on search query
  const filteredStores = storesData?.success
    ? storesData.data.stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.ward.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

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
  const topStore = storesData?.success
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
    return (
      <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !storesData?.success) {
    return (
      <div className="min-h-screen bg-background p-6 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="text-destructive mb-4">Error</div>
            <p className="text-muted-foreground mb-6">
              {error || storesData?.message || "Failed to load stores data"}
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle no stores found state
  if (filteredStores.length === 0) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginatedStores.map((store: StoreSummary) => (
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
                          store.status === "OPENED" ? "default" : "destructive"
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
                      <div className="text-sm text-muted-foreground">Sales</div>
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
                      <div className="text-sm text-muted-foreground">Staff</div>
                      <div className="text-lg font-semibold">{store.staff}</div>
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
            ))}
          </div>
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredStores.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={setItemsPerPage}
          />
        </CardContent>
      </Card>

      <CreateStoreDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
