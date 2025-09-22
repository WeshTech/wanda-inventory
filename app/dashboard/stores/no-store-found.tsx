"use client";

import { useState } from "react";
import { Building2, Plus, Store } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateStoreDialog } from "./create-store-dialog";

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

      <Card className="max-w-md mx-auto bg-transparent border-0 shadow-none">
        <CardContent className="p-6 text-center space-y-4">
          {/* Empty State Image - Using shadcn Avatar */}
          <div className="flex justify-center">
            <Avatar className="w-[200px] h-[200px]">
              <AvatarImage
                src="/images/nostorefound.jpg"
                alt="No stores found"
                className="object-contain"
              />
              <AvatarFallback className="w-[200px] h-[200px] bg-muted flex items-center justify-center rounded-lg">
                <Store className="w-16 h-16 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Empty State Content */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              No Stores Found
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Get started by creating your first store to organize inventory,
              track sales, and manage your business.
            </p>

            <Button
              size="sm"
              className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-4 py-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <Plus className="h-4 w-4" />
              </span>
              Add Store
            </Button>
            <p className="text-sm text-muted-foreground">
              Manage products, track sales, and monitor performance.
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
