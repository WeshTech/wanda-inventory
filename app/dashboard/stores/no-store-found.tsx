"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { CreateStoreDialog } from "./create-store-dialog";
import Image from "next/image";

export default function NoStoresFoundPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          {/* Empty State Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/images/nostorefound.jpg"
                alt="No stores found"
                className="max-w-md h-auto rounded-lg shadow-lg mx-auto"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-64 h-64 bg-muted rounded-lg flex items-center justify-center mx-auto";
                  fallback.innerHTML = `
                    <Store className="h-16 w-16 text-muted-foreground" />
                  `;
                  target.parentNode?.replaceChild(fallback, target);
                }}
              />
            </div>
          </div>

          {/* Empty State Content */}
          <div className="space-y-4">
            <div className="text-3xl font-bold text-foreground mb-2">
              No Stores Found
            </div>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Get started by creating your first store. Organize your inventory,
              track sales, and manage your business from one central location.
            </p>

            <div className="pt-6">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full shadow-lg"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-5 w-5" />
                Create Your First Store
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Once you create a store, you can manage products, track sales, and
              monitor performance all in one place.
            </p>
          </div>
        </CardContent>
      </Card>

      <CreateStoreDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
