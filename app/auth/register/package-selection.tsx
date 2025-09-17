"use client";
import { Package, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PackageDialog from "./package-dialog";
import { useState } from "react";
import { packagePlans } from "./package-plans";

interface PackageSelectionProps {
  selectedPackage: string;
  onPackageSelect: (packageId: string) => void;
  onConfirm: (packageId: string) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function PackageSelection({
  selectedPackage,
  onPackageSelect,
  onConfirm,
  onBack,
  isSubmitting,
}: PackageSelectionProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const getSelectedPackageDetails = () => {
    return packagePlans.find((plan) => plan.id === selectedPackage);
  };

  const handleConfirmPackage = async () => {
    setShowConfirmDialog(false);
    await onConfirm(selectedPackage);
  };

  const handleSubmit = () => {
    if (selectedPackage) {
      setShowConfirmDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center mb-6">
            <Package className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Wanda Inventory
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Choose Your Perfect Plan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the package that best fits your business needs. You can
            upgrade or downgrade at any time.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packagePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                selectedPackage === plan.id
                  ? "ring-2 ring-primary shadow-lg scale-105"
                  : ""
              } ${plan.popular ? "border-primary" : ""}`}
              onClick={() => onPackageSelect(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  {plan.price === "Custom" ? (
                    <div className="text-3xl font-bold">Custom Pricing</div>
                  ) : (
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">
                        {plan.currency} {plan.price}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        /{plan.period}
                      </span>
                    </div>
                  )}
                </div>
                <CardDescription className="mt-2 text-center">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full mt-6 ${
                    selectedPackage === plan.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => onPackageSelect(plan.id)}
                >
                  {selectedPackage === plan.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto bg-transparent"
          >
            ← Back to Verification
          </Button>

          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
            disabled={!selectedPackage || isSubmitting}
          >
            {isSubmitting ? (
              "Completing Registration..."
            ) : (
              <>
                Complete Registration
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <PackageDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          selectedPlan={getSelectedPackageDetails()}
          onConfirm={handleConfirmPackage}
        />
      </div>
    </div>
  );
}
