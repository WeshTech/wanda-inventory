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
  AppWindow,
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

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "KES 549",
      period: "/month",
      annualPrice: "KES 5,999/year",
      description: "Perfect for small businesses just getting started",
      badge: null,
      features: [
        { name: "500 products", icon: Package, included: true },
        { name: "1 role", icon: Shield, included: true },
        { name: "1 store", icon: Globe, included: true },
        { name: "1 user", icon: Users, included: true },
        { name: "Email support", icon: Headphones, included: true },
        { name: "Basic reports", icon: Database, included: true },
        { name: "Barcode scanning", icon: Smartphone, included: true },
        { name: "Basic inventory tracking", icon: BarChart3, included: true },
        { name: "Advanced Analytics", icon: BarChart3, included: false },
        { name: "API access", icon: Zap, included: false },
        { name: "ETIMS (KRA) integration", icon: CreditCard, included: false },
        { name: "Warehouse automation", icon: Zap, included: false },
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      price: "KES 1,949",
      period: "/month",
      annualPrice: "KES 22,849/year",
      description: "Ideal for growing businesses with multiple locations",
      badge: "Most Popular",
      features: [
        { name: "900 products", icon: Package, included: true },
        { name: "5 roles", icon: Shield, included: true },
        { name: "4 stores", icon: Globe, included: true },
        { name: "5 users", icon: Users, included: true },
        { name: "Email support", icon: Headphones, included: true },
        { name: "Barcode scanning", icon: Smartphone, included: true },
        {
          name: "Advanced Inventory Tracking",
          icon: BarChart3,
          included: true,
        },
        { name: "Advanced Analytics", icon: BarChart3, included: true },
        { name: "Basic reports", icon: Database, included: true },
        { name: "API access", icon: Zap, included: false },
        { name: "ETIMS (KRA) integration", icon: CreditCard, included: false },
        { name: "Warehouse automation", icon: Zap, included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
    },
    {
      name: "Advanced",
      price: "KES 4,999",
      period: "/month",
      annualPrice: "KES 57,999/year",
      description: "For medium businesses needing enhanced capabilities",
      badge: "Recommended",
      features: [
        { name: "1,200 products", icon: Package, included: true },
        { name: "11 roles", icon: Shield, included: true },
        { name: "10 stores", icon: Globe, included: true },
        { name: "11 users", icon: Users, included: true },
        {
          name: "Enterprise inventory management",
          icon: BarChart3,
          included: true,
        },
        { name: "Barcode + RFID", icon: Smartphone, included: true },
        { name: "SKU access", icon: Database, included: true },
        { name: "Advanced Analytics", icon: BarChart3, included: true },
        { name: "API access", icon: Zap, included: true },
        { name: "ETIMS (KRA) integration", icon: CreditCard, included: false },
        { name: "Warehouse automation", icon: Zap, included: false },
        { name: "Custom reports", icon: Database, included: false },
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "/month",
      description: "Custom pricing for large businesses with complex needs",
      badge: "Advanced",
      features: [
        { name: "Unlimited products", icon: Package, included: true },
        { name: "Unlimited roles", icon: Shield, included: true },
        { name: "Unlimited stores", icon: Globe, included: true },
        { name: "Unlimited users", icon: Users, included: true },
        { name: "Access log auditing", icon: Shield, included: true },
        { name: "API access", icon: Zap, included: true },
        { name: "SKU access", icon: Database, included: true },
        { name: "Custom reports", icon: Database, included: true },
        { name: "ETIMS (KRA) integration", icon: CreditCard, included: true },
        { name: "Barcode + RFID + Barcodes", icon: Smartphone, included: true },
        { name: "IP Address Management", icon: Network, included: true },
        { name: "Bank Integration", icon: Banknote, included: true },
        { name: "Mpesa Till Integration", icon: CreditCard, included: true },
        { name: "Application", icon: AppWindow, included: true },

        {
          name: "Enterprise inventory management",
          icon: BarChart3,
          included: true,
        },
        { name: "Warehouse automation", icon: Zap, included: true },
        { name: "Custom prices", icon: Shield, included: true },
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ];

  return (
    <section id="pricing" className="py-4 px-4 bg-transparent/70">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Choose Your Inventory Management Plan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Streamline your inventory operations with our comprehensive
            management system. All plans include a 15-day free trial with no
            setup fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2">
          {plans.map((plan, index) => (
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
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
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
