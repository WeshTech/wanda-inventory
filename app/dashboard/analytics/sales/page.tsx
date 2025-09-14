"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { SearchFilters } from "./search-filters";
import { BusinessAnalysisTable } from "./business-analysis-table";
import { AreaAnalysisTable } from "./area-analysis-table";
import { SalesPredictionSection } from "./sale-prediction-section";

export default function SalesAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 bg-fixed p-6">
      <div className="container mx-auto space-y-6">
        {/* Page Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Sales Analysis</h1>

          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-medium">
                  Sales Analysis
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />

        {/* Sales Analysis Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Sales Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="business" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="area">Area</TabsTrigger>
              </TabsList>
              <TabsContent value="business" className="mt-6">
                <BusinessAnalysisTable
                  searchQuery={searchQuery}
                  period={selectedPeriod}
                />
              </TabsContent>
              <TabsContent value="area" className="mt-6">
                <AreaAnalysisTable
                  searchQuery={searchQuery}
                  period={selectedPeriod}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sales Prediction Section */}
        <SalesPredictionSection
          searchQuery={searchQuery}
          period={selectedPeriod}
        />
      </div>
    </div>
  );
}
