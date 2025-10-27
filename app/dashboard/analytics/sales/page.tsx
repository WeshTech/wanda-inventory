"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, MapPin, Zap } from "lucide-react";
import { useMemo } from "react";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { useGetBusinessAnalysisTime } from "@/server-queries/analysisQueries";

export default function SalesAnalysisPage() {
  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";
  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetBusinessAnalysisTime(businessId);
  const isLoading = isAuthLoading || isFetching;

  // Calculate days remaining and progress percentage
  const { daysRemaining, progressPercentage } = useMemo(() => {
    if (!data?.date) {
      return { daysRemaining: 60, progressPercentage: 0 };
    }

    const endDate = new Date(data.date);
    const today = new Date();

    // Convert both to timestamps before subtraction
    const diffMs = endDate.getTime() - today.getTime();

    const daysRemaining = Math.max(
      0,
      Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    );
    const daysElapsed = 60 - daysRemaining;
    const progressPercentage = Math.min(100, (daysElapsed / 60) * 100);

    return { daysRemaining, progressPercentage };
  }, [data?.date]);

  const features = [
    {
      icon: TrendingUp,
      title: "Sales Prediction",
      description: "Accurate forecasting powered by your historical data",
    },
    {
      icon: MapPin,
      title: "Area Analysis",
      description:
        "Deep insights into regional performance patterns for targeted strategies.",
    },
    {
      icon: Zap,
      title: "Smart Insights",
      description: "Actionable recommendations tailored to your business",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full h-full max-w-2xl">
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-semibold"
              >
                Premium Feature
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold text-balance">
              Sales Analysis Engine
            </CardTitle>
            <CardDescription className="text-lg text-foreground/70">
              Unlock powerful insights into your sales performance
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Data Collection Status */}
            <Alert className="bg-primary/5 border-primary/20">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground ml-2">
                <span className="font-semibold">
                  In order to serve you better,
                </span>{" "}
                we&apos;re storing your inventory data to achieve the highest
                level of accuracy in our analysis. This ensures our advanced
                models can provide precise, actionable insights that truly
                elevate your business.
              </AlertDescription>
            </Alert>

            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">
                  Data Collection Progress
                </h3>
                <span className="text-sm font-medium text-primary">
                  {isLoading
                    ? "Loading..."
                    : isError
                    ? "Error fetching data"
                    : `${daysRemaining} days remaining`}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-primary/60 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <p className="text-sm text-muted-foreground">
                We&apos;re building a comprehensive dataset to ensure our
                predictions are as accurate as possible for your unique business
                needs.
              </p>
            </div>

            {/* Features Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">What You&apos;ll Unlock</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors flex flex-col items-center justify-center"
                    >
                      <Icon className="h-6 w-6 text-primary mb-3" />
                      <h4 className="font-semibold text-sm mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-center text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Why Wait Section */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-foreground">
                Why We Need 2 Months
              </h3>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>
                    <strong>Seasonal Patterns:</strong> We capture your sales
                    cycles and seasonal trends
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>
                    <strong>Market Dynamics:</strong> We understand how your
                    market responds to changes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>
                    <strong>Accuracy Guarantee:</strong> More data means more
                    reliable predictions
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-3 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Your inventory data is being securely stored and analyzed in
                real-time.
              </p>
              <p className="text-xs text-muted-foreground">
                Check back soon to explore your personalized sales insights and
                predictions.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Questions? Our support team is here to help.</p>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { ChevronRight } from "lucide-react";
// import { SearchFilters } from "./search-filters";
// import { BusinessAnalysisTable } from "./business-analysis-table";
// import { AreaAnalysisTable } from "./area-analysis-table";
// import { SalesPredictionSection } from "./sale-prediction-section";

// export default function SalesAnalysisPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedPeriod, setSelectedPeriod] = useState("1");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 bg-fixed p-6">
//       <div className="container mx-auto space-y-6">
//         {/* Page Header */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold text-foreground">Sales Analysis</h1>

//           {/* Breadcrumbs */}
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink
//                   href="/dashboard"
//                   className="text-muted-foreground hover:text-foreground"
//                 >
//                   Dashboard
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator>
//                 <ChevronRight className="h-4 w-4" />
//               </BreadcrumbSeparator>
//               <BreadcrumbItem>
//                 <BreadcrumbPage className="text-foreground font-medium">
//                   Sales Analysis
//                 </BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         {/* Search and Filters */}
//         <SearchFilters
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           selectedPeriod={selectedPeriod}
//           setSelectedPeriod={setSelectedPeriod}
//         />

//         {/* Sales Analysis Section */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-xl font-semibold">
//               Sales Analysis
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="business" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="business">Business</TabsTrigger>
//                 <TabsTrigger value="area">Area</TabsTrigger>
//               </TabsList>
//               <TabsContent value="business" className="mt-6">
//                 <BusinessAnalysisTable
//                   searchQuery={searchQuery}
//                   period={selectedPeriod}
//                 />
//               </TabsContent>
//               <TabsContent value="area" className="mt-6">
//                 <AreaAnalysisTable
//                   searchQuery={searchQuery}
//                   period={selectedPeriod}
//                 />
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>

//         {/* Sales Prediction Section */}
//         <SalesPredictionSection
//           searchQuery={searchQuery}
//           period={selectedPeriod}
//         />
//       </div>
//     </div>
//   );
// }
