"use client";

import {
  Package,
  Users,
  BarChart3,
  Smartphone,
  Headphones,
  Database,
  Zap,
  Shield,
  CreditCard,
  Globe,
  Check,
  X,
  Network,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { plans } from "@/constants/plans";

export default function PricingSection() {
  const router = useRouter();

  return (
    <section id="pricing" className="py-4 bg-transparent/70">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Choose Your Inventory Management Plan.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Streamline your inventory operations with our comprehensive
            management system. All plans include a 15-day free trial with no
            setup fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-2 max-w-5xl mx-auto">
          {plans.slice(0, 3).map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                index === 1 ? "border-primary shadow-lg lg:scale-105" : ""
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  {plan.badge}
                </Badge>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </div>
                    <feature.icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.buttonVariant}
                  className="w-full"
                  size="lg"
                  onClick={() => router.push("/dashboard")}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
          <Button
            className="group flex items-center gap-2 text-center"
            size="default"
            onClick={() => router.push("/pricing")}
          >
            Explore More Plans
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold tracking-tight mb-4">
              Detailed Feature Comparison
            </h3>
            <p className="text-lg text-muted-foreground">
              Compare all features across our inventory management plans
            </p>
          </div>

          <div className="overflow-x-auto px-2">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5 text-left font-semibold text-xs">
                    Features
                  </TableHead>
                  <TableHead className="text-center font-semibold text-xs">
                    Basic
                  </TableHead>
                  <TableHead className="text-center font-semibold bg-primary/5 text-xs">
                    Professional
                    <Badge className="ml-2 text-xs">Popular</Badge>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-xs">
                    Advanced
                  </TableHead>
                  <TableHead className="text-center font-semibold text-xs">
                    Enterprise
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Product & Inventory Management */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Package className="w-4 h-4 inline mr-2" />
                    Product & Inventory Management
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Package className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Product Catalog Size
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Up to 500
                  </TableCell>
                  <TableCell className="text-center bg-primary/5 text-xs">
                    Up to 900
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Up to 1,200
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Unlimited
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Basic Inventory Tracking
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Advanced Inventory Tracking
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Enterprise Inventory Management
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Warehouse Automation
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>

                {/* Scanning & Data Capture */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Smartphone className="w-4 h-4 inline mr-2" />
                    Scanning & Data Capture
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Barcode Scanning
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Smartphone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    RFID Support
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>

                {/* Locations & Access */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Globe className="w-4 h-4 inline mr-2" />
                    Locations & Access
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Warehouse Locations
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    1 Location
                  </TableCell>
                  <TableCell className="text-center bg-primary/5 text-xs">
                    4 Locations
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    10 Locations
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Unlimited
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    User Accounts
                  </TableCell>
                  <TableCell className="text-center text-xs">1 User</TableCell>
                  <TableCell className="text-center bg-primary/5 text-xs">
                    5 Users
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    11 Users
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Unlimited
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    User Roles
                  </TableCell>
                  <TableCell className="text-center text-xs">1 Role</TableCell>
                  <TableCell className="text-center bg-primary/5 text-xs">
                    5 Roles
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    11 Roles
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Unlimited
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Database className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    SKU Access
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Access Log Auditing
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>

                {/* Reports & Analytics */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Database className="w-4 h-4 inline mr-2" />
                    Reports & Analytics
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Database className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Basic Reports
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <BarChart3 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Advanced Analytics
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Database className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Custom Reports & Dashboards
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>

                {/* Integrations */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Zap className="w-4 h-4 inline mr-2" />
                    Integrations & API
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Zap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    API Access
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <CreditCard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ETIMS (KRA) Integration
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Banknote className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Bank Integration
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <CreditCard className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    M-Pesa Till Integration
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Custom Integrations
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>

                {/* Network & Security */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Shield className="w-4 h-4 inline mr-2" />
                    Network & Security
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Network className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    IP Address Management
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Custom Pricing Rules
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>

                {/* Support */}
                <TableRow className="bg-muted/30">
                  <TableCell
                    colSpan={5}
                    className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                  >
                    <Headphones className="w-4 h-4 inline mr-2" />
                    Support & Training
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Headphones className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Support Level
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Email Support
                  </TableCell>
                  <TableCell className="text-center bg-primary/5 text-xs">
                    Email & Chat
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Email & Chat
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    24/7 Phone & Chat
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Account Manager
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center bg-primary/5">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="w-5 h-5 text-gray-400 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    Onboarding Training
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Self-service
                  </TableCell>
                  <TableCell className="text-center bg-primary/5 text-xs">
                    Guided Setup
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Guided Setup
                  </TableCell>
                  <TableCell className="text-center text-xs">
                    Full Training
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-4 px-2">
          <p className="text-muted-foreground text-sm">
            All plans include SSL security, automatic backups, and 99.9% uptime
            guarantee
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 flex-shrink-0" />
              <span>Daily backups</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 flex-shrink-0" />
              <span>Expert support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
