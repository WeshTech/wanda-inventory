"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { BusinessPredictionTable } from "./business-prediction-table";
import { AreaPredictionTable } from "./area-prediction-table";

interface SalesPredictionSectionProps {
  searchQuery: string;
  period: string;
}

export function SalesPredictionSection({
  searchQuery,
  period,
}: SalesPredictionSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Sales Prediction</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="business" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
            </TabsList>
            <TabsContent value="business" className="mt-6">
              <BusinessPredictionTable
                searchQuery={searchQuery}
                period={period}
              />
            </TabsContent>
            <TabsContent value="area" className="mt-6">
              <AreaPredictionTable searchQuery={searchQuery} period={period} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
